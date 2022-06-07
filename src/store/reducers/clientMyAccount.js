import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
    'address' : "",
    'city' : '',
    'company_name' : "",
    'email' : "",
    'id': '',
    'name': "",
    'phone': "",
    'photo_url': "",
    'state': "",
    'username': "",
    'zip': ""
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

const clientMyAccountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
   

     // Edit by user action
     case types.CLIENT_MYACCOUNT_INIT_ME:
       console.log('state_client_reducer', state.user)
      return {
        ...state,
        data: { ...INITIAL_DATA, ...state.user },
        edited: true,
      };

    case types.CLIENT_MYACCOUNT_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

      // Get Single Recruiter
      case types.CLIENT_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.CLIENT_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.CLIENT_GET_FAILURE:
        return {
          ...state,
          isFetching: false,
          data: { ...INITIAL_DATA },
          msg: action.payload.msg,
        };

      // Put
      case types.CLIENT_MYACCOUNT_PUT_REQUEST:
        return {
          ...state,
          isPutting: true,
          msg: '',
        };
      case types.CLIENT_MYACCOUNT_PUT_SUCCESS:
        return {
          ...state,
          isPutting: false,
          edited: false,
          msg: action.payload.msg,
        };
      case types.CLIENT_MYACCOUNT_PUT_FAILURE:
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



export default clientMyAccountReducer;
