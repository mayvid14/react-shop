import * as apiMethods from '../../helpers/productHelpers';
import * as PRODUCT_ACTION_TYPES from '../actions/product/actionTypes';

const loadProductsFunc = async dispatch => {
  dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCTS });

  try {
    const response = await apiMethods.loadProducts();
    const products = response.data;
    dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCTS_SUCCESS, payload: { products } });
  } catch (error) {
    dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCTS_FAILURE, payload: { error } });
  }
}

const loadProductFunc = (dispatch, id) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCT });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiMethods.loadProduct(id);
      const product = response.data;
      dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCT_SUCCESS, payload: { product } });
      resolve();
    } catch (error) {
      dispatch({ type: PRODUCT_ACTION_TYPES.LOAD_PRODUCT_FAILURE, payload: { error } });
      reject();
    }
  });
}

const addProductFunc = (dispatch, product) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.ADD_PRODUCT });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiMethods.addProduct(product);
      const newProduct = response.data;
      dispatch({ type: PRODUCT_ACTION_TYPES.ADD_PRODUCT_SUCCESS, payload: { product: newProduct } });
      resolve();
    } catch (error) {
      dispatch({ type: PRODUCT_ACTION_TYPES.ADD_PRODUCT_FAILURE, payload: { error } });
      reject(error);
    }
  })
}

const updateProductFunc = async (dispatch, product) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT });

  try {
    const response = await apiMethods.updateProduct(product);
    const newProduct = response.data;
    dispatch({ type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS, payload: { product: newProduct } });
  } catch (error) {
    dispatch({ type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILURE, payload: { error } });
  }
}

const deleteProductFunc = async (dispatch, id) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.DELETE_PRODUCT });

  return new Promise(async (resolve, reject) => {
    try {
      await apiMethods.deleteProduct(id);
      dispatch({ type: PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS, payload: { id } });
      resolve();
    } catch (error) {
      dispatch({ type: PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAILURE, payload: { error } });
      reject(error);
    }
  });
}

export const loadProducts = dispatch => () => loadProductsFunc(dispatch);
export const loadProduct = dispatch => id => loadProductFunc(dispatch, id);
export const addProduct = dispatch => product => addProductFunc(dispatch, product);
export const updateProduct = dispatch => product => updateProductFunc(dispatch, product);
export const deleteProduct = dispatch => id => deleteProductFunc(dispatch, id);
