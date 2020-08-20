import * as USER_ACTIONS from '../actions/user/actionTypes';

const initialState = {
  user: null,
  loadingText: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.USER_LOGIN: {
      const loadingText = 'Logging in';
      return { ...state, loadingText };
    }
    case USER_ACTIONS.USER_LOGIN_SUCCESS: {
      const { user } = action.payload;
      return { ...state, user, loadingText: '' };
    }
    case USER_ACTIONS.USER_LOGIN_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    case USER_ACTIONS.USER_LOGOUT: {
      const loadingText = 'Logging out';
      return { ...state, loadingText };
    }
    case USER_ACTIONS.USER_LOGOUT_SUCCESS: {
      return { ...state, user: null, loadingText: '' };
    }
    case USER_ACTIONS.USER_LOGOUT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loadingText: '' };
    }
    default:
      return state;
  }
}