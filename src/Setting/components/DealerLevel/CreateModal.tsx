import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { convertToDiscount } from '@app/shared/utils';
import {
  CloseCreateModalAction,
  CreateAction,
} from '../../actions/dealerLevel';
import { DealerLevelEntity } from '../../models';
import { WrappedDealerLevelForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  closeModal: () => CloseCreateModalAction;
  create: (dealerLevel: DealerLevelEntity) => CreateAction;
}

export class CreateModal extends React.Component<Props> {
  
  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: DealerLevelEntity) => {
      if (!err) {
        this.props.create({
          ...values,
          discount: convertToDiscount(values.discount),
        });
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
        title="新增经销商级别"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedDealerLevelForm wrappedComponentRef={ this.saveFormRef } />
      </Modal>
    );
  }
}