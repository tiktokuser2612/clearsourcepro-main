import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from 'containers/Routes';
import LoadingIndicator from 'components/LoadingIndicator';

const App = ({ isFetchingMe, isStoredTokenVerified, ...rest }) => {
  if (!isStoredTokenVerified) {
    return (
      <div className="app">
        <LoadingIndicator isLoading={true} fullscreen />
      </div>
    );
  }

  return (
    <div className="app">
      <LoadingIndicator isLoading={isFetchingMe} />
      <Routes {...rest} />
    </div>
  );
};

App.propTypes = {
  isFetchingMe: PropTypes.bool.isRequired,
  isStoredTokenVerified: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  isFetchingMe: store.rootReducer.auth.isFetchingMe,
  isStoredTokenVerified: store.rootReducer.auth.isStoredTokenVerified,
});

export default connect(mapStateToProps)(App);
