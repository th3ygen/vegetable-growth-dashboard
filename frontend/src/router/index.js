import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import PlantReport from "../pages/user/PlantReport";
import GrowthObservation from "../pages/user/GrowthObservation";
import CropEstimation from "../pages/user/CropsEstimation";
import Setting from "../pages/user/Settings";

export default function Router() {
	return (
		<Routes>
			<Route path="user" element={<UserLayout />}>
				<Route path="dashboard" element={<PlantReport />} />
				<Route path="growth" element={<GrowthObservation />} />
				<Route path="estimation" element={<CropEstimation />} />
				<Route path="settings" element={<Setting />} />

				{/* redirect from * */}
			</Route>
			<Route
				path="/"
				element={<Navigate to="/user/dashboard" replace={true} />}
			/>
		</Routes>
	);
}
