import { Card } from 'antd';

import { SignIn } from '../components/SignIn';

const SignInPage = () => {
  return (
    <Card style={{ width: 360 }}>
      <h2 style={{ textAlign: 'center' }}>Sign In</h2>
      <SignIn />
    </Card>
  );
};

export { SignInPage };
