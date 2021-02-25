/* eslint-disable import/no-extraneous-dependencies */
import { PDFDocumentProxy } from 'pdfjs-dist';
import React, { ReactElement, useState } from 'react';
import { Document, Page } from 'react-pdf';

interface PDFDocProps {
  pdfUrl: string;
}

export default function PDFDoc({ pdfUrl }: PDFDocProps): ReactElement {
  const [pageCount, setPageCount] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy) {
    setPageCount(numPages);
  }

  return (
    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(pageCount), (_, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
