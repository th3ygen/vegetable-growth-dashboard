import { useEffect, useRef, useState } from "react";
import { useSingleEffect } from "react-haiku";
import { useSelector } from "react-redux";

import styled from "styled-components";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";

import { useMqtt } from "../mqtt";

const Chart = styled.div`
	width: 100%;
	height: 60vh;
	transition: 0.3s all;
`;

const COLOR = {
	GC: "#67B7DC",
	RO: "#6794DC",
	RC: "#6771dc",
	BH: "#8067DC",
};

export default function PlantReportChart(props) {
	const chartDiv = useRef(null);
	const root = useRef(null);

	const { status } = useSelector((state) => state.mqtt);

	const [data, setData] = useState([]);
	const [heatSeries, setHeatSeries] = useState({});
	const [barSeries, setBarSeries] = useState([]);
	const [barYAxis, setBarYAxis] = useState({});
	const [heatChart, setHeatChart] = useState(null);
	const [barChart, setBarChart] = useState(null);

	const mqtt = useMqtt();

	useEffect(() => {
		if (props.devId) {
			if (status === "connected" && mqtt) {
				mqtt.subscribe(`justGood/data/${props.devId}`);

				mqtt.on("message", (topic, message) => {
					if (topic.includes("justGood/data/")) {
						let data = JSON.parse(message);

						for (let d of data) {
							d["name"] = d.label.split(" ")[0];

							d["week"] = parseInt(d.label.split(" ")[1][1]);
							d["settings"] = {
								fill: COLOR[d["name"]] || "#818e09",
							};

							delete d["label"];
						}

						setData(data);
					} else {
						console.log("other data", topic, message.toString());
					}
				});

				return () => {
					mqtt.unsubscribe("justGood/data/+");
					mqtt.unsubscribe("test");
				};
			}
		}
	}, [mqtt, props.devId, status]);

	useEffect(() => {
		if (data.length > 0) {
			if (heatSeries) {
				heatSeries.data.setAll(data);

				heatChart.appear(1000, 100);
			}

			if (barSeries) {
				let g = [];

				for (let d of data) {
					let e = g.find((e) => e.week === `Week ${d.week}`);

					if (!e) {
						/* e = {
							week: 'Week ' + d.week,
							name: d.name,
						}; */
						e = {};

						e[d.name] = (e[d.name] || 0) + 1;
						e.week = `Week ${d.week}`;
						e.settings = {
							fill: COLOR[d.name] || "#818e09",
						};

						g.push(e);

						continue;
					}

					e[d.name] = (e[d.name] || 0) + 1;
				}

				console.log("data", data);
				console.log("result", g);

				barYAxis.data.setAll(g);
				for (let s of barSeries) {
					s.data.setAll(g);
				}

				barChart.appear(1000, 100);
			}
		}
	}, [data, heatSeries, barSeries, barYAxis, barChart, heatChart]);

	function createBubbleChart(r, container, w) {
		let chart = container.children.push(
			am5xy.XYChart.new(r, {
				panX: true,
				panY: true,
				/* wheelY: "zoomXY", */
				width: am5.percent(w),
			})
		);

		let xRenderer = am5xy.AxisRendererX.new(r, {
			minGridDistance: 20,
		});
		let yRenderer = am5xy.AxisRendererY.new(r, {
			minGridDistance: 20,
		});
		xRenderer.labels.template.set("opacity", 0.5);
		yRenderer.labels.template.set("opacity", 0.5);

		let xAxis = chart.xAxes.push(
			am5xy.ValueAxis.new(r, {
				renderer: xRenderer,
			})
		);

		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(r, {
				renderer: yRenderer,
				tooltip: am5.Tooltip.new(r, {}),
			})
		);

		let bubbleSeries = chart.series.push(
			am5xy.LineSeries.new(r, {
				calculateAggregates: true,
				xAxis,
				yAxis,
				valueYField: "y",
				valueXField: "x",
				valueField: "week",
			})
		);

		bubbleSeries.strokes.template.set("visible", false);

		let circleTemplate = am5.Template.new({
			tooltipY: 0,
		});
		circleTemplate.states.create("transparent", {
			opacity: 0.1,
		});

		function handleHover(e) {
			let target = e.target;

			am5.array.each(bubbleSeries.dataItems, function (dataItem) {
				let { name } = dataItem.dataContext;
				let { name: targetName } = target._dataItem.dataContext;
				if (dataItem.bullets && name !== targetName) {
					let bullet = dataItem.bullets[0];

					if (bullet) {
						let sprite = bullet.get("sprite");
						if (sprite) {
							sprite.states.applyAnimate("transparent");
						}
					}
				}
			});
		}

		function handleLeave(e) {
			am5.array.each(bubbleSeries.dataItems, function (dataItem) {
				if (dataItem.bullets) {
					let bullet = dataItem.bullets[0];
					if (bullet) {
						let sprite = bullet.get("sprite");
						if (sprite) {
							sprite.states.applyAnimate("default");
						}
					}
				}
			});
		}

		circleTemplate.events.on("pointerover", handleHover);
		circleTemplate.events.on("pointerout", handleLeave);

		bubbleSeries.bullets.push(function () {
			let bulletCircle = am5.Circle.new(
				r,
				{
					radius: 5,
					templateField: "settings",
					fillOpacity: 0.9,
					tooltipText: "{name}\nWeek {week}",
				},
				circleTemplate
			);

			return am5.Bullet.new(r, {
				sprite: bulletCircle,
			});
		});

		bubbleSeries.set("heatRules", [
			{
				target: circleTemplate,
				min: 5,
				max: 13,
				dataField: "value",
				key: "radius",
			},
		]);

		chart.set(
			"cursor",
			am5xy.XYCursor.new(r, {
				xAxis,
				yAxis,
				snapToSeries: [bubbleSeries],
			})
		);

		setHeatSeries(bubbleSeries);
		setHeatChart(chart);

		bubbleSeries.appear(1000);
		/* chart.appear(1000, 100); */
	}

	function createBarChart(r, container, w) {
		let chart = container.children.push(
			am5xy.XYChart.new(r, {
				panX: true,
				panY: false,
				/* wheelX: "panX",
				wheelY: "zoomX", */
				layout: r.verticalLayout,
				width: am5.percent(w),
			})
		);

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		let yAxis = chart.yAxes.push(
			am5xy.CategoryAxis.new(r, {
				categoryField: "week",
				renderer: am5xy.AxisRendererY.new(r, {}),
				tooltip: am5.Tooltip.new(r, {}),
			})
		);

		setBarYAxis(yAxis);

		let xAxis = chart.xAxes.push(
			am5xy.ValueAxis.new(r, {
				min: 0,
				renderer: am5xy.AxisRendererX.new(r, {
					minGridDistance: 20,
				}),
			})
		);

		// Add legend
		// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
		let legend = chart.children.push(
			am5.Legend.new(r, {
				centerX: am5.p50,
				x: am5.p50,
			})
		);

		let seriess = [];

		// Add series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		function makeSeries(r, chart, name, fieldName) {
			let series = chart.series.push(
				am5xy.ColumnSeries.new(r, {
					name: name,
					stacked: true,
					xAxis: xAxis,
					yAxis: yAxis,
					baseAxis: yAxis,
					valueXField: fieldName,
					categoryYField: "week",
				})
			);

			series.columns.template.setAll({
				tooltipText: "{valueXField}: {valueX}",
				tooltipY: am5.percent(90),
			});
			/* series.data.setAll(data); */

			// Make stuff animate on load
			// https://www.amcharts.com/docs/v5/concepts/animations/

			series.bullets.push(function () {
				return am5.Bullet.new(r, {
					sprite: am5.Label.new(r, {
						text: "{valueX}",
						fill: r.interfaceColors.get("alternativeText"),
						centerY: am5.p50,
						centerX: am5.p50,
						populateText: true,
						templateField: "settings",
					}),
				});
			});

			seriess.push(series);
			legend.data.push(series);
		}

		makeSeries(r, chart, "Green Coral", "GC");
		makeSeries(r, chart, "Red Oak", "RO");
		makeSeries(r, chart, "Red Coral", "RC");
		makeSeries(r, chart, "Butterhead", "BH");

		setBarSeries(seriess);

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		/* chart.appear(1000, 100); */
		setBarChart(chart);
	}

	useSingleEffect(() => {
		root.current = am5.Root.new(chartDiv.current);

		let r = root.current;

		r.setThemes([am5themes_Animated.new(r)]);

		let container = r.container.children.push(
			am5.Container.new(r, {
				width: am5.p100,
				height: am5.p100,
				layout: r.horizontalLayout,
			})
		);

		createBubbleChart(r, container, 80);
		createBarChart(r, container, 20);
	});

	return (
		<>
			<Chart ref={chartDiv}></Chart>
		</>
	);
}
