import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

const ArticleBody = () => {
  const { body } = useSelector((state) => state.articles.article);

  return <ReactMarkdown>{body || null}</ReactMarkdown>;
};

export default ArticleBody;
