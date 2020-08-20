import axios from 'axios';

const BASE_URL = "http://localhost:4000";

export const loadProducts = async () => axios.get(`${BASE_URL}/products`);
export const loadProduct = async (id) => axios.get(`${BASE_URL}/products/${id}`);
export const addProduct = async (product) => axios.post(`${BASE_URL}/products`, product);
export const updateProduct = async (product) => axios.put(`${BASE_URL}/products/${product.id}`, product);
export const deleteProduct = async (id) => axios.delete(`${BASE_URL}/products/${id}`);
