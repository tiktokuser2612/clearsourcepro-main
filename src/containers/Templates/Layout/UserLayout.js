import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from 'store/actions/auth';

import { Button } from 'antd';

const AuthenticatedLayout = ({ history, children, user, footer, logout }) => {
  return (
    <div className="layout">
      <div className="nav nav-user">
        <div className="container">
          <div className="nav__logo">
            <Link to="/">
              <span>ClearSourcePro</span>
            </Link>
          </div>

          <div className="nav__buttons">
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          {children}
        </div>
      </div>

      <div className="footer">
        {footer}
      </div>
    </div>
  );
};

AuthenticatedLayout.propTypes = {
  history: PropTypes.object.isRequired,

  user: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  footer: PropTypes.any,

  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedLayout);
