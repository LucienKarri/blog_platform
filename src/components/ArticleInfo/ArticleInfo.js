import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArticleDescription } from '../ArticleDescription';
import { ArticleMeta } from '../ArticleMeta';

import classes from './ArticleInfo.module.css';

const ArticleInfo = ({ articleItem, single = false }) => {
  const { article } = useSelector((state) => state.articles);
  const [current, setCurrent] = useState(articleItem);

  useEffect(() => {
    if (articleItem) {
      setCurrent(articleItem);
    } else {
      setCurrent(article);
    }
  }, [article, articleItem]);

  return (
    current && (
      <div className={classes.wrapper}>
        <ArticleDescription
          title={current.title}
          tagList={current.tagList}
          desc={current.description}
          likes={current.favoritesCount}
          checked={current.favorited}
          slug={current.slug}
        />
        <ArticleMeta
          slug={current.slug}
          username={current.author.username}
          date={current.createdAt}
          avatar={current.author.image}
          author={current.author.username}
          single={single}
        />
      </div>
    )
  );
};

export default ArticleInfo;
