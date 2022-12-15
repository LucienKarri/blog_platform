import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
