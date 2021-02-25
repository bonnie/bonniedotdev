import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { ReactElement } from 'react';

interface DownloadPDFProps {
  pdfUrl: string;
}

export default function DownloadPDF({
  pdfUrl,
}: DownloadPDFProps): ReactElement {
  return (
    <IconButton aria-label="download" component="span">
      <a style={{ color: 'black' }} href={pdfUrl} download>
        <GetAppIcon />
      </a>
    </IconButton>
  );
}
