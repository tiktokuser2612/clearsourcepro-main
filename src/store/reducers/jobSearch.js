import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  'search' : ''
};

const INITIAL_FILTER = {
  'search' : '',
  'category' : null,
  'type' : null,
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
  jobType: [],
  category : [],
  pagination: {
    current: 1,
    pageSize: DEFAULT_PAGINATION_PER_PAGE,
    total: 0,
    filters: { ...INITIAL_FILTER },
    sorter: null,
    asc: true,
  },

  msg: '',
};

const jobSearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // Post
    case types.JOB_SEARCH_POST_REQUEST:
      return {
        ...state,
        isPosting: true,
        msg: '',
      };
    case types.JOB_SEARCH_POST_SUCCESS:
      return {
        ...state,
        isPosting: false,
        edited: false,
        msg: action.payload.msg,
      };
    case types.ADMIN_CLIENT_RECORD_POST_FAILURE:
      return {
        ...state,
        isPosting: false,
        msg: action.payload.msg,
      };

    // Get list
    case types.JOB_SEARCH_GET_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
        msg: '',
      };

      case types.JOB_SEARCH_GET_LIST_SUCCESS:
          
      return {
        ...state,
        isFetchingList: false,
        items: action.payload.data,
        jobType: action.payload.jobType,
        category : action.payload.category, 
        pagination: {
          ...state.pagination,
          current: action.payload.current,
          total: action.payload.total,
        },
        msg: '',
      };

      case types.JOB_SEARCH_GET_LIST_FAILURE:
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

      case types.JOB_SEARCH_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };


      // Get Single 
      case types.JOB_DETAIL_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.JOB_DETAIL_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.JOB_DETAIL_GET_FAILURE:
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



export default jobSearchReducer;
