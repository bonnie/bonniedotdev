/* eslint-disable max-lines-per-function */
import { fireEvent, getByRole, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

test('send new quote to server', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newQuoteScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await newQuoteScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms.length).toBe(5);

  // find and click add button
  const addButton = newQuoteScreen.getByRole('button', { name: /add review quote/i });
  fireEvent.click(addButton);

  // wait for new quote to show
  const quoteFormsPlusOne = await newQuoteScreen.findAllByRole('form', { name: /review quote \d/i });
  expect(quoteFormsPlusOne.length).toBe(6);

  // confirm that the new quote is the last one by looking for empty text
  const newQuoteForm = quoteFormsPlusOne[5]; // the new quote will be the last one
  const textBodyField = getByRole(newQuoteForm, 'textbox', { name: 'Quote' });
  expect(textBodyField.textContent).toBe('');

  // add text
  userEvent.type(textBodyField, 'The best course I have attended on Udemy so far.');
  expect(textBodyField).toHaveValue('The best course I have attended on Udemy so far.');

  // select course for quote.
  const courseSelectOption = getByRole(newQuoteForm, 'option', { name: 'React Testing with Jest and Enzyme' });
  fireEvent.click(courseSelectOption);

  // click button to upload new data
  const uploadNewQuoteButton = newQuoteScreen.getByRole('button', { name: /update review quote 5/i });
  fireEvent.click(uploadNewQuoteButton);

  // Check that data was reset with the canned five-quote response from server
  // (there is no "server database" to update with the new quote in this test)
  await waitForElementToBeRemoved(newQuoteForm);
  const refreshedQuotes = newQuoteScreen.getAllByRole('form', { name: /review quote \d/i });
  expect(refreshedQuotes.length).toBe(5);

  // check that add button re-appears, since page data should have been replaced by
  // data fetched from server
  const reappearedAddButton = await newQuoteScreen.findByRole('button', { name: /add review quote/i });
  expect(reappearedAddButton).toBeInTheDocument();
});

test('update a quote', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editQuoteScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await editQuoteScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms).toHaveLength(5);

  // Select the first quote, which should have text 'body 5'
  const quoteFormToEdit = quoteForms[0];
  const textBodyField = getByRole(quoteFormToEdit, 'textbox', { name: 'Quote' });
  expect(textBodyField.textContent).toBe('body 5');

  // update content and confirm update
  userEvent.type(textBodyField, ' yo');
  expect(textBodyField).toHaveValue('body 5 yo');

  // click update button
  const updateQuoteButton = getByRole(quoteFormToEdit, 'button', { name: /update review quote/i });
  fireEvent.click(updateQuoteButton);

  // check that page refreshed with canned quotes
  // (there is no "server database" to update with the new quote content in this test)
  await editQuoteScreen.findByText('body 5');
});

test('delete a quote', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editQuoteScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await editQuoteScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms).toHaveLength(5);

  // Select the first quote, which should have text 'body 5'
  const quoteFormToEdit = quoteForms[0];
  const textBodyField = getByRole(quoteFormToEdit, 'textbox', { name: 'Quote' });
  expect(textBodyField.textContent).toBe('body 5');

  // click delete button
  const updateQuoteButton = getByRole(quoteFormToEdit, 'button', { name: /delete review quote/i });
  fireEvent.click(updateQuoteButton);

  // check that page refreshed with canned quotes
  // (there is no "server database" to update with the new quote content in this test)
  await editQuoteScreen.findByText('body 5');
});
