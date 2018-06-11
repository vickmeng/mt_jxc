import * as React from 'react';

import {MTuploadFile} from 'shared/components'
import {FileResponse} from 'shared/models'

interface Props {

}

export class Files extends React.Component<Props> {


  constructor(props:any){
    super(props)
  }

  handleSuccess = (res:FileResponse) => {
    console.log(res)
  }

  render() {
    return <div className='clearfix'>
      <div className='float_l'  style={{width:100}}>
        附件信息：
      </div>
      <div  className='float_l'>
        <MTuploadFile success={this.handleSuccess} />
      </div>
    </div>
  }
}

