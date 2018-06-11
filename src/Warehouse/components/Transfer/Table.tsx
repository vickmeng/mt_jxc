import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';


import * as moment from 'moment';

import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';

import { TableState } from '@app/shared/models';
import { store } from 'index'

import { getPagination } from '@app/shared/utils';

import {StockInModalParams} from '../../models';


import {
  OpenModal,
  OpenModalAction,
} from '../../actions/stockInModal';

import {StockInModalContainer} from '../../components/Common';


class Column extends Table.Column<any> {}

class ListTable extends Table<any> {}

interface Props {
  OpenModal:(row:any) => OpenModalAction
  tableData: TableState;
  onChange:(pagination:TablePaginationConfig)=>void
}

export class Container extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  onGoToDetail = (r:any) => {
    return () => {
      store.dispatch(push(`/warehouse/transferDetail/${r.stockTransferId}`));
    }
  }

  onStockIn = (r:any) => {
    return () => {
      this.props.OpenModal(r);
    }
  }

  
  /*tslint:disable:variable-name*/
  templeteTime = (t:any,_r:any,_i:number) => {
    return t ? moment(t).format('YYYY/MM/DD hh:mm:ss') : '';
  }

  templeteAction = (_t:any,r:any,_i:number):JSX.Element => {
    const $detail = <a href="javascript:;" onClick={this.onGoToDetail(r)}>明细</a>
    const $in = <a href="javascript:;" onClick = {this.onStockIn(r)} >入库</a>
    if(r.transferStatus === '在途'){// 已调入
      return <>
        {$detail} &nbsp;&nbsp;
        {$in} 
      </>
    }else{
      return $detail
    }
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
          <Column title="调拨单号" dataIndex="stockNO" />
          <Column title="调出仓库" dataIndex="stockOutWarehouseName" />
          <Column title="调入仓库" dataIndex="stockInWarehouseName" />
          <Column title="调出时间" dataIndex="stockOutTime" render = {this.templeteTime}/>/>
          <Column title="调入时间" dataIndex="stockInTime" render = {this.templeteTime}/>/>
          <Column title="制单人" dataIndex="operator" />
          <Column title="状态" dataIndex="transferStatus" />
          <Column title="操作" dataIndex="" render = {this.templeteAction}/>

        </ListTable>

        <StockInModalContainer/>
      </>
    )
  }
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  OpenModal:(row:StockInModalParams) => dispatch(OpenModal(row)),
});

export const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);