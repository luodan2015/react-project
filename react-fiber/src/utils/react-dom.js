import { PLACEMENT } from './constant';

// 下一个子任务
let nextUnitOfWork = null;
// work in progress 工作中的 fiber root
let wipRoot = null;
// 现在的根节点
let currentRoot = null;

function render(vnode, container, callback) {
  wipRoot = {
    node: container,
    props: { children: [vnode] },
    base: currentRoot,
  };
  nextUnitOfWork = wipRoot;
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if (type === 'TEXT') {
    node = document.createTextNode('');
  } else if (type) {
    node = document.createElement(type);
  }
  updateNode(node, props);
  return node;
}

function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  // 数组
  // 更新 删除 新增
  let prevSibling = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  children.forEach((child, index) => {
    let newFiber = null;
    // todo 比较type key
    newFiber = {
      type: child.type, // 类型 区分不同的fiber，比如说function class host等
      props: child.props, // 属相参数等
      node: null, // 真实的dom节点
      base: null, // 存储fiber，便于去比较
      // parent
      parent: workInProgressFiber,
      effectTag: PLACEMENT,
    };
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      // child
      workInProgressFiber.child = newFiber;
    } else {
      // sibling
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  });
}

// 更新节点上属性，如className,nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      // 事件判定，简单处理，以on开头的就认为是一个事件，源码处理复杂一些
      if (key.slice(0, 2) === 'on') {
        const eventName = key.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[key]);
      } else {
        node[key] = nextVal[key];
      }
    });
}

// function组件，返回node
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const cmp = new type(props); // 实例化
  const vvnode = cmp.render();
  const node = createNode(vvnode);
  return node;
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const { children } = fiber.props;
  reconcilerChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  // 执行当前子任务
  updateHostComponent(fiber);
  // 返回下一个子任务
  // 找到下个任务的原则：先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子元素，寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  // return
}

function workLoop(deadline) {
  // 执行子任务
  // 返回下一个子任务
  // ...
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 有下个子任务，并且当前帧还没有结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 没有子任务了
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    // commit
    commitRoot();
  }
  // 提交
  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找
  let parentNodeFiber = fiber.parent;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent;
  }
  const parentNode = parentNodeFiber.node;
  // 更新 删除 新增
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

requestIdleCallback(workLoop);

export default { render };
