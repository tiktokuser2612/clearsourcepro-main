import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const RecruiterClients = ({ location }) => {
  const path = location.pathname;
  

  return (
   <div>
        <div className="health_insurance_main">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Clients</h1>
            </div>
        </div>
    </div>
      
     
  );
};

const mapStateToProps = store => ({
  user: store.rootReducer.auth.user,
  // isPuttingPassword: store.rootReducer.auth.isPuttingPassword,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // changePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterClients);
