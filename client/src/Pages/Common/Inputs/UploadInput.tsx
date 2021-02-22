import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'AxiosInstance';
import urls from 'Constants/urls';
import LinearProgressBar from 'Pages/Common/LinearProgressBar';
import ModalFormActions from 'Pages/Common/Modals/ModalFormActions';
import React, { ReactElement, useState } from 'react';

interface UploadInputProps {
  fieldName: string;
  defaultValue: string;
  required: boolean;
}

// eslint-disable-next-line max-lines-per-function
export default function UploadInput({
  fieldName,
  defaultValue,
  required,
}: UploadInputProps): ReactElement {
  const [textFieldValue, setTextFieldValue] = useState(defaultValue);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [progress, setUploadProgress] = useState(0);

  const handleUploadSubmit = (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData();
    if (!uploadFile) {
      setError('No upload file set');
      return;
    }
    formData.set('file', uploadFile);
    axios
      .post(urls.uploadURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: setUploadProgress,
      })
      .then((response) => setTextFieldValue(response.data.filename))
      .catch((uploadError) => {
        setError(`Failed to upload file: ${uploadError}`);
      })
      .finally(() => {
        setUploadProgress(0);
        setShowUpload(false);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <TextField
          required={required}
          name={fieldName}
          id={fieldName}
          aria-label={fieldName}
          label={fieldName}
          value={textFieldValue}
          style={{ width: '80%' }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <IconButton
          style={{ display: showUpload ? 'none' : 'inherit' }}
          onClick={() => setShowUpload(true)}
        >
          <AddCircleIcon style={{ textAlign: 'left' }} />
        </IconButton>
      </Grid>
      <Dialog open={showUpload}>
        <form onSubmit={handleUploadSubmit}>
          <TextField
            required
            name="file"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setUploadFile(e.target.files[0])
            }
          />
          <LinearProgressBar errorMessage={error} progress={progress} />
          <ModalFormActions
            handleCancel={() => setShowUpload(false)}
            submitString="upload"
          />
        </form>
      </Dialog>
    </Grid>
  );
}
