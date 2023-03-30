export function createStore(reducer, enhancer) {
  // enhancer用于加强store.dispatch
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  const currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 监听函数是一个数组，就循环执行
    currentListeners.map((listener) => listener());
    return action;
  }

  // 订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // 取值的时候，注意一定要保证不和项目中的会重复
  dispatch({ type: '@INIT/REDUX' });

  return {
    getState, // 获取store中的状态
    dispatch, // 派发
    subscribe, // 订阅
  };
}

// 聚合函数
function compose(...funcs) {
  // 没传任何参数，则默认返回一个空的函数
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  // 只传一个那就直接返回这一个咯
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 将所有函数组合，返回一个函数
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

export function applyMiddleware(...middlewares) {
  return (createStore) =>
    (...args) => {
      const store = createStore(...args);
      let dispatch = store.dispatch;
      const middleApi = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };

      // 给middleware参数，比如说getState、dispatch
      const chain = middlewares.map((middleware) => middleware(middleApi));

      // 得到加强版的dispatch
      dispatch = compose(...chain)(dispatch);

      console.log('--- supper dispatch:', dispatch);

      return {
        ...store,
        // 覆盖上面store里的dispatch
        dispatch,
      };
    };
}

// TODO:
export function combineReducers() {}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
  const res = {};
  for (let key in creators) {
    res[key] = bindActionCreator(creators[key], dispatch);
  }
  return res;
}
