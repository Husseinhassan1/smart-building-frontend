import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'cloud.halid.ba';

const api = axios.create({
    baseURL: `http://${API_BASE_URL}`,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (userData) => api.post('/users/register-new-user', userData);
export const authenticateUser = (credentials) => api.post('/users/auth-with-password', credentials);
export const fetchRooms = () => api.get('/rooms');
export const fetchRoomByName = (name) => api.get(`/rooms/${name}`);
export const createRule = (rule) => api.post('/rules', rule);
export const fetchRules = () => api.get('/rules');
export const fetchAppliances = () => api.get('/appliances');
export const createAppliance = (applianceData) => api.post('/appliances', applianceData);
export const updateRoomImage = (roomName, formData) => api.patch(`/rooms/${roomName}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default api;
