import { alertLevelOptions } from 'Pages/App/Alert/Types';

export interface AlertState {
  message: string;
  alertLevel: alertLevelOptions;
}

export type AlertActionType = {
  type: string;
  payload?: AlertState;
};

export type LoadingActionType = {
  type: string;
  payload: boolean;
};
