import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import React, { ReactElement, useEffect, useState } from 'react';

import { getCoursesFromServer } from '../../axiosActions';
import { CourseType } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';
import Course from './Course';

// TODO: update Alert to Snackbar, using context or other state management

export default function Courses(): ReactElement {
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // get information about courses from Udemy API on component mount
  useEffect(() => {
    async function setCoursesFromServer() {
      setLoading(true);
      const { courses: coursesFromServer, error: responseError } = await getCoursesFromServer();

      setLoading(false);
      setError(responseError);
      setCourses(coursesFromServer);
    }
    setCoursesFromServer();
  }, []);

  return (
    <>
      <h1>Courses</h1>
      <LoadingSpinner open={loading} />
      {error
        ? <Alert severity="error">Error retrieving courses from server. Please try again later.</Alert> : null}
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
