import * as React from 'react';

import {store} from 'index'

import {
    SetQueryParams
  } from '../actions/inOutList';

import {ViewWithParamProps} from 'shared/models'

import {InOutListContainer} from '../components/InOutList'


interface Props extends ViewWithParamProps{
}
  
export class InOutListView extends React.Component<Props> {
    render() {
        store.dispatch(SetQueryParams({queryKey:this.props.match.params.queryKey}));
        return <InOutListContainer initialQuerykey = {this.props.match.params.queryKey}/>
    }
}