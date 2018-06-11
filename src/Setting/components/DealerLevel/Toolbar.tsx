import * as React from 'react';

import { Button } from 'antd';

import {
  OpenCreateModalAction,
} from '../../actions/dealerLevel';

interface Props {
  openCreateModal: () => OpenCreateModalAction;
}

export const Toolbar: React.SFC<Props> = ({ openCreateModal }) => {

  return (
    <div className="table-toolbar">
      <Button type="primary" onClick={ openCreateModal }>新增</Button>
    </div>
  );
}
