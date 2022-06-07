import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from './reducers';

export const store = createStore(
  combineReducers({ rootReducer }),
  (process.env.NODE_ENV === 'production')
    ? applyMiddleware(reduxThunk)
    : composeWithDevTools(applyMiddleware(reduxThunk, logger)),
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const newReducer = combineReducers({ rootReducer });
    store.replaceReducer(newReducer);
  });
}

export default store;
