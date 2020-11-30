import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionIds, setCourses } from '../../redux/actions';
import { CourseType } from '../../types';
import AddButton from '../common/AddButton';
import Course from './Course';
import EditCourse from './EditCourse';

// eslint-disable-next-line max-lines-per-function
export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  // const user = useSelector((state) => state.user);
  const user = true; // TODO <------ for testing only

  // get information about courses on component mount and when courses update
  useEffect(() => {
    dispatch({ type: actionIds.SET_COURSES_FROM_SERVER });
  }, [dispatch]);

  const addCourse = () => {
    const newCourse: CourseType = {
      // new courses get a negative number, to distinguish from existing courses
      id: 0 - (courses.length + 1),
      name: '',
      description: '',
      link: '',
      imageName: '',
    };
    dispatch(setCourses([...courses, newCourse]));
  };

  return (
    <>
      <h1>Courses</h1>
      <Grid container spacing={3}>
        {courses?.map((course: CourseType) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            {user
              ? <EditCourse courseData={course} />
              : <Course courseData={course} />}
          </Grid>
        ))}
        { user ? <AddButton onClick={addCourse} /> : null}
      </Grid>
    </>
  );
}
