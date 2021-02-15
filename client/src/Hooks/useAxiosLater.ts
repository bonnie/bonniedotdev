/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosRequestConfig } from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import { serverPrefix } from 'Constants/urls';
import useActions from 'Hooks/useActions';

type AxiosLater = (config: AxiosRequestConfig) => void;

// TODO: the repeated code in this and useAxios feels icky
export default function useAxiosLater(): AxiosLater {
  const { setLoading, clearLoading, setAlert } = useActions();
  const errorString = 'There was a problem connecting to the server';

  return (config: AxiosRequestConfig): void => {
    if (process.env.NODE_ENV === 'development') config.baseURL = serverPrefix;
    config.headers = { 'Content-Type': 'application/json' };

    setLoading();
    axios(config)
      .catch((error) => {
        // TODO: log here
        setAlert(errorString, alertLevelOptions.error);
      })
      .finally(() => clearLoading());
  };
}
