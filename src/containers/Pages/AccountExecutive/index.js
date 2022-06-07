import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import ErrorPage from '../Common/Error';
import AccountExecutiveProfile from './MyAccount';
import AccountExecutiveEditProfile from './MyAccount/EditMyAccount';

import AccountExecutiveRequisitionsList from './Requisitions/List';
import AccountExecutiveRequisitionReview from './Requisitions/Review';
import AccountExecutiveRequisitionUpdate from './Requisitions/Update';
import AccountExecutiveRequisitionCreate from './Requisitions/Create';
import NewClientCompanyPop from 'components/Modals/NewClientCompanyPop' 

const tabMenuList = [
  {
    "id": "0",
    "title": "Dashboard",
    "url": "/account_executive/dashboard",
  },
  
  {
      "id": "1",
      "title": "Requisitions",
      "url": "/account_executive/requisitions",
  },
  
];

const AccountExecutive = ({location, data }) => {
  const path = location.pathname;
  const [close, setClose] = useState(false);
  const [newcompany, setNewCompany] = useState(false);
  const [companyCount, setCompanyCount] = useState(0);
  const [tdate, setTdate] = useState('');
  const [showCount, setShowCount] = useState(true);
  const [count, setCount] = useState(0);


  const closemodel = () => {
    
    setShowCount(false);
    setClose(true);
    }
    
    useEffect(() => {
      

    },[])

    if(count < 1) {
      setTimeout(() => {
        setCount(count + 1);
        poppmodal();
      }, 1000);
    }
    console.log('path', path)
    const poppmodal = () => {
      if(data?.get_client_company){
          let cuurentdate = new Date();
          let todaydate =  moment(cuurentdate).format("MM/DD/YYYY");
          let countcomp = 0;
          setTdate(todaydate);
          
          data.get_client_company.map((company) => 
          (moment(company.created_at).format("MM/DD/YYYY") == todaydate ? 
             
          countcomp++ : '') );
          console.log('count', countcomp);
          
          if(countcomp > 0){
              setCompanyCount(countcomp);
              setNewCompany(true);
              
          }
  
       }
   }
   
    console.log('data count',count);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="recruiter_tab">
              <ul>
                  {
                    tabMenuList.map(function(tab, i){
                          {location.pathname.includes(tab.url.substring(0, tab.url.length - 1))}
                          return <li><Link to={tab.url} className={ location.pathname.includes(tab.url.substring(0, tab.url.length - 1)) ? "active" : ""}>{tab.title}</Link></li>;
                      })
                  }
              </ul>
          </div>
          <Switch location={location}>
                        
              <Route exact path="/account_executive/dashboard" component={AccountExecutiveProfile} />
              <Route exact path="/account_executive/dashboard/edit" component={AccountExecutiveEditProfile} />
                {/* requisition routes */}
              <Route exact path="/account_executive/requisitions" component={AccountExecutiveRequisitionsList} />
              <Route exact path="/account_executive/requisitions/view/:id" component={AccountExecutiveRequisitionReview} />
              <Route exact path="/account_executive/requisitions/edit/:id" component={AccountExecutiveRequisitionUpdate} />
              <Route exact path="/account_executive/requisitions/create" component={AccountExecutiveRequisitionCreate} />
              
              <Route component={ErrorPage} />
          </Switch>
        </div>
        {newcompany && showCount ?
         <NewClientCompanyPop closemodel={closemodel} close={close} msg={`You are attached with ${companyCount} new client companies!`}/> : ''}
      </div>
    </div>
  );
};
AccountExecutive.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  data: store.rootReducer.auth.user,
  
});

export default connect(mapStateToProps)(AccountExecutive);
// export default AccountExecutive;

