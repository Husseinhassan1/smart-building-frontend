import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roomReducer from './slices/roomSlice';
import ruleReducer from './slices/ruleSlice';
import applianceReducer from './slices/applianceSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomReducer,
        rules: ruleReducer,
        appliances: applianceReducer,
    },
});

export default store;
