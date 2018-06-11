import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Button,Modal} from 'antd';
import { FormComponentProps } from 'antd/lib/form';


import {
  LoadAll,
  LoadAllAction,
  OrderSK,
  OrderSKAction,
  SetQueryParams,
  SetQueryParamsAction,
  SetTimeRange ,
  SetTimeRangeAction,
} from '../../actions/OrderList';

import {
  DeleteOrder,
  DeleteOrderAction
}from '../../actions/OrderDetail';


import { State } from '@app/root';
import * as fromOrder from '../../reducers';

import { TablePaginationConfig } from 'antd/lib/table';

import {initTableStateConfig} from 'shared/constants';
import { TimePickerOutput} from 'shared/models';
import * as utils from 'shared/utils' ;

import {initialTime , } from '../../constants';
import {DeleteOrderParams,OrderRow,OrderSKParams} from '../../models';

import {WrappedSKModalForm} from './SKModalForm';
import {TableWapper } from './Table';
import {TimeToolbar} from './TimeToolbar';
import {WrappedToolbarForm } from './Toolbar';

interface Props {
  TimeRange:any;
  setTimeRange:(values:object) => SetTimeRangeAction ;
  QueryParams: any;
  setQueryParams:(values:object) => SetQueryParamsAction;
  loadAll: (values:object) => LoadAllAction;
  DeleteOrder:(param:DeleteOrderParams) => DeleteOrderAction;
  OrderSK:(params:OrderSKParams) =>  OrderSKAction;
  TableState:any;
}

class Container extends React.Component<Props> {
  SKformRef: React.Component<FormComponentProps>;
  state={
    SKvisible:false,
    SKloading:false,
    SKRow:{}
  }

  componentDidMount(){
    this.props.loadAll({
      ...utils.formatTimeRange(utils.getTimeToolbarPicked(initialTime)),
      ...utils.getPaginationParams(initTableStateConfig)
    });
  }

  onCancelSKModal = () => {
    this.setState({SKvisible:false});
  }

  onOpenSKModal = (r:OrderRow) => {
    this.setState({
      SKvisible:true,
      SKRow:r
    });
  }

  onPageChange = (pagination:TablePaginationConfig) => {
    const {pageSize} = pagination;
    const pageNo = pagination.current;
    this.props.loadAll({
      pageNo,
      pageSize,
      ...utils.formatTimeRange(this.props.TimeRange),
      ...this.props.QueryParams
    });
  }

  onSubmit = (values:object) => {
    this.props.loadAll({
      ...utils.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableState),
      ...values,
      ...this.props.QueryParams
    });
  }

  onSubmitSKModal = () => {
    const form = this.SKformRef.props.form;
    const {tenantId,orderId} = (this.state.SKRow as OrderRow);
    
    form.validateFields((err: any, values: any) => {
      if (!err) {
        this.setState({SKloading:true})
        this.props.OrderSK({
          body:{
            ...values,
            tenantId,
            orderId
          },
          callBack:()=>{
            this.setState({
              SKvisible:false,
              SKloading:false
            })
          }
        })
        
      }
    });
  }
  
  onTimeChange =(e:TimePickerOutput) => {
    this.props.setTimeRange(e);
    this.props.loadAll({
      ...utils.formatTimeRange(e),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableState)
    });
  }
  /*tslint:disable:variable-name*/
  onToolbarChange = (_changedValues:object,allValues:object) => {
    this.props.setQueryParams(allValues);
    this.props.loadAll({
      ...utils.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableState),
      ...allValues,
    });
  }

  SKFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.SKformRef = formRef;
  }

  render() {
    return <>
      <TimeToolbar onChange = {this.onTimeChange} defaultTime={initialTime}/>
      <WrappedToolbarForm 
        onSubmit = {this.onSubmit}
        onChange = {this.onToolbarChange}
      />
      <TableWapper
        TableState = {this.props.TableState}
        onChange = {this.onPageChange}
        DeleteOrder = { this.props.DeleteOrder}
        onOpenSKModal = {this.onOpenSKModal}
      />

      <Modal
        title = "添加收款记录"
        visible = {this.state.SKvisible}
        width = '800px'
        destroyOnClose = {true}
        onCancel={this.onCancelSKModal}
        footer={[
          <Button key="back" onClick={this.onCancelSKModal}>取消</Button>,
          <Button key="submit" type="primary"  onClick={this.onSubmitSKModal} loading={this.state.SKloading}>
            确认
          </Button>
        ]}
      > 
        <WrappedSKModalForm wrappedComponentRef={ this.SKFormRef } row={(this.state.SKRow as OrderRow)} />
      </Modal>
    </>
  }
}

const mapStateToProps = (state: State) => ({
  TimeRange : fromOrder.getOrderListTimeRangeState(state),
  TableState: fromOrder.getOrderListTableData(state),
  QueryParams: fromOrder.getOrderListQueryParams(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAll(body)),
  setTimeRange: (body:any) => dispatch(SetTimeRange(body)),
  setQueryParams: (body:object) => dispatch(SetQueryParams(body)),
  DeleteOrder:(params:DeleteOrderParams)=> dispatch(DeleteOrder(params)),
  OrderSK:(params:OrderSKParams) =>  dispatch(OrderSK(params)),
});

export const OrderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);