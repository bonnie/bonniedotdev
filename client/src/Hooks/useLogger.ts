import axiosInstance from 'AxiosInstance';
import urls from 'Constants/urls';

export enum logLevel {
  critical = 'critical',
  error = 'error',
  warning = 'warning',
  info = 'info',
  debug = 'debug',
}

export default function useLogger() {
  return function logToServer(level: logLevel, message: string): void {
    try {
      axiosInstance({
        url: urls.logURL,
        data: { message, logLevel: level },
        method: 'POST',
      });
    } catch (e) {
      // don't try to send error to server, infinite loop!
      // eslint-disable-next-line no-console
      console.error(
        `Could not send error message [${message}] to server: ${e}`,
      );
    }
  };
}
