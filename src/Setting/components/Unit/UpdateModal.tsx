import * as React from 'react';

import { Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseUpdateModalAction,
  UpdateAction,
} from '../../actions/unit';
import { Unit, UnitEntity } from '../../models';
import { WrappedUnitForm } from './Form';

interface Props {
  visible: boolean;
  confirmLoading: boolean;
  editedUnit: Unit;
  closeModal: () => CloseUpdateModalAction;
  update: (unit: UnitEntity) => UpdateAction;
}

export class UpdateModal extends React.Component<Props> {
  
  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  submit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: UnitEntity) => {
      if (!err) {
        this.props.update({
          ...values,
          id: this.props.editedUnit.id,
        });
      }
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      editedUnit,
      closeModal,
    } = this.props;

    return (
      <Modal
        title="编辑计量单位"
        visible={ visible }
        confirmLoading={ confirmLoading }
        onOk={ this.submit }
        onCancel={ closeModal }
        destroyOnClose
      >
        <WrappedUnitForm wrappedComponentRef={ this.saveFormRef } unit={ editedUnit } />
      </Modal>
    );
  }

}