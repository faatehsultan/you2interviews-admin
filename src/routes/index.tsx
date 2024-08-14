import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

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
  { path: '*', element: <div>YET TO MAKE</div> },
];

export default routes;
