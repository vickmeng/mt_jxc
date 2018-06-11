import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as moment from 'moment';

import {Button,DatePicker,Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CloseModal,
  CloseModalAction,
  StockIn,
  StockInAction,
} from '../../actions/stockInModal';

import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import {StockInModalParams, StockInParams,} from '../../models';

const FormItem = Form.Item;
const stockInTimeConfig = {
  rules: [{  required: true, message: '请选择时间' }],
  initialValue:moment()
};

interface ModalFormProps extends FormComponentProps{}

class ModalForm extends React.Component<ModalFormProps> {

  render (){
    const { getFieldDecorator} = this.props.form;
    
    return (<Form >
              <FormItem  label='调入时间' labelCol = {{span:8}}>
                {getFieldDecorator('stockInTime',stockInTimeConfig)(
                  <DatePicker showTime format="YYYY/MM/DD HH:mm:ss" />
                )}
              </FormItem>
            </Form>)
  }
}

const WrappedModalForm = Form.create()(ModalForm);

interface Props {
  Row:StockInModalParams;
  Visable:boolean;
  Loading:boolean;
  closeModal:() => CloseModalAction;
  stockIn:(params:StockInParams) => StockInAction;
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
        this.props.stockIn({
          stockTransferId:this.props.Row.stockTransferId,
          stockInTime:new Date(values.stockInTime).getTime(),
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
              title="调拨单入库确认"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" loading={this.props.Loading} onClick={this.handleOk}>
                  确认
                </Button>
              ]}
            >
              <p>确认将调拨单 {this.props.Row.stockNO} 入库到 {this.props.Row.stockInWarehouseName} ？此操作不可撤销。</p>
              <WrappedModalForm wrappedComponentRef={ this.saveFormRef }/>
            </Modal>
  }
}

const mapStateToProps = (state: State) => ({
  Visable     : fromWarehouse.getStockInModalVisable(state),
  Loading     : fromWarehouse.getStockInModalLoading(state),
  Row         : fromWarehouse.getStockInModalRow(state),

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal:() => dispatch(CloseModal()),
  stockIn:(params:StockInParams) => dispatch(StockIn(params))
});

export const StockInModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
