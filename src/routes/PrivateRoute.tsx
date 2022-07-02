import { FC } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/auth';
import Dashboard from '../pages/Dashboard';

interface IPrivateRouteProps {
  outlet?: JSX.Element;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  outlet = <Dashboard />,
}: IPrivateRouteProps) => {
  // const { user } = useAuth();

  const user = localStorage.getItem('@MinasCafe:user');

  if (!user) {
    return <Navigate to="/" />;
  }

  return outlet;
};

export default PrivateRoute;
