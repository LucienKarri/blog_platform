import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { rateArticle, unRateArticle } from '../../redux/slices/articlesSlice';
import { TagsList } from '../TagsList';

import classes from './ArticleDescription.module.css';

const ArticleDescription = ({ title, tagList, desc, likes, checked, slug }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user?.token || null;

  const handleClick = () => {
    checked && token ? dispatch(unRateArticle({ slug, token })) : dispatch(rateArticle({ slug, token }));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Link to={`/articles/${slug}`}>
          <h2 className={classes.title}>{title}</h2>
        </Link>
        <div onClick={handleClick}>
          <Statistic
            value={likes}
            valueStyle={{ fontSize: 12 }}
            prefix={checked ? <HeartFilled /> : <HeartOutlined />}
          />
        </div>
      </div>
      <TagsList tags={tagList} />
      <span className={classes.description}>{desc}</span>
    </div>
  );
};

export default ArticleDescription;
