import {SHOW_PRELOADER, TRIGGER_SNACKBAR} from 'actionTypes';


export const handlePreloader = (bool) => ({ type: SHOW_PRELOADER, payload: bool });

export const triggerSnackBar = (bool, message) => {
  return {
    type: TRIGGER_SNACKBAR,
    payload: { showSnackBar: bool, snackBarMessage: message },
  };
};
