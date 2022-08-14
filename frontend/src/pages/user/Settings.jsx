import {
	Form,
	Input,
	Button,
	message,
	Checkbox,
	Typography,
	Divider,
	Dropdown,
	Menu,
	Space,
	Select,
} from "antd";
import {
	DownOutlined,
	PlusOutlined,
	MinusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import styled from "styled-components";

const { Title } = Typography;

const Wrapper = styled.div`
	box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
		6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
		12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
		22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
		41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
		100px 100px 80px rgba(0, 0, 0, 0.07);

	background: white;

	border-radius: 20px;

	padding: 20px;
`;

const ColorItem = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const ColorItemBox = styled.div`
	width: 10px;
	height: 10px;

	border-radius: 4px;

	background-color: ${(props) => props.color};
`;

export default function Settings() {
	const colors = [
		{
			value: "#00ff00",
			label: (
				<ColorItem>
					<ColorItemBox color="#00ff00" />
					<span>Green</span>
				</ColorItem>
			),
		},
		{
			value: "#ff0000",
			label: (
				<ColorItem>
					<ColorItemBox color="#ff0000" />
					<span>Red</span>
				</ColorItem>
			),
		},
	];

	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);

		message.error("Failed to update settings");
	};

	return (
		<>
			<Wrapper>
				<Title level={3}>Crops setting</Title>
				<Divider />
				<Form
					name="basic"
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.List name="crops">
						{(fields, { add, remove }) => {
							return (
								<>
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
										>
											Add crop
										</Button>
									</Form.Item>
									{fields.map((field) => (
										<Space
											key={field.key}
											style={{
												display: "flex",
											}}
										>
											<Form.Item
												label="Crop name"
												name={[field.name, "name"]}
												rules={[
													{
														required: true,
														message:
															"Please input crop name",
													},
												]}
											>
												<Input
													style={{
														width: "100%",
													}}
												/>
											</Form.Item>
											<Form.Item
												label="Short form (key)"
												name={[field.key, "key"]}
												rules={[
													{
														required: true,
														message:
															"Please input your crop short form!",
													},
												]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												label="Crop"
												name={[field.key, "crop"]}
												rules={[
													{
														required: true,
														message:
															"Please select a crop or create a new one!",
													},
												]}
											>
												<Select options={colors} />
											</Form.Item>
											<MinusCircleOutlined
												onClick={() =>
													remove(field.name)
												}
											/>
										</Space>
									))}
								</>
							);
						}}
					</Form.List>
				</Form>
			</Wrapper>
		</>
	);
}
