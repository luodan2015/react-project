import React, { Component } from 'react';

const ValueContext = React.createContext();

export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps
) => (WrapperComponent) => {
  return class extends Component {
    // 此时组件的所有生命周期都能获得this.context
    static contextType = ValueContext;
    constructor(props) {
      super(props);
      this.state = {
        props: {},
      };
    }

    componentDidMount() {
      const { subscribe } = this.context;
      this.update();
      // 订阅
      subscribe(() => {
        this.update();
      });
    }

    update = () => {
      const { getState, dispatch } = this.context;
      // getState 获取当前store的state
      const stateProps = mapStateToProps(getState(), this.props);
      let dispatchProps = { dispatch };

      // mapDispatchToProps Object / Function
      if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch, this.props);
      }
      if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }
      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps,
        },
      });
    };

    render() {
      const { props } = this.state;
      return <WrapperComponent {...props} {...this.props} />;
    }
  };
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
  return (...args) => dispatch(creator(...args))
}

function bindActionCreators(creators, dispatch) {
  const res = {}
  for (let key in creators) {
    res[key] = bindActionCreator(creators[key], dispatch)
  }
  return res;
}
