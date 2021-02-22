import axios from 'AxiosInstance';
import alertLevelOptions from 'Constants/alertLevels';
import urls from 'Constants/urls';
import useActions from 'Hooks/useActions';

function useUpload(setLoading, setValue, file, setShowUpload) {
  const { setAlert } = useActions();
  return async () => {
    setLoading(true);
    await axios
      .post(urls.uploadURL, {
        headers: { 'Content-Type': 'multipart/form-data' },
        data: { file },
      })
      .then((response) => setValue(response.data))
      .catch((error) => {
        setAlert('Failed to upload file', alertLevelOptions.error);
      })
      .finally(() => {
        setLoading(false);
        setShowUpload(false);
      });
  };
}
