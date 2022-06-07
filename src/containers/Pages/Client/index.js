import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import ErrorPage from '../Common/Error';

import MyAccount from './Account/MyAccount';
import ClientAccountView from './Account/View'
import ClientRequistionsList from './Requistions';
import ClientRequistionView from './Requistions/View'
import ClientRequistionEdit from './Requistions/Update'
import ClientRequistionCreate from './Requistions/Create'
import NewClientCompanyPop from 'components/Modals/NewClientCompanyPop' 
import ClientAccount from './Account/ClientAccount';
import ClientAccountDetails from './Account/ClientAccountDetails';
import ClientRecruiter from './Account/Recruiter'
import ClientRecruiterView from './Account/Recruiter/View'
import ClientRecruiterCreate from './Account/Recruiter/Create'
import ClientRecruiterEdit from './Account/Recruiter/update'

const navItems = [
    
    {
        "id": "1",
        "title": "My Account",
        "url": "/client/dashboard"
    },
    {
        "id": "2",
        "title": "Client Account",
        "url": "/client/account/view"
    },
    {
        "id": "4",
        "title": "Requisitions",
        "url": "/client/requisitions"
    },
    {
        "id": "5",
        "title": "Recruiters",
        "url": "/client/recruiters"
    },
    
];


const Client = ({ location, user }) => {

    const [close, setClose] = useState(false);
    const [newcompany, setNewCompany] = useState(false);

    const closemodel = () => {
        setClose(true);
    }

    useEffect(() => {
      
        if(user?.get_client_company){
            let cuurentdate = new Date();
            let todaydate =  moment(cuurentdate).format("MM/DD/YYYY");
            let companydate =  moment(user?.get_client_company.created_at).format("MM/DD/YYYY");
        
            if(companydate == todaydate){
               
                setNewCompany(true);
            }
            
    
         }
    })
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={
                                    location.pathname.includes('my_acccount') ? null : "recruiter_tab"}>
                        <ul>
                        {
                            (() => {

                                if (    
                                    location.pathname.includes('client')
                                    ||
                                    location.pathname.includes('user')
                                    || 
                                    location.pathname.includes('account')
                                ){
                                    return (
                                        navItems.map(function(tab, i){
                                            {location.pathname.includes(tab.url.substring(0, tab.url.length - 1))}
                                            return <li><Link to={tab.url} className={ location.pathname.includes(tab.url.substring(0, tab.url.length - 1)) ? "active" : ""}>{tab.title}</Link></li>;
                                        })
                                    )
                                }
                            
                                return null;
                            })()
                        }
                        </ul>

                    </div>
                    <Switch>
                        
                        {/* <Route path="/client/dashboard" component={Dashboard} /> */}
                        
                        {  /* Account Route*/}

                        
                        <Route path="/client/dashboard/edit/:id" component={MyAccount} /> 
                        <Route exact path="/client/dashboard" component={ClientAccountView} /> 
                        
                        {/* /*Requisition routes */}
                        <Route path="/client/requisitions" component={ClientRequistionsList} /> 
                        <Route path="/client/requisition/view/:id" component={ClientRequistionView} /> 
                        <Route path="/client/requisition/edit/:id" component={ClientRequistionEdit} /> 
                        <Route exact path="/client/requisition/create" component={ClientRequistionCreate} />

                        <Route exact path="/client/account" component={ClientAccount} /> 
                        <Route exact path="/client/account/view" component={ClientAccountDetails} /> 

                        <Route exact path="/client/recruiters" component={ClientRecruiter} /> 

                        <Route exact path="/client/recruiter/view/:id" component={ClientRecruiterView} /> 

                        <Route exact path="/client/recruiter/create" component={ClientRecruiterCreate} /> 

                        <Route exact path="/client/recruiter/edit/:id" component={ClientRecruiterEdit} /> 
                        {/* <Redirect exact from="/client/dashboard" to="/client/requisitions" /> */}

                        <Route exact component={ErrorPage} />
                    </Switch>
                </div>
                {newcompany ?
                    <NewClientCompanyPop closemodel={closemodel} close={close} msg="You are attached with a new client company!"/> : ''
                    }
            </div>
        </div>
    );
}


Client.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
};

const mapStateToProps = store => ({
    user: store.rootReducer.auth.user,
    
  });
export default connect(mapStateToProps)(Client);
// export default Client;
  