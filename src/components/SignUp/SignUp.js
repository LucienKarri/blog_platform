import { Button, Divider, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ControlledCheckBox } from '../ControlledCheckBox';
import { ControlledInput } from '../ControlledInput';
import { signUp } from '../../redux/slices/userSlice';
import { ErrorAlert } from '../ErrorAlert';

const schema = yup.object({
  username: yup
    .string()
    .required('Please enter username')
    .min(3, 'Username length should be at least 3 characters')
    .max(20, 'Username cannot exceed more than 20 characters'),
  email: yup.string().required('Email is required').email('Is not in correct format'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Password length should be at least 6 characters')
    .max(40, 'Password cannot exceed more than 40 characters'),
  repeatPassword: yup
    .string()
    .required('Please repeat password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  processingCheck: yup.boolean().oneOf([true], 'You must agree to the processing of data'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(signUp({ user: { username: data.username, email: data.email.toLowerCase(), password: data.password } }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'username'}
          placeholder={'Username'}
          type={'text'}
          label={'Username'}
        />
        {error ? <ErrorAlert error={error} type={'username'} /> : null}
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email address'}
          type={'text'}
          label={'Email address'}
        />
        {error ? <ErrorAlert error={error} type={'email'} /> : null}
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
          label={'Password'}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'repeatPassword'}
          placeholder={'Password'}
          type={'password'}
          label={'Repeat Password'}
        />
      </Form.Item>
      <Divider />
      <Form.Item>
        <ControlledCheckBox
          control={control}
          name={'processingCheck'}
          text={'I agree to the processing of my personal information'}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" disabled={!isValid} block>
          Create
        </Button>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
