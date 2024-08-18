import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Users from '../pages/Users';

const PrimaryLayout = lazy(() => import('../layouts/PrimaryLayout'));

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const routes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <PrimaryLayout>
        <Dashboard />
      </PrimaryLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <PrimaryLayout>
        <Users />
      </PrimaryLayout>
    ),
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
