import { Card, Skeleton, Alert } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';

import { ArticleBody } from '../components/ArticleBody';
import { ArticleInfo } from '../components/ArticleInfo';
import { NewArticle } from '../components/NewArticle';
import { RequireAuth } from '../hoc/RequireAuth';
import { getCurrentArticle } from '../redux/slices/articlesSlice';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articles);
  const { user } = useSelector((state) => state.user);
  const token = user?.token || null;
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentArticle({ slug, token }));
    }
  }, [dispatch, slug, token]);

  const errorMessage = error ? <Alert type="error" message={'Oops'} /> : null;
  const spinner = loading ? <Skeleton active /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {!(loading || error) && article && (
        <Card style={{ width: '66%' }}>
          <Routes>
            <Route
              index
              element={
                <>
                  <ArticleInfo single={true} />
                  <ArticleBody />
                </>
              }
            />
            <Route
              path="edit"
              element={
                <RequireAuth>
                  <h2 style={{ textAlign: 'center' }}>Edit article</h2>
                  <NewArticle currentArticle={article} />
                </RequireAuth>
              }
            />
          </Routes>
        </Card>
      )}
    </>
  );
};
export { ArticlePage };
