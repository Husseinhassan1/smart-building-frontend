import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRule as createRuleService } from '../../services/api';

export const createRule = createAsyncThunk('rules/createRule', async (rule) => {
    const response = await createRuleService(rule);
    return response.data;
});

const ruleSlice = createSlice({
    name: 'rules',
    initialState: { rules: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRule.fulfilled, (state, action) => {
                state.rules.push(action.payload);
                state.loading = false;
            })
            .addCase(createRule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ruleSlice.reducer;
