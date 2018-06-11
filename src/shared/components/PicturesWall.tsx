/**
 * 维康
 */
import * as React from 'react';

import {CommonAPI} from 'shared/constants/api';
import {
  host,
  // imageHost
} from 'shared/constants/host';
import {defaultRequest} from 'shared/utils/ajax';

import { Icon ,message, Upload ,} from 'antd';
import {
  HttpRequestHeader,
  RcFile,
  UploadChangeParam
}from 'antd/lib/upload/interface'

const headers :HttpRequestHeader = {
  'x-app-id': (defaultRequest.headers as any) ['x-app-id'],
  'Authorization': (defaultRequest.headers as any) .Authorization
}


const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

interface BaseProps {
  onChange?:(fileList:any[]) => void
  max?:number
}

export class PicturesWall extends React.Component<BaseProps> {

  static defaultProps = {
    onChange:(fileList:any[]) => {return},
    max:20
  }
  state = {
    fileList: [],
  };

  beforeUpload = (file:RcFile) => {
    const less20 = file.size / 1024 / 1024 < (this.props.max as number);
    if (!less20) {
      message.error(`请勿超过${this.props.max}MB!`);
    }
    return less20;
  }

  handleChange = (info:UploadChangeParam) => {
    if (info.file.status === 'done') {
      info.fileList[info.fileList.length-1].url = info.file.response.qiniuFileName
    }
    this.setState( {fileList : info.fileList});
    (this.props.onChange as any)(info.fileList);
  }

  render() {
    const { fileList } = this.state;
    return (
        <Upload
          action={`${host}${CommonAPI.file}`}
          headers = {headers}
          listType="picture-card"
          fileList={fileList}
          beforeUpload ={this.beforeUpload}
          onChange={this.handleChange}
        >
          {uploadButton}
        </Upload>
    );
  }
}

