import * as React from 'react';

import * as moment from 'moment';
import * as utils from 'shared/utils';

import {
  Button, 
  DatePicker,
  Form,
  Input,
  Select,
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';

import {formItemLayout,formTailLayout} from 'shared/constants'
import {EditableInventoryTableColumnProps as ColumnProps} from '../../models'
import { EditableInventoryTableContainer} from '../Common/EditableInventoryTable';

interface Props extends FormComponentProps{
  initialStockCode:string,
  onSubmit:(formData:object,tableData:any[]) => void;
  Warehouses:any[];
  Saving:boolean;
}

export interface FormValueProps {
  stockOutWarehouseId:number;
  stockInWarehouseId:number;
  stockOutTime:number;
  stockNO:string;
  stockRemark:string;
}

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const Option = Select.Option;



class CreateTransferForm extends React.Component<Props> {
  tabledata:any[] = [];
  
  constructor(props: Props) {
    super(props);
  }
  getInitialStockNO = ():string => {
    const time = moment().format('YYYYMMDD');
    return `IO-${time}-${this.props.initialStockCode}`;
  }
  
  onSubmit = (e:React.FormEvent<Event>) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:FormValueProps) => {
      if (!err) {
        values.stockOutTime = new Date(values.stockOutTime).getTime();
        this.props.onSubmit(values,this.tabledata);
      }
    });
  }

  onTableChange = (tabledata:ColumnProps[]) => {
    this.tabledata = tabledata;
  }

  render() {
    const { getFieldDecorator} = this.props.form;

    const stockOutTimeConfig = {
      rules: [{  required: true,message: '请选择时间' }],
      initialValue:moment(),
    }
    
    const stockNOConfig = {
      rules: [{ type: 'string', required: true, message: '请输入单号' }],
      initialValue:this.getInitialStockNO(),
    };
  
    const warehouseConfig = {
      rules: [{ type: 'number', required: true,message: '请选择仓库' }],
    }


    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <FormItem label = "调出仓" {...formItemLayout}>
          {getFieldDecorator('stockOutWarehouseId' , warehouseConfig)(
            <Select placeholder='请选择调出仓库' style={{ width: 300 }}>
              {
                this.props.Warehouses.map((warehouse) => <Option key={warehouse.id} value={warehouse.id}>{warehouse.warehouseName}</Option>)
              }
            </Select>
          )}
        </FormItem>

        <FormItem label = "调入仓" {...formItemLayout}>
          {getFieldDecorator('stockInWarehouseId' , warehouseConfig)(
            <Select placeholder='请选择调入仓库' style={{ width: 300 }}>
              {
                this.props.Warehouses.map((warehouse) => <Option key={warehouse.id} value={warehouse.id}>{warehouse.warehouseName}</Option>)
              }
            </Select>
          )}
        </FormItem>

        <FormItem label = "调出日期" {...formItemLayout}>
          {getFieldDecorator('stockOutTime' , stockOutTimeConfig)(
            <DatePicker showTime format="YYYY/MM/DD HH:mm" style={{ width: 300 }}/>
          )}
        </FormItem>

        <FormItem label = "调拨单号" {...formItemLayout}>
          {getFieldDecorator('stockNO' , stockNOConfig)(
            <Input placeholder="请输入单号" style={{ width: 300 }}/>
          )}
        </FormItem>

        <FormItem {...formTailLayout}>
          <EditableInventoryTableContainer onChange = {this.onTableChange}/>
        </FormItem>

        <FormItem label = "备注" {...formItemLayout}>
          {getFieldDecorator('stockRemark')(
            <TextArea rows={6} maxLength={200} placeholder="请输入备注信息，最多不要超过200字" style={{ width: 500 }}/>
          )}
        </FormItem>

        <FormItem label = "制单人" {...formItemLayout}>
          <Input placeholder="请输入单号" disabled = {true} defaultValue="手阿手动" style={{ width: 300 }}/> 
        </FormItem>

        <FormItem  {...formTailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.Saving}
            style={{ width: 140 }}
          >
            保存
          </Button>
          &nbsp;&nbsp;
          <Button onClick={utils.goBack} style={{ width: 140 }}>
            取消
          </Button>
        </FormItem>
      </Form>
    )
  }
};

export const WrappedCreateTransferForm = Form.create({})(CreateTransferForm);


