import React, { Component } from 'react';
import { Button, Input } from 'antd';
import FormCreate from '../../components/FormCreate';

// @FormCreate
class MyFormPage extends Component {

  submit = () => {
    const { getFieldsValue, validateFields } = this.props;
    console.log('submit', getFieldsValue());
    validateFields(function(err, values){
      if (err) {
        console.log('err', err);
      } else {
        console.log('values', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props;
    return (
    <div>
      <h3>MyFormPage</h3>
      {
        getFieldDecorator('name', { rules: [{ require: true }] })(<Input placeholder="请输入姓名" style={{ width: 200 }} />)
      }
      {
        getFieldDecorator('password', { rules: [{ require: true }] })(<Input placeholder="请输入密码" style={{ width: 200 }} />)
      }
      <Button type="primary" onClick={this.submit}>提交</Button>
    </div>
    );
  }
}

export default FormCreate(MyFormPage);