import React from 'react';
import FieldContext from './FieldContext';
import useForm from './useForm';

export default function Form({
  children,
  form,
  onFinish,
  onFinishFailed,
  ...restProps
}) {
  const [formInstance] = useForm(form);
  console.log('formInstance ', formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  return (
    <form
      {...restProps}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        // 提交
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
