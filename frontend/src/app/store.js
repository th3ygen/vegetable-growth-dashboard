import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/slice';
import themeReducer from '../features/themeToggle/slice';
import mqttReducer from '../features/mqtt/slice';

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        mqtt: mqttReducer,
    }
});
