import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseCreateModalAction,
  CreateAction,
} from '../../actions/warehouse';
import { WarehouseEntity } from '../../models';
import { WrappedWarehouseForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  closeModal: () => CloseCreateModalAction;
  create: (warehouse: WarehouseEntity) => CreateAction;
}

export class CreateModal extends React.Component<Props> {
  
  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: WarehouseEntity) => {
      if (!err) {
        this.props.create(values);
      }
    })
  }

  render() {
    const {
      visible,
      confirmLoading,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="新增仓库"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedWarehouseForm wrappedComponentRef={ this.saveFormRef } />
      </Modal>
    );
  }

}