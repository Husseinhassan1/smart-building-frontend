import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAppliances as fetchAppliancesService, createAppliance as createApplianceService, publishMQTTMessage as publishMQTTMessageService } from '../../services/api';

export const fetchAppliances = createAsyncThunk('appliances/fetchAppliances', async () => {
    const response = await fetchAppliancesService();
    return response.data;
});

export const createAppliance = createAsyncThunk('appliances/createAppliance', async (applianceData) => {
    const response = await createApplianceService(applianceData);
    return response.data;
});

export const toggleApplianceState = createAsyncThunk('appliances/toggleApplianceState', async ({ room, actuatorID, outputNumber, currentState }) => {
    const topic = `aktuator/${room}/#`;
    const action = currentState;
    const message = JSON.stringify({ id: actuatorID, output: outputNumber, action });
    console.log(message);
    await publishMQTTMessageService(topic, message);
    return { room, actuatorID, outputNumber, newState: action };
});

const applianceSlice = createSlice({
    name: 'appliances',
    initialState: { appliances: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppliances.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppliances.fulfilled, (state, action) => {
                state.appliances = action.payload;
                state.loading = false;
            })
            .addCase(fetchAppliances.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createAppliance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppliance.fulfilled, (state, action) => {
                state.appliances.push(action.payload);
                state.loading = false;
            })
            .addCase(createAppliance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(toggleApplianceState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleApplianceState.fulfilled, (state, action) => {
                const { room, actuatorID, outputNumber, newState } = action.payload;
                const applianceIndex = state.appliances.findIndex(
                    appliance => appliance.room === room && appliance.actuatorOutput.actuator.id === actuatorID && appliance.actuatorOutput.outputNumber === outputNumber
                );
                if (applianceIndex !== -1) {
                    state.appliances[applianceIndex].currentState = newState;
                }
                state.loading = false;
            })
            .addCase(toggleApplianceState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default applianceSlice.reducer;
