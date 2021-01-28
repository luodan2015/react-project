import React, { Component } from 'react';
import { Button } from 'antd';
// import { connect } from 'react-redux';
import { connect } from '../utils/reactRedux';

export default connect(({ user }) => ({ isLogin: user.isLogin }), {
  logout: () => ({ type: 'LOGOUT' }),
})(
  class UserPage extends Component {
    render() {
      return (
        <div>
          <h3>UserPage</h3>
          <Button type="primary" onClick={this.props.logout}>
            logout
          </Button>
        </div>
      );
    }
  }
);
