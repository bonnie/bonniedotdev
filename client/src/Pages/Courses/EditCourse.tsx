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
  addCourse, deleteCourse, editCourse,
} from 'Pages/Courses/Redux/Actions';
import { CouponType, CourseType } from 'Pages/Courses/Types';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  deleteCourseFromState: (number) => void,
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse(
  { courseData, courseIndex, deleteCourseFromState }: EditCourseProps,
): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();

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
    } else {
      dispatch(editCourse(newCourseData, courseData));
    }
  };

  const handleDelete = async () => {
    if (notSaved) {
      deleteCourseFromState(courseData.id);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteCourse(courseData.id));
    }
  };

  const addCoupon = () => {
    // add to the Map by ID. Use negative id to indicate new coupon.
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

  const deleteCoupon = (couponId) => {
    // remove from coupon state
    const newCoupons = new Map(coupons);
    newCoupons.delete(couponId);
    setCoupons(newCoupons);
  };

  const updateCoupon = (property, value, couponId) => {
    // update state
    const newCoupons = new Map(coupons);
    const couponData = coupons.get(couponId);
    if (!couponData) {
    // something went wrong if the id is not in the coupons state
    // TODO log error to file
      console.error('found coupon id not in state', couponId);
      return;
    }
    couponData[property] = value;
    newCoupons.set(couponId, couponData);
    setCoupons(newCoupons);
  };

  const couponElements: ReactElement[] = [];
  // when I use for ... in, typescript complains that id is a string(??)
  for (const [id] of coupons) {
    const couponData = coupons.get(id);

    // to make TypeScript happy :-/
    if (couponData) {
      couponElements.push(
        <EditCoupon
          key={id}
          couponData={couponData}
          deleteCoupon={deleteCoupon}
          updateCoupon={updateCoupon}
        />,
      );
    }
  }

  const itemLabel = `Course ${courseIndex}`;
  const itemId = `course-${courseIndex}`;

  return (
    <Card className={notSaved ? classes.notSavedCard : ''}>
      <Box p={2}>
        <form aria-label={itemLabel} onSubmit={handleSubmit}>
          <Input type="hidden" name="id" value={courseData.id} />
          <TextField className={classes.formField} multiline required name="name" aria-label={`${itemLabel} name`} label="Course name" defaultValue={courseData.name} />
          <TextField className={classes.formField} multiline required name="description" aria-label={`${itemLabel} description`} label="Description" defaultValue={courseData.description} />
          <TextField className={classes.formField} multiline required name="link" aria-label={`${itemLabel} link`} label="Full Link" defaultValue={courseData.link} />
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
