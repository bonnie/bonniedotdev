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
  const [newCourses, updateNewCourses] = useState(false);

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
  }, [dispatch, callServer, newCourses]);
  // TODO: this will only work once, since once newCourses is set to true,
  //  it's never set to false again. can't set to false within useEffect (infinite loop)

  const addCourse = () => {
    // TODO: better to make an EmptyCourseType instead? Would have to update reducer etc.
    const newCourse: CourseType = {
      // new courses get a negative number, to distinguish from an actual course
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
              ? <EditCourse courseData={course} updateNewCourses={updateNewCourses} />
              : <Course courseData={course} />}
          </Grid>
        ))}
        { user ? <AddButton onClick={addCourse} /> : null}
      </Grid>
    </>
  );
}
