import React, {
  Component,
  useContext,
  useMemo,
  useLayoutEffect,
  useReducer,
} from 'react';

const ValueContext = React.createContext();

// connect - 类的形式实现
// export const connect = (
//   mapStateToProps = (state) => state,
//   mapDispatchToProps
// ) => (WrapperComponent) => {
//   return class extends Component {
//     // 此时组件的所有生命周期都能获得this.context
//     static contextType = ValueContext;
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

// connect - hooks的方式实现
export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps
) => (WrapperComponent) => (props) => {
  const store = useContext(ValueContext);
  const { getState, dispatch, subscribe } = store;
  const state = getState();
  const stateProps = useMemo(() => mapStateToProps(state, props), [state]);
  // const stateProps = mapStateToProps(state, props);
  const dispatchProps = useMemo(
    // 这里只取了一种类型处理
    () => bindActionCreators(mapDispatchToProps, dispatch),
    [store]
  );
  // const dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);

  const [, forceUpdate] = useReducer(null);
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribe]);
  return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
};

export class Provider extends Component {
  render() {
    const { store } = this.props;
    return (
      <ValueContext.Provider value={store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
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
