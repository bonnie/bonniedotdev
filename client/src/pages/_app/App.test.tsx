import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../../redux/configureStore';
import App from './App';

// TODO: update to use renderWithRouterAndProvider
describe('App rendering tests', () => {
  test('it starts at the home page', () => {
    render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);
    const nameHeading = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
    expect(nameHeading).toBeInTheDocument();
  });

  test('page contains nav tabs', () => {
    render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);
    const tabList = screen.getByRole('tablist', { name: '' });
    expect(tabList).toBeInTheDocument();
  });

  test('loading overlay is not visible', () => {
    render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);
    const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
    expect(notLoadingSpinner).toBe(null);
  });

  test('error "snack" is not visible', () => {
    render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });
});
