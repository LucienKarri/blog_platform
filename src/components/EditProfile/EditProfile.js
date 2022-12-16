import { Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { changeSucces, updateUser } from '../../redux/slices/userSlice';
import { ControlledInput } from '../ControlledInput/';

const schema = yup.object().shape(
  {
    username: yup
      .string()
      .required('Please enter username')
      .min(3, 'Username length should be at least 3 characters')
      .max(20, 'Username cannot exceed more than 20 characters'),
    email: yup.string().required('Email is required').email('Is not in correct format'),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (value) => value?.length,
        then: (rule) =>
          rule
            .min(6, 'Password length should be at least 6 characters')
            .max(40, 'Password cannot exceed more than 40 characters'),
      }),
    image: yup.string().url('Is not in correct format'),
  },
  [['password', 'password']]
);

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, success } = useSelector((state) => state.user);
  const { control, handleSubmit } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const initialValues = {
    username: user.username || '',
    email: user.email || '',
  };

  useEffect(() => {
    if (success) {
      dispatch(changeSucces());
      navigate('/');
    }
  }, [success, dispatch, navigate]);

  const onSubmit = (data) => {
    const newUser = {
      user: {
        username: data.username || user.username,
        email: data.email.toLowerCase() || user.email,
        password: data.password || user.password,
        image: data.image || user.image,
      },
    };
    dispatch(
      updateUser({
        token: user.token,
        body: newUser,
      })
    );
  };

  return (
    <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)} initialValues={initialValues}>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'username'}
          placeholder={'Username'}
          label={'Username'}
          type={'text'}
          defaultValue={initialValues.username}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'email'}
          placeholder={'Email address'}
          label={'Email address'}
          type={'text'}
          defaultValue={initialValues.email}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'password'}
          placeholder={'New password'}
          type={'password'}
          label={'New password'}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'image'}
          placeholder={'Avatar image'}
          type={'text'}
          label={'Avatar image (url)'}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" block>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
