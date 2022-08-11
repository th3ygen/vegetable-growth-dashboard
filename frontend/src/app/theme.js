import styledTheme from "styled-theming";

const theme = {
	backgroundColor: styledTheme("theme", {
		light: "#f0f1fb",
		dark: "#1a1a1a",
	}),
    panelBackgroundColor: styledTheme("theme", {
        light: "#054B1A",
        dark: "#383838",
    }),
	color: styledTheme("theme", {
		light: "#484848",
		dark: "#bababa",
	}),
};

export default theme;
