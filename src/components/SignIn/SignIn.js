import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ErrorAlert } from '../ErrorAlert';
import { signIn } from '../../redux/slices/userSlice';
import { ControlledInput } from '../ControlledInput';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Is not in correct format'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Password length should be at least 6 characters')
    .max(40, 'Password cannot exceed more than 40 characters'),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(fromPage, { replace: true });
    }
  }, [user, fromPage, navigate]);

  const onSubmit = (data) => {
    dispatch(signIn({ user: { email: data.email.toLowerCase(), password: data.password } }));
    reset();
  };

  return (
    <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)}>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email address'}
          type={'text'}
          label={'Email address'}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
          label={'Password'}
        />
        {error ? <ErrorAlert error={error} /> : null}
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" disabled={!isValid} block>
          Log in
        </Button>
        Don`t have an account? <Link to="/sign-up">Sign Up.</Link>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
