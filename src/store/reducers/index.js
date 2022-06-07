import { combineReducers } from 'redux';
import testData from './testData';
import auth from './auth';
import adminClientUsers from './AdminClientUsers';
import adminRecruiter from './adminRecruiter';
import adminRequisition from './adminRequisition';
import adminCandidate from './adminCandidate';
import adminUser from './adminUser'
import notes from './notes'
import clientRecord from './clientRecord';
import activity from './activity';
import jobSearch from './jobSearch';
import applyJob from './applyJob'
import clientMyAccount from './clientMyAccount';
import clientRequisitions from './clientRequisitions';
import recruiterRequisition from './recruiterRequisition';
import accountExecutiveRequisition from './accountExecutiveRequisition';
import adminNewClient from './adminNewClient';
import adminClientContact from './adminClientContact';
import clientUserAccount from './clientAccount';
import clientDashboardRecruiter from './clientDashboardRecruiter';
import recruiterCompanyDetail from './recuiterCompanyDeatils';

export default combineReducers({
  testData,
  auth,
  adminClientUsers,
  adminRecruiter,
  adminRequisition,
  adminCandidate,
  adminUser,
  notes,
  clientRecord,
  activity,
  jobSearch,
  applyJob,
  clientMyAccount,
  clientRequisitions,
  recruiterRequisition,
  adminNewClient,
  adminClientContact,
  accountExecutiveRequisition,
  clientUserAccount,
  clientDashboardRecruiter,
  recruiterCompanyDetail,
});
