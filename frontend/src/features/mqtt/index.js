import { useSelector, useDispatch } from "react-redux";
import { useSingleEffect } from "react-haiku";
import { useEffect, useState } from "react";
import mqtt from "mqtt/dist/mqtt";
import * as uuid from "uuid";

import { setConfig, setStatus } from "./slice";

function useMqtt() {
	let [client, setClient] = useState(null);

	const { config } = useSelector((state) => state.mqtt);

	useEffect(() => {
		if (config.protocol !== "") {
			if (!client) {
				const { protocol, broker, port, username, password } = config;

				let c = mqtt.connect(`${protocol}://${broker}:${port}`, {
					clientId: uuid.v4(),
					username,
					password,
				});

				c.on("error", (error) => {
					console.log(error);
				});
				c.on("close", () => {
					console.log("closed");
				});
				c.on("offline", () => {
					console.log("offline");
				});

				setClient(c);
			}
		}
	}, [client, config]);

	return client;
}

function Connector(props) {
	const { topics } = useSelector((state) => state.mqtt);
	const { protocol, broker, port, username, password } = props;

	const dispatch = useDispatch();

	useSingleEffect(() => {
		dispatch(setConfig({ protocol, broker, port, username, password }));
	});

	let client = useMqtt();

	useEffect(() => {
		if (client) {
			client.on("connect", () => {
				console.log("connected");
				dispatch(setStatus("connected"));
			});

			if (topics) {
				topics.forEach((topic) => {
					client.subscribe(topic);
				});
			}
		}
	}, [client, dispatch, topics]);

	return <>{props.children}</>;
}

export { Connector, useMqtt };
