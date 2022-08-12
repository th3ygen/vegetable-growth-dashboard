import { useEffect, useRef, useState } from "react";
import { useSingleEffect } from "react-haiku";
import { useSelector } from "react-redux";

import styled from "styled-components";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { useMqtt } from "../mqtt";

const Chart = styled.div`
	width: 100%;
	height: 70vh;
`;

const COLOR = [
    "#818e09",
    "#7a00967b",
    "#a35213",
]


export default function PlantReportChart() {
	const chartDiv = useRef(null);
	const root = useRef(null);

	const { status } = useSelector((state) => state.mqtt);

	const [data, setData] = useState([]);
	const [series, setSeries] = useState({});

	const mqtt = useMqtt();

	useEffect(() => {
		if (status === "connected") {
			mqtt.subscribe("justGood/data/+");

			mqtt.on("message", (topic, message) => {
				let data = JSON.parse(message);

				for (let d of data) {
					d["week"] = parseInt(d.label.split(" ")[1][1]);
					d["name"] = d.label.split(" ")[0];
                    d["settings"] = {
                        fill: COLOR[1],
                    }

					delete d["label"];
				}

                setData(data);
			});
		}

		/* if (series.data) {
			series.data.setAll(data);
		} */
	}, [mqtt, status]);

    useEffect(() => {
        if (data.length > 0) {
            if (series) {
                series.data.setAll(data);
            }
        }
    }, [data, series]);

	useSingleEffect(() => {
		root.current = am5.Root.new(chartDiv.current);

		let r = root.current;

		r.setThemes([am5themes_Animated.new(r)]);

		let container = r.container.children.push(
			am5.Container.new(r, {
				width: am5.p100,
				height: am5.p100,
				layout: root.verticalLayout,
			})
		);

		let chart = container.children.push(
			am5xy.XYChart.new(r, {
				panX: true,
				panY: true,
				wheelY: "zoomXY",
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
				min: 4,
				max: 10,
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

		setSeries(bubbleSeries);

		bubbleSeries.appear(1000);
		chart.appear(1000, 100);
	});

	return (
		<>
			<Chart ref={chartDiv}></Chart>
		</>
	);
}
