import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseCreateModalAction,
  CreateAction,
} from '../../actions/brand';
import { BrandEntity } from '../../models';
import { WrappedBrandForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  closeModal: () => CloseCreateModalAction;
  create: (brand: BrandEntity) => CreateAction;
}

export class CreateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: BrandEntity) => {
      if (!err) {
        this.props.create(values);
      }
    });
  }

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  render() {
    const {
      visible,
      confirmLoading,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="新增商品品牌"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedBrandForm wrappedComponentRef={ this.saveFormRef } />
      </Modal>
    );
  }
}