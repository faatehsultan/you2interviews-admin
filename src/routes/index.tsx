import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const PrimaryLayout = lazy(() => import('../layouts/PrimaryLayout'));

const Login = lazy(() => import('../pages/Login'));
const Users = lazy(() => import('../pages/Users'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <PrimaryLayout isAuthRoute>
        <Login />
      </PrimaryLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <PrimaryLayout auth>
        <Users />
      </PrimaryLayout>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/users" replace />,
  },
  {
    path: '*',
    element: (
      <PrimaryLayout>
        <div>YET TO MAKE</div>
      </PrimaryLayout>
    ),
  },
];

export default routes;
