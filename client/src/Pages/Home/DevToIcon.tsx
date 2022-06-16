/* eslint-disable react/jsx-props-no-spreading */
import SvgIcon from '@material-ui/core/SvgIcon';
import React, { ReactElement } from 'react';

// TODO: figure out types here
export default function MediumIcon(props): ReactElement {
  const defaultWidth = 162;
  const defaultHeight = 25;
  const scaleFactor = 8.5;

  const width = defaultWidth / scaleFactor;
  const height = defaultHeight / scaleFactor;

  return (
    <SvgIcon
      {...props}
      width={width}
      height={height}
      viewBox={`0 0 ${width - 5} ${height - 5}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.68 14.98H6V9h1.71c1.28 0 1.71 1.03 1.71 1.71v2.56c0 .68-.42 1.71-1.74 1.71zm4.7-3.52v1.07H11.2v1.39h1.93v1.07h-2.25c-.4.01-.74-.31-.75-.71V9.75c-.01-.4.31-.74.71-.75h2.28v1.07H11.2v1.39h1.18zm4.5 2.77c-.48 1.11-1.33.89-1.71 0L13.77 9h1.18l1.07 4.11L17.09 9h1.18l-1.39 5.23z" />
    </SvgIcon>
  );
}
