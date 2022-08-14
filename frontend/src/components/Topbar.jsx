import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggler from "../features/themeToggle/ThemeToggler";

import theme from "../app/theme";

import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';


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
	width: 200px;
	position: relative;
`;

const handleMenuClick = (e) => {
	message.info('Click on menu item.');
	console.log('click', e);
};

const menu = (
	<Menu
		onClick={handleMenuClick}
		items={[
			{
				label: 'Logout',
				key: '1',
				icon: <LogoutOutlined />,
			},
			{
				label: <ThemeToggler />,
				key: '2',
			},
		]}
	/>
);


export default function Topbar() {
	const { title } = useSelector(state => state.topbar);

	/* useEffect(() => {

	}, [title]); */

	return (
		<Wrapper>
			<Title>
				{title}
			</Title>
			<Space wrap>
				<Dropdown overlay={menu}>
					<Button>
						<Space>
							<UserOutlined />
							User 1
						</Space>
					</Button>
				</Dropdown>
			</Space>
		</Wrapper>
	);
}
