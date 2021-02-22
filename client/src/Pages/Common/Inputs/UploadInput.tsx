import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'AxiosInstance';
import urls from 'Constants/urls';
import LinearProgressBar from 'Pages/Common/LinearProgressBar';
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

  const startAdornment = (
    <InputAdornment position="start">
      <ImageIcon />
    </InputAdornment>
  );

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
    <>
      <TextField
        fullWidth
        required={required}
        name={fieldName}
        id={fieldName}
        aria-label={fieldName}
        label={fieldName}
        value={textFieldValue}
        onClick={() => setShowUpload(true)}
        InputProps={{ startAdornment, readOnly: true }}
      />
      <Dialog open={showUpload} aria-hidden={!showUpload}>
        <form>
          <TextField
            variant="outlined"
            required
            name="file"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setUploadFile(e.target.files[0])
            }
          />
          <LinearProgressBar errorMessage={error} progress={progress} />
          <ButtonGroup
            variant="text"
            style={{ float: 'right', marginTop: 10, marginBottom: 10 }}
          >
            <Button onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button color="secondary" onClick={handleUploadSubmit}>
              Upload
            </Button>
          </ButtonGroup>
        </form>
      </Dialog>
    </>
  );
}
