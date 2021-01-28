import React, { Component } from 'react';
import { Button } from 'antd';
// import { connect } from 'react-redux';
import { connect } from '../utils/reactRedux';
// import { Redirect } from 'react-router-dom';
import Redirect from '../utils/react-router-dom/Redirect';

export default connect(({ user }) => ({ isLogin: user.isLogin }), {
  login: () => ({ type: 'LOGIN' }),
})(
  class LoginPage extends Component {
    render() {
      const { isLogin, location, login } = this.props;
      const { redirect = '/' } = location.state || {};
      if (isLogin) {
        return <Redirect to={{ pathname: redirect }} />;
      }
      return (
        <div>
          <h3>LoginPage</h3>
          <Button type="primary" onClick={login}>
            login
          </Button>
        </div>
      );
    }
  }
);
