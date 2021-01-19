// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './utils/react';
import ReactDOM from './utils/react-dom';
// import Component from './utils/Component';
import './index.css';

// function FuncComp({ name }) {
//   return (
//     <p>
//       hello, {name}
//       <button onClick={() => console.log('click')}>click</button>
//     </p>
//   );
// }

// class ClassComp extends Component {
//   static defaultProps = {
//     color: 'pink',
//   };
//   render() {
//     const { name, color } = this.props;
//     return (
//       <>
//         <p>hello, {name}</p>
//         <p className={color}>defaultProps</p>
//       </>
//     );
//   }
// }

const jsx = (
  <div className="border">
    <h5>文本节点</h5>
    app
    <h5>html标签节点</h5>
    <p>react</p>
    <p>源码学习</p>
    {/* <h5>function component</h5>
    <FuncComp name="function" />
    <h5>class component</h5>
    <ClassComp name="class" color="red" />
    <h5>fragment</h5>
    <React.Fragment>
      <p>文本一</p>
      <p>文本二</p>
    </React.Fragment>
    <h5>数组</h5>
    {[1, 2, 3].map((item) => (
      <div key={item}>{item}</div>
    ))} */}
  </div>
);

// element, container
// vnode -> node, 把node渲染更新到container
ReactDOM.render(jsx, document.getElementById('root'));

// ! 节点类型：
// 文本节点
// html标签节点 HostComponent
// function component
// class component
// fragment
// 数组
// 其他如portal等节点

// * jsx => createElement(生成element，就是我们需要的虚拟dom) => render(vnode -> node，再把node渲染到container)
// * vnode -> node的流程注意下节点的区分，不同节点处理方式不同
