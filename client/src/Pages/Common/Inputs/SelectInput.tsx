import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface Option {
  value: string | number,
  display: string
}

interface SelectInputProps {
  required: boolean,
  options: Option[],
  defaultValue: number | string | null,
  fieldName: string
  displayName: string
}

export default function SelectInput(
  {
    required, options, defaultValue, fieldName, displayName,
  }: SelectInputProps,
): ReactElement {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="review-quote-course-id">{displayName}</InputLabel>
      <Select
        required={required}
        labelId="review-quote-course-id"
        id="review-quote-course-select"
        defaultValue={defaultValue || ''}
        name={fieldName}
      >
        { options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.display}
          </MenuItem>
        )) }
      </Select>
    </FormControl>
  );
}
