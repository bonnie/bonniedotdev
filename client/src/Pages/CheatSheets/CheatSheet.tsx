import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { cheatSheetDetails } from 'Constants/itemConstants';
import { getUploadedImageURL, urlify } from 'Helpers';
import DownloadPDF from 'Pages/Common/DownloadPDF';
import EditItemButtons from 'Pages/Common/EditButtons';
import FilterChips from 'Pages/Common/FilterChips';
import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CheatSheet as CheatSheetType } from 'Types';

import EditCheatSheetFields from './EditCheatSheetFields';

const useStyles = makeStyles(() => ({
  root: {
    // TODO: make this a global max width for "paper"
    maxWidth: 1000,
    padding: 10,
    margin: 10,
  },
  routerLink: {
    textDecoration: 'none',
  },
  cheatSheetLink: {
    // TODO: Make this a global config for links
    marginLeft: 5,
    fontVariant: 'normal',
    textTransform: 'none',
    textDecoration: 'none',
    '&:hover': {
      opacity: 0.8,
    },
  },
  cheatSheetContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface CheatSheetProps {
  cheatSheetData: CheatSheetType;
  onTagClick: (tag: string) => void;
  selectedTags: string[];
  showItem: boolean;
}

// eslint-disable-next-line max-lines-per-function
export default function CheatSheet({
  cheatSheetData,
  onTagClick,
  selectedTags,
  showItem,
}: CheatSheetProps): ReactElement {
  const classes = useStyles();

  const editCheatSheetButtons = (
    <EditItemButtons
      itemDetails={cheatSheetDetails}
      itemData={cheatSheetData}
      ItemFieldsComponent={
        <EditCheatSheetFields cheatSheetData={cheatSheetData} />
      }
    />
  );

  return (
    <Paper
      className={classes.root}
      style={{ display: showItem ? 'inherit' : 'none' }}
    >
      <Grid container className={classes.cheatSheetContainer}>
        <Grid item xs={12} md={6}>
          {editCheatSheetButtons}
          <DownloadPDF pdfUrl={getUploadedImageURL(cheatSheetData.fileName)} />
          <RouterLink
            className={classes.routerLink}
            to={`cheatsheets/${urlify(cheatSheetData.title)}`}
          >
            <Typography
              className={classes.cheatSheetLink}
              color="secondary"
              variant="h5"
              component="span"
            >
              {cheatSheetData.title}
            </Typography>
          </RouterLink>
        </Grid>
        <Grid item xs={12} md={6}>
          <FilterChips
            tags={cheatSheetData.tags}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
