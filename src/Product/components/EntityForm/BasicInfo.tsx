import * as React from 'react';

import { Card, Col, Form, Input, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';

import { Brand, Category, Unit } from '@app/Setting/models';
import { ProductFormValues } from '../../models';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props extends FormComponentProps {
  brands: Brand[];
  categories: Category[];
  units: Unit[];
  product?: ProductFormValues;
}

export const BasicInfo: React.SFC<Props> = ({
  form,
  brands,
  categories,
  units,
  product,
}) => {

  const { getFieldDecorator } = form;

  return (
    <Card title="基本信息">
      <Row>
        <Col span={ 9 }>
          <FormItem
            { ...formItemLayout }
            label="商品编码"
          >
            { getFieldDecorator('productNO', {
              initialValue: product ? product.productNO : '',
              rules: [{
                required: true, message: '请输入商品编码',
              }],
            })(
              <Input />
            ) }
          </FormItem>
        </Col>
        <Col span={ 9 } offset={ 2 }>
          <FormItem
            { ...formItemLayout }
            label="条形码"
          >
            { getFieldDecorator('productBarCode', {
              initialValue: product ? product.productBarCode : '',
            })(
              <Input placeholder="请输入商品条形码 (支持扫码枪)" />
            ) }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={ 9 }>
          <FormItem
            { ...formItemLayout }
            label="商品名称"
          >
            { getFieldDecorator('productName', {
              initialValue: product ? product.productName : '',
              rules: [{
                required: true, message: '请输入商品名称',
              }],
            })(
              <Input />
            ) }
          </FormItem>
        </Col>
        <Col span={ 9 } offset={ 2 }>
          <FormItem
            { ...formItemLayout }
            label="品牌"
          >
            { getFieldDecorator('productBrandId', {
              initialValue: product ? product.productBrandId : null,
            })(
              <Select>
                { brands.map(brand => 
                  <Option key={ brand.id } value={ brand.id }>{ brand.productBrandName }</Option>
                ) }
              </Select>
            ) }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={ 9 }>
          <FormItem
            { ...formItemLayout }
            label="商品分类"
          >
            { getFieldDecorator('productCategoryId', {
              initialValue: product ? product.productCategoryId : null,
              rules: [{
                required: true, message: '请选择商品分类',
              }],
            })(
              <Select>
                { categories.map(category => 
                  <Option key={ category.id } value={ category.id }>{ category.productCategoryName }</Option>
                ) }
              </Select>
            ) }
          </FormItem>
        </Col>
        <Col span={ 9 } offset={ 2 }>
          <FormItem
            { ...formItemLayout }
            label="计量单位"
          >
            { getFieldDecorator('productUnitId', {
              initialValue: product ? product.productUnitId : null,
              rules: [{
                required: true, message: '请选择计量单位',
              }],
            })(
              <Select>
                { units.map(unit => 
                  <Option key={ unit.id } value={ unit.id }>{ unit.productUnitName }</Option>
                ) }
              </Select>
            ) }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={ 9 }>
          <FormItem
            { ...formItemLayout }
            label="排序值"
          >
            { getFieldDecorator('priority', {
              initialValue: product ? product.priority : '',
            })(
              <Input placeholder="数字越小，排名越靠前" />
            ) }
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};
