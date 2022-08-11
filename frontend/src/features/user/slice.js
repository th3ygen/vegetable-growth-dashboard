import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: 'th3ygen',
        isAuthenticated: true,
        token: '',
        photo: '',
    },
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.photo = action.payload.photo;
        },
        logout: (state) => {
            state.username = '';
            state.isAuthenticated = false;
            state.token = '';
            state.photo = '';
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;