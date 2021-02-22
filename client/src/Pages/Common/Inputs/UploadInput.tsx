import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'AxiosInstance';
import alertLevelOptions from 'Constants/alertLevels';
import urls from 'Constants/urls';
import useActions from 'Hooks/useActions';
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
  const { setAlert } = useActions();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [showUpload, setShowUpload] = useState(false);
  const formData = new FormData();

  const handleUploadSubmit = (event) => {
    console.log('formData', formData);
    event.preventDefault();
    setLoading(true);
    axios
      .post(urls.uploadURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => setValue(response.data.filename))
      .catch((error) => {
        console.error(error);
        setAlert('Failed to upload file', alertLevelOptions.error);
      })
      .finally(() => {
        setLoading(false);
        setShowUpload(false);
      });
  };

  const loadingAdornment = loading ? (
    <InputAdornment position="start">
      <CircularProgress />
    </InputAdornment>
  ) : null;

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <TextField
          required={required}
          name={fieldName}
          id={fieldName}
          aria-label={fieldName}
          label={fieldName}
          value={value}
          style={{ width: '80%' }}
          InputProps={{ startAdornment: loadingAdornment }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <IconButton
          style={{ display: showUpload ? 'none' : 'inherit' }}
          onClick={() => setShowUpload(true)}
        >
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <form
          onSubmit={handleUploadSubmit}
          style={{ display: showUpload ? 'inherit' : 'none' }}
        >
          <TextField
            required
            name="file"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && formData.set('file', e.target.files[0])
            }
          />
          <ButtonGroup>
            <Button variant="text" onClick={() => setShowUpload(false)}>
              Cancel
            </Button>
            <Button variant="text" type="submit" onClick={handleUploadSubmit}>
              Upload
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </Grid>
  );
}
