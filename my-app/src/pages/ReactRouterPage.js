import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import UserPage from './UserPage';

export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>

        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/search/123">搜索</Link>
          {/* Route一定要包裹在Router之内，因为Route要使用history location，这些来自Router */}
          {/* path值如果不写，则一直匹配 */}
          {/* exact精准匹配 */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/user" component={UserPage} /> */}
            <PrivateRoute path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/search/:id" component={SearchComponent} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function DetailComponent(props) {
  console.log('DetailComponent ', props);
  return <div>DetailComponent</div>;
}

function SearchComponent(props) {
  console.log('SearchComponent ', props);
  const { id } = props.match.params;
  return (
    <div>
      <p>SearchComponent - {id}</p>
      <Link to={'/search/' + id + '/detail'}>详情</Link>
      <Route path="/search/:id/detail" component={DetailComponent} />
    </div>
  );
}
