import React, {
  // Component,
  useContext,
  useMemo,
  useLayoutEffect,
  useReducer,
  useCallback,
} from 'react';

function useForceUpdate() {
  const [, setState] = useReducer((state) => state + 1, 0);
  const forceUpdate = useCallback(() => {
    console.log('.... update ....');
    setState();
  }, []);

  return forceUpdate;
}

// 1.创建context对象
const Context = React.createContext();

// 2.Provider传递value store 
/**
 * Provider函数组件实现
 */
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// 3.子孙组件消费store
/**
 * connect - hooks的方式实现
 */
export const connect =
  (mapStateToProps = (state) => state, mapDispatchToProps) =>
  (WrapperComponent) =>
  (props) => {
    const store = useContext(Context);
    const { getState, dispatch, subscribe } = store;
    const state = getState();
    const stateProps = useMemo(() => mapStateToProps(state, props), [state, props]);
    // const stateProps = mapStateToProps(state, props);
    const dispatchProps = useMemo(() => {
      if (typeof mapDispatchToProps === 'function') {
        return mapDispatchToProps(dispatch, props);
      } else if (typeof mapDispatchToProps === 'object') {
        return bindActionCreators(mapDispatchToProps, dispatch);
      }
      return { dispatch }; 
    }, [dispatch, props]);
    // const dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);

    // const [, forceUpdate] = useReducer((state) => state + 1, 0);
    const forceUpdate = useForceUpdate();

    /**
     * client端使用的是useLayoutEffect来订阅，useEffect有延迟，如果在延迟时间内有更新，此时还没有订阅上就会丢失更新
     * ssr服务端使用的是useEffect来订阅，因为ssr服务端没有useLayoutEffect
     */
    useLayoutEffect(() => {
      console.log('---- 订阅 ----');
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        if (unsubscribe) {
          console.log('---- 取消订阅 ----');
          unsubscribe();
        }
      };
    }, [subscribe, forceUpdate]);

    console.log('stateProps --- ', stateProps);
    console.log('dispatchProps --- ', stateProps);

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
  };

export function useSelector(selector) {
  const store = useContext(Context);
  const { getState, subscribe } = store;

  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    console.log('---- 订阅 ----');
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        console.log('---- 取消订阅 ----');
        unsubscribe();
      }
    };
  }, [subscribe, forceUpdate]);

  return selector(getState());
}

export function useDispatch() {
  console.log('---- useDispatch ----');
  const store = useContext(Context);
  return store.dispatch;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function bindActionCreators(creators, dispatch) {
  console.log('执行 - bindActionCreators');
  const res = {};
  for (let key in creators) {
    res[key] = bindActionCreator(creators[key], dispatch);
  }
  return res;
}

/**
 * Provider类组件实现
 */
// export class Provider extends Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <Context.Provider value={store}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

/**
 * connect - 类的形式实现
 */
// export const connect = (
//   mapStateToProps = (state) => state,
//   mapDispatchToProps
// ) => (WrapperComponent) => {
//   return class extends Component {
//     // 此时组件的所有生命周期都能获得this.context
//     static contextType = Context;
//     constructor(props, context) {
//       super(props);
//       // this.state = {
//       //   props: {},
//       // };
//       this.stateProps = {};
//       this.dispatchProps = {};
//       this.update(context);
//     }

//     componentDidMount() {
//       const { subscribe } = this.context;
//       // this.update();
//       // 订阅
//       this.unsubscribe = subscribe(() => {
//         this.update();
//         this.forceUpdate();
//       });
//     }

//     componentWillUnmount() {
//       if (this.unsubscribe) {
//         this.unsubscribe();
//       }
//     }

//     update = (context) => {
//       const { getState, dispatch } = context || this.context;
//       // getState 获取当前store的state
//       this.stateProps = mapStateToProps(getState(), this.props);
//       let dispatchProps = { dispatch };

//       // mapDispatchToProps Object / Function
//       if (typeof mapDispatchToProps === 'function') {
//         dispatchProps = mapDispatchToProps(dispatch, this.props);
//       }
//       if (typeof mapDispatchToProps === 'object') {
//         dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
//       }
//       this.dispatchProps = dispatchProps;
//       // this.setState({
//       //   props: {
//       //     ...stateProps,
//       //     ...dispatchProps,
//       //   },
//       // });
//     };

//     render() {
//       return <WrapperComponent {...this.props} {...this.stateProps} {...this.dispatchProps} />;
//     }
//   };
// };
