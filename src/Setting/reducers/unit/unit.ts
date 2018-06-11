import { LoadAllSuccessAction, UnitActionsUnion, UnitActionTypes } from '../../actions/unit';
import { Unit } from '../../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: Unit[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
};

export const reducer = (
  state: State = initialState,
  action: UnitActionsUnion,
): State => {
  switch (action.type) {

    case UnitActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case UnitActionTypes.LoadAllSuccess:
      return {
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload,
      };
    
    case UnitActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };
    
    case UnitActionTypes.Delete:
      return {
        ...state,
        loading: true,
      };

    case UnitActionTypes.DeleteSuccess:
    case UnitActionTypes.DeleteFail:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export const getLoaded = (state: State): boolean => state.loaded;

export const getLoading = (state: State): boolean => state.loading;

export const getUnits = (state: State): Unit[] => state.entities;