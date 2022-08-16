import React from "react";
import styled from "styled-components";
import { useSingleEffect } from "react-haiku";

import PlantReportChart from "../../features/plantReport/PlantReportChart";

import { Card } from "antd";

/* with soft box shadow */
const NewCard = styled(Card)`
	box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
		6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
		12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
		22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
		41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
		100px 100px 80px rgba(0, 0, 0, 0.07);

	border-radius: 20px;
`;

export default function PlantReport() {
	useSingleEffect(() => {
		console.log(process.env);
		console.log(process.env.REACT_APP_MQTT_BROKER);
		console.log(process.env.REACT_APP_MQTT_PROTOCOL);
		console.log(process.env.REACT_APP_MQTT_PORT);
		console.log(process.env.REACT_APP_MQTT_USERNAME);
		console.log(process.env.REACT_APP_MQTT_PASSWORD);
	})

	return (
		<>
			<NewCard title="dev1">
				<PlantReportChart devId={"dev1"} />
			</NewCard>
			<NewCard title="dev2">
				<PlantReportChart devId={"dev2"} />
			</NewCard>
			<NewCard title="dev3">
				<PlantReportChart devId={"dev3"} />
			</NewCard>
		</>
	);
}
