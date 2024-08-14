import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import SiteLoader from './loaders/site.loader';
import routes from './routes';

export default function App() {
  return <Suspense fallback={<SiteLoader />}>{useRoutes(routes)}</Suspense>;
}
