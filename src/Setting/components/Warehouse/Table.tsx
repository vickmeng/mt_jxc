import * as React from 'react';

import { Divider, Modal, Table, Tag } from 'antd';

import { Pagination, TableChangeData } from '@app/shared/models';
import {
  ChangeTableAction,
  DeleteAction,
  OpenUpdateModalAction,
  SetDefaultAction,
  SetStatusAction,
} from '../../actions/warehouse';
import { Warehouse, WarehouseStatus } from '../../models';

class WarehouseColumn extends Table.Column<Warehouse> { }
class WarehouseTable extends Table<Warehouse> { }

interface Props {
  warehouses: Warehouse[];
  loading: boolean;
  pagination: Pagination;
  changeTable: (changeData: TableChangeData) => ChangeTableAction;
  openUpdateModal: (warehouse: Warehouse) => OpenUpdateModalAction;
  deleteById: (warehouseId: number) => DeleteAction;
  setDefault: (warehouseId: number) => SetDefaultAction;
  setStatus: (warehouseStatus: WarehouseStatus) => SetStatusAction;
}

export const WarehouseTableWrapper: React.SFC<Props> = ({
  warehouses,
  loading,
  pagination,
  changeTable,
  openUpdateModal,
  deleteById,
  setDefault,
  setStatus,
}) => {

  const nameRender = (row: Warehouse) => {
    return (
      <>
        { row.warehouseName }
        { row.isDefault ? <Tag color="blue" style={{ marginLeft: "8px" }}>默认</Tag> : null }
      </>
    );
  };

  const statusRender = (row: Warehouse) => {
    return (
      row.isLock ? '已禁用' : '已启用'
    );
  };

  const actionRender = (row: Warehouse) => {
    return (
      <>
        { !row.isDefault && (
          <>
            <a href="javascript:;" onClick={ showSetDefaultConfirm.bind(null, row) }>设置为默认仓</a>
            <Divider type="vertical" />
          </>
        ) }
        <a href="javascript:;" onClick={ openUpdateModal.bind(null, row) }>编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={ showSetStatusConfirm.bind(null, row) }>{ row.isLock ? '启用' : '禁用' }</a>
        { !row.isDefault && (
          <>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={ showDeleteConfirm.bind(null, row) }>删除</a>
          </>
        ) }
      </>
    );
  };

  const handleTableChange = (currentPagination: Pagination) => {
    changeTable({
      pagination: currentPagination,
    });
  };

  const showDeleteConfirm = (warehouse: Warehouse) => {
    Modal.confirm({
      title: '删除的仓库不能恢复，请确认是否删除？',
      okType: 'danger',
      onOk() {
        deleteById(warehouse.warehouseId);
      },
    });
  };

  const showSetDefaultConfirm = (warehouse: Warehouse) => {
    Modal.confirm({
      title: '确认是否将此仓库设置为默认仓库？',
      onOk() {
        setDefault(warehouse.warehouseId);
      },
    });
  };

  const showSetStatusConfirm = (warehouse: Warehouse) => {
    Modal.confirm({
      title: `确认是否${warehouse.isLock ? '启用' : '禁用'}此仓库？`,
      content: warehouse.isLock ? '' : '特别提醒: 禁用后不会清空仓库库存',
      onOk() {
        setStatus({
          warehouseId: warehouse.warehouseId,
          isLock: !warehouse.isLock,
        });
      },
    });
  };

  return (
    <WarehouseTable
      rowKey="warehouseId"
      dataSource={ warehouses }
      loading={ loading }
      pagination={ pagination }
      onChange={ handleTableChange }
    >
      <WarehouseColumn title="仓库名称" key="warehouseName" render={ nameRender } />
      <WarehouseColumn title="仓库编码" key="warehouseNO" dataIndex="warehouseNO" />
      <WarehouseColumn title="仓库地址" key="warehouseLocation" dataIndex="warehouseLocation" />
      <WarehouseColumn title="状态" key="status" render={  statusRender } />
      <WarehouseColumn title="操作" key="action" render={  actionRender } />
    </WarehouseTable>
  );
};