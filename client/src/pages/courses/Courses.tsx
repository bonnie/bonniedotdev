import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionTypes } from '../../redux/actions';
import { CourseType } from '../../types';
import Course from './Course';

export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  // get information about courses from Udemy API on component mount
  useEffect(() => {
    dispatch({ type: actionTypes.SET_COURSES_FROM_SERVER });
  }, [dispatch]);

  return (
    <>
      <h1>Courses</h1>
      <Grid container spacing={3}>
        {courses?.map((course: CourseType) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <Course courseData={course} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
