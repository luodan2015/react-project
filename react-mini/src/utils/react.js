// ! vnode react虚拟dom节点
// ! node  html真实dom节点

// 接收type, props, children，返回一个vnode
function createElement(type, props, ...children) {
  delete props.__source;
  delete props.__self;
  return {
    type,
    props: {
      ...props,
      // ! 这里的处理与源码稍有不同，源码里，如果只有一个元素，childen是对象，多余一个元素的时候，是数组
      children: children.map((child) => {
        return typeof child === 'object' ? child : createTextNode(child);
      }),
    },
  };
}

function createTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export default { createElement };
