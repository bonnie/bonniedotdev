import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect, useState } from 'react';

import { translateCouponValuesToDates } from '../../helpers';
import { getDataFromServer } from '../../redux/actions';
import { CourseType } from '../../types';
import Course from './Course';

// TODO: update Alert to Snackbar, using context or other state management

export default function Courses(): ReactElement {
  const [courses, setCourses] = useState<CourseType[] | null>(null);

  // get information about courses from Udemy API on component mount
  useEffect(() => {
    async function setCoursesFromServer() {
      await getDataFromServer('/api/courses', setCourses);
      if (courses !== null) {
        setCourses(courses.map((course) => translateCouponValuesToDates(course)));
      }
    }
    setCoursesFromServer();
  }, []);

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
