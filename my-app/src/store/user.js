import { createStore, combineReducers } from 'redux';

const initValue = {
  isLogin: false,
  user: {
    name: '',
  },
};

function userReducer(state = { ...initValue }, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLogin: true,
        user: {
          name: 'hello',
        },
      };
    case 'LOGOUT':
      return initValue;

    default:
      return state;
  }
}

const store = createStore(combineReducers({ user: userReducer }));

export default store;
