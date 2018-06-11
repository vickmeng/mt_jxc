import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseCreateModalAction,
  CreateAction,
} from '../../actions/unit';
import { UnitEntity } from '../../models';
import { WrappedUnitForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  closeModal: () => CloseCreateModalAction;
  create: (unit: UnitEntity) => CreateAction;
}

export class CreateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: UnitEntity) => {
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
        title="新增单位"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedUnitForm wrappedComponentRef={ this.saveFormRef } />
      </Modal>
    );
  }
}