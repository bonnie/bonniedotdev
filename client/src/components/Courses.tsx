import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Course from './Course';
import LoadingSpinner from './LoadingSpinner';
import { CourseType } from '../types';
import { getCoursesFromServer } from '../axiosActions';

// TODO; remove!
import { courseWithCouponsAndQuotes, courseWithoutCouponsAndQuotes } from '../tests/data';

// TODO: update Alert to Snackbar, using context or other state management

export default function Courses() {
  // store course information

  // TODO; revert!
  // const [courses, setCourses] = useState<CourseType[] | null>(null);
  // eslint-disable-next-line max-len
  const [courses, setCourses] = useState<CourseType[] | null>([courseWithCouponsAndQuotes, courseWithoutCouponsAndQuotes]);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: revert
  // // get information about courses from Udemy API on component mount
  // useEffect(() => {
  //   async function setCoursesFromServer() {
  //     setLoading(true);
  //     const { courses: coursesFromServer, error: responseError } = await getCoursesFromServer();

  //     setLoading(false);
  //     setError(responseError);
  //     setCourses(coursesFromServer);
  //   }
  //   setCoursesFromServer();
  // }, []);
  // END: revert

  return (
    <>
      <h1>Courses</h1>
      <LoadingSpinner open={loading} />
      {error
        ? <Alert severity="error">Error retrieving courses from server. Please try again later.</Alert> : null}
      {courses?.map((course: CourseType) => <Course key={course.id} courseData={course} />)}
    </>
  );
}

/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
*/
