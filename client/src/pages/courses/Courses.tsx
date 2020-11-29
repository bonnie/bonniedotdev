import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import urls from '../../constants/urls';
import { actionTypes, setCourses } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum, CourseType } from '../../types';
import AddButton from '../common/AddButton';
import Course from './Course';
import EditCourse from './EditCourse';

// eslint-disable-next-line max-lines-per-function
export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const callServer = useAxios();
  // const user = useSelector((state) => state.user);
  const user = true; // TODO <------ for testing only

  // track whether quotes have been updated
  // TODO: it seems janky to increment a number when the increment has no meaning
  // I could use a boolean, but then I'd need to reset it within useEffect
  // I could only reset it when the value was true, but that would still run useEffect
  // twice when it only needs to run once.
  const [updateCourses, setUpdateCourses] = useState(0);

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
  }, [dispatch, callServer, updateCourses]);

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
              ? (
                <EditCourse
                  courseData={course}
                  setUpdateCourses={() => setUpdateCourses(updateCourses + 1)}
                />
              )
              : <Course courseData={course} />}
          </Grid>
        ))}
        { user ? <AddButton onClick={addCourse} /> : null}
      </Grid>
    </>
  );
}
