import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  select: {
    minWidth: 120,
    maxWidth: '100%',
  },
  option: {
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    '&:focus': {
      borderColor: '#80bdff',
    },
  },
}));

interface Option {
  value: string | number,
  display: string
}

interface SelectInputProps {
  required: boolean,
  options: Option[],
  defaultValue: number,
  fieldName: string
}

export default function SelectInput(
  {
    required, options, defaultValue, fieldName,
  }: SelectInputProps,
): ReactElement {
  const classes = useStyles();
  return (
    <Select
      className={classes.select}
      name={fieldName}
      aria-label={fieldName}
      label={fieldName}
      defaultValue={defaultValue}
      required={required}
      // using 'native' for easier testing
      native
    >
      { options.map((option) => (
        <option className={classes.option} key={option.value} value={option.value}>
          {option.display}
        </option>
      )) }
    </Select>
  );
}
