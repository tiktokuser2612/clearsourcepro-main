import types from '../types';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

const INITIAL_DATA = {
  'id': '',
  'title': '',
  'job_type': '',
  'compensation': '',
  'category': '',
  'department': '',
  'location': '',
  'evaluation_form': '',
  'pre_interview_form': '',
  // 'recruiter_name': '',
  'recruiter_id': '',
  // 'recruiter_firstname' : '',
  'hiring_manager': '',
  'note_title': '',
  'client_id': '',
   notes: [],
  'note_description': '',
  'company_name': '',
  'company_phone': '',
  'company_email': '',
  'status': '',

  'general_primary_address': '',
  'general_hiring_manager': '',

  'general_type_of_insurance_licensed_needed': '',
  'general_non_residents': '',
  'general_need_AHIP': '',
  'general_products_carriers': '',
  'general_appointment_info': '',
  'general_hours_schedule': '',
  'general_base_pay': '',
  'general_bonus_plan': '',
  'general_minimum_experience': '',
  'general_technology': '',
  'general_training': '',
  'general_inbound_outbound': '',
  'general_schedule_phone_interview': '',
  'general_openings': '',
  'general_apply_form': '',
  'general_time_off_requested': '',
  'description': '',
  'brief_description' : '',
  'hiring_manager_id' : '',
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

const clientRequisitionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {


    // Post
    case types.CLIENT_REQUISITION_POST_REQUEST:
      return {
        ...state,
        isPosting: true, 
        msg: '',
      };
    case types.CLIENT_REQUISITION_POST_SUCCESS:
      return {
        ...state,
        isPosting: false,
        edited: false,
        msg: action.payload.msg,
      };
    case types.ADMIN_REQUISITION_POST_FAILURE:
      return {
        ...state,
        isPosting: false,
        msg: action.payload.msg,
      };

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
        
        case types.CLIENT_REQUISITION_LIST_REQUEST:
        return {
            ...state,
            isFetchingList: true,
            pagination: {
            ...state.pagination,
            ...action.payload,
            },
            msg: '',
        };

        case types.CLIENT_REQUISITION_LIST_SUCCESS:
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

        case types.CLIENT_REQUISITION_LIST_FAILURE:
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

        // Edit by user action
        case types.CLIENT_REQUISITION_EDIT:
            return {
            ...state,
            data: { ...state.data, ...action.payload },
            edited: true,
        };
    
        case types.CLIENT_REQUISITION_INIT:
        return {
            ...state,
            data: { ...INITIAL_DATA },
            edited: false,
        };

        // Put
        case types.CLIENT_REQUISITION_PUT_REQUEST:
        return {
            ...state,
            isPutting: true,
            msg: '',
        };
        
        case types.CLIENT_REQUISITION_PUT_SUCCESS:
        return {
            ...state,
            isPutting: false,
            edited: false,
            msg: action.payload.msg,
        };
        
        case types.CLIENT_REQUISITION_PUT_FAILURE:
        return {
            ...state,
            isPutting: false,
            msg: action.payload.msg,
        };

              // Get Single Candidate
      case types.CLIENT_REQUISITION_GET_REQUEST:
        return {
          ...state,
          isFetching: true,
          msg: '',
        };
      case types.CLIENT_REQUISITION_GET_SUCCESS:
        return {
          ...state,
          isFetching: false,
          data: action.payload.data,
          edited: false,
          msg: action.payload.msg,
        };
      case types.CLIENT_REQUISITION_GET_FAILURE:
        return {
          ...state,
          isFetching: false,
          data: { ...INITIAL_DATA },
          msg: action.payload.msg,
        };

      // Delete
      case types.CLIENT_REQUISITION_DELETE_REQUEST:
        return {
          ...state,
          isDeleting: true,
          msg: '',
        };
  
      case types.CLIENT_REQUISITION_DELETE_SUCCESS:
      
      case types.CLIENT_REQUISITION_DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
      };
      

    // Initial state
    default:
      return state;
  }
};



export default clientRequisitionsReducer;
