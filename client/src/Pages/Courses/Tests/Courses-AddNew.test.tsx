/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import Courses from 'Pages/Courses/Courses';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

describe('new courses', () => {
  const initialState = { user: { id: 1, username: 'sheila' } };
  test('add button appears when there are no new courses', () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<Courses />, initialState);

    // find the 'add' button
    const addButton = addButtonScreen.getByRole('button', { name: /add course/i });
    expect(addButton).toBeInTheDocument();
  });
  test('flow to add and delete new course', async () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<Courses />, initialState);

    // wait until course forms appear
    const courseForms = await addButtonScreen.findAllByRole('form', { name: /course \d+/i });
    expect(courseForms.length).toBe(2);

    // find and click add button
    const addButton = addButtonScreen.getByRole('button', { name: /add course/i });
    fireEvent.click(addButton);

    // check that new course appeared
    const courseFormsPlusOne = await addButtonScreen.findAllByRole('form', { name: /course \d/i });
    expect(courseFormsPlusOne.length).toBe(3);

    // 'add' button should have disappeared
    const notAddButton = addButtonScreen.queryByRole('button', { name: /add course/i });
    expect(notAddButton).not.toBeInTheDocument();

    // delete course (new course should have last index, indexing starts at 0)
    const deleteNewcourseButton = addButtonScreen.getByRole('button', { name: /delete course 2/i });
    fireEvent.click(deleteNewcourseButton);

    // click delete confirmation
    const confirmButton = addButtonScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // check that add button re-appears
    const reappearedAddButton = await addButtonScreen.findByRole('button', { name: /add course/i });
    expect(reappearedAddButton).toBeInTheDocument();

    // check that course no longer appears
    const courseFormsMinusOne = addButtonScreen.getAllByRole('form', { name: /course \d/i });
    expect(courseFormsMinusOne.length).toBe(2);
  });
});
