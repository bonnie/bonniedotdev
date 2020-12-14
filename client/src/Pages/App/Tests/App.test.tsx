import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

import App from '../App';

describe('App rendering tests', () => {
  test('it starts at the home page', () => {
    const screen = renderWithRouterAndProvider(<App />);
    const nameHeading = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
    expect(nameHeading).toBeInTheDocument();
  });

  test('page contains nav tabs', () => {
    const screen = renderWithRouterAndProvider(<App />);
    const tabList = screen.getByRole('tablist', { name: '' });
    expect(tabList).toBeInTheDocument();
  });

  test('loading overlay is not visible', () => {
    const screen = renderWithRouterAndProvider(<App />);
    const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
    expect(notLoadingSpinner).toBe(null);
  });

  test('error "snack" is not visible', () => {
    const screen = renderWithRouterAndProvider(<App />);
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });
});
