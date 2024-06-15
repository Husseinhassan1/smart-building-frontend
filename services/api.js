import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.0.17:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
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
export const fetchAppliances = () => api.get('/appliances');
export const createAppliance = (applianceData) => api.post('/appliances', applianceData);

export default api;
