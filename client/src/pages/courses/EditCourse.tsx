/* eslint-disable sonarjs/cognitive-complexity */
// https://www.npmjs.com/package/json-merge-patch

import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteIcon, UpdateIcon } from '../../constants/icons';
import urls from '../../constants/urls';
import { getFormData } from '../../helpers';
import { setCourses } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum, CouponType, CourseType } from '../../types';
import ConfirmationDialog from '../common/ConfirmationDialog';

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
  setUpdateCourses: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse(
  { courseData, setUpdateCourses }: EditCourseProps,
): ReactElement {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const callServer = useAxios();

  const handleSubmit = (event) => {
    const formData = getFormData(event);

    // process coupons
  };

  const handleDeleteDialogClose = async (confirmed) => {
    // close the dialog
    setConfirmationOpen(false);

    if (!confirmed) return; // they bailed

    // otherwise, delete the course
    if (courseData.id < 0) {
      // negative id indicates not in the db. Just delete from state.
      const newCourses = courses.filter((course) => course.id !== courseData.id);
      dispatch(setCourses(newCourses));
    } else {
      // it's got to be deleted from the db
      await callServer(
        dispatch,
        { url: urls.courseURL, method: axiosMethodEnum.DELETE, urlParam: courseData.id },
      );

      // TODO: update courses state with new data from the server
    }
  };

  return (
    <Card>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={courseData.id} />
          <TextField style={{ width: '100%' }} multiline name="name" label="Course name" defaultValue={courseData.name} />
          <TextField style={{ width: '100%' }} multiline name="description" label="Description" defaultValue={courseData.description} />
          <TextField style={{ width: '100%' }} multiline name="link" label="Full Link" defaultValue={courseData.link} />

          <Box>
            {/* <EditCoupon /> */}
          </Box>

          <ButtonGroup>
            <IconButton type="submit"><UpdateIcon /></IconButton>
            <IconButton onClick={() => setConfirmationOpen(true)}><DeleteIcon /></IconButton>
          </ButtonGroup>

        </form>
      </Box>
      <ConfirmationDialog
        open={confirmationOpen}
        handleClose={handleDeleteDialogClose}
        message="Are you sure you want to delete this course?"
      />
    </Card>
  );
}

// id: number,
// name: string,
// description: string,
// link: string,
// imageName: string,
// bestCoupon?: CouponType,
