import * as moment from 'moment';
import * as React from 'react';
import { push } from 'react-router-redux'

import { Modal,Table,Tag } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';

import { redTagColor } from '@app/shared/constants';

import { TableState } from '@app/shared/models';
import { getPagination } from '@app/shared/utils';
import { MTmoney} from 'shared/components';

import { store } from 'index'

import {
  DeleteOrderAction
}from '../../actions/OrderDetail';

import {cargoStatusMap,orderStatusMap,payStatusMap,stockStatusMap} from '../../constants'
import {
  DeleteOrderParams,
  OrderRow
} from '../../models';

class OrderColumn extends Table.Column<OrderRow> {}

class OrderTable extends Table<any> {}

interface Props {
  TableState: TableState;
  onChange:(pagination:TablePaginationConfig)=>void;
  DeleteOrder:(param:DeleteOrderParams) => DeleteOrderAction;
  onOpenSKModal:(r:OrderRow) => void
}

export class TableWapper extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }
  /*tslint:disable:variable-name*/
  onGoToDetail = (orderId:string) => {
    return () => {
      store.dispatch(push(`/order/orderDetail/${orderId}`));
    }
  }

  onSC = (row:any) => {
    return () => {
      const $content = <>
      删除订单为不可逆操作,确定删除订单{row.orderCode}吗？
    </>
    Modal.confirm({
      title: 'Confirm',
      content: $content,
      okText: '确认',
      cancelText: '取消',
      maskClosable:true,
      onCancel() {return},
      onOk:this.onSubmitSCModal(row.orderId)
    });
    }
  }
  onSK = (r:OrderRow) => {
    return () => {
      this.props.onOpenSKModal(r);
    }
  }

  onSubmitSCModal = (id:string) => {
    return () => {
      return new Promise((resolve, reject) => {
        this.props.DeleteOrder({
          orderId:id,
          callBack:resolve
        });
      });
    }
  }
  templeteAction = (t:string,r:OrderRow) => {
    return <>
        {this.templeteOrderAction(t,r)}&nbsp;&nbsp;
        {this.templetePayAction(t,r)}
      </>
  }

  templeteOrderAction = (_t:string , r:OrderRow,) => {
    const $toSHDetail = <a href='javascript:;' onClick={this.onGoToDetail(r.orderId)} >审核</a>
    const $toDetail = <a href='javascript:;' onClick={this.onGoToDetail(r.orderId)} >订单详情</a>;
    const $SC = <a href='javascript:;' onClick={this.onSC(r)} >删除</a>
    switch (r.orderStatus){
      case 'DDZT_DDDSH':
      case 'DDZT_DCWSH':
        return <>
          {$toSHDetail}&nbsp;&nbsp;
          {$toDetail}
        </>
      case 'DDZT_YZF':
        return <>
          {$toDetail}&nbsp;&nbsp;
          {$SC}
        </>
      default:
        return <>{$toDetail}</>
    }
  }

  templetePayAction = (_t:string , r:OrderRow,) => {
    const $SK = <a href='javascript:;' onClick={this.onSK(r)} >收款</a>
    switch (r.payStatus){
      case 'ZFZT_WFK':
        return $SK
      default:
        return <></>
    }
  }

  render() {
    return (
      <>
        <OrderTable
          rowKey="orderId" 
          onChange = { this.props.onChange }
          dataSource={ this.props.TableState.entities }
          pagination = { getPagination(this.props.TableState.total as number) }
          loading={ this.props.TableState.loading }
        >
          <OrderColumn 
            title="订单号" 
            dataIndex="orderId"
            render = {
              (t,r) => r.isSale? <>{t} <Tag color={redTagColor}>特价</Tag></>  : t
            }
           />
          <OrderColumn title="下单时间" dataIndex="created" render = {t=>moment(t).format('YYYY/MM/DD hh:mm:ss') }/>
          <OrderColumn title="经销商" dataIndex="tenantName" />
          <OrderColumn title="金额" dataIndex="realFee" render = {t=> <MTmoney value={+t}/>} />
          <OrderColumn title="出货/发货" 
            dataIndex="stockStatus" 
            render = {
              (t,r) => `${stockStatusMap[r.stockStatus]}/${cargoStatusMap[r.cargoStatus]}`
            }
           />
          <OrderColumn title="状态" 
            dataIndex="orderStatus" 
            render = {
              (t,r) => {
                switch (r.orderStatus){
                  case 'DDZT_YWC':
                  case 'DDZT_YZF':
                    return `${orderStatusMap[t]}` 
                  default:
                    return <span style={{color:redTagColor }}>{orderStatusMap[t]}</span>
                }
              } 
            } 
          />
          <OrderColumn title="付款状态" dataIndex="payStatus" render = {t => `${payStatusMap[t]}` } />
          <OrderColumn title="操作" dataIndex="actions" render={this.templeteAction}/>

        </OrderTable>
      </>
    )
  }
};