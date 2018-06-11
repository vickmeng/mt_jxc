import * as React from 'react';
import { push } from 'react-router-redux'

import * as moment from 'moment';

import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';

import { TableState } from '@app/shared/models';
import { store } from 'index'

import { getPagination } from '@app/shared/utils';
import {stockKindType} from '../../models';

class InOutColumn extends Table.Column<any> {}

class InOutTable extends Table<any> {}

interface Props {
  stockKind:stockKindType;
  tableData: TableState;
  onChange:(pagination:TablePaginationConfig)=>void
}

export class TableWapper extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }
  
  /*tslint:disable:variable-name*/
  templeteStockTime = (_t:any,_r:any,_i:number) => {
    return moment(_t).format('YYYY/MM/DD hh:mm:ss');
  }

  templeteAction = (_t:any,r:any,_i:number) => {
    const onOpenDetail = () => {
      const link = '/warehouse/inOutDetail/' + (this.props.stockKind === 'S_CRK_RK' ? 'in/' : 'out/') + r.stockId;
      store.dispatch(push(link));
    }
    return <a href="javascript:;" onClick = {onOpenDetail}>明细</a>
  }

  render() {
    return (
      <>
        <InOutTable 
          rowKey="stockNO" 
          onChange = {this.props.onChange}
          dataSource={ this.props.tableData.entities }
          pagination = {getPagination(this.props.tableData.total as number)}
          loading={ this.props.tableData.loading }
        > 
          <InOutColumn title="单号" dataIndex="stockNO" />
          <InOutColumn title="入库时间" dataIndex="stockTime" render = {this.templeteStockTime}/>
          <InOutColumn title="所属仓库" dataIndex="warehouseName" />
          <InOutColumn title="类型" dataIndex="stockType" />
          <InOutColumn title="制单人" dataIndex="username" />
          <InOutColumn title="操作" dataIndex="" render = {this.templeteAction}/>
        </InOutTable>
      </>
    )
  }
};