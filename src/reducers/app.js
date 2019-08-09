import {SHOW_PRELOADER, TRIGGER_SNACKBAR} from 'actionTypes';

const initialState = {
  showPreloader: false,
  showSnackBar: false,
  snackBarMessage: ''
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PRELOADER:
      return Object.assign({}, {...state, showPreloader: action.payload})
    case TRIGGER_SNACKBAR:
      return Object.assign({}, {...state, ...action.payload});
    default:
      return state;
  }
};

export default AppReducer;
