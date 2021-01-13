import React, { Component } from 'react';
import RouterContext from './RouterContext';

export default class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { history } = context;
          const { to } = this.props;
          // history.push(to);
          return <LifeCycle onMount={() => history.push(to)} />;
          // return null;
          
        }}
      </RouterContext.Consumer>
    );
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) onMount();
  }
  render() {
    return null;
  }
}
