import * as React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { State } from '@app/root';
import {
  LoadAll as LoadBrands,
  LoadAllAction as LoadBransAction,
} from '@app/Setting/actions/brand';
import {
  LoadAll as LoadCategories,
  LoadAllAction as LoadCategoriesAction,
} from '@app/Setting/actions/category';
import {
  LoadAll as LoadUnits,
  LoadAllAction as LoadUnitsAction,
} from '@app/Setting/actions/unit';
import { Brand, Category, Unit } from '@app/Setting/models';
import * as fromSetting from '@app/Setting/reducers';

import { ProductFormValues } from '../../models';
import { BasicInfo } from './BasicInfo';
import { ProductDescriptionContainer } from './DescriptionContainer';
import { ProductDocumentListContainer } from './DocumentListContainer';
import { ProductImageListContainer } from './ImageListContainer';
import { OtherInfo } from './OtherInfo';
import { PriceSettingContainer } from './PriceContainer';

interface Props extends FormComponentProps {
  brands: Brand[];
  categories: Category[];
  units: Unit[];
  product?: ProductFormValues;
  loadBrands: () => LoadBransAction;
  loadCategories: () => LoadCategoriesAction;
  loadUnits: () => LoadUnitsAction;
  onSubmit: (formValues: ProductFormValues) => Action;
}

class ProductEntityForm extends React.Component<Props> {

  componentDidMount() {
    this.props.loadBrands();
    this.props.loadCategories();
    this.props.loadUnits();
  }

  submit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: ProductFormValues) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }
  
  render() {
    const {
      brands,
      categories,
      form,
      units,
      product,
    } = this.props;
    
    return (
      <Form onSubmit={ this.submit }>
        <BasicInfo form={ form } brands={ brands } categories={ categories } units={ units } product={ product } />
        <br />
        <ProductImageListContainer />
        <br />
        <ProductDescriptionContainer />
        <br />
        <ProductDocumentListContainer />
        <br />
        <PriceSettingContainer form={ form } product={ product } />
        <br />
        <OtherInfo form={ form } product={ product } />
        <br />
        <Button type="primary" htmlType="submit">保存</Button>
      </Form>
    );
  }
}

const ProductForm = Form.create()(ProductEntityForm);

const mapStateToProps = (state: State, ownProps: {}) => ({
  brands: fromSetting.getBrands(state),
  categories: fromSetting.getCategories(state),
  units: fromSetting.getUnits(state),
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBrands: () => dispatch(LoadBrands()),
  loadCategories: () => dispatch(LoadCategories()),
  loadUnits: () => dispatch(LoadUnits()),
});

export const ProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductForm);