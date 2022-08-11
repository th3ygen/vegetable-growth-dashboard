import { useRef, } from "react";
import { useSingleEffect } from "react-haiku";

import styled from "styled-components";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Chart = styled.div`
	width: 100%;
	height: 500px;
`;

export default function PlantReportChart() {
	const chartDiv = useRef(null);
	const root = useRef(null);

	useSingleEffect(() => {
		root.current = am5.Root.new(chartDiv.current);

		let r = root.current;

		r.setThemes([am5themes_Animated.new(r)]);

		let colorSet = am5.ColorSet.new(r, {
			step: 4,
		});

		let colors = {
			type1: colorSet.next(),
			type2: colorSet.next(),
			type3: colorSet.next(),
			type4: colorSet.next(),
		};

        function randomize(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function generateData(count, types) {
            let data = [];
            let id = 0;
        
            for (let x = 0; x < types.length; x++) {
                for (let i = 0; i < count; i++) {
                    data.push({
                        id: id++,
                        name: types[x],
                        x: randomize(0, 1000),
                        y: randomize(0, 1000),
                        week: randomize(1, 4),
                        settings: {
                            fill: colors[types[x]],
                        }
                    });
                }
            }
        
            return data;
        }

        const data = generateData(100, ["type1", "type2", "type3", "type4"]);

        let container = r.container.children.push(am5.Container.new(r, {
            width: am5.p100,
            height: am5.p100,
            layout: root.verticalLayout
        }));

        let chart = container.children.push(am5xy.XYChart.new(r, {
            panX: true, panY: true,
            wheelY: "zoomXY",
        }));

        let xRenderer = am5xy.AxisRendererX.new(r, {
            minGridDistance: 20,
        });
        let yRenderer = am5xy.AxisRendererY.new(r, {
            minGridDistance: 20,
        });
        xRenderer.labels.template.set('opacity', 0.5);
        yRenderer.labels.template.set('opacity', 0.5);

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(r, {
            renderer: xRenderer
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(r, {
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(r, {})
        }));

        let bubbleSeries = chart.series.push(am5xy.LineSeries.new(r, {
            calculateAggregates: true,
            xAxis, yAxis,
            valueYField: "y",
            valueXField: "x",
            valueField: "week",
        }));

        bubbleSeries.strokes.template.set('visible', false);

        let circleTemplate = am5.Template.new({
            tooltipY: 0
        });
        circleTemplate.states.create("transparent", {
            opacity: 0.1
        });

        function handleHover(e) {
            let target = e.target;

            am5.array.each(bubbleSeries.dataItems, function(dataItem) {
                let { name } = dataItem.dataContext;
                let { name: targetName } = target._dataItem.dataContext;
                if (dataItem.bullets && name !== targetName) {
                    let bullet = dataItem.bullets[0];

                    if (bullet) {
                        let sprite = bullet.get('sprite');
                        if (sprite) {
                            sprite.states.applyAnimate('transparent');
                        }
                    }
                }
                
            })
        }

        function handleLeave(e) {
            am5.array.each(bubbleSeries.dataItems, function(dataItem) {
                if (dataItem.bullets) {
                    let bullet = dataItem.bullets[0];
                    if (bullet) {
                        let sprite = bullet.get("sprite");
                        if (sprite) {
                            sprite.states.applyAnimate("default");
                        }
                    }
                }
            })
        }

        circleTemplate.events.on("pointerover", handleHover);
        circleTemplate.events.on("pointerout", handleLeave);

        bubbleSeries.bullets.push(function() {
            let bulletCircle = am5.Circle.new(r, {
                radius: 5,
                templateField: "settings",
                fillOpacity: .9,
                tooltipText: "{name}\nWeek {week}",
            }, circleTemplate);

            return am5.Bullet.new(r, {
                sprite: bulletCircle,
            });
        });

        bubbleSeries.set("heatRules", [{
            target: circleTemplate,
            min: 4,
            max: 10,
            dataField: "value",
            key: "radius",
        }]);

        chart.set("cursor", am5xy.XYCursor.new(r, {
            xAxis, yAxis,
            snapToSeries: [bubbleSeries],
        }));

        /* let legend = chart.children.push(am5.Legend.new(r, {}));
        legend.data.setAll(chart.series.values); */

        bubbleSeries.data.setAll(data);

        bubbleSeries.appear(1000);
        chart.appear(1000, 100);
	});

	return (
		<>
			<Chart ref={chartDiv}></Chart>
		</>
	);
}
