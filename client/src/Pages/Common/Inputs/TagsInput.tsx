/* eslint-disable react/jsx-props-no-spreading */
import Chip from '@material-ui/core/Chip';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useTags from 'Hooks/GetData/useTags';
import React, { ReactElement, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

interface TagsInputProps {
  fieldName: string;
  defaultValues: string[];
}

export default function TagsInput({
  fieldName,
  defaultValues,
}: TagsInputProps): ReactElement {
  const classes = useStyles();
  const tags = useTags();
  const [values, setValues] = useState(defaultValues);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id={fieldName}
        options={tags}
        defaultValue={defaultValues}
        freeSolo
        fullWidth
        openOnFocus
        onChange={(_, newVal) => {
          setValues(newVal);
        }}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={fieldName}
            placeholder="add a tag"
          />
        )}
      />
      {/* TODO: adding a hidden field seems janky */}
      <input multiple type="hidden" name={fieldName} value={values} />
    </div>
  );
}
