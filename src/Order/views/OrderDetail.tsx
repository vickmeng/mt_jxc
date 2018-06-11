import * as React from 'react';

import {ViewWithParamProps} from 'shared/models'

import {OrderDetailTab} from '../components/OrderDetailTab'

interface Props extends ViewWithParamProps{
}
  
export class OrderDetailView extends React.Component<Props> {
    render() {
        return <OrderDetailTab id = {this.props.match.params.id} />
    }
}