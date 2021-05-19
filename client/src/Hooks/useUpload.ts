import axiosInstance from 'AxiosInstance';
import urls from 'Constants/urls';
import { getJWTHeader } from 'Helpers';

interface useUploadArgs {
  setUploadProgress: (progressPercent: number) => void;
  setShowUpload: (show: boolean) => void;
  setError: (error: string) => void;
  setTextFieldValue: (fileName: string) => void;
}

export default function useUpload({
  setUploadProgress,
  setTextFieldValue,
  setShowUpload,
  setError,
}: useUploadArgs): (uploadFile: File | null) => void {
  const jwtHeader = getJWTHeader();
  const headers = { ...jwtHeader, 'Content-Type': 'multipart/form-data' };
  return (uploadFile: File | null): void => {
    const formData = new FormData();
    if (!uploadFile) {
      setError('No upload file set');
      return;
    }
    formData.set('file', uploadFile);
    axiosInstance
      .post(urls.uploadURL, formData, {
        headers,
        onUploadProgress: setUploadProgress,
        validateStatus(status) {
          return status === 200 || status === 202 || status === 422;
        },
      })
      .then((response) => {
        if (response.status === 422) {
          setError(response.data.message);
        } else {
          setTextFieldValue(response.data.filename);
          setShowUpload(false);
        }
      })
      .catch((uploadError) => {
        setError(`Failed to upload file: ${uploadError}`);
      })
      .finally(() => {
        setUploadProgress(0);
      });
  };
}
