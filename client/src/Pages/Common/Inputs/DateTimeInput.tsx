import { DateTimePicker } from '@material-ui/pickers';
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
    <DateTimePicker
      aria-label={label}
      key={fieldName}
      name={fieldName}
      variant="inline"
      format="MMM dd Y, H:mm"
      margin="normal"
      id="date-picker-inline"
      value={value}
      onChange={(val) => {
        if (val) dateSetter(val.toString());
      }}
    />
  );
}
