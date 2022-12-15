import { Card } from 'antd';
import NewArticle from '../components/NewArticle';

const EditArticlePage = () => {
  return (
    <Card style={{ width: '66%' }}>
      <h2 style={{ textAlign: 'center' }}>Edit article</h2>
      <NewArticle />
    </Card>
  );
};

export { EditArticlePage };
