
import React from 'react';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import Root from './containers/Root';
import { AUTHENTICATED } from './actions/actionTypes';
import { history } from './store/configureStore';
import './app.global.css';
import reducers from './reducers/newReducer/index';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);
export default store;
const user = localStorage.getItem('user');
if (user) {
  store.dispatch({ type: AUTHENTICATED });
}


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

