// We recommend using configureStore from the @reduxjs/toolkit package, which replaces createStore
import { legacy_createStore as createStore } from 'redux';
// import { createStore } from '../utils/redux';

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

const store = createStore(countReducer);

export default store;
