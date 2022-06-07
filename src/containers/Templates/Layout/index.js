import React from 'react';
import PropTypes from 'prop-types';

import GuestLayout from './GuestLayout';
import UserLayout from './UserLayout';

const Layout = ({
  isAuthenticated,
  children,
  ...rest
}) => {
  if (isAuthenticated) {
    return <UserLayout {...rest}>{children}</UserLayout>;
  } else {
    return <GuestLayout {...rest}>{children}</GuestLayout>;
  }
};

Layout.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  children: PropTypes.any,
};

export default Layout;
