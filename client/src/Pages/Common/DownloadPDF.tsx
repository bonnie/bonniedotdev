import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { ReactElement } from 'react';

interface DownloadPDFProps {
  pdfUrl: string;
  fontSize: 'small' | 'large';
}

export default function DownloadPDF({
  pdfUrl,
  fontSize,
}: DownloadPDFProps): ReactElement {
  return (
    <IconButton
      aria-label="download"
      component="span"
      title="download cheat sheet"
    >
      <a style={{ color: 'black' }} href={pdfUrl} download>
        <GetAppIcon fontSize={fontSize} />
      </a>
    </IconButton>
  );
}
