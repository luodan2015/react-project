import React, { Component } from 'react';
import { Button } from 'antd';
import { ThemeProvider } from '../context/ThemeContext'
import ConsumerPage from './ConsumerPage';
import ContextTypePage from './ContextTypePage';

// 使用context的步骤
// 1. 创建createContext
// 2. Provider接收value，以保证有传下去的数据
// 3. 接收Consumer或者class.contextType

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: 'red'
      }
    };
  }

  changeColor = e => {
    const { themeColor } = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === 'red' ? 'green' : 'red'
      }
    });
  }

  render() {
    const { theme } = this.state;
    return (
      <div>
        <p>ContextPage</p>
        <Button type="primary" onClick={this.changeColor}>change color</Button>
        <ThemeProvider value={theme}>
          <ContextTypePage />
          <ConsumerPage />
        </ThemeProvider>
      </div>
    );
  }
}