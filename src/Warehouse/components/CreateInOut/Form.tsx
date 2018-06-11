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
import {EditableInventoryTableColumnProps as ColumnProps,stockKindType} from '../../models'
import { EditableInventoryTableContainer} from '../Common/EditableInventoryTable';

interface Props extends FormComponentProps{
  stockKind:stockKindType
  onSubmit:(formData:object,tableData:any[]) => void;
  StockTypes:any[];
  Warehouses:any[];
  Saving:boolean;
  initialStockCode:string;
}

export interface FormValueProps {
  warehouseId:number;
  stockTime:any;
  stockNO:string;
  stockType:string;
  stockRemark:string;
}

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const Option = Select.Option;



class CreateInOutForm extends React.Component<Props> {
  tabledata:any[] = [];
  constructor(props: Props) {
    super(props);
  }
  getInitialStockNO = ():string => {
    const kind = this.props.stockKind === 'S_CRK_RK' ? 'IN' :"OUT"
    const time = moment().format('YYYYMMDD');
    return `${kind}-${time}-${this.props.initialStockCode}`;
  }

  onSubmit = (e:React.FormEvent<Event>) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:FormValueProps) => {
      if (!err) {
        values.stockTime = new Date(values.stockTime).getTime();
        this.props.onSubmit(values,this.tabledata);
      }
    });
  }

  onTableChange = (tabledata:ColumnProps[]) => {
    this.tabledata = tabledata;
  }

  render() {
    const { getFieldDecorator} = this.props.form;

    const warehouseIdConfig = {
      rules: [{ type: 'number', required: true,message: '请选择仓库' }],
    }
    const stockNOConfig = {
      rules: [{ type: 'string', required: true, message: '请输入单号' }],
      initialValue:this.getInitialStockNO(),
    };

    const stockKindCN = this.props.stockKind === 'S_CRK_RK' ? '入库' :"出库"

    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>

        <FormItem label = "仓库" {...formItemLayout}>
          {getFieldDecorator('warehouseId',warehouseIdConfig)(
            <Select style={{ width: 300 }} placeholder='请选择仓库'>
              {
                this.props.Warehouses.map((warehouse) => <Option key={warehouse.id} value={warehouse.id}>{warehouse.warehouseName}</Option>)
              }
           </Select>
          )}
        </FormItem>

        <FormItem label = {`${stockKindCN}日期`} {...formItemLayout}>
          {getFieldDecorator('stockTime')(
            <DatePicker showTime format="YYYY/MM/DD HH:mm:ss" style={{ width: 300 }}/>
          )}
        </FormItem>

        <FormItem label = {`${stockKindCN}单号`} {...formItemLayout}>
          {getFieldDecorator('stockNO',stockNOConfig)(
            <Input  placeholder="请输入单号" style={{ width: 300 }}/>
          )}
        </FormItem>

        <FormItem label = {`${stockKindCN}类型`} {...formItemLayout}>
          {getFieldDecorator('stockType')(
            <Select style={{ width: 300 }} placeholder='请选择类型'>
            {
              this.props.StockTypes.map((type) => <Option key={type.id} value={type.sysCode}>{type.sysName}</Option>)
            }
            </Select>
          )}
        </FormItem>

        <FormItem {...formTailLayout}>
          <EditableInventoryTableContainer onChange = {this.onTableChange}/>
        </FormItem>

        <FormItem label = "备注" {...formItemLayout}>
          {getFieldDecorator('stockRemark')(
            <TextArea style={{ width: 500 }} rows={6} maxLength={200} placeholder="请输入备注信息，最多不要超过200字"/>
          )}
        </FormItem>

        <FormItem label = "制单人" {...formItemLayout}>
          <Input placeholder="请输入单号"  disabled = {true} defaultValue="手阿手动" style={{ width: 300 }}/> 
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
          <Button 
            onClick={utils.goBack}
            style={{ width: 140 }}
          >
            取消
          </Button>
        </FormItem>
      </Form>
    )
  }
};

export const WrappedCreateInOutForm = Form.create({})(CreateInOutForm);


