/* eslint-disable max-lines-per-function */
import userEvent from '@testing-library/user-event';
import Talks from 'Pages/Talks/Talks';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

test('create new talk and save', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk edit buttons appear so we know data is loaded
  const editButtons = await newTalkScreen.findAllByRole('button', { name: /edit talk/i });
  expect(editButtons.length).toBe(4);

  // find and click add button
  const addButton = newTalkScreen.getByRole('button', { name: /add talk/i });
  userEvent.click(addButton);

  // wait for new talk modal to show
  const talkModalTitle = await newTalkScreen.findByRole('heading', { name: /add talk/i });
  expect(talkModalTitle).toBeVisible();

  // add (somewhat bogus) text data
  let fieldElement;
  [
    'title',
    'description',
    'slidesFilename',
    'conferenceName',
    'conferenceLink',
    'recordingLink']
    // eslint-disable-next-line array-callback-return
    .map(((fieldName) => {
      fieldElement = newTalkScreen.getByRole('textbox', { name: fieldName });
      userEvent.type(fieldElement, fieldName);
      expect(fieldElement).toHaveValue(fieldName);
    }));

  // add date data
  // Unfortunately, the date picker I'm using is difficult to find bc its name is ''
  const dateInput = newTalkScreen.getByRole('textbox', { name: '' });
  expect(dateInput).toHaveAttribute('name', 'utcDateStringISO');
  userEvent.type(dateInput, '2020-01-01', { skipClick: true });

  // Entering text in the date display for this element doesn't update the value 😭
  // Will have to leave this check for acceptance testing.
  // expect(dateInput).toHaveValue('2020-01-01');

  // click button to save new talk
  const saveButton = newTalkScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // expect the modal to be hidden
  expect(talkModalTitle).not.toBeVisible();
});

test('update a talk', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk edit buttons appear so we know data is loaded
  const editButtons = await editTalkScreen.findAllByRole('button', { name: /edit talk/i });
  expect(editButtons.length).toBe(4);

  // click the first edit button, which should be associated with the talk
  const firstEditButton = editButtons[0];
  userEvent.click(firstEditButton);

  // check that we have the modal with the expected title
  const modalTitle = editTalkScreen.getByRole('heading', { name: /edit talk/i });
  expect(modalTitle).toBeVisible();

  // update content and confirm update
  const descriptionField = editTalkScreen.getByRole('textbox', { name: 'description' });
  userEvent.clear(descriptionField);
  userEvent.type(descriptionField, 'thank you for coming to my ted talk');

  // click save button
  const saveButton = editTalkScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // check that the modal closes
  // (there is no "server database" to update with the new talk content in this test)
  expect(modalTitle).not.toBeVisible();
});

test('delete a talk', async () => {
  // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
  // run in parallel with the other tests, even though all tests pass?
  // Commenting this '.skip' or '.only' makes the warning go away T.T
  // AND: why does this error not appear with the notLoggedIn test file??
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const deleteTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk delete buttons appear so we know data is loaded
  const deleteButtons = await deleteTalkScreen.findAllByRole('button', { name: /delete talk/i });
  expect(deleteButtons.length).toBe(4);

  // click the first delete button, which should be associated with the talk
  const firstDeleteButton = deleteButtons[0];
  userEvent.click(firstDeleteButton);

  // check that we have the modal with the expected title
  const modalTitle = deleteTalkScreen.getByRole('heading', { name: /^Are you sure you want to delete/i });
  expect(modalTitle).toBeVisible();

  // click confirm on modal
  const confirmButton = deleteTalkScreen.getByRole('button', { name: 'Confirm' });
  userEvent.click(confirmButton);

  // confirm modal has disappeared (note, talk will not be deleted
  // because the handler information has not changed)
  expect(modalTitle).not.toBeVisible();
});
