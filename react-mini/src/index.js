// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './utils/react';
import ReactDOM from './utils/react-dom';
import './index.css';

const jsx = (
  <div className="border">
    app
    <p>react</p>
    <p>源码学习</p>
  </div>
);

// element, container
// vnode -> node, 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById('root'));

// ! 节点类型：
// 文本节点
// html标签节点
// class component
// function component

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
