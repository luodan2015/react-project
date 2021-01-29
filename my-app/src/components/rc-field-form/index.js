import React from 'react';
import useForm from './useForm';
import _Form from './Form';
import Field from './Field';

const Form = React.forwardRef(_Form);
Form.useForm = useForm;
Form.Field = Field;

export { useForm, Field };

export default Form;
