import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CouponButton from './CouponButton';
import { CourseType } from '../types';

type CourseProps = {
  courseData: CourseType,
};

export default function Course({ courseData }: CourseProps) {
  const coupons = (
    <>
      <Typography variant="h6" gutterBottom>Coupons</Typography>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        {courseData.coupons?.map(
          (coupon) => (
            <CouponButton key={coupon.id} courseLink={courseData.link} couponData={coupon} />
          ),
        )}
      </ButtonGroup>
    </>
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`course${courseData.id}-content`}
        id={`course${courseData.id}-header`}
      >
        <Link target="_blank" href={courseData.link} rel="noreferrer">
          {courseData.name}
        </Link>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {courseData.description}
        </Typography>
        {courseData.coupons ? coupons : null}
      </AccordionDetails>
    </Accordion>
  );
}
