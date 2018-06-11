import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import { Pagination, TableChangeData } from '@app/shared/models';
import {
  ChangeTable,
  ChangeTableAction,
  Delete,
  DeleteAction,
  LoadAll,
  LoadAllAction,
  OpenUpdateModal,
  OpenUpdateModalAction,
  SetDefault,
  SetDefaultAction,
  SetStatus,
  SetStatusAction,
} from '../../actions/warehouse';
import { Warehouse, WarehouseStatus } from '../../models';
import * as fromSetting from '../../reducers';
import { WarehouseTableWrapper } from './Table';

interface Props {
  warehouses: Warehouse[];
  loading: boolean;
  pagination: Pagination;
  loadAll: () => LoadAllAction;
  changeTable: (changeData: TableChangeData) => ChangeTableAction;
  openUpdateModal: (warehouse: Warehouse) => OpenUpdateModalAction;
  deleteById: (warehouseId: number) => DeleteAction;
  setDefault: (warehouseId: number) => SetDefaultAction;
  setStatus: (warehouseStatus: WarehouseStatus) => SetStatusAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <WarehouseTableWrapper { ...this.props } />
  }
}

const mapStateToProps = (state: State) => ({
  warehouses: fromSetting.getWarehouses(state),
  loading: fromSetting.getWarehouseLoading(state),
  pagination: fromSetting.getWarehousePagination(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  changeTable: (changeData: TableChangeData) => dispatch(ChangeTable(changeData)),
  openUpdateModal: (warehouse: Warehouse) => dispatch(OpenUpdateModal(warehouse)),
  deleteById: (warehouseId: number) => dispatch(Delete(warehouseId)),
  setDefault: (warehouseId: number) => dispatch(SetDefault(warehouseId)),
  setStatus: (warehouseStatus: WarehouseStatus) => dispatch(SetStatus(warehouseStatus)),
});

export const WarehouseTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

