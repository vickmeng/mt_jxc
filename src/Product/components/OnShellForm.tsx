import * as React from 'react';

import { DatePicker, Form, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RadioChangeEvent } from 'antd/lib/radio';

import { formItemLayout } from '@app/shared/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface OnShelfFormProps extends FormComponentProps {
  wrappedComponentRef: any;
}

interface State {
  isImmediately: boolean;
}

class OnShelfForm extends React.Component<OnShelfFormProps, State> {

  state = {
    isImmediately: true,
  }

  onChange = (e: RadioChangeEvent): void => {
    this.setState({
      isImmediately: e.target.value,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="上架方式"
        >
          { getFieldDecorator('isImmediately', {
            initialValue: this.state.isImmediately,
            rules: [{
              required: true,
            }],
          })(
            <RadioGroup onChange={ this.onChange } >
              <Radio value={ true }>立即上架</Radio>
              <Radio value={ false }>定时上架</Radio>
            </RadioGroup>
          ) }
        </FormItem>
        { !this.state.isImmediately && (
          <FormItem
            { ...formItemLayout }
            label="上架时间"
          >
            { getFieldDecorator('time', {
              rules: [{
                type: 'object', required: true, message: '请选择上架时间',
              }],
            })(
              <DatePicker />
            ) }
          </FormItem>
        ) }
      </Form>
    );
  }
}

export const WrappedOnShelfForm = Form.create()(OnShelfForm);
