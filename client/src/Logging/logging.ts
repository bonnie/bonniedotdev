import axios from 'axios';
import { logURL } from 'Constants/urls';

type logLevel = 'critical' | 'error' | 'warning' | 'info' | 'debug'

export default function logToServer(logLevel: logLevel, message: string): void {
  const url = process.env.NODE_ENV === 'development'
    ? `http://localhost:5050${logURL}`
    : logURL;
  const headers = { 'Content-Type': 'application/json' };

  try {
    axios.post(url, { headers, data: { message, logLevel } });
  } catch (e) {
    // don't try to send error to server, infinite loop!
    // eslint-disable-next-line no-console
    console.error(`Could not send error message [${message}] to server: ${e}`);
  }
}
