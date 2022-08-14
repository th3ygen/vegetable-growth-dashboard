import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggler from "../features/themeToggle/ThemeToggler";

import theme from "../app/theme";

import { DownOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, PageHeader } from 'antd';

const NewButton = styled(Button)`
	background: red !important;
`;

const NewMenu = styled(Menu)`
	background: orange !important;
`

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

const Title = styled(PageHeader)`
	padding: 0 5px;
	
	* {
		font-size: 1.3rem;
		
		/* font-weight: bold; */
		color: white;
	}

	span:nth-child(2) {
		padding-left: 15px;
	}
`;

const Actions = styled.div`
	width: 200px;
	position: relative;
`;




export default function Topbar() {
	const navigate = useNavigate();

	const { title } = useSelector(state => state.topbar);

	const menuItems = [
		{
			label: <ThemeToggler />,
			key: '2',
		},
		{
			label: 'Settings',
			key: '3',
			icon: <SettingOutlined />,
			path: '/user/settings'
		},
		{
			label: 'Logout',
			key: '1',
			icon: <LogoutOutlined />,
		},
	];
	
	const handleMenuClick = (e) => {
		const { key } = e;
	
		const item = menuItems.find(item => item.key === key);

		if (item.path) {
			navigate(item.path);
		}
	};
	
	const menu = (
		<NewMenu
			onClick={handleMenuClick}
			items={menuItems}
		/>
	);

	return (
		<Wrapper>
			<Title 
				title={title}
				onBack={() => null}
			/>
			<Space wrap>
				<Dropdown overlay={menu}>
					<NewButton>
						<Space>
							<UserOutlined />
							User 1
						</Space>
					</NewButton>
				</Dropdown>
			</Space>
		</Wrapper>
	);
}
