import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAppliances as fetchAppliancesService, createAppliance as createApplianceService } from '../../services/api';

export const fetchAppliances = createAsyncThunk('appliances/fetchAppliances', async () => {
    const response = await fetchAppliancesService();
    return response.data;
});

export const createAppliance = createAsyncThunk('appliances/createAppliance', async (applianceData) => {
    const response = await createApplianceService(applianceData);
    return response.data;
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
            });
    },
});

export default applianceSlice.reducer;
