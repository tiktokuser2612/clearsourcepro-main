import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  'id': '',
  'firstname': '',
  'lastname': '',
  'user_name': '',
  'email': '',
  'phone': '',
  'password': '',
  'hiring_dates': '',
  'address': '',
  'salary': '',
  'city' : '',
  'state': '',
  'zip' : ''
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

const getRecruiterCompanyDetailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

      
        // Get Single Recruiter
        case types.RECRUITER_COMPANY_DETAILS_REQUEST:
            return {
            ...state,
            isFetching: true,
            msg: '',
            };
        case types.RECRUITER_COMPANY_DETAILS_SUCCESS:
            return {
            ...state,
            isFetching: false,
            data: action.payload.data,
            edited: false,
            msg: action.payload.msg,
            };
        case types.RECRUITER_COMPANY_DETAILS_FAILURE:
            return {
            ...state,
            isFetching: false,
            data: { ...INITIAL_DATA },
            msg: action.payload.msg,
            };
      // Initial state
    default:
      return state;
  }
};

export default getRecruiterCompanyDetailReducer;
