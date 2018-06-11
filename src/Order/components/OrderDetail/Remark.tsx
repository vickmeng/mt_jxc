import * as moment from 'moment';

import * as React from 'react';

import {Button , Form ,Input, Modal , Table,} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {ColumnProps} from 'antd/lib/table'
import { OrderAddRemarkParams,OrderRemark, } from '../../models';

import {
  AddOrderRemarkAction,
  LoadOrderRemarkAction,
} from '../../actions/OrderDetail';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface ModalFormProps extends FormComponentProps{}

const remarkConfig = {
  rules: [{  required: true, message: '请填写备注' }],
  initialValue:''
};

class ModalForm extends React.Component<ModalFormProps> {
  render (){
    const { getFieldDecorator} = this.props.form;
    return (<Form >
              <FormItem>
                {getFieldDecorator('remark',remarkConfig)(
                  <TextArea rows={4} maxLength={250} placeholder='添加备注信息，最多250个字'/>
                )}
              </FormItem>
            </Form>)
  }
}

const WrappedModalForm = Form.create()(ModalForm);
interface Props {
  orderId:string,
  remarks:OrderRemark[],
  AddOrderRemark:(param:OrderAddRemarkParams) => AddOrderRemarkAction,
  LoadOrderRemark:(data:string) => LoadOrderRemarkAction;
}

export class Remark  extends React.Component<Props> {
  formRef: React.Component<FormComponentProps>;
  $editor:any
  state = {
    visible:false,
    editorVisible:false,
    editorLoading:false
  }

  columns:Array<ColumnProps<any>>= [{
    dataIndex: 'remark',
    width:400,
  },{
    dataIndex: 'operator',
    width:200
  },{
    dataIndex: 'created',
    render:(t:number)=>moment(t).format('YYYY/MM/DD hh:mm:ss'),
  }];

  constructor(props: Props) {
    super(props);
  }

  onAddRemark = () => {
    const form = this.formRef.props.form;
    const callBack = () => {
      this.setState({
        editorVisible:false,
        editorLoading:false,
      })
    }
    form.validateFields((err: any, values: any) => {
      if (!err) {
        this.setState({editorLoading:true})
        this.props.AddOrderRemark({
          body:{
            ...values,
          },
          orderId:this.props.orderId,
          callBack
        })
      }
    });
  }

  onCancel = () => {
    this.setState({visible:false});
  }
  onCancelEditorModal = () => {
    this.setState({editorVisible:false});
  }

  onOpenEditorModal = () => {
    this.setState({editorVisible:true});
  }

  onShowMore = () => {
    this.setState({visible:true});
  }

  refEditor = (ref:any) => {
    this.$editor = ref;
  }

  saveFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.formRef = formRef;
  }

  templeteRemark = (remark:OrderRemark) => {
    return  <div key={remark.created}>
              <span>{remark.remark}</span><br/>
              <span>{remark.operator} { moment(remark.created).format('YYYY/MM/DD hh:mm:ss') }</span>
            </div>
  }

  templeteShowAllRemarkBtn = () => {
    return this.props.remarks.length > 3 ? <div><a href='javascript:;' onClick={this.onShowMore} >查看更多...</a></div> : <></>
  }

  render() {
    return  <>
              <div className='clearfix'>
                <div className='float_l' style={{width:100}}>备注说明：</div>
                <div className='float_l'>
                  <Button icon='edit' onClick={this.onOpenEditorModal}>添加备注</Button>
                  {this.props.remarks.slice(0,3).map(o => this.templeteRemark(o))}
                  {this.templeteShowAllRemarkBtn()}
                </div>
              </div>

              <Modal
                title = "添加备注"
                visible = {this.state.editorVisible}
                destroyOnClose = {true}
                onCancel={this.onCancelEditorModal}
                footer={[
                  <Button key="back" onClick={this.onCancelEditorModal}>取消</Button>,
                  <Button key="submit" loading={this.state.editorLoading} type="primary" onClick={this.onAddRemark}>
                    确认
                  </Button>
                ]}
              > 
                <WrappedModalForm wrappedComponentRef={ this.saveFormRef }/>
              </Modal>

              <Modal
                title = "备注说明"
                width = {900}
                visible = {this.state.visible}
                destroyOnClose = {true}
                onCancel={this.onCancel}
                footer={null}
              > 
                <Table 
                  rowKey="created" 
                  columns={this.columns} 
                  dataSource={this.props.remarks}
                  bordered ={false}
                  showHeader={false}
                  size = "small"
                  pagination={false}
                  scroll={{ y: 500 }}
                />
              </Modal>
            </>
  }
};