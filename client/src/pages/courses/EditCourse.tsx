/* eslint-disable sonarjs/cognitive-complexity */
// https://www.npmjs.com/package/json-merge-patch

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import { getFormData } from 'Helpers';
import EditButtons from 'Pages/Common/EditButtons';
import {
  addCourse, deleteCourse, editCourse, setCourses,
} from 'Pages/Courses/Redux/actions';
import { CouponType, CourseType } from 'Pages/Courses/Types';
import React, { ReactElement, useState } from 'react';
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

const useStyles = makeStyles(() => ({
  formField: {
    width: '100%',
    marginTop: '15px',
  },
  notSavedCard: {
    background: '#efe',
  },
}));

interface EditCourseProps {
  courseData: CourseType,
  showAddButton: (boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse({ courseData, showAddButton }: EditCourseProps): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  const courses = useSelector((state) => state.courses);
  const error = useSelector((state) => state.alert);

  // negative id indicates not in the db. Just delete from state.
  const notSaved = courseData.id < 0;

  // for the state-controlled select
  const [courseImageName, setCourseImageName] = useState(courseData.imageName);

  // I'd rather read this from the filesystem but that would require
  // server-side rendering, which I'm not ready to take on just yet
  const courseImageOptions = ['udemy-course-image.jpg'];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    if (notSaved) {
      dispatch(addCourse(formData));

      // reinstate the "add" button if the action was successful
      if (!error) showAddButton(true);
    } else {
      dispatch(editCourse(formData, courseData));
    }
  };

  const handleDelete = async () => {
    if (notSaved) {
      const newCourses = courses.filter((course) => course.id !== courseData.id);
      dispatch(setCourses(newCourses));

      // reinstate the "add" button
      if (!error) showAddButton(true);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteCourse(courseData.id));
    }
  };

  return (
    <Card className={notSaved ? classes.notSavedCard : ''}>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={courseData.id} />
          <TextField className={classes.formField} multiline required name="name" label="Course name" defaultValue={courseData.name} />
          <TextField className={classes.formField} multiline required name="description" label="Description" defaultValue={courseData.description} />
          <TextField className={classes.formField} multiline required name="link" label="Full Link" defaultValue={courseData.link} />
          <FormControl required className={classes.formField}>
            <InputLabel id="course-image-label">Course Image Name</InputLabel>
            <Select
              labelId="course-image-label"
              name="imageName"
              value={courseImageName || ''}
              onChange={(event) => setCourseImageName(event.target.value as string)}
            >
              {courseImageOptions.map(
                (imageOption) => (
                  <MenuItem key={imageOption} value={imageOption}>
                    {imageOption}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
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
