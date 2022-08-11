import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

import styles from "./UserLayout.module.scss";

export default function UserLayout() {
	return (
		<div className={styles.container}>
			<div className={styles.navbar}>
				<Navbar />
			</div>
			<div className={styles.content}>
				<div className={styles.topbar}>
					<Topbar />
				</div>
				<Outlet />
			</div>
		</div>
	);
}
