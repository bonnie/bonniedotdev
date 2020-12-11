/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

test.only('send new quote to server', async () => {
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

  // add text to quote (new quote will have last index, indexing starts at 0)
  // TODO: more robust way to find the body for the new quote\
  // Material-UI disappeared my aria-label, so can't use that
  const textBodyFields = newQuoteScreen.getAllByRole('textbox', { name: 'Quote' });
  const newTextBodyField = textBodyFields[textBodyFields.length - 1];
  fireEvent.change(newTextBodyField, { target: { value: 'The best course I have attended on Udemy so far.' } });

  // select course for quote.
  // TODO: figure this out!
  // Testing Library interface here is awkward: find "select" element and click it
  // const courseSelectOptions = newQuoteScreen.getAllByText('React Testing with Jest and Enzyme');

  // click button to upload new data
  const uploadNewQuoteButton = newQuoteScreen.getByRole('button', { name: /update review quote 5/i });
  fireEvent.click(uploadNewQuoteButton);

  // not checking for updated quote on page because data reload is going to
  // get same five-quote mocked data from server (there is no "server database"
  // to update here. Ideally, this would be an e2e test, not a functional test...

  // check that add button re-appears, since page data should have been replaced by
  // data fetched from server
  const reappearedAddButton = await newQuoteScreen.findByRole('button', { name: /add review quote/i });
  expect(reappearedAddButton).toBeInTheDocument();
});

test.todo('update a quote');
test.todo('delete a quote');
