import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes as ReactRouterDomRoutes,
} from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Category from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import FormProduct from '../pages/FormProduct';
import FormCategory from '../pages/FormCategory';
import Product from '../pages/Product';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

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
      <Route path="senha/esqueci" element={<ForgotPassword />} />
      <Route path="senha/reseta" element={<ResetPassword />} />
      <Route
        path="categorias"
        element={
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        }
      />
      <Route
        path="categorias/adicionar"
        element={
          <PrivateRoute>
            <FormCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="categorias/editar/:id"
        element={
          <PrivateRoute>
            <FormCategory />
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
      <Route
        path="produtos/editar/:id"
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
