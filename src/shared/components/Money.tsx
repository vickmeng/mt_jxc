/**
 * 维康
 */

import * as React from 'react';

interface BaseProps {
    value:number;
    icon?:string | JSX.Element;
    bodyStyle?:object;
    iconStyle?:object;
    intStyle?:object;
    decStyle?:object;
  }

const defaultProps:BaseProps ={
    value : 0,
}

const Money:React.SFC<BaseProps> = (props= defaultProps) => {

    const value = +props.value.toFixed(2);
    const valueSplite = (value+'').split('.')
    const int = valueSplite[0];
    const dec = valueSplite[1] ? '.' + valueSplite[1] : '';
 
    const $icon = <span style={props.iconStyle} >{props.icon}</span>;
    const $int = <span style={props.intStyle} >{int}</span>;
    const $dec = <span style={props.decStyle} >{dec}</span>;

    return  <span style={props.bodyStyle}>
                {$icon}
                {$int}
                {$dec}
            </span>
}

export default Money;