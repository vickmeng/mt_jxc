import * as React from 'react';

import {ViewWithParamProps} from 'shared/models'

import {TransferDetailContainer} from '../components/TransferDetail/TransferDetailContainer'


interface Props extends ViewWithParamProps{
}
  
export class TransferDetailView extends React.Component<Props> {
    render() {
        return <h1>
            <TransferDetailContainer id={this.props.match.params.id}/>
        </h1>
    }
}