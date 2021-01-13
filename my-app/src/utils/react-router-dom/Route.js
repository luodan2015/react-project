import React, { Component } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export default class Route extends Component {
  render() {
    const { path, children, component, render } = this.props;

    return (
      <RouterContext.Consumer>
        {(context) => {
          // const match = context.location.pathname === path;
          // return match ? React.createElement(component, this.props) : null;
          const location = this.props.location || context.location;
          const match = matchPath(location.pathname, this.props);
          // children, component, render 能接收到 history location match
          // 所以需要定义在props，传下去
          const props = {
            ...context,
            location,
            match,
          };
          // match 渲染children, component, render 或者 null
          // match的时候，如果children存在：function或者children本身
          // 不match 渲染children 或者 null
          // children是和匹配无关
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
