import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getUploadedImageURL, urlify } from 'Helpers';
import DownloadPDF from 'Pages/Common/DownloadPDF';
import FilterChips from 'Pages/Common/FilterChips';
import React, { ReactElement } from 'react';
import { CheatSheet as CheatSheetType } from 'Types';

interface CheatSheetProps {
  cheatSheetData: CheatSheetType;
  onTagClick: (tag: string) => void;
  selectedTags: string[];
  showItem: boolean;
}

export default function CheatSheet({
  cheatSheetData,
  onTagClick,
  selectedTags,
  showItem,
}: CheatSheetProps): ReactElement {
  return (
    <Paper
      style={{
        maxWidth: 1000,
        padding: 10,
        margin: 10,
        display: showItem ? 'inherit' : 'none',
      }}
    >
      <Grid container style={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12} md={6}>
          <Link href={`cheatsheets/${urlify(cheatSheetData.title)}`}>
            <Typography variant="h5" color="secondary" component="span">
              {cheatSheetData.title}
            </Typography>
          </Link>
          <DownloadPDF pdfUrl={getUploadedImageURL(cheatSheetData.fileName)} />
        </Grid>
        <Grid item xs={12} md={6} align-self="center">
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
