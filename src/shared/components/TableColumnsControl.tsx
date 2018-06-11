import * as React from 'react';
import { Action } from 'redux';

import { Button, Checkbox, Popover } from 'antd';

import { ColumnData } from '../models';

import './index.css';

interface Props {
  columns: ColumnData[];
  label: string;
  onSubmit: (columns: ColumnData[]) => Action;
}

interface State {
  columns: ColumnData[];
  visible: boolean;
}

export class TableColumnsControl extends React.Component<Props, State> {

  state = {
    columns: this.props.columns,
    visible: false,
  }

  onChange = (key: string): void => {
    this.setState({
      columns: this.state.columns.map(column =>
        (column.key === key && !column.disabled)
          ? { ...column, selected: !column.selected }
          : column
      )
    });
  }

  hide = (): void => {
    this.setState({
      visible: false,
    });
  }

  show = (): void => {
    this.setState({
      visible: true,
    });
  }

  submit = (): void => {
    this.props.onSubmit(this.state.columns);
    this.hide();
  }

  handleVisibleChange = (visible: boolean): void => {
    this.setState({ visible });
  }

  render() {
    const { label } = this.props;
    const { columns, visible } = this.state;

    const content = (
      <>
        <ul className="control-panel-list">
          { columns.map(column => 
              <li key={ column.key }>
                <Checkbox
                  checked={ column.selected }
                  disabled={ column.disabled }
                  onChange={ this.onChange.bind(null, column.key) }
                >
                  { column.label }
                </Checkbox>
              </li>
          ) }
        </ul>
        <Button type="primary" onClick={ this.submit }>确定</Button>
        <Button onClick={ this.hide }>取消</Button>
      </>
    );

    return (
      <Popover
        trigger="click"
        placement="bottom"
        title="字段"
        content={ content }
        visible={ visible }
        onVisibleChange={ this.handleVisibleChange }
      >
        <Button onClick={ this.show } >{ label }</Button>
      </Popover>
    );
  }
};
