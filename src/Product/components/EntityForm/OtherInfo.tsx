import * as React from 'react';

import { Card, Col, DatePicker, Form, Radio, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RadioChangeEvent } from 'antd/lib/radio';
import * as moment from 'moment';

import { formItemLayout } from '@app/shared/constants';

import { ProductFormValues } from '../../models';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface Props extends FormComponentProps {
  product?: ProductFormValues;
}

interface State {
  isImmediately: string;
}

export class OtherInfo extends React.Component<Props, State> {

  state = {
    isImmediately: 'now',
  }

  onChange = (e: RadioChangeEvent): void => {
    this.setState({
      isImmediately: e.target.value,
    });
  }

  render() {
    const { form, product } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card title="其他信息">
        <Row>
          <Col span={ 9 }>
            <FormItem
              { ...formItemLayout }
              label="上架时间"
            >
              { getFieldDecorator('isImmediately', {
                initialValue: product ? product.isImmediately : this.state.isImmediately,
                rules: [{
                  required: true,
                }],
              })(
                <RadioGroup onChange={ this.onChange } >
                  <Radio value="now">立即上架</Radio>
                  <Radio value="timing">定时上架</Radio>
                  <Radio value="later">暂不上架</Radio>
                </RadioGroup>
              ) }
            </FormItem>
          </Col>
        </Row>
        { this.state.isImmediately === 'timing' && (
          <Row>
            <Col span={ 9 }>
              <FormItem
                { ...formItemLayout }
                label="上架时间"
              >
                { getFieldDecorator('time', {
                  initialValue: product ? product.time : moment(),
                  rules: [{
                    type: 'object', required: true, message: '请选择上架时间',
                  }],
                })(
                  <DatePicker />
                ) }
              </FormItem>
            </Col>
          </Row>
        ) }
      </Card>
    );
  }
};

