import * as ACTION_TYPES from './actionTypes';

export const loadProducts = () => ({
  type: ACTION_TYPES.LOAD_PRODUCTS
})

export const loadProductsSuccess = products => ({
  type: ACTION_TYPES.LOAD_PRODUCTS_SUCCESS,
  payload: {
    products
  }
})

export const loadProductsFailure = error => ({
  type: ACTION_TYPES.LOAD_PRODUCTS_FAILURE,
  payload: {
    error
  }
})

export const loadProduct = productId => ({
  type: ACTION_TYPES.LOAD_PRODUCT,
  payload: {
    id: productId
  }
})

export const loadProductSuccess = product => ({
  type: ACTION_TYPES.LOAD_PRODUCT_SUCCESS,
  payload: {
    product
  }
})

export const loadProductFailure = error => ({
  type: ACTION_TYPES.LOAD_PRODUCT_FAILURE,
  payload: {
    error
  }
})

export const addProduct = product => ({
  type: ACTION_TYPES.ADD_PRODUCT,
  payload: {
    product
  }
})

export const addProductSuccess = product => ({
  type: ACTION_TYPES.ADD_PRODUCT_SUCCESS,
  payload: {
    product
  }
})

export const addProductFailure = error => ({
  type: ACTION_TYPES.ADD_PRODUCT_FAILURE,
  payload: {
    error
  }
})

export const updateProduct = product => ({
  type: ACTION_TYPES.UPDATE_PRODUCT,
  payload: {
    product
  }
})

export const updateProductSuccess = product => ({
  type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
  payload: {
    product
  }
})

export const updateProductFailure = error => ({
  type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
  payload: {
    error
  }
})

export const deleteProduct = productId => ({
  type: ACTION_TYPES.DELETE_PRODUCT,
  payload: {
    id: productId
  }
})

export const deleteProductSuccess = productId => ({
  type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
  payload: {
    id: productId
  }
})

export const deleteProductFailure = error => ({
  type: ACTION_TYPES.DELETE_PRODUCT_FAILURE,
  payload: {
    error
  }
})