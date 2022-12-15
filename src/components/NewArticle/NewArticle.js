import { Form, Button, Space } from 'antd';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postArticle, changeSuccess, updateArticle } from '../../redux/slices/articlesSlice';
import ControlledInput from '../ControlledInput';
import ControlledTextArea from '../ControlledTextArea';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Please enter title'),
  description: yup.string().required('Please enter description'),
  text: yup.string().required('Please enter text'),
});

const NewArticle = ({ currentArticle = null }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.articles);
  const { slug } = useParams();
  const token = user?.token;
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const { append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  let initialValues = {
    tagList: [''],
  };
  if (currentArticle) {
    initialValues = {
      title: currentArticle.title,
      description: currentArticle.description,
      text: currentArticle.body,
      tagList: currentArticle.tagList,
    };
  }

  const onSubmit = (data) => {
    const x = {
      body: { article: { title: data.title, description: data.description, body: data.text, tagList: data.tagList } },
      token,
      slug,
    };
    if (currentArticle) {
      dispatch(updateArticle(x));
    } else {
      dispatch(postArticle(x));
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      dispatch(changeSuccess());
      navigate('/');
    }
  }, [success, dispatch, navigate]);

  return (
    <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)} initialValues={initialValues}>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'title'}
          placeholder={'Title'}
          type={'text'}
          defaultValue={initialValues?.title}
        />
      </Form.Item>
      <Form.Item>
        <ControlledInput
          control={control}
          name={'description'}
          placeholder={'Short description'}
          type={'text'}
          defaultValue={initialValues?.description}
        />
      </Form.Item>
      <Form.Item>
        <ControlledTextArea control={control} name={'text'} placeholder={'Text'} defaultValue={initialValues?.text} />
      </Form.Item>
      <Form.List name={'tagList'}>
        {(fields, { add, remove: removeList }) => (
          <>
            Tags
            {fields.map((item, index) => (
              <Form.Item key={item.key}>
                <Space>
                  <ControlledInput
                    control={control}
                    rules={{}}
                    name={`tagList.${index}`}
                    placeholder={'Tag'}
                    type={'text'}
                    defaultValue={initialValues?.tagList[index]}
                  />
                  {fields.length > 1 ? (
                    <Button
                      onClick={() => {
                        removeList(item.name);
                        remove(index);
                      }}
                      danger
                    >
                      Delete
                    </Button>
                  ) : null}
                  {index === fields.length - 1 ? (
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        add();
                        append();
                      }}
                    >
                      Add
                    </Button>
                  ) : null}
                </Space>
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" disabled={!isValid} block>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewArticle;
