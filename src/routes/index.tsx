import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes as ReactRouterDomRoutes,
} from 'react-router-dom';
import Category from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes: FC = () => {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<PublicRoute />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categorias" element={<Category />} />
        <Route path="produtos" element={<Product />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRouterDomRoutes>
  );
};

export default Routes;
