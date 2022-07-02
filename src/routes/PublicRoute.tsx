import { FC } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/auth';
import SignIn from '../pages/SignIn';

const PublicRoute: FC = () => {
  // const { user } = useAuth();

  const user = localStorage.getItem('@MinasCafe:user');

  if (!user) {
    return <SignIn />;
  }

  return <Navigate to="/dashboard" />;
};

export default PublicRoute;
