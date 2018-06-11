import * as React from 'react';

import { Button , Checkbox, Form , Input , Radio } from 'antd';

import { FormComponentProps } from 'antd/lib/form';

import { MTqueryToolbar } from "@app/shared/components";

import {trueOrfalseSelectors} from "@app/shared/constants";

import {getRenamedSelectors 
  // ,getRenamedSelectorsWithAll
  ,templeteRadioButtons} from "@app/shared/utils";

import {toolbarLableCol} from "@app/shared/constants";


interface Props extends FormComponentProps{
  categories:any[],
  brands:any[],
  warehouses:any[]
  onSubmit:(values:object) => void;
  onChange:(changedValues:object,allValues:object) => void;
}

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class InventoryToolbarForm extends React.Component<Props> {

  // state = {
  //   isOnlineSelectors:getRenamedSelectorsWithAll(trueOrfalseSelectors)
  // }

  constructor(props: Props) {
    super(props);
  }

  onCheckAllBrands = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        productBrandIds:this.props.brands.map(o => o.id)
      })
    } else {
      this.props.form.setFieldsValue({
        productBrandIds:[]
      })
    }
  }
  onCheckAllIsOnline = () => {
    this.props.form.setFieldsValue({
      isOnline:null
    })
  }

  onCheckAllCategories = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        productCategoryIds:this.props.categories.map(o => o.id)
      })
    } else {
      this.props.form.setFieldsValue({
        productCategoryIds:[]
      })
    }
  }

  onCheckAllWarehouses  = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        warehouseIds:this.props.warehouses.map(o => o.id)
      })
    } else {
      this.props.form.setFieldsValue({
        warehouseIds:[]
      })
    }
  }


  onSubmit = (e:React.FormEvent<Event>) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:object) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }


  render() {
    const { getFieldDecorator} = this.props.form;

    const $right =  <div className="queryToolbarRightside">
                      <FormItem>
                        {getFieldDecorator('queryKey',{
                          initialValue: '',
                        })(
                          <Input style = {{width:'250px'}} placeholder="请输入商品名称/编码/规格/条形码"/>
                        )}
                      </FormItem>
                      <FormItem>
                        <Button
                          type="primary"
                          htmlType="submit"
                        >
                          搜索
                        </Button>
                      </FormItem>
                    </div>;

    const $content = <>
        <FormItem label = "品牌:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllBrands} >全部</Checkbox>
          {getFieldDecorator('productBrandIds')(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.brands,'productBrandName','id') } />
          )}
        </FormItem>

        <FormItem label = "分类:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllCategories} >全部</Checkbox>
          {getFieldDecorator('productCategoryIds',)(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.categories,'productCategoryName','id') } />
          )}
        </FormItem>
        <FormItem label = "所属仓库:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllWarehouses} >全部</Checkbox>
          {getFieldDecorator('warehouseIds')(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.warehouses,'warehouseName','id') } />
          )}
        </FormItem>
        <FormItem label = "是否上架:" labelCol = {toolbarLableCol}>
          <Radio.Group onChange={this.onCheckAllIsOnline}>
            <Radio.Button value=''>全部</Radio.Button>
          </Radio.Group>
          {getFieldDecorator('isOnline')(
            <Radio.Group >
              {templeteRadioButtons(trueOrfalseSelectors)}
            </Radio.Group>
          )}
        </FormItem>
    </>

    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <MTqueryToolbar
          title="商品库存"
          rightContent = {$right}
        >
          {$content}
        </MTqueryToolbar>
      </Form>
    )
  }
};

function onValuesChange(props:any,changedValues:object,allValues:object){
  props.onChange(changedValues,allValues);
}

export const WrappedInventoryToolbarForm = Form.create({
  onValuesChange
})(InventoryToolbarForm);


