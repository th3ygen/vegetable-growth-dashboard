import { createSlice } from '@reduxjs/toolkit';

export const mqttSlice = createSlice({
    name: 'mqtt',
    initialState: {
        config: {
            protocol: "", broker: "", port: "", username: "", password: ""
        },
        client: null,
        status: 'disconnected',
    },
    reducers: {
        setClient: (state, action) => {
            state.client = action.payload;
        },
        setConfig: (state, action) => {
            state.config = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },

    },

});

export const { setConfig, setStatus, setClient } = mqttSlice.actions;

export default mqttSlice.reducer;