/* eslint-disable max-lines-per-function */
import userEvent from '@testing-library/user-event';
import Talks from 'Pages/Talks/Talks';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

// this test sometimes exceeds the time limit 😭
// update to 15 seconds
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
  const talkModal = await newTalkScreen.findByRole('heading', { name: /add talk/i });
  expect(talkModal).toBeVisible();

  // add (somewhat bogus) text data
  let fieldElement;
  [
    'title',
    'utcDateStringISO',
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
  const dateInput = newTalkScreen.getByRole('textbox', { name: 'utcDateStringISO' });
  userEvent.type(dateInput, '2020-01-01');
  expect(dateInput).toHaveValue('2020-01-01');

  // click button to save new talk
  const saveButton = newTalkScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);
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
  const modalTitle = editTalkScreen.getByRole('heading', { name: /edit talk/ });
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
  const modalTitle = deleteTalkScreen.getByRole('heading', { name: /^delete/i });
  expect(modalTitle).toBeVisible();

  // click confirm on modal
  const confirmButton = deleteTalkScreen.getByRole('button', { name: 'confirm' });
  userEvent.click(confirmButton);

  // confirm modal has disappeared (note, talk will not be deleted
  // because the handler information has not changed)
  expect(modalTitle).not.toBeVisible();
});
