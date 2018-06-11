import * as moment from 'moment';
import * as React from 'react';

import { Table,} from 'antd';
import {ColumnProps} from 'antd/lib/table'

import {contentMap ,operateTypeMap} from '../../constants'

interface Props {
  records:any[]
}

export class Records extends React.Component<Props> {
  columns:Array<ColumnProps<any>>= [
    {
      title:'公司名称',
      dataIndex: 'companyName',
    },
    {
      title:'操作人',
      dataIndex: 'userName',
    },
    {
      title:'时间',
      dataIndex: 'created',
      render: t => moment(t).format('YYYY/MM/DD hh:mm:ss')
    },
    {
      title:'操作类别',
      dataIndex: 'operateType',
      render:t => operateTypeMap[t]
    },
    {
      title:'操作日志',
      dataIndex: 'content',
      render:t => contentMap[t]
      
    },
];

  render() {
    return <div className='clearfix'>
      <h3>
        操作日志：
      </h3>
      <div>
        <Table 
          rowKey="created" 
          columns={this.columns} 
          dataSource={this.props.records}
          bordered ={false}
          size = "small"
          pagination={false}
        />

      </div>
    </div>
  }
}

