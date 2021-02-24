import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React, { ReactElement } from 'react';
import { CheatSheet as CheatSheetType } from 'Types';

interface CheatSheetProps {
  cheatSheetData: CheatSheetType;
  tagOnClick: (tag: string) => void;
  selectedTags: string[];
}

export default function CheatSheet({
  cheatSheetData,
  tagOnClick,
  selectedTags,
}: CheatSheetProps): ReactElement {
  const display =
    selectedTags.length === 0 ||
    selectedTags.some((tag) => cheatSheetData.tags.includes(tag));

  const buttons = (
    <ButtonGroup>
      <IconButton aria-label="view" component="span">
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="download" component="span">
        <GetAppIcon fontSize="small" />
      </IconButton>
    </ButtonGroup>
  );

  return (
    <Paper style={{ display: display ? 'inherit' : 'none' }}>
      <Grid container>
        <Grid item xs={12} sm={8} md={6}>
          <Typography>{cheatSheetData.title}</Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Typography>{cheatSheetData.updatedAt}</Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          {buttons}
        </Grid>
        <Grid item xs={12}>
          {cheatSheetData.tags.map((tag) => (
            <Chip
              key={tag}
              color={selectedTags.includes(tag) ? 'default' : 'primary'}
              onClick={() => tagOnClick(tag)}
              label={tag}
            />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
