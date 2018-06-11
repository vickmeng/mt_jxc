import * as React from 'react';
import { push } from 'react-router-redux'

import * as moment from 'moment';

import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';

import { TableState } from '@app/shared/models';
import { store } from 'index'

import { getPagination } from '@app/shared/utils';
// import {stockKindType} from '../../models';

class Column extends Table.Column<any> {}

class ListTable extends Table<any> {}

interface Props {
  tableData: TableState;
  onChange:(pagination:TablePaginationConfig)=>void
}

export class TableWapper extends React.Component<Props> {

  /*tslint:disable:variable-name*/
  templeteStockTime = (_t:any,_r:any,_i:number) => {
    return moment(_t).format('YYYY/MM/DD hh:mm:ss');
  }

  templeteAction = (_t:any,r:any,_i:number) => {
    const goToDetail = () => {
      const link = '/warehouse/inOutDetail/' + (r.stockKind === 'S_CRK_RK' ? 'in/' : 'out/') + r.stockId;
      store.dispatch(push(link));
    }
    return <a href="javascript:;" onClick={goToDetail}>明细</a>
  }

  render() {
    return (
      <>
        <ListTable 
          rowKey="stockNO" 
          onChange = {this.props.onChange}
          dataSource={ this.props.tableData.entities }
          pagination = {getPagination(this.props.tableData.total as number)}
          loading={ this.props.tableData.loading }
        > 
          <Column title="编码" dataIndex="productNO" />
          <Column title="商品名称" dataIndex="productName" />
          <Column title="规格" dataIndex="specification" />
          <Column title="单位" dataIndex="productUnitName" />
          <Column title="所属仓库" dataIndex="warehouseName" />
          <Column title="类型" dataIndex="stockType" />
          <Column title="单号" dataIndex="stockNO" />
          <Column title="出入库日期" dataIndex="stockTime" render = {this.templeteStockTime}/>
          <Column title="数量" dataIndex="stockCount" />
          <Column title="操作" dataIndex="" render = {this.templeteAction}/>
        </ListTable>
      </>
    )
  }
};