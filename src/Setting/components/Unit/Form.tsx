import * as React from 'react';

import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';
import { Unit } from '../../models';

const FormItem = Form.Item;

interface UnitFormProps extends FormComponentProps {
  wrappedComponentRef: any;
  unit?: Unit;
}

class UnitForm extends React.Component<UnitFormProps> {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { unit } = this.props;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="单位名称"
        >
          { getFieldDecorator('productUnitName', {
            initialValue: unit ? unit.productUnitName : '',
            rules: [{
              required: true, message: '请输入计量单位名称',
            }],
          })(
            <Input />
          ) }
        </FormItem>
      </Form>
    );
  }
}

export const WrappedUnitForm = Form.create()(UnitForm);