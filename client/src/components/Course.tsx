import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Coupon from './Coupon';
import { CourseType } from '../types';

type CourseProps = {
  data: CourseType,
};

export default function Course({ data }: CourseProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="course{data.id}-content"
        id="course{data.id}-header"
      >
        <Typography>{data.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {data.description}
        </Typography>
        <div>{data.coupons?.map((coupon) => <Coupon key={coupon.id} data={coupon} />)}</div>
      </AccordionDetails>
    </Accordion>
  );
}
