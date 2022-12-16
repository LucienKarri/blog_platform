import { Card } from 'antd';

import { EditProfile } from '../components/EditProfile';

const EditProfilePage = () => {
  return (
    <Card style={{ width: 360 }}>
      <h2 style={{ textAlign: 'center' }}>Edit Profile</h2>
      <EditProfile />
    </Card>
  );
};

export { EditProfilePage };
