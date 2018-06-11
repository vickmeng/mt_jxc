import * as React from 'react';

import {ViewWithParamProps} from 'shared/models'

import {InOutDetailContainer} from '../components/InOutDetail'


interface Props extends ViewWithParamProps{
}
  
export class InOutDetailView extends React.Component<Props> {
    render() {
        switch(this.props.match.params.stockKind)
            {
            case "in":
                return <InOutDetailContainer stockKind = 'S_CRK_RK' stockId={this.props.match.params.id}/>
            case "out":
                return <InOutDetailContainer stockKind = 'S_CRK_CK' stockId={this.props.match.params.id}/>
            default:
                return <></>
        }
    }
}