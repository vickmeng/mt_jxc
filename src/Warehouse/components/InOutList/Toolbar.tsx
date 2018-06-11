import * as React from 'react';

import {
   Button 
  , Checkbox
  , Form 
  , Input  } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { MTqueryToolbar } from "@app/shared/components";
import {getRenamedSelectors} from "@app/shared/utils";

import {toolbarLableCol} from "@app/shared/constants";

interface Props extends FormComponentProps{
  queryKey:string
  brands:any[],
  categories:any[],
  stockTypes:any[],
  warehouses:any[],
  onSubmit:(values:object) => void;
  onChange:(changedValues:object,allValues:object) => void;
}

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class InventoryToolbarForm extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
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

  onCheckAllCategories  = (e:any) => {
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

  onCheckAllBrands  = (e:any) => {
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

  onCheckAllstockTypes  = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        stockTypes:this.props.stockTypes.map(o => o.sysCode)
      })
    } else {
      this.props.form.setFieldsValue({
        stockTypes:[]
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
                          initialValue: this.props.queryKey,
                        })(
                          <Input style = {{width:'250px'}} placeholder="商品名称/编码/规格/条形码"/>
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
        <FormItem label = "仓库:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllWarehouses} >全部</Checkbox>
          {getFieldDecorator('warehouseIds',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.warehouses,'warehouseName','id') } />
          )}
        </FormItem>

        <FormItem label = "商品分类:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllCategories} >全部</Checkbox>
          {getFieldDecorator('productCategoryIds',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.categories,'productCategoryName','id') } />
          )}
        </FormItem>

        <FormItem label = "商品品牌:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllBrands} >全部</Checkbox>
          {getFieldDecorator('productBrandIds',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.brands,'productBrandName','id') } />
          )}
        </FormItem>

        <FormItem label = "类型:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllstockTypes} >全部</Checkbox>
          {getFieldDecorator('stockTypes',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.stockTypes,'sysName','sysCode') } />
          )}
        </FormItem>
    </>

    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <MTqueryToolbar
          title='出入库明细'
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

export const WrappedInOutToolbarForm = Form.create({
  onValuesChange
})(InventoryToolbarForm);