import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import OutletContainer from '../pages/OutletContainer';

const PrivateRoute: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <OutletContainer />;
};

export default PrivateRoute;
