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
          // * this.props.children 可以是数组形式或者对象，如果使用for循环只能兼容数组形式，如果是对象需要处理成数组；
          // * React.Children.forEach 兼容两种数据格式的处理
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
          // ! createElement的性能没有cloneElement好
          // createElement(type, props)
          // return match
          //   ? React.createElement(element.type, { ...element.props, location, computedMatch: match })
          //   : null;
          // cloneElement(element, otherProps)
          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
