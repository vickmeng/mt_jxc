import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// import {store} from 'index'

// import {  push } from 'react-router-redux'

import {
  LoadAll,
  LoadAllAction,
  SetQueryParams,
  SetQueryParamsAction,
  SetTimeRange ,
  SetTimeRangeAction,
} from '../../actions/transfer';

import {
  SetTransferStatus,
  SetTransferStatusAction,
  SetWarehouses,
  SetWarehousesAction,
} from '../../actions/common'

import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import { TablePaginationConfig } from 'antd/lib/table';

import { TimePickerOutput} from 'shared/models';
import * as utils from 'shared/utils' ;

import {initialTime} from '../../constants/InOut';

import {TableContainer } from './Table';
import {TimeToolbar} from './TimeToolbar';
import {WrappedInOutToolbarForm } from './Toolbar';

interface Props {
  TimeRange:any;
  setTimeRange:(values:object) => SetTimeRangeAction ;
  
  
  Warehouses:any[];
  setWarehouses:() => SetWarehousesAction;
  
  TransferStatus:any[];
  setTransferStatus:() => SetTransferStatusAction;
  
  QueryParams: any;
  setQueryParams:(values:object) => SetQueryParamsAction;
  loadAll: (values:object) => LoadAllAction;
  TableData:any;
}

class Container extends React.Component<Props> {
  
  componentWillMount(){
    this.props.setWarehouses();
    this.props.setTransferStatus();

    this.props.loadAll({
      ...utils.formatTimeRange(this.props.TimeRange),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableData)
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
      ...utils.getPaginationParams(this.props.TableData),
      ...values,
      ...this.props.QueryParams
    });
  }
  
  onTimeChange =(e:TimePickerOutput) => {
    this.props.setTimeRange(e);
    this.props.loadAll({
      ...utils.formatTimeRange(e),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableData)
    });
  }
  /*tslint:disable:variable-name*/
  onToolbarChange = (_changedValues:object,allValues:object) => {
    this.props.setQueryParams(allValues);
    this.props.loadAll({
      ...utils.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableData),
      ...allValues,
    });
  }

  render() {
    return <>
      <TimeToolbar onChange = {this.onTimeChange} defaultTime={initialTime}/>
      <WrappedInOutToolbarForm 
        warehouses = {this.props.Warehouses}
        transferStatus = {this.props.TransferStatus}
        onSubmit = {this.onSubmit}
        onChange = {this.onToolbarChange}
      />
      <TableContainer 
        tableData = {this.props.TableData} 
        onChange = {this.onPageChange}
       />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  TimeRange : fromWarehouse.getTransferTimeRangeState(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  TransferStatus : fromWarehouse.getCommonTransferStatus(state),
  TableData: fromWarehouse.getTransferTableData(state),
  QueryParams: fromWarehouse.getTransferQueryParams(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAll(body)),
  setTimeRange: (body:any) => dispatch(SetTimeRange(body)),
  setWarehouses:() => dispatch(SetWarehouses()),
  setTransferStatus:() => dispatch(SetTransferStatus()),
  setQueryParams: (body:object) => dispatch(SetQueryParams(body)),
  
});

export const TransferContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);