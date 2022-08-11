import React from "react";
import styled from "styled-components";

import PlantReportChart from "../../features/plantReport/PlantReportChart";

import { Card } from "antd";

/* with soft box shadow */
const NewCard = styled(Card)`
	box-shadow: 0.6px 0.7px 1.2px rgba(0, 0, 0, 0.016),
		1.4px 1.5px 2.7px rgba(0, 0, 0, 0.024),
		2.4px 2.6px 4.6px rgba(0, 0, 0, 0.029),
		3.6px 3.9px 6.9px rgba(0, 0, 0, 0.033),
		5.1px 5.6px 10px rgba(0, 0, 0, 0.037),
		7.3px 8px 14.2px rgba(0, 0, 0, 0.041),
		10.3px 11.3px 20.1px rgba(0, 0, 0, 0.044),
		15px 16.4px 29.2px rgba(0, 0, 0, 0.049),
		23.1px 25.3px 45px rgba(0, 0, 0, 0.056),
		41px 45px 80px rgba(0, 0, 0, 0.07);

    border-radius: 20px;
`;

export default function PlantReport() {
	return (
		<>
			<NewCard title="Growth" >
				<PlantReportChart />
			</NewCard>
		</>
	);
}
