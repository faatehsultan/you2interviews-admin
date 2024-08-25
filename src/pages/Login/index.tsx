import { CardBody, Card, Image, CardHeader } from '@chakra-ui/react';
import Form from '../../components/molecules/Form';
import { img_logo } from '../../assets';
import { useUserAuth } from '../../api';

const Login = () => {
  const userAuth = useUserAuth();

  const handleSubmit = async (values: any) => {
    userAuth.login(values.email, values.password);
  };

  return (
    <div className="flex flex-col justify-normal items-center h-screen w-screen mt-24">
      <Image src={img_logo} alt="logo" width={150} />

      <Card className="w-1/3 p-4 mt-5 shadow">
        <CardHeader className="text-2xl font-bold text-center">
          Admin Portal
        </CardHeader>
        <CardBody>
          <Form
            name="login"
            submitConfig={{
              onSubmit: handleSubmit,
              successMsg: 'Login successful',
              buttonLabel: 'Login',
              showSuccessMsg: false,
            }}
          />

          <div className="flex justify-center mt-5 text-xs text-gray-600">
            <p>Any issue? Contact developer support</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
