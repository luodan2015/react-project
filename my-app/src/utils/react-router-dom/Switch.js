import React, { Component } from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          // 找出渲染的，第一个符合匹配的元素，存在element
          // const { location } = context;
          // 优先用props上的location
          const location = this.props.location || context.location;
          let element;
          let match = null;
          const { children } = this.props;
          React.Children.forEach(children, (child) => {
            debugger;
            if (match === null && React.isValidElement(child)) {
              element = child;
              const { path } = child.props;
              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : context.match;
            }
          });
          return match ? React.cloneElement(element, { location }) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
