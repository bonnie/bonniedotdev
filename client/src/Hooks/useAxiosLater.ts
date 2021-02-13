/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosRequestConfig } from 'axios';
import useActions from 'Hooks/useActions';
import { alertLevelOptions } from 'Types';

type AxiosLater = (url: string, config: AxiosRequestConfig) => void;

// TODO: the repeated code in this and useAxios feels icky
export default function useAxiosLater(): AxiosLater {
  const { setLoading, clearLoading, setAlert } = useActions();
  const errorString = 'There was a problem connecting to the server';

  return (url: string, config: AxiosRequestConfig): void => {
    if (process.env.NODE_ENV === 'development')
      config.baseURL = `http://localhost:5050`;
    setLoading();
    axios(url, config)
      .catch((error) => {
        // TODO: log here
        setAlert(errorString, alertLevelOptions.error);
      })
      .finally(() => clearLoading());
  };
}
