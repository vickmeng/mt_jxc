import * as React from 'react';

import { CreateAction } from '../actions/product';
import {
  ProductFormContainer
} from '../components';
import { ProductFormValues } from '../models';

interface Props {
  create: (formValues: ProductFormValues) => CreateAction;
}

export const CreateProduct: React.SFC<Props> = ({ create }) => (
  <>
    <h2>新增商品</h2>
    <hr />
    <br />
    <ProductFormContainer onSubmit={ create } />
  </>
);
