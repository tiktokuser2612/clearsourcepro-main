import types from '../types';

const INITIAL_DATA = {
    'resume': null,
    'how_did_you_hear_about_us': '',
    'country' : '',
    'contractor' : '',
    'name' : '',
    'phone' : '',
    'email' : '',
    'address' : '',
    'city' : '',
    'state' : '',
    'zip' : '',
    'company_name' : '',
    'job_title' : '',
    'year_of_experience' : '',
    'key_achievments' : '',
    'how_did_you_hear_about_us_four' : '',
    'contractor_four' : '',
    'full_time_part_time' : '',
    'When_the_earliest_you_can_start_working_with_us' : '',
    'Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process' : '',
    'Why_did_you_apply_for_this_position' : '',
    'Why_would_you_like_to_work_with_our_company' : '',
    'disclosure' : '',
    'gender' : '',
    'dob' : '',
    'ethnic_background' : '', 
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
  steps: [],
  msg: '',
};

const applyJobReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case types.APPLY_JOB_POST_REQUEST:
        
        return {
            ...state,
            isPosting: true,
            msg: '',
        };

        case types.APPLY_JOB_POST_SUCCESS:
        return {
            ...state,
            isPosting: false,
            edited: false,
            msg: action.payload.msg,
        };

        case types.APPLY_JOB_POST_FAILURE:
        return {
            ...state,
            isPosting: false,
            msg: action.payload.msg,
        };

        // Edit by user action
        case types.APPLY_JOB_EDIT:
        return {
            ...state,
            data: { ...state.data, ...action.payload },
            edited: true,
        };

        case types.APPLY_JOB_INIT:
        return {
            ...state,
            data: { ...INITIAL_DATA },
            edited: false,
        };

        // Initial state
        default:
        return state;
    }
};



export default applyJobReducer;
