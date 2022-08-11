import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/slice';
import themeReducer from '../features/themeToggle/slice';

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer
    }
});
