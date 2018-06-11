import * as moment from 'moment';
import * as React from 'react';
import { go } from 'react-router-redux'

import { Radio } from 'antd';
import { store } from 'index'

import { baseTableConfig,totalFlage } from 'shared/constants'
import {
  PaginationConfig,
  Selector,
  TimePickerOutput,
  TimePickerValueType,
} from 'shared/models'


export const getPaginationParams = (o:PaginationConfig) => { // format获取分页参数 vk
  const {pageNo,pageSize} = o;
  return {pageNo,pageSize};
}

export const getRenamedSelectors = (arr:any[]=[] , labelkey = 'label', valuekey = 'value'):Selector[] => { // format获取selectors vk
  return arr.map( (item) => {
      const label = item[labelkey] ;
      const value = item[valuekey] ;
      return {
          ...item
          ,label
          ,value
      }
  })
}

export const getRenamedSelectorsWithAll = (arr:any[]=[] , labelkey = 'label', valuekey = 'value'):any[] => { // format获取selectors,并添加全部选项 vk
  return [
    {label:'全部',value:''},
    ...getRenamedSelectors(arr,labelkey,valuekey)
  ];
}

export const getPagination = (total:number) => { // 获取table接受的分页配置信息 vk
    return {
        ...baseTableConfig,
        showTotal: (t:number )=> <span>共{t}条</span>,
        total
    }
}

export const colspanFormatter = (flage:any, colSpan:number, usualInner: number | string | JSX.Element,totalInner?: number | string | JSX.Element ) => {
  const isTotal = Boolean(flage === totalFlage);
  let children = isTotal ? '合计：' : usualInner
  if(totalInner&&isTotal){
    children = totalInner
  }
  return {
           children,
           props: {
             colSpan: isTotal ? colSpan : 1
         }
  }
} 


export const getTimeToolbarPicked = (picker:TimePickerValueType):TimePickerOutput => { // 提供给TimeToolbar vk
  if(Object.prototype.toString.call(picker) === '[object Array]'){
    return {
      st:moment(picker[0])
      ,et:moment(picker[1])
    };
  }else {
    switch(picker)
    {
      case 'today':
        return {
          st:moment()
          ,et:moment()
        }
      case 'yesterday':
      return {
        st:moment().subtract(1,'days')
        ,et:moment().subtract(1,'days')
      }
      case 'thismouth':
        return {
          st:moment().startOf('month')
          ,et:moment()
        }
      case 'lastmouth':
        return {
          st:moment().subtract(1,'month').startOf('month')
          ,et:moment().subtract(1,'month').endOf('month')
        }
      default:
        return {
          st:moment()
          ,et:moment()
        }
    }
  }
}

export const formatTimeRange = (e:TimePickerOutput) => {// 提供给TimeToolbar format
  return {
    beginTime :moment(e.st).format('YYYY/MM/DD 00:00:00') ,
    endTime : moment(e.et).format('YYYY/MM/DD 23:59:59'),
  }
}


export const templeteRadioButtons = (arr:any[] , labelkey = 'label', valuekey = 'value'):JSX.Element[] => { // 返回RadioButtons，不包含‘全部’, vk
  return arr.map( (item) => {
      const label = item[labelkey];
      const value = item[valuekey];
      return <Radio.Button  key = {value} value = { value } >
              {label}
          </Radio.Button >
  })
}

export const sum = (arr:number[]):number => {
  let total = 0
  arr.forEach(v => {
    total += v
  })
  return total
}

export const sumByKey = (arr:object[],key:string):number => {
  return sum( arr.map( o => o[key] ) );
}

export const goBack = () => {
  store.dispatch(go(-1));
}

export const mapToSelectors = (map:object):Selector[] => Object.keys(map).map(key => ({
    label:map[key],
    value:key
  })
)

export const bodyToQueryStringParameters = (body:object):string => {
  const mapper = (key:string) => {
    return `${key}=${body[key]}`
  }

  let Str = Object.keys(body).map(mapper).join('&');
  if(Str){Str = '?'+Str}
  return Str
}