import { alertLevelOptions } from 'Pages/App/Alert/Types';

export interface AlertState {
  message: string;
  alertLevel: alertLevelOptions;
}

export interface AlertActionType {
  type: string;
  payload?: AlertState;
}

export interface LoadingActionType {
  type: string;
  payload: boolean;
}

export type Action = AlertActionType | LoadingActionType;
