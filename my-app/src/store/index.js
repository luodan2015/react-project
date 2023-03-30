// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise';
import isPromise from 'is-promise';

import { createStore, applyMiddleware } from '../utils/redux';

// wrapper function
function logger({ dispatch, getState }) {
  return (next) => (action) => {
    console.log('---- logger next:', next);
    console.log(`---- logger ${action.type} 执行了`);
    console.log('prevState: ', getState());
    const returnValue = next(action);
    console.log('nextState: ', getState());
    return returnValue;
  };
}

function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    console.log('---- thunk next:', next);
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

// 简版 TODO: 完整版(29-打卡点12)
function promise({ dispatch, getState }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
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

const store = createStore(countReducer, applyMiddleware(promise, thunk, logger));

export default store;
