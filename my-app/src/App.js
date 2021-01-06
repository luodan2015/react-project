import React from "react";
// import React, { useState } from "react";
// import { Button } from "antd";
// import MyFormPage from './pages/MyFormPage';
// import DialogPage from './pages/DialogPage';
// import ContextPage from './pages/ContextPage';
// import ContextTypePage from './pages/ContextTypePage';
// import ConsumerPage from './pages/ConsumerPage';
// import ReduxPage from './pages/ReduxPage';
// import ReactReduxPage from "./pages/ReactReduxPage";
import ReactRouterPage from "./pages/ReactRouterPage";
// import RouteChildren from "./pages/RouteChildren";

import "./App.css";

function App() {
  // const [num, setNum] = useState(0);
  return (
    <div className="App">
      {/* 表单组件 */}
      {/* <MyFormPage /> */}
      {/* 弹窗组件 */}
      {/* <DialogPage /> */}
      {/* context 上下文 */}
      {/* <ContextPage /> */}
      {/* <ContextTypePage />
      <ConsumerPage /> */}
      {/* Redux学习 */}
      {/* <ReduxPage /> */}
      {/* react-redux */}
      {/* <Button onClick={() => setNum(num + 1)}>change num { num }</Button> */}
      {/* <ReactReduxPage num={num} /> */}
      {/* react-router */}
      <ReactRouterPage />
      {/* route-children */}
      {/* <RouteChildren /> */}
    </div>
  );
}

export default App;
