import * as React from 'react';

import {
  WarehouseCreateModalContainer,
  WarehouseTableContainer,
  WarehouseToolbarContainer,
  WarehouseUpdateModalContainer,
} from '../components/Warehouse';

export const WarehouseSettingView: React.SFC<{}> = () => (
  <>
    <h3>仓库</h3>
    <WarehouseToolbarContainer />
    <WarehouseTableContainer />
    <WarehouseCreateModalContainer />
    <WarehouseUpdateModalContainer />
  </>
);
