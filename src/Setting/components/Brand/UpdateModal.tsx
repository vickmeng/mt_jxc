import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseUpdateModalAction,
  UpdateAction,
} from '../../actions/brand';
import { Brand, BrandEntity } from '../../models';
import { WrappedBrandForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  editedBrand: Brand;
  closeModal: () => CloseUpdateModalAction;
  update: (brand: BrandEntity) => UpdateAction;
}

export class UpdateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: BrandEntity) => {
      if (!err) {
        this.props.update({
          ...values,
          id: this.props.editedBrand.id,
        });
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
      editedBrand,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="编辑商品品牌"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedBrandForm wrappedComponentRef={ this.saveFormRef } brand={ editedBrand } />
      </Modal>
    );
  }
}