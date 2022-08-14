import { Form, Input, Button, message, Checkbox } from "antd";

import styled from "styled-components";

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

export default function Settings() {
    const onFinish = values => {
        console.log("Success:", values);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);

        message.error("Failed to update settings");
    };

	return (
		<>
			<Wrapper>
				<Form
					name="basic"
					initialValues={{
						remember: true,
					}}
                    layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item
					>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Wrapper>
		</>
	);
}
