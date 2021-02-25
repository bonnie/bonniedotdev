import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { getUploadedImageURL, urlify } from 'Helpers';
import useCheatSheets from 'Hooks/GetData/useCheatSheets';
import useLogger, { logLevel } from 'Hooks/useLogger';
import DownloadPDF from 'Pages/Common/DownloadPDF';
import PDFDoc from 'Pages/Common/PDFDoc';
import React, { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';

interface useParamsReturn {
  sheetName: string;
}

// eslint-disable-next-line max-lines-per-function
export default function CheatSheet(): ReactElement {
  const cheatSheets = useCheatSheets();
  const { sheetName } = useParams<useParamsReturn>();
  const logger = useLogger();

  const cheatSheetData = cheatSheets.find(
    (sheet) => urlify(sheet.title) === sheetName,
  );

  // return an error if the cheat sheet couldn't be found by title
  if (!cheatSheetData) {
    if (cheatSheets) {
      logger(
        logLevel.error,
        `Tried to load nonexistent cheat sheet: ${sheetName} `,
      );
    }
    return (
      <>
        <Typography variant="h1">An error occurred.</Typography>
        <Typography variant="h4">
          Could not find cheat sheet: {sheetName}
        </Typography>
        <Typography>Return to </Typography>
        <Link to="/cheatsheets">cheat sheets overview</Link>
      </>
    );
  }

  return (
    <>
      <Typography variant="h1" component="span">
        {cheatSheetData.title}
      </Typography>
      <DownloadPDF pdfUrl={getUploadedImageURL(cheatSheetData.fileName)} />
      <Box>
        <Typography>Last Updated {cheatSheetData.updatedAt}</Typography>
        <Typography component="span">Tags:</Typography>
        {cheatSheetData.tags.map((tag) => (
          <Chip
            style={{ margin: 3 }}
            key={tag}
            label={tag}
            color="secondary"
            size="small"
          />
        ))}
      </Box>
      <Box style={{ marginTop: 10 }}>
        <PDFDoc pdfUrl={getUploadedImageURL(cheatSheetData.fileName)} />
      </Box>
    </>
  );
}
