import alertLevelOptions from 'Constants/alertLevels';
import { User } from 'Types';

export interface AlertState {
  message: string;
  alertLevel: alertLevelOptions;
}

export interface AlertAction {
  type: string;
  payload?: AlertState;
}

export interface UserAction {
  type: string;
  payload?: User;
}

export type Action = AlertAction;
