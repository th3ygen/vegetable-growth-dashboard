import { Routes, Route } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import PlantReport from '../pages/user/PlantReport';
import GrowthObservation from '../pages/user/GrowthObservation';
import CropEstimation from '../pages/user/CropsEstimation';

export default function Router() {
    return (
        <Routes>
            <Route path="user" element={<UserLayout />}>
                <Route path="dashboard" element={<PlantReport />} />
                <Route path="growth" element={<GrowthObservation />} />
                <Route path="estimation" element={<CropEstimation />} />
            </Route>
        </Routes>
    )
}