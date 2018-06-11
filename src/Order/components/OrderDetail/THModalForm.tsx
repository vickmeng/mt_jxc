import * as React from 'react';

import {Form,Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface THModalFormProps extends FormComponentProps{}

const remarkConfig = {
  rules: [{  required: true, message: '请填写备注' }],
  initialValue:''
};
class THModalForm extends React.Component<THModalFormProps> {
  render (){
    const { getFieldDecorator} = this.props.form;
    return (<Form >
              <FormItem>
                {getFieldDecorator('remark',remarkConfig)(
                  <TextArea rows={4} maxLength={250} placeholder='请填写退回原因'/>
                )}
              </FormItem>
            </Form>)
  }
}
export const WrappedTHModalForm = Form.create()(THModalForm);