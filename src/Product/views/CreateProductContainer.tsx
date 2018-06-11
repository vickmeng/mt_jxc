import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Create } from '../actions/product';
import { ProductFormValues } from '../models';
import { CreateProduct } from './CreateProduct';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  create: (formValues: ProductFormValues) => dispatch(Create(formValues)),
});

export const CreateProductView = connect(
  null,
  mapDispatchToProps,
)(CreateProduct);