import * as PRODUCT_ACTIONS from '../actions/product/actionTypes';

const initialState = {
  productIds: null,
  productIdMaps: null,
  error: null,
  selectedProduct: null,
  loadingText: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.LOAD_PRODUCTS: {
      const loadingText = 'Loading products';
      return { ...state, loadingText };
    }
    case PRODUCT_ACTIONS.LOAD_PRODUCTS_SUCCESS: {
      const { products } = action.payload,
        productIds = [],
        productIdMaps = {};

      products.forEach(product => {
        productIds.push(product.id);
        productIdMaps[product.id] = product;
      });
      return { ...state, productIds, productIdMaps, loadingText: '' };
    }
    case PRODUCT_ACTIONS.LOAD_PRODUCTS_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    case PRODUCT_ACTIONS.LOAD_PRODUCT: {
      const loadingText = 'Loading product';
      return { ...state, loadingText };
    }
    case PRODUCT_ACTIONS.LOAD_PRODUCT_SUCCESS: {
      const { product } = action.payload;
      return { ...state, selectedProduct: product, loadingText: '' };
    }
    case PRODUCT_ACTIONS.LOAD_PRODUCT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    case PRODUCT_ACTIONS.ADD_PRODUCT: {
      const loadingText = 'Adding product';
      return { ...state, loadingText };
    }
    case PRODUCT_ACTIONS.ADD_PRODUCT_SUCCESS: {
      const { product } = action.payload,
        productIds = [...state.productIds, product.id],
        productIdMaps = { ...state.productIdMaps, [product.id]: product };
      return { ...state, productIds, productIdMaps, loadingText: '' };
    }
    case PRODUCT_ACTIONS.ADD_PRODUCT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    case PRODUCT_ACTIONS.UPDATE_PRODUCT: {
      const loadingText = 'Updating product';
      return { ...state, loadingText };
    }
    case PRODUCT_ACTIONS.UPDATE_PRODUCT_SUCCESS: {
      const { product } = action.payload,
        productIdMaps = { ...state.productIdMaps, [product.id]: product };
      return { ...state, productIdMaps, loadingText: '' };
    }
    case PRODUCT_ACTIONS.UPDATE_PRODUCT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    case PRODUCT_ACTIONS.DELETE_PRODUCT: {
      const loadingText = 'Deleting product';
      return { ...state, loadingText };
    }
    case PRODUCT_ACTIONS.DELETE_PRODUCT_SUCCESS: {
      const { id } = action.payload,
        productIds = state.productIds.filter(product => product.id !== id),
        productIdMaps = { ...state.productIdMaps };

      delete productIdMaps[id];
      return { ...state, productIds, productIdMaps, loadingText: '' };
    }
    case PRODUCT_ACTIONS.DELETE_PRODUCT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    default:
      return state;
  }
}