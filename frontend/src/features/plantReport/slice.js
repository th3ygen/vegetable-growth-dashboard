import { createSlice } from "@reduxjs/toolkit";

export const plantReportSlice = createSlice({
	name: "plantReport",
	initialState: {
		devices: [],
	},
	reducers: {
		addDevice: (state, action) => {
			state.devices.push(action.payload);
		},
		removeDevice: (state, action) => {
			state.devices = state.devices.filter(
				(device) => device.name !== action.payload
			);
		},
		setData: (state, action) => {
			// find device
			let device = state.devices.find(
				(device) => device.name === action.payload.name
			);

			if (!device) {
				device = {
					name: action.payload.name,
					data: [],
				};
				state.devices.push(device);
			}

			// set data
			device.data = action.payload.data;
		},
	},
});

export const { addDevice, removeDevice, setData } = plantReportSlice.actions;

export default plantReportSlice.reducer;