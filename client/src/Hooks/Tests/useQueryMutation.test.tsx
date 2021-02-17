// testing useQueryMutation hook.
// Using Course because its edit form is simple
//
// This file breaks down opening and closing modals, to find
// issues with that flow. Test files specific to each type of
// item will reveal issues specific to that item

/* eslint-disable max-lines-per-function */
import userEvent from '@testing-library/user-event';
import App from 'Pages/App/App';
import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

describe('edit course', () => {
  let screen;
  let queryClient;
  beforeEach(async () => {
    const response = await renderWithRouterAndProvider(<App />, {
      initialState: { user: { id: 1, username: 'ralph' } },
    });
    // TODO: this is ugly, not being able to destructure 'cuz the variables
    // aren't consts. There's got to be a better way.
    screen = response.screen;
    queryClient = response.queryClient;

    // find and click courses tab
    const coursesTab = await screen.findByRole('tab', {
      name: /courses/i,
    });
    userEvent.click(coursesTab);
  });
  afterEach(async () => {
    // TODO: why doesn't this work to suppress errors?? T.T
    await queryClient.cancelQueries();
  });
  test('create new Course and save', async () => {
    // wait until Course edit buttons appear so we know data is loaded
    const editButtons = await screen.findAllByRole('button', {
      name: /edit Course/i,
    });
    expect(editButtons.length).toBe(2);

    // find and click add button
    const addButton = screen.getByRole('button', {
      name: /add course/i,
    });
    userEvent.click(addButton);

    // wait for new Course modal to show
    const CourseModalTitle = await screen.findByRole('heading', {
      name: /add course/i,
    });
    expect(CourseModalTitle).toBeVisible();

    // add (somewhat bogus) text data
    let fieldElement;
    ['name', 'description', 'link', 'imageName']
      // eslint-disable-next-line array-callback-return
      .map((fieldName) => {
        fieldElement = screen.getByRole('textbox', { name: fieldName });
        userEvent.type(fieldElement, fieldName);
        expect(fieldElement).toHaveValue(fieldName);
      });

    // click button to save new Course
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveButton);

    // expect the modal to be hidden
    expect(CourseModalTitle).not.toBeVisible();
  });

  test('update a Course', async () => {
    // wait until Course edit buttons appear so we know data is loaded
    const editButtons = await screen.findAllByRole('button', {
      name: /edit course/i,
    });
    expect(editButtons.length).toBe(2);

    // click the first edit button
    const firstEditButton = editButtons[0];
    userEvent.click(firstEditButton);

    // check that we have the modal with the expected title
    const modalTitle = screen.getByRole('heading', {
      name: /edit course/i,
    });
    expect(modalTitle).toBeVisible();

    // update content and confirm update
    const descriptionField = screen.getByRole('textbox', {
      name: 'description',
    });
    userEvent.clear(descriptionField);
    userEvent.type(descriptionField, 'thank you for coming to my ted course');

    // click save button
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveButton);

    // check that the modal closes
    // (there is no "server database" to update with the new Course content in this test)
    expect(modalTitle).not.toBeVisible();
  });

  test('delete a Course', async () => {
    // wait until Course delete buttons appear so we know data is loaded
    const deleteButtons = await screen.findAllByRole('button', {
      name: /delete course/i,
    });
    expect(deleteButtons.length).toBe(2);

    // click the first delete button, which should be associated with the Course
    const firstDeleteButton = deleteButtons[0];
    userEvent.click(firstDeleteButton);

    // check that we have the modal with the expected title
    const modalTitle = screen.getByRole('heading', {
      name: /^Are you sure you want to delete/i,
    });
    expect(modalTitle).toBeVisible();

    // click confirm on modal
    const confirmButton = screen.getByRole('button', {
      name: 'Confirm',
    });
    userEvent.click(confirmButton);

    // confirm modal has disappeared (note, Course will not be deleted
    // because the handler information has not changed)
    expect(modalTitle).not.toBeVisible();
  });
});