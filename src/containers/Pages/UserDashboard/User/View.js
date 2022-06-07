import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    initAdminUser,
    getAdminUsers,
  } from 'store/actions/adminUser';
import LoadingIndicator from 'components/Common/LoadingIndicator';

import UserPermission from './UserPermission';
import ClientView from './Views/Client'
import CandidateView from './Views/Candidate'
import Main from './Views/Main';  
import AdminView from './Views/Admin';  

const View = ({
    data,
    getAdminUsers,
    initAdminUser,
    isFetching,
    permission,
  }) => {
    const { id } = useParams();
  
    useEffect(() => {
      initAdminUser();
      getAdminUsers(id);
    }, [getAdminUsers, initAdminUser, id]);

    return (
      <div className="health_insurance_main">  
          <LoadingIndicator isLoading={isFetching} />
          {
            isFetching ? <div className='my-5 py-5'></div> :
              <>
                <h1>Review User <Link to={`/admin/users/edit/${id}`}>Edit</Link></h1>
              {
                  data.user_role == "recruiter" || 
                  data.user_role == "hiring_manager" || 
                  data?.role == "account_executive"
                  ? <Main data={data}/> 
                    : data.user_role == "candidate" 
                      ? <CandidateView data={data}/>
                      : data.user_role == "client" ? <ClientView data={data} /> : <AdminView data={data} />
              }
              <div>
                  <UserPermission permission={data.permission} action={0}></UserPermission>
              </div>
            </>
          }
      </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminUser.data,
    isFetching: store.rootReducer.adminUser.isFetching,
    permission: store.rootReducer.adminUser.permission,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminUser,
    getAdminUsers,
  }, dispatch);
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(View);