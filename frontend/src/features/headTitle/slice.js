import { createSlice } from "@reduxjs/toolkit";

const topbarSlice = createSlice({
    name: 'topbar',
    initialState: {
        title: '',
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        }
    }
});

export const { setTitle } = topbarSlice.actions;

export default topbarSlice.reducer;