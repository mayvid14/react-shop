import * as ACTION_TYPES from './actionTypes';

export const userLogin = user => ({
  type: ACTION_TYPES.USER_LOGIN,
  payload: {
    user
  }
})

export const userLoginSuccess = user => ({
  type: ACTION_TYPES.USER_LOGIN_SUCCESS,
  payload: {
    user
  }
})

export const userLoginFailure = error => ({
  type: ACTION_TYPES.USER_LOGIN_FAILURE,
  payload: {
    error
  }
})

export const userLogout = () => ({
  type: ACTION_TYPES.USER_LOGOUT
})

export const userLogoutSuccess = () => ({
  type: ACTION_TYPES.USER_LOGOUT_SUCCESS
})

export const userLogoutFailure = error => ({
  type: ACTION_TYPES.USER_LOGOUT_FAILURE,
  payload: {
    error
  }
})