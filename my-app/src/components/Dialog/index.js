import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './index.css'

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div className="dialog">
        <h3>Dialog</h3>
        { this.props.children }
      </div>,
      this.node
    )
  }
}