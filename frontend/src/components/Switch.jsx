import styled from "styled-components";

import theme from "../app/theme";

import { Switch as AntSwitch } from "antd";

const Switch = styled(AntSwitch)`
	background-color: ${theme.panelBackgroundColor} !important;

	& span {
		color: ${theme.color} !important;
	}
`;

export default Switch;
