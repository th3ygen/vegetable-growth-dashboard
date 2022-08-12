import styled from "styled-components";

import ThemeToggler from "../features/themeToggle/ThemeToggler";

import theme from "../app/theme";

const Wrapper = styled.div`
	display: flex;
	padding: 20px;

    justify-content: space-between;
    align-items: center;

    background-color: ${theme.panelBackgroundColor};
    color: white;

    border-radius: 20px;

    width: 100%;
`;

const Title = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
`;

const Actions = styled.div`
	display: flex;
	gap: 10px;
`;

export default function Topbar() {
	return (
		<Wrapper>
			<Title>
			</Title>
			<Actions>
				<ThemeToggler />
			</Actions>
		</Wrapper>
	);
}
