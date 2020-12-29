import React, { Component } from 'react';

export default function FormCreate(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    handleChange = e => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }

    getFieldDecorator = (field, option) => {
      this.options[field] = option;
      return InputCmp => {
        // 克隆一份
        return React.cloneElement(InputCmp, {
          name: field,
          value: this.state[field] || '',
          onChange: this.handleChange,
        })
      }
    };

    getFieldsValue = () => {
      return { ...this.state };
    }

    getFieldValue = (field) => {
      return this.state[field];
    }

    validateFields = callback => {
      const err = {};
      const values = { ...this.state };
      for(let field in this.options) {
        if (values[field] === undefined) {
          err[field] = 'error';
        }
      }
      if (callback) callback(JSON.stringify(err) === '{}' ? null : err, values);
    }

    render() {
      return <Cmp
        getFieldDecorator={this.getFieldDecorator}
        getFieldsValue={this.getFieldsValue}
        getFieldValue={this.getFieldValue}
        validateFields={this.validateFields}
      />
    }
  }
}