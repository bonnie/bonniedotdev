/* eslint-disable max-lines-per-function */
import userEvent from '@testing-library/user-event';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

test.only('create new review quote and save', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newReviewQuoteScreen = renderWithProvider(
    <ReviewQuotes />,
    initialState,
  );

  // wait until review quote edit buttons appear so we know data is loaded
  const editButtons = await newReviewQuoteScreen.findAllByRole('button', {
    name: /edit review quote/i,
  });
  expect(editButtons.length).toBe(5);

  // find and click add button
  const addButton = newReviewQuoteScreen.getByRole('button', {
    name: /add review quote/i,
  });
  userEvent.click(addButton);

  // wait for new review quote modal to show
  const reviewQuoteModalTitle = await newReviewQuoteScreen.findByRole(
    'heading',
    { name: /add review quote/i },
  );
  expect(reviewQuoteModalTitle).toBeVisible();

  // add body
  const bodyField = newReviewQuoteScreen.getByRole('textbox', { name: 'body' });
  userEvent.type(bodyField, 'i like big cats and i cannot lie');

  // open the select menu
  const selectMenu = newReviewQuoteScreen.getByLabelText(/course/i);
  userEvent.click(selectMenu);

  // select course for quote
  // const courseSelectOption = await newReviewQuoteScreen.findByRole('option', {
  //   name: 'Course 2',
  // });
  const courseSelectOption = await newReviewQuoteScreen.findByRole('option');
  userEvent.click(courseSelectOption);

  // click button to save new review quote
  const saveButton = newReviewQuoteScreen.getByRole('button', {
    name: /save/i,
  });
  userEvent.click(saveButton);

  // expect the modal to be hidden
  expect(reviewQuoteModalTitle).not.toBeVisible();
});

test('update a review quote', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editReviewQuoteScreen = renderWithProvider(
    <ReviewQuotes />,
    initialState,
  );

  // wait until review quote edit buttons appear so we know data is loaded
  const editButtons = await editReviewQuoteScreen.findAllByRole('button', {
    name: /edit review quote/i,
  });
  expect(editButtons.length).toBe(5);

  // click the first edit button, which should be associated with the review quote
  const firstEditButton = editButtons[0];
  userEvent.click(firstEditButton);

  // check that we have the modal with the expected title
  const modalTitle = editReviewQuoteScreen.getByRole('heading', {
    name: /edit review quote/i,
  });
  expect(modalTitle).toBeVisible();

  // update content and confirm update
  const bodyField = editReviewQuoteScreen.getByRole('textbox', {
    name: 'body',
  });
  userEvent.clear(bodyField);
  userEvent.type(
    bodyField,
    "Just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now",
  );

  // click save button
  const saveButton = editReviewQuoteScreen.getByRole('button', {
    name: /save/i,
  });
  userEvent.click(saveButton);

  // check that the modal closes
  // (there is no "server database" to update with the new review quote content in this test)
  expect(modalTitle).not.toBeVisible();
});

test('delete a talk', async () => {
  // when I run any one test, or any two files in combination, everyting's fine
  // but when I run all three, I get this error: connect ECONNREFUSED 127.0.0.1:80
  // (tests pass) :shakesfist:
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const deleteTalkScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until review quote delete buttons appear so we know data is loaded
  const deleteButtons = await deleteTalkScreen.findAllByRole('button', {
    name: /delete review quote/i,
  });
  expect(deleteButtons.length).toBe(5);

  // click the first delete button, which should be associated with the review quote
  const firstDeleteButton = deleteButtons[0];
  userEvent.click(firstDeleteButton);

  // check that we have the modal with the expected title
  const modalTitle = deleteTalkScreen.getByRole('heading', {
    name: /^Are you sure you want to delete/i,
  });
  expect(modalTitle).toBeVisible();

  // click confirm on modal
  const confirmButton = deleteTalkScreen.getByRole('button', {
    name: 'Confirm',
  });
  userEvent.click(confirmButton);

  // confirm modal has disappeared (note, review quote will not be deleted
  // because the handler information has not changed)
  expect(modalTitle).not.toBeVisible();
});
