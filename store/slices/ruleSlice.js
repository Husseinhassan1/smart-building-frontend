import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRules as fetchRulesService, createRule as createRuleService } from '~/services/api';

export const fetchRules = createAsyncThunk('rules/fetchRules', async () => {
    const response = await fetchRulesService();
    return response.data;
});

export const createRule = createAsyncThunk('rules/createRule', async (ruleData) => {
    const response = await createRuleService(ruleData);
    return response.data;
});

const ruleSlice = createSlice({
    name: 'rules',
    initialState: { rules: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRules.fulfilled, (state, action) => {
                state.rules = action.payload;
                state.loading = false;
            })
            .addCase(fetchRules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
