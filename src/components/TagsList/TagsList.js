import { Tag } from 'antd';

const TagsList = ({ tags }) => {
  return tags.map((tag, index) =>
    tag?.trim().length > 0 ? (
      <Tag key={index} style={{ background: '#ffffff' }}>
        {tag.length > 10 ? 'pidor detect' : tag}
      </Tag>
    ) : null
  );
};

export default TagsList;
