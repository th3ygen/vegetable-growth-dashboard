import { createSlice } from "@reduxjs/toolkit";

const topbarSlice = createSlice({
    name: 'topbar',
    initialState: {
        title: '',
        path: ''
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setPath: (state, action) => {
            state.path = action.payload;
        }
    }
});

export const { setTitle, setPath } = topbarSlice.actions;

export default topbarSlice.reducer;