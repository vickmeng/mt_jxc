import * as React from 'react';

import {defaultRequest} from 'shared/utils/ajax'

import {CommonAPI} from 'shared/constants/api';
import {host,imageHost} from 'shared/constants/host'
import {FileResponse} from 'shared/models';

import { 
  Icon,
  message,
  Upload,
} from 'antd';

import {
  HttpRequestHeader,
  RcFile,
  UploadChangeParam
}from 'antd/lib/upload/interface'

interface Props {
  success:(res:FileResponse) => void 
}

export default class UploadFile extends React.Component<Props> {
  state ={imageUrl:'',loading:false}
  headers :HttpRequestHeader = {
    'x-app-id': (defaultRequest.headers as any) ['x-app-id'],
    'Authorization': (defaultRequest.headers as any) .Authorization
  }
  constructor(props:any){
    super(props)
  }

  beforeUpload(file:RcFile):boolean {
    const less20 = file.size / 1024 / 1024 < 20;
    if (!less20) {
      message.error('请勿超过20MB!');
    }
    return less20;
  }

  onChange = (info:UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.success(info.file.response)
      this.setState({
        loading: false,
        imageUrl:imageHost + info.file.response.qiniuFileName
      });
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    const $uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return <Upload
            listType="picture-card"
            showUploadList={false}
            action={`${host}${CommonAPI.file}`}
            headers = {(this.headers)}
            beforeUpload={this.beforeUpload}
            onChange ={this.onChange}
          >
            {imageUrl ? <img width={102} src={imageUrl} /> : $uploadButton}
          </Upload>
  }
}

