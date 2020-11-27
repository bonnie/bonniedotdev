import { render, Screen, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import storeFactory from './storeFactory';

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
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialRouterEntries}>
        {ui}
      </MemoryRouter>
    </Provider>,
  );
  return screen;
}
