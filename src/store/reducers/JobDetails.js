import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  'id': '',
  'name': '',
  'user_name': '',
  'email': '',
  'phone': '',
  'password': '',
  'address': '',
  'city' : '',
  'state': '',
  'zip' : '',
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

const jobDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        // Get list
    case types.JOB_DETAIL_SEARCH_GET_LIST_REQUEST:
        return {
          ...state,
          isFetchingList: true,
          pagination: {
            ...state.pagination,
            ...action.payload,
          },
          msg: '',
        };
  
        case types.JOB_DETAIL_SEARCH_GET_LIST_SUCCESS:
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
  
        case types.JOB_DETAIL_SEARCH_GET_LIST_FAILURE:
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
    // Initial state
    default:
      return state;
  }
};



export default jobDetailsReducer;
