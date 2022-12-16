import { Card } from 'antd';

import { SignUp } from '../components/SignUp';

const SignUpPage = () => {
  return (
    <Card style={{ width: 360 }}>
      <h2 style={{ textAlign: 'center' }}>Create new account</h2>
      <SignUp />
    </Card>
  );
};

export { SignUpPage };
