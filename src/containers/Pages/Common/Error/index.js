import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
 import {Common as CommonBanner} from 'components/Banners';


const ErrorPage = ({ isFetchingMe }) => (
  // <div className="page">
  <>
    {/* <!-- Banner start here --> */}
    <CommonBanner text="404 | Page Not Found"/>
    {/* <!-- Banner end here --> */}
  </>
);

ErrorPage.propTypes = {
  isFetchingMe: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  isFetchingMe: store.rootReducer.auth.isFetchingMe,
});

export default connect(mapStateToProps)(ErrorPage);
