import React, { useRef } from 'react';

class FormStore {
  constructor() {
    this.store = {};
    this.formEntities = [];
    this.callbacks = {};
  }

  setCallbacks = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback,
    };
  };

  registerField = (entity) => {
    this.formEntities.push(entity);
    return () => {
      this.formEntities = this.formEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    // 让Field进行更新
    this.formEntities.forEach((entity) => {
      entity.onStoreChange();
    });
  };

  validate = () => {
    // 这里简化了，用一个数组存储，实际的是一个promise
    const err = [];
    this.formEntities.forEach((entity) => {
      const { name, rules } = entity.props;
      const value = this.getFieldValue(name);
      const rule = rules && rules[0];
      if (rule && rule.required && [undefined, ''].includes(value)) {
        err.push({
          value,
          [name]: rule.message,
        });
      }
    });
    return err;
  };

  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    // 校验
    const err = this.validate();
    if (err.length) {
      onFinishFailed(err);
    } else {
      onFinish(this.getFieldsValue());
    }

    console.log('submit ', this.store);
  };

  getForm = () => {
    return {
      setCallbacks: this.setCallbacks,
      submit: this.submit,
      registerField: this.registerField,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
    };
  };
}

// 自定义hook
export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // 创建一个
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
