import * as React from 'react';
import { match } from 'react-router-dom';

import {
  LoadAction,
  UpdateAction,
} from '../actions/product';
import { ProductFormContainer } from '../components';
import { ProductFormValues } from '../models';

interface Props {
  match: match<{ id: number; }>;
  product: ProductFormValues;
  load: (productId: number) => LoadAction;
  update: (formValues: ProductFormValues) => UpdateAction;
}

export class UpdateProduct extends React.Component<Props> {

  componentDidMount() {
    this.props.load(this.props.match.params.id);
  }

  render() {
    const {
      product,
      update,
    } = this.props;

    return (
      <>
        <h2>编辑商品</h2>
        <hr />
        <br />
        <ProductFormContainer product={ product } onSubmit={ update }  />
      </>
    );
  }
};