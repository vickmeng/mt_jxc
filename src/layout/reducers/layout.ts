import { LayoutActionsUnion, LayoutActionTypes } from '../actions';

export interface State {
  siderCollapsed: boolean;
}

const initialState: State = {
  siderCollapsed: false,
}

export const reducer = (
  state: State = initialState,
  action: LayoutActionsUnion
): State => {
  switch (action.type) {

    case LayoutActionTypes.ToggleSider:
      return {
        siderCollapsed: !state.siderCollapsed,
      };

    default:
      return state;

  }
}

export const getSiderCollapsed = (state: State) => state.siderCollapsed;
