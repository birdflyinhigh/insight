import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import 'antd/dist/antd.css';
import './index.css';
import './static/css/bootstrap-grid.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import traceUrl from './traceUrl';

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const logger = require('redux-logger').createLogger({collapsed:true});

const history = createHistory({
  // getScrollPosition() {
  //   return { x: 0, y: 0 };
  // }
});
traceUrl(window.location.href);
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  traceUrl(window.location.href);
  // console.log(location.scrollX, location.scrollY);
});
const sageMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), thunk, sageMiddleware];
const store = createStore(
  combineReducers({
    statetree: reducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
</Provider>,
  document.getElementById('root'));
registerServiceWorker();
