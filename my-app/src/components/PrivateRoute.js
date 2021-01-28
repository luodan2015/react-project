import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../utils/reactRedux';
// import { Route, Redirect } from 'react-router-dom';
import Route from '../utils/react-router-dom/Route';
import Redirect from '../utils/react-router-dom/Redirect';

export default connect(({ user }) => ({ isLogin: user.isLogin }))(
  class PrivateRoute extends Component {
    render() {
      const { isLogin, path, component } = this.props;
      if (isLogin) {
        return <Route path={path} component={component} />;
      }
      return (
        <Redirect to={{ pathname: '/login', state: { redirect: path } }} />
      );
    }
  }
);
