import {
  SET_TASK_EDIT_ID,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  CREATE_TASKS_FAILURE,
  CREATE_TASKS_START,
  CREATE_TASKS_SUCCESS,
  SET_CURRENT_PAGE,
  EDIT_TASK_FAILURE,
  EDIT_TASK_START,
  EDIT_TASK_SUCCESS,
  SET_CURRENT_SORTING
} from 'actionTypes';
import {getTasks, createTask, editTask} from 'api';


export const setCurrentSorting = (activeSort, sortBy) => ({type: SET_CURRENT_SORTING, payload: {activeSort,sortBy }});

export const setTaskEditId = (taskId) => ({type: SET_TASK_EDIT_ID, payload: taskId});

export const getTasksAction = (sortField = '', sortDirection = '', page = 1) => {
  return async (dispatch) => {
    dispatch({type: FETCH_TASKS_START});
    try {
      const taskResponse = await getTasks(sortField, sortDirection, page)
      const json = await taskResponse.json();
      dispatch({type: SET_CURRENT_PAGE, payload: page});
      dispatch({type: FETCH_TASKS_SUCCESS, payload: json.message})
    } catch (error) {
      dispatch({type: FETCH_TASKS_FAILURE, payload: error});
    }
  }
};

export const addNewTask = (userName, email, description) => {
  return async (dispatch) => {
    dispatch({type: CREATE_TASKS_START});
    try {
      const taskResponse = await createTask({userName, email, description})
      const json = await taskResponse.json();
      dispatch({type: CREATE_TASKS_SUCCESS, payload: json.message})
    } catch (error) {
      dispatch({type: CREATE_TASKS_FAILURE, payload: error});
    }
  }
};

export const editTaskAction = (id, text, status) => {
  return async (dispatch) => {
    dispatch({type: EDIT_TASK_START});
    try {
      const token = localStorage.getItem('token');
      const taskResponse = await editTask(id, text, status, token);
      const json = await taskResponse.json();
      dispatch({type: EDIT_TASK_SUCCESS, payload: json.message})
    } catch (error) {
      dispatch({type: EDIT_TASK_FAILURE, payload: error});
    }
  }
};
