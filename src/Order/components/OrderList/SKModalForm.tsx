import * as React from 'react';

import {
  Form,
  Input,
  InputNumber,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {PayTypeRadioGroup,PicturesWall} from 'shared/components';
import {formItemInModalLayout} from 'shared/constants';

import {MTmoney} from 'shared/components'

// import * as utils from 'shared/utils';

import {OrderRow} from '../../models';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface ModalFormProps extends FormComponentProps{
  row:OrderRow
}

const moneyConfig = {
  rules: [{  required: true, message: '请填写金额' }],
  initialValue:0
};
const payTypeConfig = {
  rules: [{  required: true, message: '选择支付方式' }],
  initialValue:'ZFFS_XJZF'
};
const remarkConfig = {
  initialValue:''
};

const normFile = (e:any[]):string => {
  const fileList =  e.map( o => ({
    name:o.name,
    url:o.url
  }))
  return JSON.stringify(fileList);
}

class ModalForm extends React.Component<ModalFormProps> {
  attachConfig = {
    initialValue:'',
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
  }

  render (){
    const { getFieldDecorator} = this.props.form;
    return (<Form >
              <FormItem label="待收款"  { ...formItemInModalLayout }>
                <MTmoney value={this.props.row.realFee} icon='￥'/>
              </FormItem>

              <FormItem label="收款金额"  { ...formItemInModalLayout }>
                {getFieldDecorator('money',moneyConfig)(
                  <InputNumber  min={0} max={this.props.row.realFee} style={{width:100}}/>
                )}
                &nbsp;元
              </FormItem>

              <FormItem label="收款方式"  { ...formItemInModalLayout }>
                {getFieldDecorator('payType',payTypeConfig)(
                  PayTypeRadioGroup
                )}
              </FormItem>

              <FormItem label="备注"  { ...formItemInModalLayout }>
                {getFieldDecorator('remark',remarkConfig)(
                  <TextArea maxLength={250} rows={4}/>
                )}
              </FormItem>

              <FormItem label="附件"  { ...formItemInModalLayout }>
                {getFieldDecorator('attach',this.attachConfig)(
                    <PicturesWall max={4}/>
                )}
              </FormItem>
            </Form>)
  }
}
export const WrappedSKModalForm = Form.create()(ModalForm);