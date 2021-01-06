import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class PrivateRoute extends Component {
  render() {
    const { isLogin, path, component } = this.props;
    if (isLogin) {
      return <Route path={path} component={component} />;
    }
    return <Redirect to={{ pathname: '/login', state: { redirect: path }}} />
  }
}
