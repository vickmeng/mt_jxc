/**
 * 维康
 */

import * as React from 'react';

import * as classnames from 'classnames';

import {Button, Card,Col,Row } from 'antd';

interface BaseProps {
  title?        : React.ReactNode | string;
  leftContent?  : React.ReactNode | string;
  rightContent? : React.ReactNode | string;
}


const title         = <></>;
const leftContent   = <></>;
const rightContent  = <></>;

class QueryToolbar extends React.Component<BaseProps> {

  static defaultProps = {
    title
    ,leftContent
    ,rightContent
  };

  state = {visable:false}

  constructor(props:any){
    super(props.visble);
  }

  onClick = () => {
    const visable = this.state.visable;
    this.setState({visable:!visable});
  }

  render() {
    const $leftContent  = this.props.leftContent;
    const $rightContent = this.props.rightContent;

    const conntentWrapperClass = classnames({
      invisible:!this.state.visable,
      toolBarContentWrapper:true
    });

    return (

        <Card 
          title = {this.props.title}
          bordered={false} 
        >
          <Row>
            <Col lg = {{span:24}} xl = {{span:12}}>
              {$leftContent}
            </Col>
            <Col lg = {{span:24}} xl = {{span:12}}>
              <Row type="flex" justify="end">
                <Col>
                  {$rightContent}
                </Col>
                <Col>
                  <Button onClick = {this.onClick}>
                    {this.state.visable?'关闭搜索':'高级搜索'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={conntentWrapperClass}>
              {this.props.children}
            </Col>
          </Row>
        </Card>
    );
  }
}

export default QueryToolbar;