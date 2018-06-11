import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Button,Form,Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseModal,
  CloseModalAction,
  StockCancel,
  StockCancelAction,
} from '../../actions/stockCancelModal';

import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import {StockCancelModalParams, StockCancelParams,} from '../../models';

const FormItem = Form.Item;
const Textarea = Input.TextArea;

const stockCancelRemarkConfig = {
  rules: [{  required: true, message: '请填写原因' }],
};

interface ModalFormProps extends FormComponentProps{}

class ModalForm extends React.Component<ModalFormProps> {

  render (){
    const { getFieldDecorator} = this.props.form;
    
    return (<Form layout="vertical">
              <FormItem >
                {getFieldDecorator('stockRemark',stockCancelRemarkConfig)(
                  <Textarea rows={4}/>
                )}
              </FormItem>
            </Form>)
  }
}

const WrappedModalForm = Form.create()(ModalForm);

interface Props {
  Row:StockCancelModalParams;
  Visable:boolean;
  Loading:boolean;
  closeModal:() => CloseModalAction;
  stockCancel:(params:StockCancelParams) => StockCancelAction;
}

class Container extends React.Component<Props> {
  formRef: React.Component<FormComponentProps>;

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  handleOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.stockCancel({
          stockTransferId:this.props.Row.stockTransferId,
          ...values
        })
      }
    });
  }

  handleCancel = () => {
    this.props.closeModal();
  }

  render() {
    return  <Modal
              visible={this.props.Visable}
              title="调拨单作废确认"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={this.props.Loading} onClick={this.handleOk}>
                  确认
                </Button>
              ]}
            >
              <p>确认将调拨单 {this.props.Row.stockNO} 作废？调拨单作废后状态不可回退。如确认作废，请填写作废原因：</p>
              <WrappedModalForm wrappedComponentRef={ this.saveFormRef }/>
            </Modal>
  }
}

const mapStateToProps = (state: State) => ({
  Visable     : fromWarehouse.getStockCancelModalVisable(state),
  Loading     : fromWarehouse.getStockCancelModalLoading(state),
  Row         : fromWarehouse.getStockCancelModalRow(state),

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal:() => dispatch(CloseModal()),
  stockCancel:(params:StockCancelParams) => dispatch(StockCancel(params))
});

export const StockCancelModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);