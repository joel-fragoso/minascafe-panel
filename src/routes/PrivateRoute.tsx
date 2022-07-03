import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface IPrivateRoute {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
