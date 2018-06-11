import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseUpdateModalAction,
  UpdateAction,
} from '../../actions/category';
import { Category, CategoryEntity } from '../../models';
import { WrappedCategoryForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  editedCategory: Category;
  closeModal: () => CloseUpdateModalAction;
  update: (category: CategoryEntity) => UpdateAction;
}

export class UpdateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: CategoryEntity) => {
      if (!err) {
        this.props.update({
          ...values,
          id: this.props.editedCategory.id,
        });
      }
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      editedCategory,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="编辑商品分类"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedCategoryForm wrappedComponentRef={ this.saveFormRef } category={ editedCategory } />
      </Modal>
    );
  }
}