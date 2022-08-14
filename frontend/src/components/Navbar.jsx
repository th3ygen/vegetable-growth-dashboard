import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { setTitle } from "../features/headTitle/slice";

import theme from "../app/theme";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	padding: 20px;
	background-color: ${theme.panelBackgroundColor};
	color: #f3f3e7;
	border-radius: 20px;
	flex-direction: column;
	justify-content: flex-start;
`;

const Box = styled.div`
	width: 100%;
	padding: 20px;
`;

const LogoCard = styled.div`
	width: 100%;
	height: fit-content;
	border: solid 3px #b7d35d;
	border-radius: 0 40% 0 40%;
	padding: 30px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
	justify-content: center;
	transform: rotate(5deg);

	box-shadow: 10px 10px 2px 1px #c4f39d;
`;

const Logo = styled.div`
	width: 100%;
	padding: 15px 10px;
	font-weight: bolder;
	font-size: 30px;
	transform: rotate(-5deg);
	display: flex;
	justify-content: center;

	img {
		width: 200px;
	}
`;

const NavList = styled.div`
	padding-top: 30px;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
`;

const SideContent = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	align-items: center;
	padding: 10px;
	gap: 10px;

	transition: all 0.3s ease-in-out;

	&:hover {
		cursor: pointer;
	}
`;

const ActiveSideContent = styled(SideContent)`
	background: #f3f3e7;
	color: #054b1a;
	border-radius: 5px;
	height: fit-content;

	transition: all 0.3s ease-in-out;
`;

const SideIcon = styled.div`
	width: 20%;
	font-size: 1.5rem;
`;

let items = [
	{
		id: 1,
		name: "Plant report",
		exName: "Dashboard",
		path: "/user/dashboard",
		icon: "fa-solid fa-newspaper",
		active: true,
	},
	{
		id: 2,
		name: "Growth Observation",
		exName: "Growth Observation",
		path: "/user/growth",
		icon: "fa-solid fa-leaf",
		active: false,
	},
	{
		id: 3,
		name: "Crops Estimation",
		exName: "Crops Estimation",
		path: "/user/estimation",
		icon: "fa-solid fa-bullseye",
		active: false,
	},
];

export default function Navbar() {
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let location = useLocation();

	useEffect(() => {
		if (location) {
			const item = items.find(item => location.pathname === item.path);

			if (item) {
				dispatch(setTitle(item.exName));
			}
		}
	}, [dispatch, location]);

	function handleClick(item) {
		navigate(item.path);
		
		items.forEach((i) => {
			i.active = false;
			if (i.path === item.path) {
				i.active = true;
			}
		});
	}

	return (
		<Wrapper>
			<Box>
				<LogoCard>
					<Logo>
						<Suspense fallback={<div>Loading...</div>}>
							<img src="/public/images/logo.png" alt="logo" width={200}/>
						</Suspense>
					</Logo>
				</LogoCard>
			</Box>
			<NavList>
				{items.map((item, index) => {
					return item.active ? (
						<ActiveSideContent
							key={index}
							onClick={() => handleClick(item)}
						>
							<SideIcon>
								<FontAwesomeIcon icon={item.icon} />
							</SideIcon>
							<div>{item.name}</div>
						</ActiveSideContent>
					) : (
						<SideContent
							key={index}
							onClick={() => handleClick(item)}
						>
							<SideIcon>
								<FontAwesomeIcon icon={item.icon} />
							</SideIcon>
							<div>{item.name}</div>
						</SideContent>
					);
				})}
			</NavList>
		</Wrapper>
	);
}
