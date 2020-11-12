import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';

import Routes from './Routes';

function renderAndClickRoute(routeName) {
  render(<MemoryRouter><Routes /></MemoryRouter>);

  // Click the requested nav link
  const navLink = screen.getByRole('tab', { name: routeName });
  fireEvent.click(navLink);
}

describe('navigate to routes', () => {
  it('navigates to About', () => {
    // render and click the link
    renderAndClickRoute('about');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'About' });
    expect(headline).toBeInTheDocument();
  });
  it('navigates to Home', () => {
    // render and click the link
    renderAndClickRoute('home');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
    expect(headline).toBeInTheDocument();
  });
  it('navigates to Courses', () => {
    // render and click the link
    renderAndClickRoute('courses');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'Courses' });
    expect(headline).toBeInTheDocument();
  });
});
