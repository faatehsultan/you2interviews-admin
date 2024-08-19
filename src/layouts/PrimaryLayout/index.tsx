import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/molecules/Drawer';
import Sidebar from '../../components/molecules/Sidebar';
import { useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { Toast, useToast } from '@chakra-ui/react';

type PrimaryLayoutProps = {
  children: React.ReactNode;
  auth?: boolean;
  isAuthRoute?: boolean;
};

export default function PrimaryLayout({
  children,
  auth = false,
  isAuthRoute = false,
}: PrimaryLayoutProps) {
  const { data: userData } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (auth && isAuthRoute) {
      toast({
        title: 'Invalid Route Definition',
        description: 'isAuthRoute and auth cannot be true at the same time',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      if (auth && !userData) {
        navigate('/login', { replace: true });
      } else if (isAuthRoute && userData) {
        navigate('/', { replace: true });
      }
    }
  }, [auth, userData]);

  return (
    !(auth && isAuthRoute) &&
    (isAuthRoute ? (
      <>{children}</>
    ) : (
      userData && (
        <>
          <div className="fixed md:block hidden z-20">
            <Sidebar />
          </div>
          <main className="md:pl-64 w-screen p-2">{children}</main>
          <Drawer />
        </>
      )
    ))
  );
}
