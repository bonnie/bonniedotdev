import Grid from '@material-ui/core/Grid';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddButton from '../Common/AddButton';
import Course from './Course';
import EditCourse from './EditCourse';
import { setCourses, setCoursesFromServer } from './Redux/Actions';
import { CourseType } from './Types';

// eslint-disable-next-line max-lines-per-function
export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);
  // const user = true; // TODO <------ for testing only
  const [addButton, setAddButton] = useState(user !== null);

  // load courses from server on component mount
  useEffect(() => { dispatch(setCoursesFromServer()); }, [dispatch]);

  const addEditableCourse = () => {
    const newCourse: CourseType = {
      // new courses get a negative number, to distinguish from existing courses
      id: 0 - (courses.length + 1),
      name: '',
      description: '',
      link: '',
      imageName: '',
      coupons: [],
    };
    dispatch(setCourses([...courses, newCourse]));
    setAddButton(false);
  };

  return (
    <>
      <h1>Courses</h1>
      <Grid container spacing={3}>
        {courses?.map((course: CourseType, i: number) => (
          <Grid key={course.id} item xs={12} sm={6} md={4} style={{ display: 'flex', alignItems: 'stretch' }}>
            {user
              ? <EditCourse courseData={course} courseIndex={i} setAddCourseButton={setAddButton} />
              : <Course courseData={course} />}
          </Grid>
        ))}
        { addButton ? <AddButton onClick={addEditableCourse} itemString="Course" /> : null}
      </Grid>
    </>
  );
}
