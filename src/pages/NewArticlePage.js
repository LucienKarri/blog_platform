import { Card } from 'antd';

import { NewArticle } from '../components/NewArticle';

const NewArticlePage = () => {
  return (
    <Card style={{ width: '66%' }}>
      <h2 style={{ textAlign: 'center' }}>Create new article</h2>
      <NewArticle />
    </Card>
  );
};

export { NewArticlePage };
