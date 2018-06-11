import * as moment from "moment";

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
} from '../../actions/inOutList';


import {
  SetBrands,
  SetBrandsAction,

  SetCategories,
  SetCategoriesAction,

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

import {TableWapper } from './Table';
import {TimeToolbar} from './TimeToolbar';
import {WrappedInOutToolbarForm } from './Toolbar';


interface Props {
  initialQuerykey:string
  TimeRange:any;

  Brands:any[];
  setBrands:() => SetBrandsAction;

  Categories:any[];
  setCategories:() => SetCategoriesAction;

  StockTypes:any[];
  setStockTypes:() => SetStockTypesAction;

  Warehouses:any[];
  setWarehouses:() => SetWarehousesAction;

  setTimeRange:(values:object) => SetTimeRangeAction ;
  setQueryParams:(values:object) => SetQueryParamsAction;
  loadAll: (values:object) => LoadAllAction;
  TableData:any;
  QueryParams: any;
}


class Container extends React.Component<Props> {
  
  componentWillMount(){
    this.props.setBrands();
    this.props.setCategories();

    this.props.setStockTypes();
    this.props.setWarehouses();

    this.props.loadAll({
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


  onPageChange = (pagination:TablePaginationConfig) => {
    const {pageSize} = pagination;
    const pageNo = pagination.current;
    this.props.loadAll({
      pageNo,
      pageSize,
      ...this.formatTimeRange(this.props.TimeRange),
      ...this.props.QueryParams
    });
  }

  onSubmit = (values:object) => {
    this.props.loadAll({
      ...this.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableData),
      ...values,
      ...this.props.QueryParams
    });
  }
  
  onTimeChange =(e:TimePickerOutput) => {
    this.props.setTimeRange(e);
    this.props.loadAll({
      ...this.formatTimeRange(e),
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.TableData)
    });
  }
  /*tslint:disable:variable-name*/
  onToolbarChange = (_changedValues:object,allValues:object) => {
    this.props.setQueryParams(allValues);
    this.props.loadAll({
      ...this.formatTimeRange(this.props.TimeRange),
      ...utils.getPaginationParams(this.props.TableData),
      ...allValues,
    });
  }

  render() {
    return <>
      <TimeToolbar onChange = {this.onTimeChange} defaultTime={initialTime}/>
      <WrappedInOutToolbarForm 
        queryKey = {this.props.initialQuerykey}
        brands = {this.props.Brands}
        categories = {this.props.Categories}
        stockTypes = {this.props.StockTypes}
        warehouses = {this.props.Warehouses}
        onSubmit = {this.onSubmit}
        onChange = {this.onToolbarChange}
      />
      <TableWapper 
        tableData = {this.props.TableData} 
        onChange = {this.onPageChange}
       />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  TimeRange : fromWarehouse.getInOutListTimeRangeState(state),
  Brands : fromWarehouse.getCommonBrands(state),
  Categories: fromWarehouse.getCommonCategories(state),
  StockTypes : fromWarehouse.getCommonStockTypes(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  TableData: fromWarehouse.getInOutListTableData(state),
  QueryParams: fromWarehouse.getInOutListQueryParams(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAll(body)),
  setTimeRange: (body:any) => dispatch(SetTimeRange(body)),
  setBrands:() => dispatch(SetBrands()),
  setCategories:() => dispatch(SetCategories()),
  setStockTypes:() => dispatch(SetStockTypes()),
  setWarehouses:() => dispatch(SetWarehouses()),
  setQueryParams: (body:object) => dispatch(SetQueryParams(body)),
  
});

export const InOutListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);