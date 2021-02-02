/* eslint-disable sonarjs/cognitive-complexity */
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddCourseButton from './AddCourseButton';
import Course from './Course';
import DeleteCourseButton from './DeleteCourseButton';
import EditCourseButton from './EditCourseButton';
import { setCoursesFromServer } from './Redux/Actions';
import { CourseType } from './Types';

// eslint-disable-next-line max-lines-per-function
export default function Courses(): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses);

  // load Courses from server on component mount
  useEffect(() => {
    dispatch(setCoursesFromServer());
  }, [dispatch]);

  const mapCourseToElement = useCallback(
    (courseData: CourseType) => {
      if (!courseData.id) return null;

      const editButtons = (
        <>
          <EditCourseButton id={courseData.id} courseData={courseData} />
          <DeleteCourseButton id={courseData.id} name={courseData.name} />
        </>
      );

      return (
        <Course
          key={courseData.id}
          courseData={courseData}
          editButtons={user ? editButtons : null}
        />
      );
    },
    [user],
  );

  const coursePage = useMemo(
    () => (
      <>
        <PageTitleWithAdd
          title="Courses"
          variant="h1"
          AddButton={<AddCourseButton />}
        />
        <Grid container spacing={3}>
          {courses.map(mapCourseToElement)}
        </Grid>
      </>
    ),
    [courses, mapCourseToElement],
  );

  return user ? (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {coursePage}
    </MuiPickersUtilsProvider>
  ) : (
    coursePage
  );
}

/* eslint-disable sonarjs/cognitive-complexity */
// import Grid from '@material-ui/core/Grid';
// import { hasNewItem } from 'Helpers';
// import React, {
//   ReactElement, useCallback, useEffect, useMemo, useState,
// } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import AddButton from '../Common/AddButton';
// import Course from './Course';
// import EditCourse from './EditCourse';
// import { setCourses, setCoursesFromServer } from './Redux/Actions';
// import { CourseType } from './Types';

// // eslint-disable-next-line max-lines-per-function
// export default function Courses(): ReactElement {
//   const dispatch = useDispatch();
//   const courses = useSelector((state) => state.courses);
//   const user = useSelector((state) => state.user);

//   // load courses from server on component mount
//   useEffect(() => { dispatch(setCoursesFromServer()); }, [dispatch]);

//   // only allow one new quote at a time, since submitting a new quote will obliterate
//   // any other quotes-in-progress
//   const [addButton, setAddButton] = useState(user !== null);
//   useEffect(
//     () => { if (user) setAddButton(!hasNewItem(courses)); },
//     [user, courses],
//   );

//   // populate review quotes data from the server
//   useEffect(() => { dispatch(setCoursesFromServer()); }, [dispatch]);

//   // populate the courses, but only if they're needed for quote edit selection
//   // Do this here, so it doesn't have to be done individually on each editable quote
//   // TODO: cache this!
//   useEffect(() => { if (user) dispatch(setCoursesFromServer()); }, [dispatch, user]);

//   const addCourse = useCallback(() => {
//     const newCourse: CourseType = {
//       // new courses get a negative number, to distinguish from existing courses
//       id: 0 - (courses.length + 1),
//       name: '',
//       description: '',
//       link: '',
//       imageName: '',
//       coupons: [],
//     };
//     dispatch(setCourses([...courses, newCourse]));
//     setAddButton(false);
//   }, [dispatch, courses]);

//   const deleteCourse = useCallback((id) => {
//     const newCourses = courses.filter((course) => course.id !== id);
//     dispatch(setCourses(newCourses));
//   }, [courses, dispatch]);

//   return useMemo(() => (
//     <>
//       <h1>Courses</h1>
//       <Grid container spacing={3}>
//         {courses?.map((course: CourseType, i: number) => (
//           <Grid key={course.id} item xs={12} sm={6} md={4}
// style={{ display: 'flex', alignItems: 'stretch' }}>
//             {user
//               ? (
//                 <EditCourse
//                   courseData={course}
//                   courseIndex={i}
//                   deleteCourseFromState={deleteCourse}
//                 />
//               )
//               : <Course courseData={course} />}
//           </Grid>
//         ))}
//         { addButton ? <AddButton onClick={addCourse} itemString="Course" /> : null}
//       </Grid>
//     </>
//   ), [courses, addButton, addCourse, deleteCourse, user]);
// }
