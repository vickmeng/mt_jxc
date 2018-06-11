import { History } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './epic';
import { rootReducer } from './reducer';

export const configureStore = (history: History) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const routerMiddleware = createRouterMiddleware(history);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware,
        epicMiddleware,
      )
    )
  );

  return store;
}