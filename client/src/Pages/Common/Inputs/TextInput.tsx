import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';

interface TextInputProps {
  required: boolean,
  fieldName: string,
  defaultValue: string,
  AdornmentIcon?: typeof AddCircleIcon | null;
}

TextInput.defaultProps = {
  AdornmentIcon: null,
};

export default function TextInput(
  {
    required, fieldName, defaultValue, AdornmentIcon = null,
  }: TextInputProps,
): ReactElement {
  const startAdornment = AdornmentIcon ? (
    <InputAdornment position="start">
      <AdornmentIcon />
    </InputAdornment>
  )
    : null;

  return (
    <TextField
      required={required}
      key={fieldName}
      InputProps={{ startAdornment }}
      multiline
      name={fieldName}
      id={fieldName}
      aria-label={fieldName}
      label={fieldName}
      style={{ width: '100%' }}
      defaultValue={defaultValue}
    />
  );
}
