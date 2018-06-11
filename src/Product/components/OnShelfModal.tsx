import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  BatchSetStatusAction,
  CloseOnShelfModalAction,
} from '../actions/product';
import { OnShelfFormValue, OnShelfParams } from '../models';
import { WrappedOnShelfForm } from './OnShellForm';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  selectedRowKeys: number[];
  closeModal: () => CloseOnShelfModalAction;
  batchSetStatus: (params: OnShelfParams) => BatchSetStatusAction;
}

export class OnShelfModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  getParams = (values: OnShelfFormValue): OnShelfParams => {
    const params: OnShelfParams = {
      productIds: this.props.selectedRowKeys,
      isOnline: true,
    };
    if (typeof values.time !== 'undefined') {
      params.onlineTime = values.time.valueOf();
    }
    return params;
  };

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: OnShelfFormValue) => {
      if (!err) {
        this.props.batchSetStatus(this.getParams(values));
      }
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="上架商品"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedOnShelfForm wrappedComponentRef={ this.saveFormRef } />
      </Modal>
    );
  }
}
