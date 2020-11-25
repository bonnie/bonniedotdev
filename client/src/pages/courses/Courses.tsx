import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import urls from '../../constants/urls';
import { actionTypes } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum, CourseType } from '../../types';
import Course from './Course';

export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const callServer = useAxios();

  // get information about courses on component mount
  useEffect(() => {
    const getDataFromServer = async () => {
      const payload = await callServer(dispatch, {
        method: axiosMethodEnum.GET,
        url: urls.coursesURL,
      });
      dispatch({ type: actionTypes.SET_COURSES, payload });
    };
    getDataFromServer();
  }, [dispatch, callServer]);

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
