/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { renderWithRouterAndProvider } from '../../../TestUtils/renderWith';
import Nav from '../Nav';
import Routes from '../Routes';

const NavAndRoutes = (
  <>
    <Nav />
    <Routes />
  </>
);

function renderAndClickRoute(routeName) {
  const screen = renderWithRouterAndProvider(NavAndRoutes);
  // Click the requested nav link
  const navLink = screen.getByRole('tab', { name: RegExp(routeName) });
  fireEvent.click(navLink);
  return screen;
}

describe('navigate to routes', () => {
  test('navigates to About', () => {
    // render and click the link
    const screen = renderAndClickRoute('about');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'About Bonnie' });
    expect(headline).toBeInTheDocument();
  });
  test('navigates to Home', () => {
    // render and click the link
    const screen = renderAndClickRoute('bonnie.dev');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
    expect(headline).toBeInTheDocument();
  });
  test('navigates to Courses', () => {
    // render and click the link
    const screen = renderAndClickRoute('courses');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Courses' });
    expect(headline).toBeInTheDocument();
  });
  test('displays "not found" page for unknown route', () => {
    // render and update location to unknown route
    const screen = renderWithRouterAndProvider(
      NavAndRoutes,
      { initialRouterEntries: ['this_aint_no_route'] },
    );

    const headline = screen.getByRole('heading', { name: /oops/i });
    expect(headline).toBeInTheDocument();
  });
});
