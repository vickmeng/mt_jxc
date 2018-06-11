import * as moment from 'moment';

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Button,Dropdown,Icon,Menu,Modal,Spin,} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {ClickParam} from 'antd/lib/menu'

import { State } from '@app/root';
import {
  DeleteOrderParams,
  OrderAddRemarkParams,
  OrderChangeProductRemarkParams,
  OrderChangeStatusParams,
  OrderRemark,
  orderStatusType,
  StatusChangeType
} from '../../models'

import * as fromOrder from '../../reducers';

import {
  AddOrderRemark,
  AddOrderRemarkAction,
  ChangeOrderProduct,
  ChangeOrderProductAction,
  ChangeOrderStatus,
  ChangeOrderStatusAction,
  DeleteOrder,
  DeleteOrderAction,
  LoadOrderDetail,
  LoadOrderDetailAction,
  LoadOrderRemark,
  LoadOrderRemarkAction,
} from '../../actions/OrderDetail';

import {BaseData
  ,Files
  ,ProductTable
  ,Records
  ,Remark
  ,WrappedTHModalForm
  ,WrappedZFModalForm
} from './index'

interface Props {
  detailData:any;
  remarks:OrderRemark[];
  id:string;
  loading:boolean;
  AddOrderRemark:(param:OrderAddRemarkParams) => AddOrderRemarkAction;
  ChangeOrderProduct:(param:OrderChangeProductRemarkParams) => ChangeOrderProductAction;
  ChangeOrderStatus:(param:OrderChangeStatusParams) => ChangeOrderStatusAction;
  DeleteOrder:(param:DeleteOrderParams) => DeleteOrderAction;
  LoadOrderDetail:(data:string) => LoadOrderDetailAction;
  LoadOrderRemark:(data:string) => LoadOrderRemarkAction;
  ChangeTab:(key:string) => void;
}

class Container extends React.Component<Props> {
  state = {
    THvisible:false,
    THloading:false,
    ZFvisible:false,
    ZFloading:false,
  }
  THformRef: React.Component<FormComponentProps>;
  ZFformRef: React.Component<FormComponentProps>;

  componentWillMount(){
    this.props.LoadOrderDetail(this.props.id);
    this.props.LoadOrderRemark(this.props.id);
  }

  ChangeOrderProduct = (productId:string,value:string) => {
    this.props.ChangeOrderProduct({
      productId,
      remark:value,
      orderId:this.props.id
    })
  }
  onCancelTHModal = () => {
    this.setState({THvisible:false})
  }
  onCancelZFModal = () => {
    this.setState({ZFvisible:false})
  }

  onSubmitTHModal = () => {
    this.setState({
      THloading:true,
    })
    const form = this.THformRef.props.form;
    const callBack = () => {
      this.setState({
        THvisible:false,
        THloading:false,
      })
    }
    form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.ChangeOrderStatus({
          body:{
            ...values,
            checkOperate:'TH'
          },
          orderId:this.props.id,
          callBack
        })
      }
    });
  }
  onSubmitZFModal = () => {
    this.setState({
      ZFloading:true,
    })
    const form = this.ZFformRef.props.form;
    const callBack = () => {
      this.setState({
        ZFvisible:false,
        ZFloading:false,
      })
    }
    form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.ChangeOrderStatus({
          body:{
            ...values,
            checkOperate:'ZF'
          },
          orderId:this.props.id,
          callBack
        })
      }
    });
  }
  onSubmitSCModal = () => {
    return new Promise((resolve, reject) => {
      this.props.DeleteOrder({
        orderId:this.props.id,
        callBack:resolve
      });
    });
  }

  onMenuClick = (key:ClickParam)=>{
    switch(key.key){
      case 'th':
        this.onTH();
        break;
      case 'zf':
        this.onZF();
        break;
      case 'sc':
        this.onSC();
        break;
    }
  }

  onPass = (type:StatusChangeType) => {
    return () => {
      this.props.ChangeOrderStatus({
        body:{
          checkOperate:type
        },
        orderId:this.props.id
      })
    }
  }

  onTH = () => {
    this.setState({THvisible:true})
  }

  onSC = () => {
    const $content = <>
      删除订单为不可逆操作,确定删除订单{this.props.detailData.orderCode}吗？
    </>
    Modal.confirm({
      title: 'Confirm',
      content: $content,
      okText: '确认',
      cancelText: '取消',
      maskClosable:true,
      onCancel() {return},
      onOk:this.onSubmitSCModal
    });
  }


  onZF = () => {
    this.setState({ZFvisible:true})
  }

  onChangeTab = (key:string) => () => {
    this.props.ChangeTab(key)
  }


  templeteButtons = () => {
    let $menu = <></>
    switch( this.props.detailData.orderStatus as orderStatusType)
    {
    case 'DDZT_DDDSH':// 待订单审核
      $menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="zf">作废</Menu.Item>
        </Menu>
      );
      return <>
          <Button type='primary' onClick={this.onPass('SHTG')}>审核通过</Button>
          <Dropdown overlay={$menu}>
            <Button>
              操作 <Icon type="down" />
            </Button>
          </Dropdown>
        </>

    case 'DDZT_DCWSH':// '待财务审核'
      $menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="th">退回</Menu.Item>
        </Menu>
      );
      return <>
        <Button type='primary' onClick={this.onPass('SHTG')}>审核通过</Button>
        <Dropdown overlay={$menu}>
          <Button>
            操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </>

    case 'DDZT_DCKSH':// '待出库审核'
      $menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="th">退回</Menu.Item>
        </Menu>
      );
      return <>
        <Button type='primary' onClick={this.onChangeTab('2')} >出库</Button>
        <Dropdown overlay={$menu}>
          <Button>
            操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </>

    case 'DDZT_DFHQR':// '待发货确认'
      $menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="th">退回</Menu.Item>
        </Menu>
      );
      return <>
        <Button type='primary' onClick={this.onChangeTab('2')} >发货</Button>
        <Dropdown overlay={$menu}>
          <Button>
            操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </>

    case 'DDZT_DSHQR':// '待收货确认'
      return <></>

    case 'DDZT_YWC':// '已完成'
      return <></>

    case 'DDZT_YZF':// '已作废'
      $menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="sc">删除</Menu.Item>
        </Menu>
      );
      return <>
        <Dropdown overlay={$menu}>
          <Button>
            操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </>
    default:
      return <></>
    }
  }

  THFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.THformRef = formRef;
  }
  
  ZFFormRef = (formRef: React.Component<FormComponentProps>) => {
    this.ZFformRef = formRef;
  }

  render() {
    const $buttons = this.templeteButtons()
    return <>
    <Spin spinning = {this.props.loading}>
      {$buttons}
      <BaseData {...this.props.detailData} />
      <ProductTable 
        {...this.props.detailData} 
        ChangeOrderProduct = {this.ChangeOrderProduct}
      />
      <div className='clearfix'>
        <div className='float_l' style={{width:100}}>交货日期：</div>
        <div className='float_l'>
          {moment(this.props.detailData.deliveryDate).format('YYYY/MM/DD') }
        </div>
      </div>
      <Remark 
        orderId = {this.props.id} 
        remarks={this.props.remarks}
        LoadOrderRemark = {this.props.LoadOrderRemark}
        AddOrderRemark = {this.props.AddOrderRemark}
      />
      <Files />
      <Records records = {this.props.detailData.orderRecords}/>
    </Spin>

    <Modal
      title = "订单退回确认"
      visible = {this.state.THvisible}
      destroyOnClose = {true}
      onCancel={this.onCancelTHModal}
      footer={[
        <Button key="back" onClick={this.onCancelTHModal}>取消</Button>,
        <Button key="submit" type="primary"  onClick={this.onSubmitTHModal}>
          确认
        </Button>
      ]}
    > 
      确定将订货单{this.props.detailData.orderCode}退回？如确定退回，请填写退回原因：
      <WrappedTHModalForm wrappedComponentRef={ this.THFormRef }/>
    </Modal>

    <Modal
      title = "订单作废确认"
      visible = {this.state.ZFvisible}
      destroyOnClose = {true}
      onCancel={this.onCancelZFModal}
      footer={[
        <Button key="back" onClick={this.onCancelZFModal}>取消</Button>,
        <Button key="submit" type="primary"  onClick={this.onSubmitZFModal}>
          确认
        </Button>
      ]}
    > 
      确定将订货单{this.props.detailData.orderCode}作废？
      如有关联出库单将一并作废，相应的库存将退回原有仓库。
      如确定作废，请填写作废原因：
      <WrappedZFModalForm wrappedComponentRef={ this.ZFFormRef }/>
    </Modal>
    </>

  }
}

const mapStateToProps = (state: State) => ({
  loading:fromOrder.getOrderDetailLoading(state),
  detailData:fromOrder.getOrderDetailDetailData(state),
  remarks:fromOrder.getOrderDetailRemarks(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AddOrderRemark : (params:OrderAddRemarkParams) => dispatch(AddOrderRemark(params)),
  ChangeOrderProduct:(params:OrderChangeProductRemarkParams) => dispatch(ChangeOrderProduct(params)),
  ChangeOrderStatus:(params:OrderChangeStatusParams) => dispatch(ChangeOrderStatus(params)),
  DeleteOrder:(params:DeleteOrderParams)=> dispatch(DeleteOrder(params)),
  LoadOrderDetail : (params:string) => dispatch(LoadOrderDetail(params)),
  LoadOrderRemark : (params:string) => dispatch(LoadOrderRemark(params)),
});

export const OrderDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);