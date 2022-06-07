import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    initClientUserAccount,
    getClientUserAccount,
} from 'store/actions/clientAccount';
  import LoadingIndicator from 'components/Common/LoadingIndicator';

  
const View = ({
    isFetching,
    data,
    user,
    getClientUserAccount,
  }) => {
    
    useEffect(() => {
      getClientUserAccount(user.id);
    }, [getClientUserAccount, user.id]);



    return (
        <div className="health_insurance_main">                    
            <div className="row">
                <LoadingIndicator isLoading={isFetching} />
                <div className="col-md-12">
                    <h1>Review User <Link to={`/client/account`}>Edit</Link></h1>
                    <div className="add_profile_img">{data?.user_image ? <img src={'/storage/images/'+data.user_image} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/>: <img src="/images/no_img.png" alt="" />}</div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>First Name</label>
                            <p>{data.firstname}</p>
                        </div>
                        <div className="health_card">
                            <label>Last Name</label>
                            <p>{data.lastname}</p>
                        </div>
                        <div className="health_card">
                            <label>User Name</label>
                            <p>{data.username}</p>
                        </div>
                                             
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>Phone</label>
                            <p>{data.phone}</p>
                        </div>
                        <div className="health_card">
                            <label>Email</label>
                            <p>{data.email}</p>
                        </div>
                        <div className="health_card">
                            <label>Address</label>
                            <p>{data.address}</p>
                        </div>                                
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>City</label>
                            <p>{data.city}</p>
                        </div>
                        <div className="health_card">
                            <label>State/Region</label>
                            <p>{data.state}</p>
                        </div>
                        <div className="health_card">
                            <label>Zip/Postal Code</label>
                            <p>{data.zip}</p>
                        </div>                                
                    </div>
                </div>
                
            </div>
            
            
        </div>
    )
}


const mapStateToProps = store => ({
    data: store.rootReducer.clientUserAccount.data,
    isFetching: store.rootReducer.clientUserAccount.isFetching,
    user : store.rootReducer.auth.user,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initClientUserAccount,
    getClientUserAccount,
  }, dispatch);
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(View);