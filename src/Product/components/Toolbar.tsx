import * as React from 'react';
import { RouterAction } from 'react-router-redux';

import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import { multiActionsButton, TableColumnsControl } from '@app/shared/components';
import { ColumnData } from '@app/shared/models';
import {
  BatchDeleteAction,
  BatchSetStatusAction,
  ChangeTableColumnAction,
  OpenOnShelfModalAction,
} from '../actions/product';
import { OnShelfParams, Product } from '../models';

const { Item: MenuItem } = Menu;

interface Props {
  columns: Array<ColumnData<Product>>;
  selectedRowKeys: number[];
  changeTableColumn: (columns: Array<ColumnData<Product>>) => ChangeTableColumnAction;
  openOnShelfModal: () => OpenOnShelfModalAction;
  batchSetOffShelf: (params: OnShelfParams) => BatchSetStatusAction;
  batchDelete: (productIds: number[]) => BatchDeleteAction;
  goToCreate: () => RouterAction;
}

export const Toolbar: React.SFC<Props> = ({
  columns,
  selectedRowKeys,
  changeTableColumn,
  openOnShelfModal,
  batchSetOffShelf,
  batchDelete,
  goToCreate,
}) => {

  const handleSetOffShellStatus = (): void => {
    Modal.confirm({
      title: '请确认是否批量下架商品？',
      onOk() {
        batchSetOffShelf({
          productIds: selectedRowKeys,
          isOnline: false,
        });
      },
    });
  };

  const handleDelete = (): void => {
    Modal.confirm({
      okType: 'danger',
      title: '请确认是否批量删除商品？',
      onOk() {
        batchDelete(selectedRowKeys);
      },
    });
  }

  const handleMenuClick = (e: ClickParam): void => {
    if (selectedRowKeys.length === 0) {
      message.info('请至少选择一个商品');
      return;
    }

    switch (e.key) {
      case '1':
        openOnShelfModal();
        break;

      case '2':
        handleSetOffShellStatus();
        break;
      
      case '3':
        handleDelete();
      
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={ handleMenuClick }>
      <MenuItem key="1">上架</MenuItem>
      <MenuItem key="2">下架</MenuItem>
      <MenuItem key="3">删除</MenuItem>
    </Menu>
  );

  return (
    <div className="table-toolbar">
      <div className="main">
        <Button type="primary" onClick={ goToCreate }>新增</Button>
        <Dropdown overlay={ menu } >
          { multiActionsButton }
        </Dropdown>
      </div>
      <div className="extra">
        <TableColumnsControl
          label="选择显示字段"
          columns={ columns } 
          onSubmit={ changeTableColumn }
        />
      </div>
    </div>
  );
}
