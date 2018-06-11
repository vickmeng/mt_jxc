import * as React from 'react';

import {Form,Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface ModalFormProps extends FormComponentProps{}

const remarkConfig = {
  rules: [{  required: true, message: '请填写备注' }],
  initialValue:'日期久远，不做记录'
};
class ModalForm extends React.Component<ModalFormProps> {
  render (){
    const { getFieldDecorator} = this.props.form;
    return (<Form >
              <FormItem>
                {getFieldDecorator('remark',remarkConfig)(
                  <TextArea rows={4} maxLength={250} placeholder='请填写作废原因'/>
                )}
              </FormItem>
            </Form>)
  }
}
export const WrappedZFModalForm = Form.create()(ModalForm);