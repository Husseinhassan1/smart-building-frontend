import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser, registerUser } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = createAsyncThunk('auth/signIn', async (credentials) => {
    const response = await authenticateUser(credentials);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.token;
});

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
    const response = await registerUser(userData);
    return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    await AsyncStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState:
    {
        token: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.token = null;
            });
    },
});

export default authSlice.reducer;
