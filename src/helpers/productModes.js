export const ADD_PRODUCT_MODE = {
  title: 'Add Product',
  isEditable: true,
  hasData: false,
  buttons: ['reset', 'save'],
};

export const UPDATE_PRODUCT_MODE = {
  title: 'Edit Product',
  isEditable: true,
  hasData: true,
  buttons: ['reset', 'delete', 'save'],
};

export const VIEW_PRODUCT_MODE = {
  title: 'View Product',
  isEditable: false,
  hasData: true,
  buttons: ['delete', 'edit'],
};