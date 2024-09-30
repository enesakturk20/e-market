import axios from 'axios';

const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io/products';

export const getProducts = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};
