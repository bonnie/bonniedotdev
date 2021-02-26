import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import useUpload from 'Hooks/useUpload';
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
  const [progressPercent, setUploadProgress] = useState(0);

  const upload = useUpload({
    setUploadProgress,
    setTextFieldValue,
    setError,
    setShowUpload,
  });

  const startAdornment = (
    <InputAdornment position="start">
      <ImageIcon />
    </InputAdornment>
  );

  // TODO: fix error - Warning: Failed prop type: Invalid prop `value` of type `object`
  // supplied to `ForwardRef(LinearProgress)`, expected `number`.

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
        onClick={() => {
          setError('');
          setShowUpload(true);
        }}
        InputProps={{ startAdornment, readOnly: true }}
      />
      <Dialog open={showUpload} aria-hidden={!showUpload}>
        <form style={{ textAlign: 'center', margin: 10 }}>
          <InputLabel
            htmlFor="file"
            id="file-label"
            style={{ marginBottom: 10 }}
          >
            Choose a file to upload
          </InputLabel>
          <TextField
            required
            name="file"
            type="file"
            aria-labelledby="file-label"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setUploadFile(e.target.files[0])
            }
          />
          <LinearProgressBar errorMessage={error} progress={progressPercent} />
          <ButtonGroup
            variant="text"
            style={{ float: 'right', marginTop: 10, marginBottom: 10 }}
          >
            <Button onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button color="secondary" onClick={() => upload(uploadFile)}>
              Upload
            </Button>
          </ButtonGroup>
        </form>
      </Dialog>
    </>
  );
}
