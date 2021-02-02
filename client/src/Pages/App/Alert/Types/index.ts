export enum alertLevelOptions {
  error = 'error',
  info = 'info',
  warning = 'warning',
  success = 'success',
}

export type AlertConfigType = {
  message: string;
  alertLevel: alertLevelOptions;
};

export type AlertActionType = {
  type: string;
  payload?: AlertConfigType;
};
