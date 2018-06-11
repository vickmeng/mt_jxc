import * as moment from "moment";

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {store} from 'index'

import {  push } from 'react-router-redux'


import {
  LoadAll as LoadAllIn,
  LoadAllAction as LoadAllActionIn,
  SetQueryParams as SetQueryParamsIn,
  SetQueryParamsAction as SetQueryParamsActionIn,
  SetTimeRange as SetTimeRangeIn ,
  SetTimeRangeAction as SetTimeRangeActionIn,
} from '../../actions/in';

import {
  LoadAll as LoadAllOut,
  LoadAllAction as LoadAllActionOut,
  SetQueryParams as SetQueryParamsOut,
  SetQueryParamsAction as SetQueryParamsActionOut,
  SetTimeRange as SetTimeRangeOut ,
  SetTimeRangeAction as SetTimeRangeActionOut,
} from '../../actions/out';

import {
  SetStockTypes ,
  SetStockTypesAction,
  SetWarehouses,
  SetWarehousesAction,
} from '../../actions/common'


import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import { TablePaginationConfig } from 'antd/lib/table';

import { TimePickerOutput} from 'shared/models';
import * as utils from 'shared/utils' ;

import {initialTime} from '../../constants/InOut';
import {stockKindType} from '../../models';

import { TableWapper } from './Table';
import {TimeToolbar} from './TimeToolbar';
import { WrappedInOutToolbarForm } from './Toolbar';


interface Props {
  stockKind:stockKindType;
  TimeRange:any;
  StockTypes:any[];
  setStockTypes:() => SetStockTypesAction;
  Warehouses:any[];
  setWarehouses:() => SetWarehousesAction;
  setTimeRange:(values:object) => SetTimeRangeActionIn | SetTimeRangeActionOut ;
  setQueryParams:(values:object) => SetQueryParamsActionIn | SetQueryParamsActionOut;
  loadAll: (values:object) => LoadAllActionIn | LoadAllActionOut;
  TableData:any;
  QueryParams: any;
}


class Container extends React.Component<Props> {
  
  componentWillMount(){
    this.props.setStockTypes();
    this.props.setWarehouses();
    this.props.loadAll({
      stockKind:this.props.stockKind,
      ...this.formatTimeRange(this.props.TimeRange),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableData)
    });
  }

  formatTimeRange = (e:TimePickerOutput) => {
    return {
      beginTime :moment(e.st).format('YYYY/MM/DD 00:00:00') ,
      endTime : moment(e.et).format('YYYY/MM/DD 23:59:59'),
    }
  }

  getTitle = ():string => {
    return (this.props.stockKind === 'S_CRK_RK') ? '商品入库' : '商品出库'
  }

  onPageChange = (pagination:TablePaginationConfig) => {
    const {pageSize} = pagination;
    const pageNo = pagination.current;
    this.props.loadAll({
      pageNo,
      pageSize,
      stockKind:this.props.stockKind,
      ...this.formatTimeRange(this.props.TimeRange),
      ...this.props.QueryParams
    });
  }

  onAdd = () => {
    if(this.props.stockKind === 'S_CRK_RK'){
      store.dispatch(push('/warehouse/createInOut/in'));
    }else{
      store.dispatch(push('/warehouse/createInOut/out'));
    }
  }

  onSubmit = (values:object) => {
    this.props.loadAll({
      stockKind:this.props.stockKind,
      ...this.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableData),
      ...values,
      ...this.props.QueryParams
    });
  }
  
  onTimeChange =(e:TimePickerOutput) => {
    this.props.setTimeRange(e);
    this.props.loadAll({
      stockKind:this.props.stockKind,
      ...this.formatTimeRange(e),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableData)
    });
  }
  /*tslint:disable:variable-name*/
  onToolbarChange = (_changedValues:object,allValues:object) => {
    this.props.setQueryParams(allValues);
    this.props.loadAll({
      stockKind:this.props.stockKind,
      ...this.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableData),
      ...allValues,
    });
  }

  render() {
    return <>
      <TimeToolbar onChange = {this.onTimeChange} defaultTime={initialTime}/>
      <WrappedInOutToolbarForm 
        title = {this.getTitle()}
        stockTypes = {this.props.StockTypes}
        warehouses = {this.props.Warehouses}
        onAdd = {this.onAdd}
        onSubmit = {this.onSubmit}
        onChange = {this.onToolbarChange}
      />
      <TableWapper 
        tableData = {this.props.TableData} 
        onChange = {this.onPageChange}
        stockKind = {this.props.stockKind}
       />
    </>
  }
}

const mapStateToPropsForIn = (state: State) => ({
  TimeRange : fromWarehouse.getInTimeRangeState(state),
  StockTypes : fromWarehouse.getCommonStockTypes(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  TableData: fromWarehouse.getInTableData(state),
  QueryParams: fromWarehouse.getInQueryParams(state),
});

const mapDispatchToPropsForIn = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAllIn(body)),
  setTimeRange: (body:any) => dispatch(SetTimeRangeIn(body)),
  setStockTypes:() => dispatch(SetStockTypes()),
  setWarehouses:() => dispatch(SetWarehouses()),
  setQueryParams: (body:object) => dispatch(SetQueryParamsIn(body)),
  
});

const mapStateToPropsForOut = (state: State) => ({
  TimeRange : fromWarehouse.getOutTimeRangeState(state),
  StockTypes : fromWarehouse.getCommonStockTypes(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  TableData: fromWarehouse.getOutTableData(state),
  QueryParams: fromWarehouse.getOutQueryParams(state),
});

const mapDispatchToPropsForOut = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAllOut(body)),
  setTimeRange: (body:any) => dispatch(SetTimeRangeOut(body)),
  setStockTypes:() => dispatch(SetStockTypes()),
  setWarehouses:() => dispatch(SetWarehouses()),
  setQueryParams: (body:object) => dispatch(SetQueryParamsOut(body)),
});

export const InContainer = connect(
  mapStateToPropsForIn,
  mapDispatchToPropsForIn,
)(Container);


export const OutContainer = connect(
  mapStateToPropsForOut,
  mapDispatchToPropsForOut,
)(Container);


