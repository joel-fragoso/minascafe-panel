import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes as ReactRouterDomRoutes,
} from 'react-router-dom';
import Category from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import FormProduct from '../pages/FormProduct';
import Product from '../pages/Product';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes: FC = () => {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<PublicRoute />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="categorias"
        element={
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        }
      />
      <Route
        path="produtos"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      />
      <Route
        path="produtos/adicionar"
        element={
          <PrivateRoute>
            <FormProduct />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRouterDomRoutes>
  );
};

export default Routes;
