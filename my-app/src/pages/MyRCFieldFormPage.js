import React, { PureComponent, memo } from 'react';
import Form, { Field } from '../components/rc-field-form';

const nameRules = { required: true, message: '请输入用户名' };
const passwordRules = { required: true, message: '请输入密码' };

// class MyRCFieldFormPage extends PureComponent {
//   state = {};
//   render() {
//     return <h3>MyRCFieldFormPage</h3>;
//   }
// }

const MyRCFieldFormPage = memo(() => {
  // Form.useForm 自定义hook function组件中使用，class组件中就不能这么使用了
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('onFinish ', values);
  };

  const onFinishFailed = (err) => {
    console.log('onFinishFailed ', err);
  };

  return (
    <>
      <div>MyRCFieldFormPage - function</div>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <input placeholder="请输入用户名" />
        </Field>
        <br />
        <Field name="password" rules={[passwordRules]}>
          <input placeholder="请输入密码" />
        </Field>
        <br />
        <button type="submit">提交</button>
      </Form>
    </>
  );
});

export default MyRCFieldFormPage;
