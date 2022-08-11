import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import theme from './app/theme';

import styles from "./App.module.scss";

import Router from "./router";
import "./app/icons";

const AppWrapper = styled.div`
  background-color: ${theme.backgroundColor};
`;

function App() {
	const { selected: selectedTheme } = useSelector(state => state.theme);

	return (
		<ThemeProvider theme={{ theme: selectedTheme }}>
			<AppWrapper className={styles.container}>
				<Router />
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
