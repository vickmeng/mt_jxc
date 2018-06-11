/**
 * 维康
 */

import * as React from 'react';

import { Icon ,Input } from 'antd';

interface Props {
    onChange:(values:string) => void;
    value:string;
  }

class EditableCell extends React.Component<Props> {
    state = {
      value: this.props.value,
      editable: false,
    }
    handleChange = (e:any) => {
      const value = e.target.value;
      this.setState({ value });
    }
    check = () => {
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
    edit = () => {
      this.setState({ editable: true });
    }
    render() {
      const { value, editable } = this.state;
      return (
        <div className="editable-cell">
          {
            editable ?
              <div className="editable-cell-input-wrapper">
                <Input
                  style={{width:'200px'}}
                  value={value}
                  onChange={this.handleChange}
                  onPressEnter={this.check}
                  onBlur ={this.check}
                />
                &nbsp;&nbsp;
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
              </div>
              :
              <div className="editable-cell-text-wrapper">
                <span onClick={this.edit}>
                    {value || ''}
                </span>
                <Icon
                  type="edit"
                  className="editable-cell-icon"
                  onClick={this.edit}
                />
              </div>
          }
        </div>
      );
    }
  }
export default EditableCell;
  