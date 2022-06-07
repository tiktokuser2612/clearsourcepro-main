import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { logout } from 'store/actions/auth';

const ErrorPage = ({ isFetchingMe, logout }) => {
  useEffect(() => {
    setTimeout(logout, 200);
  }, [logout]);

  return <div className="page page-logout">
    <h1>{isFetchingMe ? '...' : 'Logging out...'}</h1>
  </div>;
};

ErrorPage.propTypes = {
  isFetchingMe: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  isFetchingMe: store.rootReducer.auth.isFetchingMe,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
