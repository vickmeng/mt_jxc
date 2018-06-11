import * as React from 'react';

import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import { multiActionsButton } from '@app/shared/components';
import {
  BatchDeleteAction,
  OpenCreateModalAction,
} from '../../actions/category';

const { Item: MenuItem } = Menu;

interface Props {
  selectedRowKeys: number[];
  openCreateModal: () => OpenCreateModalAction;
  batchDelete: (categoryIds: number[]) => BatchDeleteAction;
}

export const Toolbar: React.SFC<Props> = ({ selectedRowKeys, openCreateModal, batchDelete }) => {

  const handleDelete = (): void => {
    const length = selectedRowKeys.length;

    if (length === 0) {
      message.info('请至少选择一个分类');
      return;
    }

    Modal.confirm({
      title: `确定是否删除选中的${length}个商品分类？`,
      okType: 'danger',
      onOk() {
        batchDelete(selectedRowKeys);
      },
    });
  };

  const handleMenuClick = (e: ClickParam): void => {
    switch (e.key) {
      case '1':
        handleDelete();
        break;
      
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={ handleMenuClick }>
      <MenuItem key="1">删除</MenuItem>
    </Menu>
  );

  return (
    <div className="table-toolbar">
      <Button type="primary" onClick={ openCreateModal }>新增分类</Button>
      <Dropdown overlay={ menu } >
        { multiActionsButton }
      </Dropdown>
    </div>
  );
};