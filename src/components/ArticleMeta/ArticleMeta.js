import { Avatar, Button, Modal } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeSuccess, deleteArticle } from '../../redux/slices/articlesSlice';
import classes from './ArticleMeta.module.css';

const { confirm } = Modal;

const ArticleMeta = ({ username, avatar, date, author, slug, single }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.articles);
  let menu = null;

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      dispatch(changeSuccess());
      navigate('/');
    }
  }, [dispatch, success, navigate]);

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these article?',
      content: 'Some descriptions',
      onOk() {
        dispatch(deleteArticle({ slug, token: user.token }));
      },
      onCancel() {},
    });
  };

  if (user && user.username === author && single) {
    menu = (
      <div className={classes.wrapper}>
        <Button danger onClick={showConfirm}>
          Delete
        </Button>
        <Link to="edit">
          <Button>Edit</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.info}>
      <div className={classes.wrapper}>
        <div className={classes.info}>
          <span>{username}</span>
          <span>{format(new Date(date), 'MMMM d, y')}</span>
        </div>
        <Avatar src={avatar} size={46} />
      </div>
      {menu}
    </div>
  );
};

export default ArticleMeta;
