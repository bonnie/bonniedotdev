/* eslint-disable max-lines-per-function */
// reference:
//   - https://testing-library.com/docs/example-react-router/
//   - https://reactrouter.com/web/guides/testing
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from '../../redux/configureStore';
import Nav from './Nav';
import Routes from './Routes';

function renderAndClickRoute(routeName) {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
        <Routes />
      </MemoryRouter>
    </Provider>,
  );

  // Click the requested nav link
  const navLink = screen.getByRole('tab', { name: RegExp(routeName) });
  fireEvent.click(navLink);
}

describe('navigate to routes', () => {
  test('navigates to About', () => {
    // render and click the link
    renderAndClickRoute('about');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'About Bonnie' });
    expect(headline).toBeInTheDocument();
  });
  test('navigates to Home', () => {
    // render and click the link
    renderAndClickRoute('bonnie.dev');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
    expect(headline).toBeInTheDocument();
  });
  test('navigates to Courses', () => {
    // render and click the link
    renderAndClickRoute('courses');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Courses' });
    expect(headline).toBeInTheDocument();
  });
  test('displays "not found" page for unknown route', () => {
    // render and update location to unknown route
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['this_aint_no_route']}>
          <Nav />
          <Routes />
        </MemoryRouter>
      </Provider>,
    );

    const headline = screen.getByRole('heading', { name: /oops/i });
    expect(headline).toBeInTheDocument();
  });
});
