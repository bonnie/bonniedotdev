/* eslint-disable sonarjs/cognitive-complexity */
// https://www.npmjs.com/package/json-merge-patch

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import { getFormData } from 'Helpers';
import EditButtons from 'Pages/Common/EditButtons';
import { addCourse, deleteCourse, setCourses } from 'Pages/Courses/Redux/actions';
import { CouponType, CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface EditCouponProps {
  coupon: CouponType | null,
  courseId: number | null,
}

function EditCoupon({ coupon, courseId }: EditCouponProps): ReactElement {
  return (
    <Box />
  );
}

// id: number,
// price: number,
// code: string,
// utcExpiration: Date,

interface EditCourseProps {
  courseData: CourseType,
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse({ courseData }: EditCourseProps): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  // negative id indicates not in the db. Just delete from state.
  const notSaved = courseData.id < 0;
  const background = notSaved ? '#efe' : 'white';

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    dispatch(addCourse(formData));
  };

  const handleDelete = async () => {
    if (notSaved) {
      const newCourses = courses.filter((course) => course.id !== courseData.id);
      dispatch(setCourses(newCourses));
    } else {
      // it's got to be deleted from the db
      dispatch(deleteCourse(courseData.id));
    }
  };

  return (
    <Card style={{ background }}>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={courseData.id} />
          <TextField style={{ width: '100%' }} multiline required name="name" label="Course name" defaultValue={courseData.name} />
          <TextField style={{ width: '100%' }} multiline required name="description" label="Description" defaultValue={courseData.description} />
          <TextField style={{ width: '100%' }} multiline required name="link" label="Full Link" defaultValue={courseData.link} />

          <Box>
            {/* <EditCoupon /> */}
          </Box>

          <EditButtons handleDelete={handleDelete} deleteItemString="course" />
        </form>
      </Box>
    </Card>
  );
}

// id: number,
// name: string,
// description: string,
// link: string,
// imageName: string,
// bestCoupon?: CouponType,
