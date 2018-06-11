import * as React from 'react';

import { imageHost } from '../constants';

import './index.css';

interface Props {
  url: string;
}

export const ColumnImage: React.SFC<Props> = ({ url }) => (
  <img src={ `${imageHost}${url}` } className="column-image" />
);
