import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Connector as MQTTConnector } from "./features/mqtt";

import "./index.scss";
import "antd/dist/antd.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<MQTTConnector
				protocol={process.env.REACT_APP_MQTT_PROTOCOL}
				broker={process.env.REACT_APP_MQTT_BROKER}
				port={process.env.REACT_APP_MQTT_PORT}
				username={process.env.REACT_APP_MQTT_USERNAME}
				password={process.env.REACT_APP_MQTT_PASSWORD}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</MQTTConnector>
		</ReduxProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
