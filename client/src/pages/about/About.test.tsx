/* eslint-disable max-lines-per-function */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/configureStore';
import About from './About';

test('renders bio', () => {
  render(
    <Provider store={store}>
      <About />
    </Provider>,
  );
  const bioTitle = screen.getByRole('heading', { name: 'About Bonnie' });
  expect(bioTitle).toBeInTheDocument();
});
