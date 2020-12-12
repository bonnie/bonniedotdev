import {
  fireEvent, render, Screen, screen,
} from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import rootSaga from 'Redux/Sagas';
// import { sagaMiddleware } from 'Redux/configureStore';
import createSagaMiddleware from 'redux-saga';

// import { middlewares } from '../Redux/configureStore';
import rootReducer from '../Redux/reducers';

function storeFactory(initialState = {}): Store {
  // necessary to have separate saga middleware instance for each test, since they run concurrently
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
}

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

// Simply to provide an app with a user already logged in
// Since I'm using MemoryRouter, initial location (beyond /login redirect)
// is not configurable
export async function renderWithRouterProviderAndUser(
  ui: ReactElement,
  { initialState = {} } = {},
): Promise<Screen> {
  const store = storeFactory(initialState);

  // route to '/login' first
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        {ui}
      </MemoryRouter>
    </Provider>,
  );

  // actual username/password values not relevant to tests
  // since server response is hard-coded

  // submit the form
  const submitButton = screen.getByRole('button', { name: /log in/i });
  fireEvent.click(submitButton);

  return screen;
}
