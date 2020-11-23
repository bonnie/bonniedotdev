import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/configureStore';
import App from './App';

test('it starts at the home page', () => {
  render(<Provider store={store}><App /></Provider>);
  const nameHeading = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
  expect(nameHeading).toBeInTheDocument();
});

test('page contains nav tabs', () => {
  render(<Provider store={store}><App /></Provider>);
  const tabList = screen.getByRole('tablist', { name: '' });
  expect(tabList).toBeInTheDocument();
});

test('loading overlay is not visible', () => {
  render(<Provider store={store}><App /></Provider>);
  const aboutLink = screen.queryByRole('progressbar', { hidden: true });
  expect(aboutLink).not.toBeVisible();
});

test.todo('error "snack" is not visible');
