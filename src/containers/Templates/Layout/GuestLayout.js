import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { PublicHeader } from 'components/Headers';
import { Footer } from 'components/Footers';

import { logout } from 'store/actions/auth';

const GuestLayout = ({ history, children,user, footer }) => {
  return (
    <div className="layout layout-guest">
    
      <PublicHeader user={user}/>
        
      {children}

      <Footer/>

    </div>
  );
};

GuestLayout.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.any,
  footer: PropTypes.any,
};


const mapStateToProps = state => ({
  user: state.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestLayout);

