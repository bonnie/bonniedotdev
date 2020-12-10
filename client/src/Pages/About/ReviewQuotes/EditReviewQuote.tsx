import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getFormData } from 'Helpers';
import EditButtons from 'Pages/Common/EditButtons';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import {
  addReviewQuote, deleteReviewQuote,
  editReviewQuote,
} from './Redux/Actions';
import ReviewQuoteBase from './ReviewQuoteBase';
import { ReviewQuoteType } from './Types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  flexContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  courseSelect: {
    minWidth: 120,
    maxWidth: '100%',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
}));

interface EditReviewQuoteProps {
  reviewQuoteData: ReviewQuoteType,
  courses: CourseType[],
  deleteReviewQuoteFromState: (number) => void,
  reviewQuoteIndex: number,
}

// eslint-disable-next-line max-lines-per-function
export default function EditReviewQuote(
  {
    reviewQuoteData, courses, deleteReviewQuoteFromState, reviewQuoteIndex,
  }: EditReviewQuoteProps,
): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notSaved = reviewQuoteData.id < 1;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    if (notSaved) {
      dispatch(addReviewQuote(formData));
    } else {
      dispatch(editReviewQuote(formData, reviewQuoteData));
    }
  };

  const handleDelete = async () => {
    if (notSaved) {
      deleteReviewQuoteFromState(reviewQuoteData.id);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteReviewQuote(reviewQuoteData.id));
    }
  };

  const itemLabel = `Review Quote ${reviewQuoteIndex}`;
  const itemId = `review-quote-${reviewQuoteIndex}`;

  const contents = (
    <Box className={classes.flexContainer}>
      <form aria-label={itemLabel} onSubmit={handleSubmit}>
        <fieldset>
          <legend style={{ display: 'none' }}>{itemLabel}</legend>
          <Input type="hidden" id={`${itemId}-id`} name="id" value={reviewQuoteData.id} />
          <TextField
            required
            multiline
            name="body"
            id={`${itemId}-body`}
            aria-label={`${itemLabel} body`}
            label="Quote"
            style={{ width: '100%' }}
            defaultValue={reviewQuoteData.body || ''}
          />
          {/* TODO: align this box at the bottom of its container */}
          <Box mt={2} className={classes.flexEnd}>
            <TextField
              className={classes.courseSelect}
              name="courseId"
              id={`${itemId}-course`}
              aria-label={`${itemLabel} course`}
              label="Course"
              defaultValue={reviewQuoteData.courseId || ''}
              select
            >
              { courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              )) }
            </TextField>
          </Box>
        </fieldset>
        <EditButtons
          handleDelete={handleDelete}
          itemString="review quote"
          itemLabel={itemLabel}
        />
      </form>
    </Box>
  );
  return <ReviewQuoteBase contents={contents} newQuote={notSaved} />;
}
