import { CardBody, Card, Image } from '@chakra-ui/react';
import Form from '../../components/molecules/Form';
import { useNavigate } from 'react-router-dom';
import { img_logo } from '../../assets';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // TODO add login logic here
    // navigate('/home', { replace: true });
  };

  return (
    <div className="flex flex-col justify-normal items-center h-screen w-screen mt-24">
      <Image src={img_logo} alt="logo" width={150} />

      <Card className="w-1/3 p-5 mt-5">
        <CardBody>
          <Form
            name="login"
            submitConfig={{
              onSubmit: handleSubmit,
              successMsg: 'Login successful',
              buttonLabel: 'Login',
              showSuccessMsg: true,
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
