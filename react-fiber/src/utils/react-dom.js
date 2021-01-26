import { PLACEMENT, UPDATE } from './constant';

// 下一个子任务
let nextUnitOfWork = null;
// work in progress 工作中的 fiber root
let wipRoot = null;
// 现在的根节点
let currentRoot = null;
// 当前正在工作的fiber
let wipFiber = null;
let hookIndex = null;

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
  updateNode(node, {}, props);
  return node;
}

// 构建fiber结构，遍历workInProgressFiber的子节点
function reconcilerChildren(workInProgressFiber, children) {
  // 构建fiber结构
  // 数组
  // 更新 删除 新增
  let prevSibling = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  children.forEach((child, index) => {
    let newFiber = null;
    // todo 比较type key
    const sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // 复用 update
      newFiber = {
        type: oldFiber.type, // 类型 区分不同的fiber，比如说function class host等
        props: child.props, // 属相参数等
        node: oldFiber.node, // 真实的dom节点
        base: oldFiber, // 存储fiber，便于去比较
        // parent
        parent: workInProgressFiber,
        effectTag: UPDATE,
      };
    }
    if (!sameType && child) {
      // 新增
      newFiber = {
        type: child.type, // 类型 区分不同的fiber，比如说function class host等
        props: child.props, // 属相参数等
        node: null, // 真实的dom节点
        base: null, // 存储fiber，便于去比较
        // parent
        parent: workInProgressFiber,
        effectTag: PLACEMENT,
      };
    }
    if (!sameType && oldFiber) {
      // todo 删除
    }

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
function updateNode(node, prevVal, nextVal) {
  // 上一次的属性和事件处理
  Object.keys(prevVal)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      // 事件判定，简单处理，以on开头的就认为是一个事件，源码处理复杂一些
      if (key.slice(0, 2) === 'on') {
        const eventName = key.slice(2).toLocaleLowerCase();
        node.removeEventListener(eventName, prevVal[key]);
      } else {
        // 上一次的属性出现过，下一次没有了，就需要置空
        if (!(key in nextVal)) {
          node[key] = '';
        }
      }
    });
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

// function组件，构建fiber
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  fiber.hooks = [];
  hookIndex = 0;
  const { type, props } = fiber;
  const children = [type(props)];
  reconcilerChildren(fiber, children);
}

// class组件，构建fiber
function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const cmp = new type(props); // 实例化
  const children = [cmp.render()];
  reconcilerChildren(fiber, children);
}

// 原生标签，构建fiber
function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const { children } = fiber.props;
  reconcilerChildren(fiber, children);
}

// Fragment，构建fiber
function updateFragmentComponent(fiber) {
  const { children } = fiber.props;
  reconcilerChildren(fiber, children);
}

// 执行当前任务，指定下一个任务
function performUnitOfWork(fiber) {
  // 执行当前子任务
  const { type } = fiber;
  if (typeof type === 'function') {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else if (type) {
    updateHostComponent(fiber);
  } else {
    updateFragmentComponent(fiber);
  }

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

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// 提交具体的fiber执行
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

  if (![null, undefined].includes(fiber.node)) {
    console.log('fiber - ', fiber);
    // 更新 删除 新增
    switch (fiber.effectTag) {
      case PLACEMENT:
        parentNode.appendChild(fiber.node);
        break;
      case UPDATE:
        updateNode(fiber.node, fiber.base.props, fiber.props);
    }
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

requestIdleCallback(workLoop);

// init是初始值
function useState(init) {
  // 新旧
  const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : init,
    queue: [],
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action;
  });

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot,
    };
    nextUnitOfWork = wipRoot;
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

export default { render, useState };
