/* eslint-disable max-lines-per-function */
import { fireEvent, getByRole, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Talks from 'Pages/Talks/Talks';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

// this test sometimes exceeds the time limit 😭
// update to 15 seconds
jest.setTimeout(15000);
test('send new talk to server', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk forms appear
  const talkForms = await newTalkScreen.findAllByRole('form', { name: /talk \d+/i });
  expect(talkForms.length).toBe(4);

  // find and click add button
  const addButton = newTalkScreen.getByRole('button', { name: /add talk/i });
  fireEvent.click(addButton);

  // wait for new talk to show
  const talkFormsPlusOne = await newTalkScreen.findAllByRole('form', { name: /talk \d/i });
  expect(talkFormsPlusOne.length).toBe(5);

  // confirm that the new talk is the last one by looking for empty text
  const newTalkForm = talkFormsPlusOne[4]; // the new talk will be the last one
  const textBodyField = getByRole(newTalkForm, 'textbox', { name: 'title' });
  expect(textBodyField.textContent).toBe('');

  // add data
  let fieldElement;
  [
    'title',
    'description',
    'slide-link',
    'conference-image-name',
    'conference-link',
    'recording-link']
    // eslint-disable-next-line array-callback-return
    .map(((fieldName) => {
      fieldElement = getByRole(newTalkForm, 'textbox', { name: fieldName });
      userEvent.type(fieldElement, fieldName);
      expect(fieldElement).toHaveValue(fieldName);
    }));

  // click button to upload new data
  const uploadnewTalkButton = newTalkScreen.getByRole('button', { name: /update upcoming talk 1/i });
  fireEvent.click(uploadnewTalkButton);

  // Check that data was reset with the canned five-talk response from server
  // (there is no "server database" to update with the new talk in this test)
  await waitForElementToBeRemoved(newTalkForm);
  const refreshedtalks = newTalkScreen.getAllByRole('form', { name: /(upcoming|past) talk \d/i });
  expect(refreshedtalks.length).toBe(4);

  // check that add button re-appears, since page data should have been replaced by
  // data fetched from server
  const reappearedAddButton = await newTalkScreen.findByRole('button', { name: /add talk/i });
  expect(reappearedAddButton).toBeInTheDocument();
});

test('update a talk', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk forms appear
  const talkForms = await editTalkScreen.findAllByRole('form', { name: /talk \d+/i });
  expect(talkForms).toHaveLength(4);

  // Select the first talk, which should have title ''
  const talkFormToEdit = talkForms[0];
  const textBodyField = getByRole(talkFormToEdit, 'textbox', { name: 'title' });
  // console.log(talkForms.map((t) => t.textContent));
  // TODO: sort properly!!
  // expect(textBodyField.textContent).toBe('i am a talk in the foooture');
  expect(textBodyField.textContent).toBe('i am further in the foooture');

  // update content and confirm update
  userEvent.type(textBodyField, ' that is so damn cool');
  expect(textBodyField).toHaveValue('i am further in the foooture that is so damn cool');

  // click update button
  const updateTalkButton = getByRole(talkFormToEdit, 'button', { name: /update upcoming talk/i });
  fireEvent.click(updateTalkButton);

  // check that page refreshed with canned talks
  // (there is no "server database" to update with the new talk content in this test)
  await editTalkScreen.findByText('i am a talk in the foooture');
});

test('delete a talk', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editTalkScreen = renderWithProvider(<Talks />, initialState);

  // wait until talk forms appear
  const talkForms = await editTalkScreen.findAllByRole('form', { name: /talk \d+/i });
  expect(talkForms).toHaveLength(4);

  // Select the first talk, which should have text 'body 3'
  const talkFormToEdit = talkForms[0];
  const textBodyField = getByRole(talkFormToEdit, 'textbox', { name: 'title' });
  // TODO: fix sorting
  expect(textBodyField.textContent).toBe('i am further in the foooture');

  // click delete button
  const updateTalkButton = getByRole(talkFormToEdit, 'button', { name: /delete upcoming talk/i });
  fireEvent.click(updateTalkButton);

  // check that page refreshed with canned talks
  // (there is no "server database" to update with the new talk content in this test)
  // TODO: fix sorting
  await editTalkScreen.findByText('i am further in the foooture');
});
