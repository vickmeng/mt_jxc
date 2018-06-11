import * as React from 'react';

import { Divider, Modal, Table } from 'antd';

import {
  DeleteAction,
  OpenUpdateModalAction,
} from '../../actions/unit';
import { Unit } from '../../models';

class UnitColumn extends Table.Column<Unit> { }

class UnitTable extends Table<Unit> { }

interface Props {
  units: Unit[];
  loading: boolean;
  openUpdateModal: (unit: Unit) => OpenUpdateModalAction;
  deleteById: (unitId: number) => DeleteAction;
}

export const UnitTableWrapper: React.SFC<Props> = ({
  units,
  loading,
  openUpdateModal,
  deleteById,
}) => {

  const showDeleteConfirm = (unit: Unit) => {
    Modal.confirm({
      title: '确定是否删除商品单位？',
      okType: 'danger',
      onOk() {
        deleteById(unit.id);
      },
    });
  };

  const actionRender = (row: Unit) => {
    return (
      <>
        <a href="javascript:;" onClick={ openUpdateModal.bind(null, row) }>编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={ showDeleteConfirm.bind(null, row) }>删除</a>
      </>
    );
  };

  return (
    <UnitTable
      rowKey="id"
      dataSource={ units }
      pagination={ false }
      loading={ loading }
    >
      <UnitColumn title="名称" key="productUnitName" dataIndex="productUnitName" />
      <UnitColumn title="操作" key="action" render={ actionRender } />
    </UnitTable>
  );
}