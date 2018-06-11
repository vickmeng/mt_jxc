import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseUpdateModalAction,
  UpdateAction,
} from '../../actions/warehouse';
import { Warehouse, WarehouseEntity } from '../../models';
import { WrappedWarehouseForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  editedWarehouse: Warehouse;
  closeModal: () => CloseUpdateModalAction;
  update: (warehouse: WarehouseEntity) => UpdateAction;
}

export class UpdateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: WarehouseEntity) => {
      if (!err) {
        this.props.update({
          ...values,
          warehouseId: this.props.editedWarehouse.warehouseId,
        });
      }
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      editedWarehouse,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="编辑仓库"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedWarehouseForm wrappedComponentRef={ this.saveFormRef } warehouse={ editedWarehouse } />
      </Modal>
    );
  }
}