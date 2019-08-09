import {SET_USER, LOGOUT} from 'actionTypes';
import {Login} from 'api';

export const setUser = userParams => {
  return { type: SET_USER, payload: userParams };
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT };
}

export const login = (username, password) => {
  return async dispatch => {
    const loginResponse = await Login(username, password);
    const json = await loginResponse.json();
    localStorage.setItem('token', json.message.token);
    dispatch(setUser(json.message.token));
  }
}
