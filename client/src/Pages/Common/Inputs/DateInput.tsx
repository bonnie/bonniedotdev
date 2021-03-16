import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { ReactElement } from 'react';

interface DateFieldProps {
  fieldName: string;
  value: string;
  label: string;
  dateSetter: (dateString: string) => void;
}

export default function DateInput({
  fieldName,
  value,
  label,
  dateSetter,
}: DateFieldProps): ReactElement {
  return (
    <KeyboardDatePicker
      key={fieldName}
      name={fieldName}
      variant="inline"
      format="yyyy-MM-dd"
      margin="normal"
      id={`local-date-${label}`}
      value={value}
      onChange={(val) => {
        if (val) dateSetter(val.toDateString());
      }}
      KeyboardButtonProps={{ 'aria-label': label }}
    />
  );
}
