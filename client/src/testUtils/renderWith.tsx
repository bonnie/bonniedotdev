import {
  fireEvent, render, Screen, screen,
} from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { sagaMiddleware } from 'Redux/configureStore';
import rootSaga from 'Redux/Sagas';

import storeFactory from './storeFactory';

// TODO: does this help reduce repetitive code? https://redux.js.org/recipes/writing-tests

export function renderWithRouter(ui: ReactElement, initialRouterEntries = []): Screen {
  render(
    <MemoryRouter initialEntries={initialRouterEntries}>
      {ui}
    </MemoryRouter>,
  );
  return screen;
}

export function renderWithProvider(ui: ReactElement, initialState = {}): Screen {
  const store = storeFactory(initialState);

  // run saga listeners
  sagaMiddleware.run(rootSaga);

  render(
    <Provider store={store}>
      {ui}
    </Provider>,
  );
  return screen;
}

export function renderWithRouterAndProvider(
  ui: ReactElement,
  { initialRouterEntries = ['/'], initialState = {} } = {},
): Screen {
  const store = storeFactory(initialState);

  // run saga listeners
  sagaMiddleware.run(rootSaga);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialRouterEntries}>
        {ui}
      </MemoryRouter>
    </Provider>,
  );
  return screen;
}

// Simply to provide an app with a user already logged in
// Since I'm using MemoryRouter, initial location (beyond /login redirect)
// is not configurable
export async function renderWithRouterProviderAndUser(
  ui: ReactElement,
  { initialState = {} } = {},
): Promise<Screen> {
  const store = storeFactory(initialState);

  // run saga listeners
  sagaMiddleware.run(rootSaga);

  // route to '/login' first
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        {ui}
      </MemoryRouter>
    </Provider>,
  );

  // enter username and password
  // actual values not relevant for tests, since server response is mocked
  const userField = await screen.findByLabelText(/username/i);
  fireEvent.change(userField, 'my_username');

  const passwordField = screen.getByLabelText(/password/i);
  fireEvent.change(passwordField, 'my_password');

  // submit the form
  const submitButton = screen.getByRole('button', { name: /log in/i });
  fireEvent.click(submitButton);

  return screen;
}
