import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  UpdateDescription,
} from '../../actions/product';
import * as fromProduct from '../../reducers';
import { ProductDescription } from './Description';

const mapStateToProps = (state: State) => ({
  description: fromProduct.getDescription(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateDescription: (content: string) => dispatch(UpdateDescription(content)),
})

export const ProductDescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDescription);