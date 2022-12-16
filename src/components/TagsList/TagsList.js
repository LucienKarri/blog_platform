import { Tag } from 'antd';

import classes from './TagsList.module.css';

const TagsList = ({ tags }) => {
  return (
    <ul className={classes.list}>
      {tags.map((tag, index) =>
        tag?.trim().length > 0 ? (
          <li key={index}>
            <Tag style={{ background: '#ffffff' }}>{tag.length > 30 ? tag.slice(0, 30) + '...' : tag}</Tag>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default TagsList;
