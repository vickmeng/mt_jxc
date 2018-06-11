import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseCreateModalAction,
  CreateAction,
} from '../../actions/category';
import { CategoryEntity } from '../../models';
import { WrappedCategoryForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  closeModal: () => CloseCreateModalAction;
  create: (category: CategoryEntity) => CreateAction;
}

export class CreateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;
  
  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: CategoryEntity) => {
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
      closeModal,
      confirmLoading,
    } = this.props;

    return (
      <>
        <Modal
          title="新增商品分类"
          visible={ visible }
          confirmLoading={ confirmLoading }
          onOk={ this.submit }
          onCancel={ closeModal }
          destroyOnClose
        >
          <WrappedCategoryForm wrappedComponentRef={ this.saveFormRef } />
        </Modal>    
      </>
    )
  }
};