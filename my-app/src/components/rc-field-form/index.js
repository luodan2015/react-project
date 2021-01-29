import useForm from './useForm';
import _Form from './Form';
import Field from './Field';

const Form = _Form;
Form.useForm = useForm;
Form.Field = Field;

export { useForm, Field };

export default Form;
