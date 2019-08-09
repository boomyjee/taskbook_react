import {SET_USER, LOGOUT} from 'actionTypes';

const initialState = {
  login: false,
  token: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, {...state, login: false});
    case SET_USER:
      return Object.assign({}, {...state, login: true, token: action.payload});
    default:
      return state;
  }
};

export default UserReducer;
