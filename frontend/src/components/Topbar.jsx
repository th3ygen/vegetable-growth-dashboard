import styled from "styled-components";

import ThemeToggler from "../features/themeToggle/ThemeToggler";

const Wrapper = styled.div`
	display: flex;
	padding: 20px;

    justify-content: space-between;
    align-items: center;

    background-color: #5edd84;
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

export default function Navbar(props) {
	return (
		<Wrapper>
			<Title>Topbar title here</Title>
			<Actions>
				<ThemeToggler />
			</Actions>
		</Wrapper>
	);
}
