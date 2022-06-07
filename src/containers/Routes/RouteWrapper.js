import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { Route, Redirect } from 'react-router-dom';
import ErrorPage from '../Pages/Common/Error';

/**
 * Route wrapper which provides route and authentication check
 * @param auth
 *            - true:             only logged in users can visit, if not, do @authFailRedirect
 *            - "guestOnly":      only guest users can visit, if not, do @authFailRedirect
 *            - false / null:     any users can visit
 *
 * @param authFailRedirect
 *            - string:           redirect to this url if not logged in
 *            - false / null:     show 404 error page
 *
 * @param failMsg
 *            - string:           msg to send to authFailRedirectPage as state
 *
 * @param routeRole
 *            - string:               only users with `string` role can visit
 *            - ['role1', 'role2']:   users with these roles can visit
 *            - false / null:         any users can visit
 *
 * @param roleFailRedirect
 *            - string:           redirect to this url if don't have permission
 *            - false / null:     show 404 error page
 *
 * @param component: Component to display
 *
 * Pitfall: because ReactRouter's switch make list of routes from it's direct children, it is impossible to use like this
 * <Switch>
 *   <RouteWrapper path="/dashboard" auth={true} role="user">
 *   <RouteWrapper path="/dashboard" auth={true} role="admin">
 * </Switch>
 * Please use {role===user &&} if you need to have same route for different roles or any reason
 */
const RouteWrapper = ({
  location,
  component: Component,
  auth,
  authFailRedirect,
  failMsg,
  routeRole,
  roleFailRedirect,
  isAuthenticated,
  userRole,
  ...rest
}) => {
  let toDo = 'showPage';

  if (auth === true) {
    if (isAuthenticated) {
      toDo = 'showPageByRoleLogic';
    } else {
      toDo = 'showAuthFailBack';
    }
  }

  if (auth === 'guestOnly') {
    if (!isAuthenticated) {
      toDo = 'showPage';
    } else {
      toDo = 'showAuthFailBack';
    }
  }

  if (!auth) {
    toDo = 'showPageByRoleLogic';
  }

  switch (toDo) {
    case 'showPageByRoleLogic':
      return <RoleLogic {...rest} location={location} component={Component} routeRole={routeRole} failMsg={failMsg}
                        roleFailRedirect={roleFailRedirect} isAuthenticated={isAuthenticated} userRole={userRole} />;
    case 'showAuthFailBack':
      return authFailRedirect
        ? <Route {...rest} render={() =>
          <Redirect to={{
            pathname: authFailRedirect,
            state: { from: location, msg: failMsg || 'Please login to continue.' },
          }} />} />
        : <Route {...rest} render={props => <ErrorPage {...props} />} />;
    case 'showPage':
    default:
      return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

const RoleLogic = ({
  location,
  component: Component,
  routeRole,
  roleFailRedirect,
  failMsg,
  userRole,
  ...rest
}) => {
  let toDo = 'showPage';

  if (!routeRole) {
    toDo = 'showPage';
  }

  if (typeof routeRole === 'string') {
    // only show if userRole is same as role
    if (userRole === routeRole) {
      toDo = 'showPage';
    } else {
      toDo = 'showRoleFailBack';
    }
  }

  if (Array.isArray(routeRole)) {
    if (routeRole.indexOf(userRole) !== -1) {
      toDo = 'showPage';
    } else {
      toDo = 'showRoleFailBack';
    }
  }

  switch (toDo) {
    case 'showRoleFailBack':
      return roleFailRedirect
        ? <Route {...rest} render={() =>
          <Redirect to={{
            pathname: roleFailRedirect, state: { from: location, msg: failMsg || 'Please login to continue.' },
          }} />} />
        : <Route {...rest} render={props => <ErrorPage {...props} />} />;
    case 'showPage':
    default:
      return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

RouteWrapper.propTypes = {
  location: PropTypes.object.isRequired,
  component: PropTypes.any.isRequired,

  auth: PropTypes.any,
  authFailRedirect: PropTypes.any,
  routeRole: PropTypes.any,
  roleFailRedirect: PropTypes.any,

  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!(state.rootReducer.auth.user && state.rootReducer.auth.accessToken),
  userRole: _get(state, 'rootReducer.auth.user.role', false),
});

export default connect(mapStateToProps)(RouteWrapper);
