import { List, Card, Skeleton, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { ArticleInfo } from '../ArticleInfo';
import { getArticles } from '../../redux/slices/articlesSlice';

const ArticlesList = () => {
  const dispatch = useDispatch();
  const { articles, totalCount, loading, error } = useSelector((state) => state.articles);
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const token = user?.token || null;

  useEffect(() => {
    const offset = (page - 1) * 5;

    dispatch(getArticles({ offset, token }));
  }, [dispatch, page, token]);

  const onChangePage = (page) => {
    setPage(page);
  };

  const errorMessage = error ? <Alert type="error" message={'Oops'} /> : null;
  const spinner = loading ? <Skeleton active /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {!(loading || error) && (
        <List
          split={false}
          style={{ paddingBottom: 16, width: '66%' }}
          dataSource={articles}
          renderItem={(article) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <ArticleInfo articleItem={article} />
              </Card>
            </List.Item>
          )}
          pagination={{
            style: { textAlign: 'center' },
            showSizeChanger: false,
            hideOnSinglePage: true,
            pageSize: 5,
            total: totalCount,
            current: page,
            onChange: onChangePage,
          }}
        />
      )}
    </>
  );
};

export default ArticlesList;
