import * as React from 'react';

import {ViewWithParamProps} from 'shared/models'

import {InContainer} from '../components/InOut'
import {OutContainer} from '../components/InOut'

interface Props extends ViewWithParamProps{
}
  
export class InOutView extends React.Component<Props> {
    render() {
        switch(this.props.match.params.stockKind)
            {
            case "in":
                return <InContainer stockKind="S_CRK_RK" />
            case "out":
                return <OutContainer stockKind="S_CRK_CK" />
            default:
                return <></>
        }
    }
}