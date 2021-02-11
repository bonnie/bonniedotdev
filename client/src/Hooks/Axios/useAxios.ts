/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import useActions from 'Hooks/useActions';
import { alertLevelOptions } from 'Pages/App/Alert/Types';
import { useEffect, useState } from 'react';

export default function useAxios(url: string, axiosArgs) {
  const { setLoading, clearLoading, setAlert } = useActions();
  const [data, setData] = useState([]);
  const errorString = 'There was a problem connecting to the server';

  useEffect(() => {
    setLoading();
    axios(url)
      .then((response) => {
        setData(response.data);
        clearLoading();
      })
      .catch((error) => {
        setAlert(errorString, alertLevelOptions.error);
      });
  }, []);

  return data;
}
