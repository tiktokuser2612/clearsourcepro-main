import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  id: '',
  stringValue: '',
  numberValue: 0,
  booleanValue: false,
};

const INITIAL_STATE = {
  isPosting: false,
  isFetching: false,
  isFetchingList: false,
  isPutting: false,
  isDeleting: false,

  data: { ...INITIAL_DATA },
  edited: false,

  items: [],
  pagination: {
    current: 1,
    pageSize: DEFAULT_PAGINATION_PER_PAGE,
    total: 0,
    filters: [],
    sorter: null,
  },

  msg: '',
};

const testDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Post
    case types.TEST_DATA_POST_REQUEST:
      return {
        ...state,
        isPosting: true,
        msg: '',
      };
    case types.TEST_DATA_POST_SUCCESS:
      return {
        ...state,
        isPosting: false,
        edited: false,
        msg: action.payload.msg,
      };
    case types.TEST_DATA_POST_FAILURE:
      return {
        ...state,
        isPosting: false,
        msg: action.payload.msg,
      };

    // Get
    case types.TEST_DATA_GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        msg: '',
      };
    case types.TEST_DATA_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        edited: false,
        msg: action.payload.msg,
      };
    case types.TEST_DATA_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        data: { ...INITIAL_DATA },
        msg: action.payload.msg,
      };

    // Get list
    case types.TEST_DATA_GET_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
        msg: '',
      };
    case types.TEST_DATA_GET_LIST_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        items: action.payload.items,
        pagination: {
          ...state.pagination,
          current: action.payload.current,
          total: action.payload.total,
        },
        msg: '',
      };
    case types.TEST_DATA_GET_LIST_FAILURE:
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

    // Edit by user action
    case types.TEST_DATA_EDIT:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

    case types.TEST_DATA_INIT:
      return {
        ...state,
        data: { ...INITIAL_DATA },
        edited: false,
      };

    // Put
    case types.TEST_DATA_PUT_REQUEST:
      return {
        ...state,
        isPutting: true,
        msg: '',
      };
    case types.TEST_DATA_PUT_SUCCESS:
      return {
        ...state,
        isPutting: false,
        edited: false,
        msg: action.payload.msg,
      };
    case types.TEST_DATA_PUT_FAILURE:
      return {
        ...state,
        isPutting: false,
        msg: action.payload.msg,
      };

    // Delete
    case types.TEST_DATA_DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        msg: '',
      };
    case types.TEST_DATA_DELETE_SUCCESS:
    case types.TEST_DATA_DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        msg: action.payload.msg,
      };

    // Initial state
    default:
      return state;
  }
};

export default testDataReducer;
