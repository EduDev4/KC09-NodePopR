import React from 'react';

import { Tag } from 'antd';

const tagsColors = {
  motor: 'gray',
  mobile: 'blue',
  lifestyle: 'green',
  work: 'red',
};

const Tags = ({ tags }) =>
  tags.map(tag => (
    <Tag key={tag} color={tagsColors[tag]}>
      {tag}
    </Tag>
  ));

export default Tags;
