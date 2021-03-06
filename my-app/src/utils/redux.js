
export function createStore(reducer, enhancer) {
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
    currentListeners.map(listener => listener());
  }

  // 订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
  }

  // 取值的时候，注意一定要保证不和项目中的会重复
  dispatch({ type: '@INIT/REDUX' });

  return {
    getState, // 获取store中的状态
    dispatch, // 派发
    subscribe, // 订阅
  };
};

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const middleApi = {
      dispatch,
      getState: store.getState,
    };

    // 给middleware参数，比如说dispatch
    const middlewaresChain = middlewares.map(middleware => middleware(middleApi))
    
    dispatch = compose(...middlewaresChain)(dispatch);
    return {
      ...store,
      // 覆盖上面store里的dispatch
      dispatch,
    };
  }
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  const res = {}
  for (let key in creators) {
    res[key] = bindActionCreator(creators[key], dispatch)
  }
  return res;
}
