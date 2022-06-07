import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  
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

const activityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

     // Edit by user action
     case types.NOTES_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

    case types.NOTES_INIT:
      return {
        ...state,
        data: { ...INITIAL_DATA },
        edited: false,
      };

    // Get list
    case types.ACTIVITY_GET_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
        msg: '',
      };

      case types.ACTIVITY_GET_LIST_SUCCESS:
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

      case types.ACTIVITY_GET_LIST_FAILURE:
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
      case types.NOTES_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.NOTES_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.NOTES_GET_FAILURE:
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



export default activityReducer;
