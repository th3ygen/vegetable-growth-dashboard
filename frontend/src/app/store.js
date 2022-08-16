import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/slice';
import themeReducer from '../features/themeToggle/slice';
import mqttReducer from '../features/mqtt/slice';
import topbarReducer from '../features/headTitle/slice';
import settingsReducer from '../features/settings/slice';

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        mqtt: mqttReducer,
        topbar: topbarReducer,
        settings: settingsReducer
    }
});
