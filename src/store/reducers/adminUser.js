import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';
const PERMISSIONS = {
  'Menu Items': {
    'Dashboard':                        { 'Display':0 },
    'Users Controller':                 { 'Display':0 },
    'Requisitions':                     { 'Display':0 },
    'Recruiters':                       { 'Display':0 },
    'Clients':                          { 'Display':0 },
    'Client Records':                   { 'Display':0 },
    'Candidates':                       { 'Display':0 },
    'Reports':                          { 'Display':0 },
  },

  'Users Controller': {
    "Actions": { 'C':0, 'R':0, 'U':0, 'D':0 },
  },

  'Dashboard': {
    'Analytics Summary':                { 'Display':0 },
    'Metrics':                          { 'Display':0 },
    'Req Calendar & Candidates':        { 'Display':0 },
    'My Open Reqs':                     { 'Display':0 },
    'All Open Reqs':                    { 'Display':0 },
    'Billboard':                        { 'Display':0 },
    'My Tasks':                         { 'Display':0 },
  },

  'Req Accordions' : {
    'Details':                          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Analytics Summary':                { 'Display':0},
    'Candidates by Workflow':           { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Description':                      { 'C':0, 'R':0, 'U':0, 'D':0 },
    'General Details':                  { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Posting Option':                   { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Notes':                            { 'C':0, 'R':0, 'U':0, 'D':0 },
  },

  'Recruiter Accordions' : {
    'Details':                          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Analytics Summary':                { 'Display':0},
    'Resume':                           { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Permissions':                      { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Notes':                            { 'C':0, 'R':0, 'U':0, 'D':0 },
  },

  'Client Accordions': {
    'Details':                          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Reqs':                             { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Hiring Managers':                  { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Accounting/Billing Contact Info':  { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Description of Business':          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Contacts':                         { 'C':0, 'R':0, 'U':0, 'D':0 },
  },

  'Candidate Accordions': {
    'Details':                          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Resume':                           { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Reqs':                             { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Classes':                          { 'C':0, 'R':0, 'U':0, 'D':0 },
    'Notes':                            { 'C':0, 'R':0, 'U':0, 'D':0 },
  },
}
const INITIAL_DATA = {
  'id': '',
  'username': '',
  'password': '',
  'email': '',
  'phone': '',
  'address': '',
  'city' : '',
  'state': '',
  'zip' : '',
  'user_role' : 'client',
  'profile_image' : '',
  'firstname' : '',
  'lastname' : '',
  'status' : '',
  'search_data' : '',
  'start_date' : '',
  'mobile_number' : '',
  'location' : '',
  'manager' : '',
  'title' : '',
  'evaluation_date' : '',
  'termination_date' : '',
  'desired_compensation' : '',
  'secondary_address' : '',
  'country' : '',
  'name' : '',
  'contact_number' : '',
  'relationship' : '',
  'schedule' : '',
  'time_zone' : '',
  'dob' : '',
  'middlename' : '',
  'primary_contact_name' : '',
  'primary_contact_title' : '',
  'evaluation_form':"",
  'home_phone_number':"",
  'mailing_address':"",
  'language':"",
  'desired_compensation':"",
  'emergency_contact':"",
  'active':"",
  'contract_sent':"",
  'years_in_business':"",
  'contacted':"",
  'client_status':"",
  'primary_contact_title': "",
  'primary_contact_name': "",
  'years_in_business': "",
  'permission': PERMISSIONS
};

const INITIAL_STATE = {
  isPosting: false,
  isFetching: false,
  isFetchingList: false,
  isPutting: false,
  isDeleting: false,
  isPuttingPassword: false,

  data: { ...INITIAL_DATA },
  edited: false,

  items: [],
  pagination: {
    current: 1,
    pageSize: DEFAULT_PAGINATION_PER_PAGE,
    total: 0,
    filters: [],
    sorter: null,
    asc: true,
  },

  msg: '',

  permission: PERMISSIONS
};

const adminUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Post
    case types.ADMIN_USER_POST_REQUEST:
      return {
        ...state,
        isPosting: true,
        msg: '',
      };
    case types.ADMIN_USER_POST_SUCCESS:
      return {
        ...state,
        isPosting: false,
        edited: false,
        msg: action.payload.msg,
      };
    case types.ADMIN_USER_POST_FAILURE:
      return {
        ...state,
        isPosting: false,
        msg: action.payload.msg,
      };

     // Edit by user action
     case types.ADMIN_USER_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

    case types.ADMIN_USER_INIT:
      return {
        ...state,
        data: { ...INITIAL_DATA },
        edited: false,
      };

    // Get list
    case types.ADMIN_USER_GET_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
        msg: '',
      };

      case types.ADMIN_USER_GET_LIST_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        items: action.payload.data,
        pagination: {
          ...state.pagination,
          current: action.payload.current,
          total: action.payload.total,
        },
        msg: '',
      };

      case types.ADMIN_USER_GET_LIST_FAILURE:
      return {
        ...state,
        isFetchingList: false,
        items: [],
        pagination: {
          ...state.pagination,
          current: 1,
          total: 0,
          filters: [],
          sorter: null,
        },
        msg: action.payload.msg,
      };

      // Get Single Recruiter
      case types.ADMIN_USER_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.ADMIN_USER_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.ADMIN_USER_GET_FAILURE:
        return {
          ...state,
          isFetching: false,
          data: { ...INITIAL_DATA },
          msg: action.payload.msg,
        };

      // Put
      case types.ADMIN_USER_PUT_REQUEST:
        return {
          ...state,
          isPutting: true,
          msg: '',
        };
      case types.ADMIN_USER_PUT_SUCCESS:
        return {
          ...state,
          isPutting: false,
          edited: false,
          msg: action.payload.msg,
        };
      case types.ADMIN_USER_PUT_FAILURE:
        return {
          ...state,
          isPutting: false,
          msg: action.payload.msg,
        };

      // Delete
    case types.ADMIN_USER_DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        msg: '',
      };

    case types.ADMIN_USER_DELETE_SUCCESS:
    
    case types.ADMIN_USER_DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
      };
    
    

    // Initial state
    default:
      return state;
  }
};



export default adminUserReducer;
