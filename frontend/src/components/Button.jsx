import styled from 'styled-components';

import theme from '../app/theme';

import { Button as AntButton } from "antd";

const Button = styled(AntButton)`
    background-color: ${theme.backgroundColor} !important;
    color: ${theme.color} !important;
`;

export default Button;
