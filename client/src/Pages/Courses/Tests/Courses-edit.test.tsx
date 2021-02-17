/* eslint-disable max-lines-per-function */
import userEvent from '@testing-library/user-event';
import Courses from 'Pages/Courses/Courses';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

test('create new Course and save', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newCourseScreen = renderWithProvider(<Courses />, initialState);

  // wait until Course edit buttons appear so we know data is loaded
  const editButtons = await newCourseScreen.findAllByRole('button', {
    name: /edit Course/i,
  });
  expect(editButtons.length).toBe(2);

  // find and click add button
  const addButton = newCourseScreen.getByRole('button', {
    name: /add course/i,
  });
  userEvent.click(addButton);

  // wait for new Course modal to show
  const CourseModalTitle = await newCourseScreen.findByRole('heading', {
    name: /add course/i,
  });
  expect(CourseModalTitle).toBeVisible();

  // add (somewhat bogus) text data
  let fieldElement;
  ['name', 'description', 'link', 'imageName']
    // eslint-disable-next-line array-callback-return
    .map((fieldName) => {
      fieldElement = newCourseScreen.getByRole('textbox', { name: fieldName });
      userEvent.type(fieldElement, fieldName);
      expect(fieldElement).toHaveValue(fieldName);
    });

  // click button to save new Course
  const saveButton = newCourseScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // expect the modal to be hidden
  expect(CourseModalTitle).not.toBeVisible();
});

test('update a Course', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editCourseScreen = renderWithProvider(<Courses />, initialState);

  // wait until Course edit buttons appear so we know data is loaded
  const editButtons = await editCourseScreen.findAllByRole('button', {
    name: /edit course/i,
  });
  expect(editButtons.length).toBe(2);

  // click the first edit button
  const firstEditButton = editButtons[0];
  userEvent.click(firstEditButton);

  // check that we have the modal with the expected title
  const modalTitle = editCourseScreen.getByRole('heading', {
    name: /edit course/i,
  });
  expect(modalTitle).toBeVisible();

  // update content and confirm update
  const descriptionField = editCourseScreen.getByRole('textbox', {
    name: 'description',
  });
  userEvent.clear(descriptionField);
  userEvent.type(descriptionField, 'thank you for coming to my ted course');

  // click save button
  const saveButton = editCourseScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // check that the modal closes
  // (there is no "server database" to update with the new Course content in this test)
  expect(modalTitle).not.toBeVisible();
});

test('delete a Course', async () => {
  // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
  // run in parallel with the other tests, even though all tests pass?
  // Commenting this '.skip' or '.only' makes the warning go away T.T
  // AND: why does this error not appear with the notLoggedIn test file??
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const deleteCourseScreen = renderWithProvider(<Courses />, initialState);

  // wait until Course delete buttons appear so we know data is loaded
  const deleteButtons = await deleteCourseScreen.findAllByRole('button', {
    name: /delete course/i,
  });
  expect(deleteButtons.length).toBe(2);

  // click the first delete button, which should be associated with the Course
  const firstDeleteButton = deleteButtons[0];
  userEvent.click(firstDeleteButton);

  // check that we have the modal with the expected title
  const modalTitle = deleteCourseScreen.getByRole('heading', {
    name: /^Are you sure you want to delete/i,
  });
  expect(modalTitle).toBeVisible();

  // click confirm on modal
  const confirmButton = deleteCourseScreen.getByRole('button', {
    name: 'Confirm',
  });
  userEvent.click(confirmButton);

  // confirm modal has disappeared (note, Course will not be deleted
  // because the handler information has not changed)
  expect(modalTitle).not.toBeVisible();
});
