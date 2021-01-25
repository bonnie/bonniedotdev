/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import Talks from 'Pages/Talks/Talks';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

describe('new talks', () => {
  const initialState = { user: { id: 1, username: 'sheila' } };
  test('add button appears when there are no new talks', () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<Talks />, initialState);

    // find the 'add' button
    const addButton = addButtonScreen.getByRole('button', { name: /add talk/i });
    expect(addButton).toBeInTheDocument();
  });
  test('flow to add and delete new talk', async () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<Talks />, initialState);

    // wait until talk forms appear
    const talkForms = await addButtonScreen.findAllByRole('form', { name: /talk \d+/i });
    expect(talkForms.length).toBe(4);

    // find and click add button
    const addButton = addButtonScreen.getByRole('button', { name: /add talk/i });
    fireEvent.click(addButton);

    // check that new talk appeared
    const talkFormsPlusOne = await addButtonScreen.findAllByRole('form', { name: /talk \d/i });
    expect(talkFormsPlusOne.length).toBe(5);

    // 'add' button should have disappeared
    const notAddButton = addButtonScreen.queryByRole('button', { name: /add talk/i });
    expect(notAddButton).not.toBeInTheDocument();

    // delete talk (new talk should have last "past" index, indexing starts at 0)
    const deleteNewtalkButton = addButtonScreen.getByRole('button', { name: /delete past talk 2/i });
    fireEvent.click(deleteNewtalkButton);

    // click delete confirmation
    const confirmButton = addButtonScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // check that add button re-appears
    const reappearedAddButton = await addButtonScreen.findByRole('button', { name: /add talk/i });
    expect(reappearedAddButton).toBeInTheDocument();

    // check that talk no longer appears
    const talkFormsMinusOne = addButtonScreen.getAllByRole('form', { name: /talk \d/i });
    expect(talkFormsMinusOne.length).toBe(4);
  });
});
