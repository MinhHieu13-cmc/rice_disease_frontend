import axios from 'axios';

// Replace with your Django backend URL
// For local development with Expo on Android, use your computer's IP address
// For iOS simulator, you can use localhost
const API_URL = 'http://192.168.139.32:8000/api';  // Default for Android emulator pointing to localhost

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const checkBackendConnection = async () => {
  try {
    const response = await apiClient.get('/du_doan_benh/');
    return response.data;
  } catch (error) {
    console.error('Error checking backend connection:', error);
    throw error;
  }
};

export const getDiseaseInfo = async (diseaseName) => {
  try {
    const response = await apiClient.post('/lay_thong_tin_benh/', {
      ten_benh: diseaseName
    });
    return response.data;
  } catch (error) {
    console.error('Error getting disease info:', error);
    throw error;
  }
};

export default {
  checkBackendConnection,
  getDiseaseInfo,
};