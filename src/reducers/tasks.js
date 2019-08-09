import {SET_TASK_EDIT_ID, FETCH_TASKS_SUCCESS, SET_CURRENT_PAGE, SET_CURRENT_SORTING} from 'actionTypes';


const initialState = {
  taskEditId: null,
  activeSort: null,
  sortBy: '',
  total_task_count: 1,
  page: 1,
  tasksList: []
};

const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_EDIT_ID:
      return Object.assign({}, {...state, taskEditId: action.payload});
    case SET_CURRENT_PAGE:
      return Object.assign({}, {...state, page: action.payload});
    case SET_CURRENT_SORTING:
      return Object.assign({}, {...state, activeSort: action.payload.activeSort, sortBy: action.payload.sortBy});
    case FETCH_TASKS_SUCCESS:
      return Object.assign({}, {...state, tasksList: action.payload.tasks, total_task_count: action.payload.total_task_count});
    default:
      return state;
  }
};

export default TasksReducer;
