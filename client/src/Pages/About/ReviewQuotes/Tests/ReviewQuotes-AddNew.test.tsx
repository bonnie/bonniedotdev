/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

describe('new quotes', () => {
  const initialState = { user: { id: 1, username: 'sheila' } };
  test('add button appears when there are no new quotes', () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<ReviewQuotes />, initialState);

    // find the 'add' button
    const addButton = addButtonScreen.getByRole('button', { name: /add review quote/i });
    expect(addButton).toBeInTheDocument();
  });
  test('flow to add and delete new quote', async () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<ReviewQuotes />, initialState);

    // wait until quote forms appear
    const quoteForms = await addButtonScreen.findAllByRole('form', { name: /review quote \d+/i });
    expect(quoteForms.length).toBe(5);

    // find and click add button
    const addButton = addButtonScreen.getByRole('button', { name: /add review quote/i });
    fireEvent.click(addButton);

    // check that new quote appeared
    const quoteFormsPlusOne = await addButtonScreen.findAllByRole('form', { name: /review quote \d/i });
    expect(quoteFormsPlusOne.length).toBe(6);

    // 'add' button should have disappeared
    const notAddButton = addButtonScreen.queryByRole('button', { name: /add review quote/i });
    expect(notAddButton).not.toBeInTheDocument();

    // delete quote (new quote should have last index, indexing starts at 0)
    const deleteNewQuoteButton = addButtonScreen.getByRole('button', { name: /delete review quote 5/i });
    fireEvent.click(deleteNewQuoteButton);

    // click delete confirmation
    const confirmButton = addButtonScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // check that add button re-appears
    const reappearedAddButton = await addButtonScreen.findByRole('button', { name: /add review quote/i });
    expect(reappearedAddButton).toBeInTheDocument();

    // check that quote no longer appears
    const quoteFormsMinusOne = addButtonScreen.getAllByRole('form', { name: /review quote \d/i });
    expect(quoteFormsMinusOne.length).toBe(5);
  });
});
