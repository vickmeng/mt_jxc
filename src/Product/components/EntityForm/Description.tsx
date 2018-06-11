import * as React from 'react';

import { Card } from 'antd';
import * as ReactQuill from 'react-quill';

import { UpdateDescriptionAction } from '../../actions/product';

interface Props {
  description: string;
  updateDescription: (content: string) => UpdateDescriptionAction;
}

export const ProductDescription: React.SFC<Props> = ({ description, updateDescription }) => {

  const handleChange = (content: string): void => {
    updateDescription(content);
  }

  return (
    <Card title="商品描述">
      <ReactQuill  value={ description } onChange={ handleChange } />
    </Card>
  );
};