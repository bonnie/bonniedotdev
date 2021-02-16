/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosRequestConfig } from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import urls, { serverPrefix } from 'Constants/urls';
import useActions from 'Hooks/useActions';
import { useQuery } from 'react-query';
import { ItemType } from 'Types';

// TODO: add trigger parameter to re-run useEffect
export default function useAxios<T>(
  url: urls,
  identifier: ItemType,
): T | undefined {
  const config: AxiosRequestConfig = {};
  if (serverPrefix) config.baseURL = serverPrefix;
  const { setAlert } = useActions();
  const errorString = 'There was a problem connecting to the server';

  const { data } = useQuery(
    identifier,
    () => axios(url, config).then((response) => response.data),
    { onError: () => setAlert(errorString, alertLevelOptions.error) },
  );

  return data;
}
