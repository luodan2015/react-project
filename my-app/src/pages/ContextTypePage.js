import React, { Component } from 'react';
import { ThemeContext } from '../context/ThemeContext'

export default class ContextTypePage extends Component {
  static contextType = ThemeContext;

  render() {
    console.log('ContextTypePage ==> ', this);
    return (
      <div className={this.context.themeColor}>ContextTypePage</div>
    );
  }
}