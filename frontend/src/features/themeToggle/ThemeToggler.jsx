import { useDispatch } from "react-redux";
import styled from "styled-components";

import { toggleTheme } from "./slice";

import Switch from "../../components/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;  
`;

export default function ThemeToggler() {
	const dispatch = useDispatch();

	return (
		<Switch
			checkedChildren={
				<Label>
					<FontAwesomeIcon icon="fa-solid fa-moon" size="lg" />
					Dark
				</Label>
			}
			unCheckedChildren={
				<Label>
					<FontAwesomeIcon icon="fa-solid fa-sun" size="lg" />
					Light
				</Label>
			}
			onClick={() => {
				dispatch(toggleTheme());
			}}
		/>
	);
}
