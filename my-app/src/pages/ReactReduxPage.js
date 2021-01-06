import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../utils/reactRedux';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from '../utils/redux';
import { Button } from 'antd';

// connect帮组组件获得store, hoc, 返回了一个新的组件
export default connect(
  // mapStateToProps Function (state, [ownProps]) 把state映射到了props上
  // state => ({ count: state }),
  // ownProps 是组件本身的props
  // ! ownProps谨慎使用，如果ownProps发生变化的话，mapStateToProps会被重新执行，
  // ! state也会被重新计算，这个时候影响性能
  (state, ownProps) => {
    console.log('mapStateToProps ownProps: ', ownProps);
    return {
      count: state,
    };
  },
  // mapDispatchToProps Object / Function
  // 不定义，默认props会被注入dispatch本身
  // Object: dispatch本身不会被注入props
  // {
  //   add: () => ({ type: 'ADD' })
  // }
  // Function (dispatch, [ownProps])
  // ! ownProps谨慎使用，如果ownProps发生变化的话，mapDispatchToProps会被重新执行，
  // ! 这个时候影响性能
  (dispatch, ownProps) => {
    console.log('mapDispatchToProps ownProps: ', ownProps);
    let res = {
      add: () => ({ type: 'ADD' }),
      minus: () => ({ type: 'MINUS' }),
    };
    res = bindActionCreators(res, dispatch);
    return {
      dispatch,
      ...res,
    };
  },
  // mergeProps
  (stateProps, dispatchProps, ownProps) => ({
    test: 'test',
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  })
)(
  class ReactReduxPage extends Component {
    render() {
      console.log('props ', this.props);
      const { count, dispatch, add, minus } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{count}</p>
          <div>
            <Button type="primary" onClick={() => dispatch({ type: 'ADD' })}>
              add - use dispatch
            </Button>
            <Button type="default" onClick={() => dispatch({ type: 'MINUS' })}>
              minus - use dispatch
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={add}>
              add
            </Button>
            <Button type="default" onClick={minus}>
              minus
            </Button>
          </div>
        </div>
      );
    }
  }
);
