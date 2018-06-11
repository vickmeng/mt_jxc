import * as React from 'react';

import {ViewWithParamProps} from 'shared/models'

import {CreateInOutContainer} from '../components/CreateInOut/CreateInOutContainer'


interface Props extends ViewWithParamProps{
}
  
export class CreateInOutView extends React.Component<Props> {
    render() {
        switch(this.props.match.params.stockKind)
            {
            case "in":
                return <CreateInOutContainer stockKind = 'S_CRK_RK'/>
            case "out":
                return <CreateInOutContainer stockKind = 'S_CRK_CK'/>
            default:
                return <></>
        }
    }
}