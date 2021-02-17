import axiosInstance from 'AxiosInstance';
import urls from 'Constants/urls';

type logLevel = 'critical' | 'error' | 'warning' | 'info' | 'debug';

export default function useLogger() {
  return function logToServer(logLevel: logLevel, message: string): void {
    const headers = { 'Content-Type': 'application/json' };

    try {
      axiosInstance.post(urls.logURL, { headers, data: { message, logLevel } });
    } catch (e) {
      // don't try to send error to server, infinite loop!
      // eslint-disable-next-line no-console
      console.error(
        `Could not send error message [${message}] to server: ${e}`,
      );
    }
  };
}
