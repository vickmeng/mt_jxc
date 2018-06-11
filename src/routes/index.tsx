import * as React from 'react';
import { Route } from 'react-router-dom';

import {
  CreateProductView,
  ProductListView,
  UpdateProductView,
} from '@app/Product/views';

import {
  OrderDetailView,
  OrderView,
} from '@app/Order/views'

import {
  BrandSettingView,
  CategorySettingView,
  DealerLevelSettingView,
  DealerSettingView,
  UnitSettingView,
  WarehouseSettingView,
} from '@app/Setting/views';
// 库存相关 start

// warehouse库存相关 start
import { CreateInOutView } from '@app/Warehouse/views/CreateInOut';
import { CreateTransferView } from '@app/Warehouse/views/CreateTransfer';
import { InOutView } from '@app/Warehouse/views/InOut';
import { InOutDetailView } from '@app/Warehouse/views/InOutDetail';
import { InOutListView} from '@app/Warehouse/views/InOutList';
import { InventoryView } from '@app/Warehouse/views/Inventory';
import { TransferView} from '@app/Warehouse/views/Transfer'
import { TransferDetailView } from '@app/Warehouse/views/TransferDetail'

// warehouse库存相关 end
const $orderRouters = <>
    <Route path="/order/orderList" component={ OrderView } />
    <Route path="/order/orderDetail/:id" component={ OrderDetailView } />
</>

const $warehouseRouters = <>
    <Route path="/warehouse/inventory" component={ InventoryView } />
    <Route path="/warehouse/inOut/:stockKind" component={ InOutView } />
    <Route path="/warehouse/createInOut/:stockKind" component={ CreateInOutView } />
    <Route path="/warehouse/inOutDetail/:stockKind/:id" component={ InOutDetailView } />
    <Route path="/warehouse/transfer" component={ TransferView } />
    <Route path="/warehouse/transferDetail/:id" component={ TransferDetailView } />
    <Route path="/warehouse/createTransfer" component={ CreateTransferView } />
    <Route path="/warehouse/inOutList/:queryKey?" component={ InOutListView } />
</>

export const Routes: React.SFC<{}> = () => (
  <>
    <Route path="/product/list" component={ ProductListView } />
    <Route path="/product/create" component={ CreateProductView } />
    <Route path="/product/update/:id" component={ UpdateProductView } />

    {$orderRouters}
    {$warehouseRouters}
    <Route path="/setting/category" component={ CategorySettingView } />
    <Route path="/setting/brand" component={ BrandSettingView } />
    <Route path="/setting/unit" component={ UnitSettingView } />
    <Route path="/setting/dealer-level" component={ DealerLevelSettingView } />
    <Route path="/setting/warehouse" component={ WarehouseSettingView } />
    <Route path="/setting/dealer" component={ DealerSettingView } />
    
  </>
);