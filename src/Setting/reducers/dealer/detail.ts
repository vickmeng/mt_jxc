import {
  DealerActionsUnion,
  DealerActionTypes,
  LoadSuccessAction,
} from '../../actions/dealer';

export interface State {
  name: string;
}

const initialState: State = {
  name: '',
};

export const reducer = (
  state: State = initialState,
  action: DealerActionsUnion,
): State => {
  switch (action.type) {

    case DealerActionTypes.LoadSuccess:
      return {
        name: (action as LoadSuccessAction).payload.tenantName,
      };
    
    default:
      return state;
  }
};
