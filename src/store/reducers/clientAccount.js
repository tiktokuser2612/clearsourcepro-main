import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

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
  'user_role' : '',
  'profile_image' : '',
  'firstname' : '',
  'lastname' : ''
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
};

const clientUserAccountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
     // Edit by user action
     case types.CLIENT_USER_ACCOUNT_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

    case types.CLIENT_USER_ACCOUNT_INIT_ME:
      return {
        ...state,
        data: { ...INITIAL_DATA },
        edited: false,
      };



      // Get Single Recruiter
      case types.CLIENT_USER_ACCOUNT_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.CLIENT_USER_ACCOUNT_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.CLIENT_USER_ACCOUNT_GET_FAILURE:
        return {
          ...state,
          isFetching: false,
          data: { ...INITIAL_DATA },
          msg: action.payload.msg,
        };

      // Put
      case types.CLIENT_USER_ACCOUNT_PUT_REQUEST:
        return {
          ...state,
          isPutting: true,
          msg: '',
        };
      case types.CLIENT_USER_ACCOUNT_PUT_SUCCESS:
        return {
          ...state,
          isPutting: false,
          edited: false,
          msg: action.payload.msg,
        };
      case types.CLIENT_USER_ACCOUNT_PUT_FAILURE:
        return {
          ...state,
          isPutting: false,
          msg: action.payload.msg,
        };

    // Initial state
    default:
      return state;
  }
};



export default clientUserAccountReducer;
