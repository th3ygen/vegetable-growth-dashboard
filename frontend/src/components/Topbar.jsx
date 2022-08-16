import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ThemeToggler from "../features/themeToggle/ThemeToggler";

import theme from "../app/theme";

import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, PageHeader, Space } from 'antd';

const NewButton = styled(Button)`
	width: 150px !important;
	font-size: 18px !important;
	height: 45px !important;
	color: whitesmoke !important;
	background: rgba(5, 75, 26, 0.24) !important;
	border-radius: 10px !important;
	box-shadow: 0 4px 30px rgba(12, 70, 26, 0.24) !important;
	backdrop-filter: blur(5.6px) !important;
	-webkit-backdrop-filter: blur(5.6px) !important;
	border: none !important;
`;

const NewMenu = styled(Menu)`
	background: rgba(10, 59, 36, 0.24) !important;
	border-radius: 10px !important;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
	backdrop-filter: blur(5.6px) !important;
	-webkit-backdrop-filter: blur(5.6px) !important;
	border: 1px solid rgba(255, 255, 255, 0.32) !important;

	* {
		font-size: 18px;
	}

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
