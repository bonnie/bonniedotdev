/* eslint-disable react/jsx-props-no-spreading */
import SvgIcon from '@material-ui/core/SvgIcon';
import React, { ReactElement } from 'react';

// TODO: figure out types here
export default function MediumIcon(props): ReactElement {
  const defaultWidth = 162;
  const defaultHeight = 25;
  const scaleFactor = 3.5;

  const width = defaultWidth / scaleFactor;
  const height = defaultHeight / scaleFactor;

  return (
    <SvgIcon
      {...props}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: defaultHeight / 2.8 }}
    >
      <path
        d="M24.3361 12.6311C24.3361 19.3425 18.9414 24.7835 12.2865 24.7835C5.6316 24.7835 0.237305 19.3442 0.237305 12.6311C0.237305 5.91794 5.63201 0.479004 12.2865 0.479004C18.941 0.479004 24.3361 5.91958 24.3361 12.6311Z"
        fill="black"
      />
      <path
        d="M37.5547 12.6312C37.5547 18.9493 34.8572 24.0706 31.5299 24.0706C28.2027 24.0706 25.5051 18.9476 25.5051 12.6312C25.5051 6.31484 28.2027 1.19189 31.5299 1.19189C34.8572 1.19189 37.5547 6.31484 37.5547 12.6312Z"
        fill="black"
      />
      <path
        d="M42.9612 12.6313C42.9612 18.2919 42.0124 22.8804 40.8422 22.8804C39.672 22.8804 38.7231 18.2903 38.7231 12.6313C38.7231 6.97224 39.672 2.38208 40.8426 2.38208C42.0132 2.38208 42.9612 6.97101 42.9612 12.6313Z"
        fill="black"
      />
    </SvgIcon>
  );
}
