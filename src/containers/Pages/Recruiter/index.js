
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorPage from '../Common/Error';
import RecruiterMyAccount from './MyAccount';
import RecruiterRequisitionsList from './Requisitions/List';
import RecruiterEditMyAccount from './MyAccount/EditMyAccount';
import RecruiterRequisitionReview from './Requisitions/Review';
import RecruiterRequisitionUpdate from './Requisitions/Update';
import RecruiterClients from './Clients';
import RecruiterRequisitionCreate from './Requisitions/Create';
import NewClientCompanyPop from 'components/Modals/NewClientCompanyPop' 
import RecuiterCompanyInformation from './Company/index'

import MenuBar from '../../../components/Common/MenuBar'

const tabMenuList = [
  {
    "id": "0",
    "title": "Dashboard",
    "url": "/recruiter/dashboard",
  },
  {
      "id": "1",
      "title": "Requisitions",
      "url": "/recruiter/requisitions",
  },
  {
      "id": "2",
      "title": "Client",
      "url": "/recruiter/clients", 
  },
  {
    "id": "3",
    "title": "Company Information",
    "url": "/recruiter/company-information",
},
];

let routeLists = [
  { 
      name: "Dashboard" ,
      routes: [
        <Route exact path="/recruiter/dashboard" component={RecruiterMyAccount} />
  ]},
]

const Recruiter = ({location, data }) => {
  const path = location.pathname;
  const [close, setClose] = useState(false);
  const [count, setCount] = useState(0);
  const [userMenu, setuserMenu] = useState(['Dashboard','Requisitions']);
  
  useEffect(() => {
      let m = [];
      data.menu_permissions.map(p => {
          m.push(p.details.permission); 
      })
      setuserMenu(m)
  },[data]);

  
  const closemodel = () => {
      setClose(true);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

        <MenuBar navItems={tabMenuList} location={location} userMenu={userMenu}/>

          <Switch location={location}>
              <Route exact path="/recruiter/dashboard" component={RecruiterMyAccount} />
              <Route exact path="/recruiter/requisitions" component={RecruiterRequisitionsList} />
              <Route exact path="/recruiter/requisitions" component={RecruiterRequisitionsList} />
              <Route exact path="/recruiter/requisitions/view/:id" component={RecruiterRequisitionReview} />
              <Route exact path="/recruiter/requisitions/edit/:id" component={RecruiterRequisitionUpdate} />
              <Route exact path="/recruiter/requisitions/create" component={RecruiterRequisitionCreate} />
              <Route exact path="/recruiter/clients" component={RecruiterClients} />
              <Route exact path="/recruiter/dashboard/edit" component={RecruiterEditMyAccount} />
              <Route exact path="/recruiter/company-information" component={RecuiterCompanyInformation} />
              <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
Recruiter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
const mapStateToProps = store => ({
  data: store.rootReducer.auth.user,
  
});
export default connect(mapStateToProps)(Recruiter);
// export default Recruiter;

