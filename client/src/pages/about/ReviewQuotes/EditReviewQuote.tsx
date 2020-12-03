import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getFormData } from 'Helpers';
import EditButtons from 'Pages/Common/EditButtons';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addReviewQuote, deleteReviewQuote,
  editReviewQuote, setReviewQuotes,
} from './Redux/actions';
import ReviewQuoteBase from './ReviewQuoteBase';
import { ReviewQuoteType } from './Types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formControl: {
    minWidth: 120,
    maxWidth: '100%',
  },
  bottomFlex: {
    alignSelf: 'flex-end',
  },
}));

interface EditReviewQuoteProps {
  reviewQuoteData: ReviewQuoteType,
  courses: CourseType[],
  setAddButton: (boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditReviewQuote(
  { reviewQuoteData, courses, setAddButton }: EditReviewQuoteProps,
): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const error = useSelector((state) => state.alert);
  const notSaved = reviewQuoteData.id < 1;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    if (notSaved) {
      dispatch(addReviewQuote(formData));

      // reinstate the "add" button if the action was successful
      if (!error) setAddButton(true);
    } else {
      dispatch(editReviewQuote(formData, reviewQuoteData));
    }
  };

  const handleDelete = async () => {
    if (notSaved) {
      const newReviewQuotes = reviewQuotes.filter((rq) => rq.id !== reviewQuoteData.id);
      dispatch(setReviewQuotes(newReviewQuotes));

      // reinstate the "add" button
      if (!error) setAddButton(true);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteReviewQuote(reviewQuoteData.id));
    }
  };

  const contents = (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input type="hidden" name="id" value={reviewQuoteData.id} />
        <TextField
          required
          multiline
          name="body"
          id="body"
          label="Quote"
          style={{ width: '100%' }}
          defaultValue={reviewQuoteData.body || ''}
        />
        <Box mt={2} className={classes.bottomFlex}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="course-select">Course</InputLabel>
            <Select
              labelId="course-select"
              name="courseId"
              defaultValue={reviewQuoteData.courseId || ''}
              style={{ width: '100%' }}
            >
              { courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              )) }
            </Select>
          </FormControl>
          <EditButtons handleDelete={handleDelete} itemString="quote" />
        </Box>
      </form>
    </Box>
  );
  return <ReviewQuoteBase contents={contents} newQuote={notSaved} />;
}
