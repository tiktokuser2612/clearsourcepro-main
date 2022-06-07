import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Link,
    Route,
    Switch,
    useLocation
  } from 'react-router-dom';
import ErrorPage from '../Common/Error';

// Admin Dashbord Component
import Dashboard from './Dashboard'
import Requisitions from './Requisitions'
import Recruiters from './Recruiters'

// clients
import ClientList from './Clients/ListView'
import ClientEdit from './Clients/Edit'
import ClientView from './Clients/View'
import ClientCreate from './Clients/Create'

import ClientRecordCreate from './ClientRecord/Create'
import ClientRecordList from './ClientRecord/List'
import ClientRecordView from './ClientRecord/View'
import ClientRecordEdit from './ClientRecord/Edit'

//Candidate
import CandidateCreate from './Candidate/Create'
import ListView from './Candidate/ListView';
import View from './Candidate/View';
import EditView from './Candidate/EditView'

//Requisitions
import RequisitionsList from './Requisitions/List';
import RequisitionsCreate from './Requisitions/Create'
import Review from './Requisitions/Review'
import RequisitionUpdate from './Requisitions/Update'

//Recuriters
import List from './Recruiters/List'
import RecruitersCreate from './Recruiters/Create';
import RecruitersReview from './Recruiters/Review'
import RecruitersEdit from './Recruiters/Edit'

import Health from './Health'
import HealthEdit from './Health/Edit'
import HealthView from "./Health/View"

//Job 
import SearchJob from '../Jobs/SearchJob'
import JobDetails from './Job/JobDetails';
import ApplicationStart from './Job/Application'
import Done from './Job/Done' 

//Users
import UserList from './User/List'
import UserCreate from './User/Forms/Create'
import UserView from './User/View'
import UserEdit from './User/Forms/Edit'

// Account 
import MyAccount from './Account/MyAccount';

import Reports from './Reports'
import MenuBar from '../../../components/Common/MenuBar'




let routeLists = [
    { 
        name: "Dashboard" ,
        routes: [
            <Route exact path="/:user/dashboard" component={Dashboard} />
        ]
    }, 
    
    { 
        name: "Users Controller",
        routes: [
            <Route exact path="/:user/users" component={UserList} />,
            <Route exact path="/:user/users/create" component={UserCreate} />,
            <Route exact path="/:user/users/view/:id" component={UserView} />,
            <Route exact path="/:user/users/edit/:id" component={UserEdit} />,
        ]
    }, 
    
    { 
        name: "Requisitions" ,
        routes: [
            <Route exact path="/:user/requisitions" component={RequisitionsList} />,
            <Route exact path="/:user/requisitions/create" component={RequisitionsCreate} />,
            <Route exact path="/:user/requisitions/view/:id" component={Review} /> ,
            <Route exact path="/:user/requisitions/edit/:id" component={RequisitionUpdate}/>,
        ]
    },
    
    { 
        name: "Recruiters" ,
        routes: [
            <Route exact path="/:user/recruiters" component={List} />,
            <Route exact path="/:user/recruiters/create" component={RecruitersCreate} /> ,
            <Route exact path="/:user/recruiters/view/:id" component={RecruitersReview} /> ,
            <Route exact path="/:user/recruiters/edit/:id" component={RecruitersEdit} />,
        ]
    }, 
    { 
        name: "Clients" ,
        routes: [
            <Route exact path="/:user/clients/create" component={ClientCreate} />,
            <Route exact path="/:user/clients" component={ClientList} />,
            <Route exact path="/:user/clients/view/:id" component={ClientView} />,
            <Route exact path="/:user/clients/edit/:id" component={ClientEdit} />,
        ]
    }, 
    
    { 
        name: "Client Records" ,
        routes: [
            <Route exact path="/:user/client_records/create" component={ClientRecordCreate} />,
            <Route exact path="/:user/client_records" component={ClientRecordList} />,
            <Route exact path="/:user/client_records/view/:id" component={ClientRecordView} />,
            <Route exact path="/:user/client_records/edit/:id" component={ClientRecordEdit} />,
        ]
    },
    { 
        name: "Candidates" ,
        routes: [
            <Route exact path="/:user/candidates" component={ListView} />,
            <Route exact path="/:user/candidates/create" component={CandidateCreate} />,
            <Route exact path="/:user/candidates/view/:id" component={View} />,
            <Route exact path="/:user/candidates/edit/:id" component={EditView} />,
        ]
    },
    
    { 
        name: "Reports" ,
        routes: [
            <Route exact path="/:user/reports" component={Reports} />,
        ]
    },
]

const Admin = ({ location, user }) => {
    const navItems = [
        {
            "id": "1",
            "title": "Dashboard",
            "url": "/"+user.user_role+"/dashboard",
        },
        {
            "id": "2",
            "title": "Users Controller",
            "url": "/"+user.user_role+"/users",
        },
        {
            "id": "3",
            "title": "Requisitions",
            "url": "/"+user.user_role+"/requisitions",
        },
        {
            "id": "4",
            "title": "Recruiters",
            "url": "/"+user.user_role+"/recruiters",
            
        },
        {
            "id": "5",
            "title": "Clients",
            "url": "/"+user.user_role+"/clients", 
        },
        {
            "id": "6",
            "title": "Client Records",
            "url": "/"+user.user_role+"/client_records", 
        },
        {
            "id": "7",
            "title": "Candidates",
            "url": "/"+user.user_role+"/candidates",
            
        },
        {
            "id": "8",
            "title": "Reports",
            "url": "/"+user.user_role+"/reports",
        },
    ];

    
    const [userMenu, setuserMenu] = useState([]);
    useEffect(() => {
        let m = [];
        user.menu_permissions.map(p => {
            m.push(p.details.permission); 
        })
        setuserMenu(m)
    },[user]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <MenuBar navItems={navItems} location={location} userMenu={userMenu}/>
                    
                    <Switch>
                        {
                            routeLists.filter(r=>userMenu.includes(r.name)).map(r=>{
                                console.log(r.name)
                                return [...r.routes]
                            })
                        }
                        {/* Search Details*/}
                        {/* <Route exact path="/admin/job/search" component={SearchJob} />
                        <Route exact path="/admin/job/details/:id" component={JobDetails} />
                        <Route exact path="/admin/job/application/start" component={ApplicationStart} /> 
                        <Route exact path="/admin/job/application/complete" component={Done} /> 
                         */}

                        {  /* Account Route*/}
                        <Route exact path="/:user/my_acccount" component={MyAccount} /> 
                                              
                        {/*  Health Routes*/  }
                        <Route exact path="/:user/client_classes" component={Health} /> 
                        <Route exact path="/:user/health/edit" component={HealthEdit} /> 
                        <Route exact path="/:user/health/view" component={HealthView} /> 

                        <Route exact component={ErrorPage} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}


Admin.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
};
  
const mapStateToProps = store => ({
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

   
export default connect(mapStateToProps, mapDispatchToProps)(Admin);