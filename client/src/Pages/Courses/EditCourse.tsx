/* eslint-disable sonarjs/cognitive-complexity */

import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getFormData } from 'Helpers';
import moment from 'moment';
import AddButton from 'Pages/Common/AddButton';
import EditButtons from 'Pages/Common/EditButtons';
import {
  addCourse, deleteCourse, editCourse, setCourses,
} from 'Pages/Courses/Redux/Actions';
import { CouponType, CourseType } from 'Pages/Courses/Types';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from 'Theme';

import EditCoupon from './EditCoupon';

const useStyles = makeStyles(() => ({
  formField: {
    width: '100%',
    marginTop: '15px',
  },
  notSavedCard: {
    // TODO: something spiffier than a green background for a new course
    // maybe a badge?
    background: '#efe',
  },
}));

export type CouponsById = Map<number, CouponType>;
interface EditCourseProps {
  courseData: CourseType,
  courseIndex: number,
  setAddCourseButton: (boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse(
  { courseData, courseIndex, setAddCourseButton }: EditCourseProps,
): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  const courses = useSelector((state) => state.courses);
  const error = useSelector((state) => state.alert);

  // negative id indicates not in the db. Just delete from state.
  const notSaved = courseData.id < 0;

  // for the state-controlled select
  const [courseImageName, setCourseImageName] = useState(courseData.imageName);

  // for coupon management. Store by id for easy access
  const couponsById: CouponsById = new Map();
  if (courseData.coupons) {
    courseData.coupons.forEach((c) => {
      // make a copy of the coupon data so it doesn't mutate with changes to the map
      if (c.id) couponsById.set(c.id, { ...c });
    });
  }

  const [coupons, setCoupons] = useState<CouponsById>(couponsById);

  // TODO: I'd rather read this from the filesystem but that would require
  // server-side rendering, which I'm not ready to take on just yet
  const courseImageOptions = ['udemy-course-image.jpg'];

  const handleSubmit = (event) => {
    event.preventDefault();

    // gather non-coupon data from the form
    const newCourseData = getFormData(event);

    // gather coupon data from state
    newCourseData.coupons = [];
    for (const [id, couponData] of coupons) {
      // remove id if it's negative, since new coupons don't need id
      if (id < 0) delete couponData.id;
      // update date to isoformat
      couponData.utcExpirationISO = moment(couponData.utcExpirationISO).toISOString();
      newCourseData.coupons.push(couponData);
    }

    if (notSaved) {
      dispatch(addCourse(newCourseData));

      // reinstate the "add" button if the action was successful
      if (!error) setAddCourseButton(true);
    } else {
      dispatch(editCourse(newCourseData, courseData));
    }
  };

  const handleDelete = async () => {
    if (notSaved) {
      const newCourses = courses.filter((course) => course.id !== courseData.id);
      dispatch(setCourses(newCourses));

      // reinstate the "add" button
      if (!error) setAddCourseButton(true);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteCourse(courseData.id));
    }
  };

  const addCoupon = () => {
    // add to the map by ID. Use negative id to indicate new coupon.
    const newId = 0 - (coupons.size + 1);
    const newCoupon: CouponType = {
      id: newId,
      code: '',
      price: 9.99,
      utcExpirationISO: moment(new Date()).toString(),
    };
    const newCoupons = new Map(coupons);
    newCoupons.set(newId, newCoupon);
    setCoupons(newCoupons);
  };

  const couponElements: ReactElement[] = [];
  // when I use for ... in, typescript complains that id is a string(??)
  for (const [id] of coupons) {
    couponElements.push(
      <EditCoupon
        key={id}
        couponId={id}
        coupons={coupons}
        setCoupons={setCoupons}
      />,
    );
  }

  const itemLabel = `Course ${courseIndex}`;
  const itemId = `course-${courseIndex}`;

  return (
    <Card className={notSaved ? classes.notSavedCard : ''}>
      <Box p={2}>
        <form aria-label={itemLabel} onSubmit={handleSubmit}>
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
          <Box style={{
            border: `2px ${colors.mediumTeal} solid`, marginTop: '10px', background: '#eeeeee',
          }}
          >
            <Typography style={{ paddingLeft: 5 }}>Coupons</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {couponElements}
            </MuiPickersUtilsProvider>
            <AddButton onClick={addCoupon} size="small" itemString="Coupon" />
          </Box>
          <EditButtons handleDelete={handleDelete} itemString="course" itemLabel={`Course ${courseIndex}`} />
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
