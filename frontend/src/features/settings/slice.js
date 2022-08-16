import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        plantTypes: []
    },
    reducers: {
        setPlantsType: (state, action) => {
            state.plantTypes = action.payload;
        }
    }
});

export const { setPlantsType } = settingsSlice.actions;

export default settingsSlice.reducer;