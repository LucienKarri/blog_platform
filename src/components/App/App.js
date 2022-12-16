import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ArticlesPage } from '../../pages/ArticlesPage';
import { ArticlePage } from '../../pages/ArticlePage';
import { EditProfilePage } from '../../pages/EditProfilePage';
import { NewArticlePage } from '../../pages/NewArticlePage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { AppLayout } from '../AppLayout';
import { RequireAuth } from '../../hoc/RequireAuth';
import { getUser } from '../../redux/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUser(localStorage.getItem('token')));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ArticlesPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:slug/*" element={<ArticlePage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <NewArticlePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<h2>NotFoundPage</h2>} />
      </Route>
    </Routes>
  );
};

export default App;
