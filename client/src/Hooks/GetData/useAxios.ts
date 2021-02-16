/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from 'AxiosInstance';
import alertLevelOptions from 'Constants/alertLevels';
import urls from 'Constants/urls';
import useActions from 'Hooks/useActions';
import { useQuery } from 'react-query';
import { ItemType } from 'Types';

// TODO: add trigger parameter to re-run useEffect
export default function useAxios<T>(
  url: urls,
  identifier: ItemType,
): T | undefined {
  const { setAlert } = useActions();
  const errorString = 'There was a problem connecting to the server';

  const { data } = useQuery(
    identifier,
    () => axiosInstance(url).then((response) => response.data),
    { onError: () => setAlert(errorString, alertLevelOptions.error) },
  );

  return data;
}
