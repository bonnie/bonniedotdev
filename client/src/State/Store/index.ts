/* eslint-disable import/prefer-default-export */
import { createStore } from 'redux';

import reducers from '../Reducers';

export const store = createStore(reducers, {});
