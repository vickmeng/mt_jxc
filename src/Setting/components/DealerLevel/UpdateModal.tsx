import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { convertToDiscount } from '@app/shared/utils';
import {
  CloseUpdateModalAction,
  UpdateAction,
} from '../../actions/dealerLevel';
import { DealerLevel, DealerLevelEntity } from '../../models';
import { WrappedDealerLevelForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  editedDealerLevel: DealerLevel;
  closeModal: () => CloseUpdateModalAction;
  update: (dealerLevel: DealerLevelEntity) => UpdateAction;
}

export class UpdateModal extends React.Component<Props> {

  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: DealerLevelEntity) => {
      if (!err) {
        this.props.update({
          ...values,
          tenantLevelId: this.props.editedDealerLevel.id,
          discount: convertToDiscount(values.discount),
        });
      }
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      editedDealerLevel,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="编辑经销商级别"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedDealerLevelForm wrappedComponentRef={ this.saveFormRef } dealerLevel={ editedDealerLevel } />
      </Modal>
    );
  }

}