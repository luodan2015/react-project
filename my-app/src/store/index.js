// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createStore, applyMiddleware } from '../utils/redux';

function thunk({ dispatch, getState }) {
  return dispatch => action => {
    console.log('thunk');
    if (typeof action === 'function') {
      return action(dispatch, getState);
    } 
    return dispatch(action);
  }
}

function logger({ dispatch, getState }) {
  return dispatch => action => {
    console.log(`${action.type} 执行了`);
    return dispatch(action);
  }
}

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;
