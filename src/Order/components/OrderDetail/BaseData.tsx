import * as React from 'react';


import {orderStatusMap} from '../../constants';
import {OrderAddrParams,orderStatusType} from '../../models';

interface Props {
  orderStatus:orderStatusType,
  orderCode:string,
  tenantName:string,
  orderAddr:OrderAddrParams
}

export class BaseData extends React.Component<Props> {
  static defaultProps = {
    orderAddr:{}
  }

  render() {
    return <div className='clearfix'>
      <div className='float_l'  style={{lineHeight:'70px',marginRight:'50px'}}>
        <h3 style={{margin:'0px'}}> { orderStatusMap[this.props.orderStatus] } </h3>
      </div>
      <div  className='float_l' style={{lineHeight:'35px'}}>
        <div>
          订单号：{this.props.orderCode}&nbsp;&nbsp;
          客户名称：{this.props.tenantName}
        </div>
        <div>
          收货信息：{this.props.orderAddr.receiver}&nbsp;,
          &nbsp;{this.props.orderAddr.mobile}&nbsp;,
          &nbsp;{this.props.orderAddr.addr}
        </div>
      </div>
    </div>
  }
}

