import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  Load,
  Update,
} from '../actions/product';
import { ProductFormValues } from '../models';
import * as fromProduct from '../reducers';
import { UpdateProduct } from './UpdateProduct';

const mapStateToProps = (state: State) => ({
  product: fromProduct.getFormValues(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (productId: number) => dispatch(Load(productId)),
  update: (formValues: ProductFormValues) => dispatch(Update(formValues)),
});

export const UpdateProductView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProduct);