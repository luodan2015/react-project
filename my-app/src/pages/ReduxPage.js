import React, { Component } from 'react';
import { Button } from 'antd';
import store from '../store/index';

export default class ReduxPage extends Component {
  componentDidMount() {
    // 订阅
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    // 取消订阅
    this.unsubscribe();
  }

  handleAdd = () => {
    // 派发操作
    store.dispatch({ type: 'ADD' });
  };

  handleMinus = () => {
    store.dispatch({ type: 'MINUS' });
  };

  handleAsyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'ADD' });
      }, 1000);
    });
  };

  handlePromiseMinus = () => {
    store.dispatch(Promise.resolve({ type: 'MINUS', payload: 100 }));
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <div>
          <Button type="primary" onClick={this.handleAdd}>
            add
          </Button>
          <Button type="default" onClick={this.handleMinus}>
            minus
          </Button>
        </div>
        <Button type="primary" onClick={this.handleAsyncAdd}>
          asyncAdd
        </Button>
        <Button type="primary" onClick={this.handlePromiseMinus}>
          promiseMinus
        </Button>
      </div>
    );
  }
}
