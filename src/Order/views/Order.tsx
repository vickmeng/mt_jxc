import * as React from 'react';

import {OrderListContainer} from '../components/OrderList'

interface Props {
}
  
export class OrderView extends React.Component<Props> {
    render() {
        return <OrderListContainer/>
    }
}