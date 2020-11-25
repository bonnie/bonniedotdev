// reference: https://testing-library.com/docs/example-react-router/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Provider } from 'react-router';

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
  it('navigates to About', () => {
    // render and click the link
    renderAndClickRoute('about');

    // check correct page showed up
    const headline = screen.getByRole('heading', { name: 'About Bonnie' });
    expect(headline).toBeInTheDocument();
  });
  it('navigates to Home', () => {
    // render and click the link
    renderAndClickRoute('bonnie.dev');

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
