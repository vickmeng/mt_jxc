/**
 * 维康
 */

import * as React from 'react';
import './PayTypeRadioGroup.css';

import { Radio } from 'antd';
import {payTypeMap} from 'shared/constants';
import * as utils from 'shared/utils';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const radioes = utils.mapToSelectors(payTypeMap);


export const PayTypeRadioGroup :React.ReactNode =  (
    <RadioGroup className='PayTypeRadioGroup'>
        {
            radioes.map(o => <RadioButton key={o.value} value={o.value}> {o.label} </RadioButton> )
        }
    </RadioGroup>
)


