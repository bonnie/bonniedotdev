export enum AlertTypeOptions {
  error='error',
  info='info',
  warning='warning',
  success='success'
}

export type AlertConfigType = {
  message: string,
  alertType: AlertTypeOptions,
}

export type AlertActionType = {
  type: string,
  payload?: AlertConfigType
}
