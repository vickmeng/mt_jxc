import * as React from 'react';
import { push } from 'react-router-redux'

import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';

import { TableState } from '@app/shared/models';
import { store } from 'index'

import { getPagination } from '@app/shared/utils';

class InventoryColumn extends Table.Column<any> {}

class InventoryTable extends Table<any> {}

interface Props {
  Inventories: TableState;
  onChange:(pagination:TablePaginationConfig)=>void
}

export class InventoryTableWapper extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }
  /*tslint:disable:variable-name*/
  templeteAction = (_t:any,r:any,_i:number) => {
    const goToDetail = () => {
      const link = '/warehouse/inOutList/'  + r.productName;
      store.dispatch(push(link));
    }
  
    return <a href="javascript:;" onClick = {goToDetail}>详情</a>
  }

  render() {
    const {
      Inventories,
      onChange
    } = this.props;

    return (
      <>
        <InventoryTable
          // rowKey="productId" 
          onChange = { onChange }
          dataSource={ Inventories.entities }
          pagination = { getPagination(this.props.Inventories.total as number) }
          loading={ Inventories.loading }
        >
          <InventoryColumn title="商品名称" dataIndex="productName" />
          <InventoryColumn title="规格" dataIndex="specification" />
          <InventoryColumn title="单位" dataIndex="productUnitName" />
          <InventoryColumn title="所属仓库" dataIndex="warehouseName" />
          <InventoryColumn title="库存量" dataIndex="totalCount" />
          <InventoryColumn title="可用库存量" dataIndex="" />
          <InventoryColumn title="操作" dataIndex="" render = {this.templeteAction}/>
        </InventoryTable>
      </>
    )
  }
};