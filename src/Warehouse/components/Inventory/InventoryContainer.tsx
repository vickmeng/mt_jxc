import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  LoadAll,
  LoadAllAction,
  SetQueryParams,
  SetQueryParamsAction,
} from '../../actions/inventory';

import {
  SetBrands,
  SetBrandsAction,
  SetCategories,
  SetCategoriesAction,
  SetWarehouses,
  SetWarehousesAction,
} from '../../actions/common'

import {} from '../../actions/common'

import * as fromWarehouse from '../../reducers';

import * as utils from '@app/shared/utils' 

import { TablePaginationConfig } from 'antd/lib/table';

import { InventoryTableWapper } from './Table';
import { WrappedInventoryToolbarForm } from './Toolbar';

interface Props {
  Inventories: any;
  QueryParams: any;
  loadAll: (values:object) => LoadAllAction;
  setCategories:() => SetCategoriesAction;
  setBrands:() => SetBrandsAction;
  setQueryParams:(values:object) => SetQueryParamsAction;
  setWarehouses:() => SetWarehousesAction;
  Brands:any[];
  Categories:any[];
  Warehouses:any[];
}


class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.setBrands();
    this.props.setCategories();
    this.props.setWarehouses();

    this.props.loadAll({
      ...this.props.QueryParams,
      ...utils.getPaginationParams(this.props.Inventories)
    });
  }
  /*tslint:disable:variable-name*/
  onToolbarChange = (_changedValues:object,allValues:object) => {
    this.props.setQueryParams(allValues);
    this.props.loadAll({
      ...utils.getPaginationParams(this.props.Inventories),
      ...allValues,
    });
  }

  onSubmit = (_values:object) => {
    this.props.loadAll({
      ...utils.getPaginationParams(this.props.Inventories),
      // ...values
      ...this.props.QueryParams
    });
  }

  onPageChange = (pagination:TablePaginationConfig) => {
    const {pageSize} = pagination;
    const pageNo = pagination.current;
    this.props.loadAll({
      pageNo,
      pageSize,
      ...this.props.QueryParams
    });
  }

  render() {
    return <>
      <WrappedInventoryToolbarForm 
        brands = {this.props.Brands}
        categories = {this.props.Categories}
        warehouses = {this.props.Warehouses}
        onSubmit = {this.onSubmit} 
        onChange = {this.onToolbarChange}
      />
      <InventoryTableWapper Inventories = {this.props.Inventories} onChange = {this.onPageChange} />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  Brands     : fromWarehouse.getCommonBrands(state),
  Categories : fromWarehouse.getCommonCategories(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  Inventories: fromWarehouse.getInventories(state),
  QueryParams: fromWarehouse.getQueryParams(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: (body:object) => dispatch(LoadAll(body)),
  setQueryParams: (body:object) => dispatch(SetQueryParams(body)),
  setCategories:() => dispatch(SetCategories()),
  setBrands:() => dispatch(SetBrands()),
  setWarehouses:() => dispatch(SetWarehouses())
});

export const InventoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

