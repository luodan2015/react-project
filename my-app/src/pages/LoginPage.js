import React, { Component, useCallback } from 'react';
import { Button } from 'antd';
import { connect, useSelector, useDispatch } from 'react-redux';
// import { connect } from '../utils/reactRedux';
// import { Redirect } from 'react-router-dom';
import Redirect from '../utils/react-router-dom/Redirect';

// class
// export default connect(
//   ({ user }) => {
//     console.log('LoginPage - connect - mapStateToProps');
//     return { isLogin: user.isLogin };
//   },
//   {
//     login: () => ({ type: 'LOGIN' }),
//   }
// )(
//   class LoginPage extends Component {
//     render() {
//       const { isLogin, location, login } = this.props;
//       const { redirect = '/' } = location.state || {};
//       if (isLogin) {
//         return <Redirect to={{ pathname: redirect }} />;
//       }
//       return (
//         <div>
//           <h3>LoginPage</h3>
//           <Button type="primary" onClick={login}>
//             login
//           </Button>
//         </div>
//       );
//     }
//   }
// );

// hooks
export default function LoginPage(props) {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const login = useCallback(() => dispatch({ type: 'LOGIN' }), []);
  const { location } = props;
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
