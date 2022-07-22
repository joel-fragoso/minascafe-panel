import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import SignIn from '../pages/SignIn';

interface IPublicRouteProps {
  children?: JSX.Element;
}

const PublicRoute: FC<IPublicRouteProps> = ({
  children,
}: IPublicRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return children || <SignIn />;
  }

  return <Navigate to="/dashboard" />;
};

export default PublicRoute;
