/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import useActions from 'Hooks/useActions';
import { useEffect, useState } from 'react';
import { alertLevelOptions } from 'Types';

export default function useAxios<T>(url: string): T | undefined {
  if (process.env.NODE_ENV === 'development')
    url = `http://localhost:5050${url}`;
  const { setLoading, clearLoading, setAlert } = useActions();
  const [data, setData] = useState<T | undefined>(undefined);
  const errorString = 'There was a problem connecting to the server';

  useEffect(() => {
    setLoading();
    axios(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setAlert(errorString, alertLevelOptions.error);
      })
      .finally(() => clearLoading());
  }, []);

  return data;
}
