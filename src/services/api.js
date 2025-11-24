import axios from 'axios';

// Create an axios instance
// In development, we might need a proxy or mock, but for now we point to relative paths
// which will work when deployed to Vercel as serverless functions.
const api = axios.create({
  baseURL: '/api', // This assumes the Vercel backend will be served at the same origin under /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookStay = async (bookingData) => {
  try {
    const response = await api.post('/book', bookingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const checkAvailability = async (dates) => {
  try {
    const response = await api.post('/check-availability', dates);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updatePricing = async (pricingData) => {
  try {
    const response = await api.post('/admin/update-pricing', pricingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateAvailability = async (availabilityData) => {
  try {
    const response = await api.post('/admin/update-availability', availabilityData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;
