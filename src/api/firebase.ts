import { BASE_API_URL, firebaseConfig } from './config';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../redux/hooks';
import { clearUser, setUser } from '../redux/slices/user.slice';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const useUserAuth = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const login = async (email: string, password: string) => {
    try {
      const { user: userRecord } = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const checkAdminRes = await axios.get(
        `${BASE_API_URL}/api/users/admin/verify/?email=${email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': true,
          },
        },
      );

      if (userRecord?.uid && checkAdminRes.data === true) {
        dispatch(setUser(userRecord));
        return userRecord;
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description: error.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearUser());
    }
  };

  return {
    login,
    logout,
  };
};
