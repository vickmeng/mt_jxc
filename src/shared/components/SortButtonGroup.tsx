import * as React from 'react';

import { Icon } from 'antd';

import { SortActions } from '@app/shared/constants';
import './index.css';

interface Props {
  isTop: boolean;
  isBottom: boolean;
  click: (action: string) => void;
}

export const SortButtonGroup: React.SFC<Props> = ({
  isTop,
  isBottom,
  click,
}) => (
  <div className="sort-button-group">
    { !isTop && (
      <>
        <Icon type="verticle-right" className="rotate" title="置顶" onClick={ click.bind(null, SortActions.Top) } />
        <Icon type="up" title="上移" onClick={ click.bind(null, SortActions.Up) } />
      </>
    ) }
    { !isBottom && (
      <>
        <Icon type="down" title="下移" onClick={ click.bind(null, SortActions.Down) } />
        <Icon type="verticle-left" className="rotate" title="置底" onClick={ click.bind(null, SortActions.Bottom) } />
      </>
    ) }
  </div>
);
