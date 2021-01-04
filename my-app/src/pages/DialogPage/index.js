import React, { Component } from 'react';
import { Button } from 'antd';
import Dialag from '../../components/Dialog';

export default class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDialog: false,
    };
  }

  toggle = e => {
    const { isShowDialog } = this.state;
    this.setState({
      isShowDialog: !isShowDialog,
    });
  }

  render() {
    const { isShowDialog } = this.state;
    return (
      <div>
        <h3>DialogPage</h3>
        <Button type="primary" onClick={this.toggle}>toggle</Button>
        {
          isShowDialog && <Dialag>这是一段文本</Dialag>
        }
      </div>
    );
  }
}