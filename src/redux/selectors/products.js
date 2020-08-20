export const productsState = state => state.products;
export const productsSelector = state => {
  const { productIdMaps } = productsState(state);
  if (productIdMaps) {
    const productArray = [];
    Object.keys(productIdMaps).forEach(key => {
      productArray.push(productIdMaps[key]);
    })
    return productArray;
  }
  return [];
};
export const productSelector = state => {
  const { selectedProduct } = productsState(state);
  return selectedProduct;
}
export const productErrorSelector = state => {
  const { error } = productsState(state);
  return error;
}