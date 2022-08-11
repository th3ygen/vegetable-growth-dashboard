import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        selected: 'light',
    },
    reducers: {
        toggleTheme: (state) => {
            state.selected = state.selected === 'light' ? 'dark' : 'light';
        }
    }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;