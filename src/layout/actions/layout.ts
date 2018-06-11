import { Action } from 'redux';

export enum LayoutActionTypes {
  ToggleSider = '[Layout] Toggle Sider',
}

export interface ToggleSiderAction extends Action { }

export const ToggleSider: () => ToggleSiderAction = (): ToggleSiderAction => ({
  type: LayoutActionTypes.ToggleSider,
});

export type LayoutActionsUnion = ToggleSiderAction;