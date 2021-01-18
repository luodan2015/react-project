function render(vnode, container, callback) {
  console.log('vnode - ', vnode);
  // vnode -> node
  const node = createNode(vnode);
  // 把node更新到container
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if (typeof type === 'function') {
    node = updateFunctionComponent(vnode);
  } else if (type === 'TEXT') {
    node = document.createTextNode('');
  } else {
    node = document.createElement(type);
  }
  updateNode(node, props);
  // 遍历子节点
  reconcilerChildren(props.children, node);
  return node;
}

function reconcilerChildren(children, container) {
  // 遍历 创建元素
  children.forEach((child) => {
    render(child, container);
  });
}

// 更新节点上属性，如className,nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      node[key] = nextVal[key];
    });
}

// function组件，返回node
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

export default { render };
