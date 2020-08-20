import * as apiMethods from '../../helpers/userAuthStub';
import * as USER_ACTION_TYPES from '../actions/user/actionTypes';

const userLoginFunc = (dispatch, user) => {
  dispatch({ type: USER_ACTION_TYPES.USER_LOGIN });

  const success = apiMethods.login(user);
  if (success) {
    dispatch({ type: USER_ACTION_TYPES.USER_LOGIN_SUCCESS, payload: { user } });
  } else {
    dispatch({ type: USER_ACTION_TYPES.USER_LOGIN_FAILURE, payload: { error: 'Invalid credentials' } });
  }
}

const userLogoutFunc = (dispatch) => {
  dispatch({ type: USER_ACTION_TYPES.USER_LOGOUT });

  const success = apiMethods.logout();
  if (success) {
    dispatch({ type: USER_ACTION_TYPES.USER_LOGOUT_SUCCESS });
  } else {
    dispatch({ type: USER_ACTION_TYPES.USER_LOGOUT_FAILURE, payload: { error: 'Failed to logout' } });
  }
}

export const userLogin = dispatch => user => userLoginFunc(dispatch, user);
export const userLogout = dispatch => () => userLogoutFunc(dispatch);
