import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';

// import reportWebVitals from './reportWebVitals';

// Import store
import store from 'store/index.js';
import { loginWithStoredToken } from './store/actions/auth';

// Import components
import App from 'containers/App';
import ScrollToTop from 'components/ScrollToTop';
import notifier from 'utils/notifier';

// Import root styles
import 'assets/styles/index.scss';
import { Provider } from 'react-redux';

// Make jQuery and notifier global
window.jQuery = window.jquery = window.$ = $;
window.notifier = notifier;

// Verify Stored accessToken at app startup
store.dispatch(loginWithStoredToken());

// Debug store values
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>

        <Route component={App} />

      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
