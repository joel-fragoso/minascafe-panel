import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes as ReactRouterDomRoutes,
} from 'react-router-dom';
import Category from '../pages/Category';
import Home from '../pages/Home';
import Product from '../pages/Product';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes: FC = () => {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<PublicRoute />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<Navigate to="dashboard" />} />

        <Route path="dashboard" element={<PrivateRoute outlet={<Home />} />} />
        <Route
          path="categorias"
          element={<PrivateRoute outlet={<Category />} />}
        />
        <Route
          path="produtos"
          element={<PrivateRoute outlet={<Product />} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRouterDomRoutes>
  );
};

export default Routes;
