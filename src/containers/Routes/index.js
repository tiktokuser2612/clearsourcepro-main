import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Comman Route
import ErrorPage from '../Pages/Common/Error';
import LandingPage from '../Pages/Common/Landing';
import LookingForJobsPage from '../Pages/Common/LookingForJobs';
import NeedToHirePage from '../Pages/Common/NeedToHire';
import HowToApplyPage from '../Pages/Common/HowToApply';
import ContactPage from '../Pages/Common/Contact';
import TermsPage from '../Pages/Common/Terms';
import PrivacyPage from '../Pages/Common/Privacy';

// Logins
import SigninPage from '../Pages/Common/Signin';
import AdminSignin from '../Pages/Common/AdminSignin';

// Admin
import UserDashboard from '../Pages/UserDashboard';
import Recruiter from '../Pages/Recruiter';
import AccountExecutive from '../Pages/AccountExecutive';
// import RecruiterEditMyAccount from '../Pages/Recruiter/MyAccount/EditMyAccount';

// Layout
import GuestLayout from '../Templates/Layout/GuestLayout';
import Logout from 'containers/Pages/Common/Logout';
import Client from 'containers/Pages/Client';

const Routes = ({ location, isAuthenticated, user, user_role, ...props }) => {

  const CommonRoutes = () => {
    return [
        <Route exact path="/" component={LandingPage} />,
        <Route exact path="/looking-for-jobs" component={LookingForJobsPage} />,
        <Route exact path="/need-to-hire" component={NeedToHirePage} />,
        <Route exact path="/how-to-apply" component={HowToApplyPage} />,
        <Route exact path="/contact" component={ContactPage} />,
        <Route exact path="/terms" component={TermsPage} />,
        <Route exact path="/privacy" component={PrivacyPage} />,
        <Route exact path="/logout" component={Logout} />,
    ];
  };

  const GuestRoutes = (location) => {

    return (
      <Switch location={location}>
        
        <Route exact path="/login" component={SigninPage} />
        <Route exact path="/admin/login" component={AdminSignin} />
        {CommonRoutes()}
        <Redirect exact to="/admin/login" />
        <Route exact component={ErrorPage} />
      </Switch>
    );
  };

  const UserRoutes = (user_role, location) => {
    
    let user = user_role;

    console.log('location', location);
    return (
      <>
      <Switch >
        <Redirect isAuthenticated={isAuthenticated} exact from="/login" to={"/"+user+"/dashboard"} />
        <Redirect exact from="/dashboard" to={"/"+user+"/dashboard"} />
        <Redirect exact from={'/'+user+'/login'} to={"/"+user+"/dashboard"} />
        <Redirect exact from={'/'+user} to={"/"+user+"/dashboard"} /> 
        
        {/* <Redirect from={'/'+user+'/login'} to={"/"+user+"/dashboard"} />  */}

        <Route path="/:user" component={UserDashboard} />
        {CommonRoutes()}
      </Switch>
        
      </>
      
    );
    
  };

  return (
      <TransitionGroup className="transition-group">
          <CSSTransition
              key={location.pathname}
              timeout={{ enter: 300, exit: 300 }}
              classNames="fade"
          >
              <section className="route-section">
                  {
                      <GuestLayout {...props} location={location} user={user} isAuthenticated={isAuthenticated} user_role={user_role}>
                      {isAuthenticated
                          ? UserRoutes(user.user_role, location)
                          : GuestRoutes(location)
                      }
                      </GuestLayout>
                  }
              </section>
          </CSSTransition>
      </TransitionGroup>
  );

};

Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  history: PropTypes.object.isRequired,

  isAuthenticated: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!(state.rootReducer.auth.user && state.rootReducer.auth.accessToken),
  user: state.rootReducer.auth.user,
});

export default connect(mapStateToProps)(Routes);
