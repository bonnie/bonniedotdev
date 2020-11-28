/* eslint-disable sonarjs/cognitive-complexity */
// https://www.npmjs.com/package/json-merge-patch

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { DateTimePicker } from '@material-ui/pickers';
import React, { ReactElement } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { CouponType, CourseType } from '../../types';

interface EditCouponProps {
  coupon: CouponType | null,
  courseId: number | null,
  control: Control,
}
function EditCoupon({ coupon, courseId, control }: EditCouponProps): ReactElement {
  return (
    <Box>
      <Controller
        name="courseId"
        as={Input}
        type="hidden"
        defaultValue={courseId}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        name="couponId"
        as={Input}
        type="hidden"
        defaultValue={coupon ? coupon.id : null}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        name="code"
        as={Input}
        defaultValue={coupon ? coupon.id : null}
        control={control}
        rules={{ required: true }}
      />
      {/* <Controller
        name="utcExpiration"
        as={DateTimePicker}
        defaultValue={new Date()}
        control={control}
        rules={{ required: true }}
      /> */}
    </Box>
  );
}

// id: number,
// price: number,
// code: string,
// utcExpiration: Date,

interface EditCourseProps {
  course: CourseType | null
}

// eslint-disable-next-line max-lines-per-function
export default function EditCourse({ course = null }: EditCourseProps): ReactElement {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={Input}
        name="name"
        control={control}
        defaultValue={course ? course.name : ''}
      />
      <Controller
        as={Input}
        name="description"
        control={control}
        defaultValue={course ? course.description : ''}
      />
      <Controller
        as={Input}
        name="link"
        control={control}
        defaultValue={course ? course.link : ''}
      />
      {/* <Controller
        name="imageName"
        as={Select}
        options={[
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' },
        ]}
        default={course ? course.imageName : ''}
        control={control}
        rules={{ required: true }}
      /> */}
      <Box>
        {/* <EditCoupon /> */}
      </Box>
      <Button type="submit">
        {course ? 'Update' : 'Create'}
        {' '}
        Course
      </Button>
    </form>
  );
}

// id: number,
// name: string,
// description: string,
// link: string,
// imageName: string,
// bestCoupon?: CouponType,
// reviewQuotes?: ReviewQuoteType[],
