import { FC } from 'react';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';

const Routes: FC = () => {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </ReactRouterDomRoutes>
  );
};

export default Routes;
