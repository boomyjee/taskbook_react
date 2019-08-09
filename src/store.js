import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'

export function initializeStore(initialState) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
