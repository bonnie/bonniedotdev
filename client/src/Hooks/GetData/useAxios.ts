/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosRequestConfig } from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import urls, { serverPrefix } from 'Constants/urls';
import useActions from 'Hooks/useActions';
import { useEffect, useState } from 'react';

// TODO: add trigger parameter to re-run useEffect
export default function useAxios<T>(url: urls): T | undefined {
  const config: AxiosRequestConfig = {};
  if (serverPrefix) config.baseURL = serverPrefix;
  const { setLoading, clearLoading, setAlert } = useActions();
  const [data, setData] = useState<T | undefined>(undefined);
  const errorString = 'There was a problem connecting to the server';

  useEffect(() => {
    setLoading();
    axios(url, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // TODO: log here
        setAlert(errorString, alertLevelOptions.error);
      })
      .finally(() => clearLoading());
  }, []);

  return data;
}
