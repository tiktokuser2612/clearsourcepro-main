let types = {
  // Signup
  SIGNUP_REQUEST: '',
  SIGNUP_SUCCESS: '',
  SIGNUP_FAILURE: '',

  // Login
  LOGIN_REQUEST: '',
  LOGIN_SUCCESS: '',
  LOGIN_FAILURE: '',

  // Get self
  GET_ME_REQUEST: '',
  GET_ME_SUCCESS: '',
  GET_ME_FAILURE: '',

  //edit user
  EDIT_ME: '',
  INIT_ME: '',
  PUT_ME_REQUEST:'',
  PUT_ME_SUCCESS:'',
  PUT_ME_FAILURE:'',

  // Logout
  LOGOUT_SUCCESS: '',

  // Request resend verification email
  POST_REQUEST_RESEND_VERIFICATION_EMAIL_REQUEST: '',
  POST_REQUEST_RESEND_VERIFICATION_EMAIL_SUCCESS: '',
  POST_REQUEST_RESEND_VERIFICATION_EMAIL_FAILURE: '',

  // Verify email
  POST_VERIFY_EMAIL_REQUEST: '',
  POST_VERIFY_EMAIL_SUCCESS: '',
  POST_VERIFY_EMAIL_FAILURE: '',

  // Request password reset email
  POST_REQUEST_PWD_RESET_REQUEST: '',
  POST_REQUEST_PWD_RESET_SUCCESS: '',
  POST_REQUEST_PWD_RESET_FAILURE: '',

  // Verify password reset token
  POST_VERIFY_PWD_RESET_TOKEN_REQUEST: '',
  POST_VERIFY_PWD_RESET_TOKEN_SUCCESS: '',
  POST_VERIFY_PWD_RESET_TOKEN_FAILURE: '',

  // Reset password
  POST_PWD_RESET_REQUEST: '',
  POST_PWD_RESET_SUCCESS: '',
  POST_PWD_RESET_FAILURE: '',

  // Unsubscribe
  POST_UNSUBSCRIBE_REQUEST: '',
  POST_UNSUBSCRIBE_SUCCESS: '',
  POST_UNSUBSCRIBE_FAILURE: '',

  // Test Data
  TEST_DATA_POST_REQUEST: '',
  TEST_DATA_POST_SUCCESS: '',
  TEST_DATA_POST_FAILURE: '',

  TEST_DATA_GET_REQUEST: '',
  TEST_DATA_GET_SUCCESS: '',
  TEST_DATA_GET_FAILURE: '',

  TEST_DATA_GET_LIST_REQUEST: '',
  TEST_DATA_GET_LIST_SUCCESS: '',
  TEST_DATA_GET_LIST_FAILURE: '',

  TEST_DATA_EDIT: '',
  TEST_DATA_INIT: '',

  TEST_DATA_PUT_REQUEST: '',
  TEST_DATA_PUT_SUCCESS: '',
  TEST_DATA_PUT_FAILURE: '',

  TEST_DATA_DELETE_REQUEST: '',
  TEST_DATA_DELETE_SUCCESS: '',
  TEST_DATA_DELETE_FAILURE: '',

  //Change Password
  PUT_PASSWORD_REQUEST:'',
  PUT_PASSWORD_SUCCESS:'',
  PUT_PASSWORD_FAILURE:'',

  //Admin Client Start

  ADMIN_CLIENTS_USERS_POST_REQUEST: '',
  ADMIN_CLIENTS_USERS_POST_SUCCESS: '',
  ADMIN_CLIENTS_USERS_POST_FAILURE: '',

  ADMIN_CLIENTS_USERS_INIT : '',
  ADMIN_CLIENTS_USERS_EDIT : '',

  ADMIN_CLIENTS_GET_LIST_REQUEST : '',
  ADMIN_CLIENTS_GET_LIST_SUCCESS : '',
  ADMIN_CLIENTS_GET_LIST_FAILURE : '',

  ADMIN_CLIENT_GET_REQUEST : '',
  ADMIN_CLIENT_GET_SUCCESS : '',
  ADMIN_CLIENT_GET_FAILURE : '',

  ADMIN_CLIENT_PUT_REQUEST : '',
  ADMIN_CLIENT_PUT_SUCCESS : '',
  ADMIN_CLIENT_PUT_FAILURE : '',

  ADMIN_CLIENT_DELETE_REQUEST : '',
  ADMIN_CLIENT_DELETE_SUCCESS : '',
  ADMIN_CLIENT_DELETE_FAILURE : '',

  //Admin Client End

  //Admin Recruiter
  
  ADMIN_RECRUITER_POST_REQUEST : '',
  ADMIN_RECRUITER_POST_SUCCESS : '',
  ADMIN_RECRUITER_POST_FAILURE : '',
  ADMIN_RECRUITER_EDIT : '',
  ADMIN_RECRUITER_INIT : '',

  ADMIN_RECRUITER_GET_REQUEST : '',
  ADMIN_RECRUITER_GET_SUCCESS : '',
  ADMIN_RECRUITER_GET_FAILURE : '',

  ADMIN_RECRUITER_GET_LIST_REQUEST : '',
  ADMIN_RECRUITER_GET_LIST_SUCCESS : '',
  ADMIN_RECRUITER_GET_LIST_FAILURE : '',


  ADMIN_RECRUITER_PUT_REQUEST : '',
  ADMIN_RECRUITER_PUT_SUCCESS : '',
  ADMIN_RECRUITER_PUT_FAILURE : '',

  ADMIN_RECRUITER_DELETE_REQUEST : '',
  ADMIN_RECRUITER_DELETE_SUCCESS : '',
  ADMIN_RECRUITER_DELETE_FAILURE : '',

  // Admin Recruiter End

  // Admin requisition Start
  ADMIN_REQUISITION_POST_REQUEST : '',
  ADMIN_REQUISITION_POST_SUCCESS : '',
  ADMIN_REQUISITION_POST_FAILURE : '',
  ADMIN_REQUISITION_INIT : '',
  ADMIN_REQUISITION_EDIT : '',

  ADMIN_REQUISITION_GET_LIST_REQUEST : "",
  ADMIN_REQUISITION_GET_LIST_SUCCESS : "",
  ADMIN_REQUISITION_GET_LIST_FAILURE : "",

  ADMIN_REQUISITION_GET_REQUEST : "",
  ADMIN_REQUISITION_GET_SUCCESS : "",
  ADMIN_REQUISITION_GET_FAILURE : "",

  ADMIN_REQUISITION_PUT_REQUEST : "",
  ADMIN_REQUISITION_PUT_SUCCESS : "",
  ADMIN_REQUISITION_PUT_FAILURE : "",

  ADMIN_REQUISITION_DELETE_REQUEST : "",
  ADMIN_REQUISITION_DELETE_SUCCESS : "",
  ADMIN_REQUISITION_DELETE_FAILURE : "",


  CLIENT_GET_LIST_SUCCESS: "",
  CLIENT_GET_LIST_REQUEST: "",
  CLIENT_GET_LIST_FAILURE: "",


  // Admin requisition End

  // Admin Candidate Start
  
  ADMIN_CANDIDATE_POST_REQUEST : "",
  ADMIN_CANDIDATE_POST_SUCCESS : "",
  ADMIN_CANDIDATE_POST_FAILURE : "",

  ADMIN_CANDIDATE_EDIT : "",
  ADMIN_CANDIDATE_INIT : "",

  ADMIN_CANDIDATE_GET_LIST_REQUEST : "",
  ADMIN_CANDIDATE_GET_LIST_SUCCESS : "",
  ADMIN_CANDIDATE_GET_LIST_FAILURE : "",

  ADMIN_CANDIDATE_GET_REQUEST : "",
  ADMIN_CANDIDATE_GET_SUCCESS : "",
  ADMIN_CANDIDATE_GET_FAILURE : "",

  ADMIN_CANDIDATE_PUT_REQUEST : "",
  ADMIN_CANDIDATE_PUT_SUCCESS : "",
  ADMIN_CANDIDATE_PUT_FAILURE : "",

  ADMIN_CANDIDATE_DELETE_REQUEST : "",
  ADMIN_CANDIDATE_DELETE_SUCCESS : "",
  ADMIN_CANDIDATE_DELETE_FAILURE : "",

  // Admin Candidate End

  //Admin User
  ADMIN_USER_POST_REQUEST : '',
  ADMIN_USER_POST_SUCCESS : '',
  ADMIN_USER_POST_FAILURE : '',

  ADMIN_USER_INIT : '',
  ADMIN_USER_EDIT : '',

  ADMIN_USER_GET_LIST_REQUEST : '',
  ADMIN_USER_GET_LIST_SUCCESS : '',
  ADMIN_USER_GET_LIST_FAILURE : '',

  ADMIN_USER_DELETE_REQUEST : '',
  ADMIN_USER_DELETE_SUCCESS : '',
  ADMIN_USER_DELETE_FAILURE : '',
  
  ADMIN_USER_PUT_REQUEST : '',
  ADMIN_USER_PUT_SUCCESS : '',
  ADMIN_USER_PUT_FAILURE : '',

  


  ADMIN_USER_GET_REQUEST : '',
  ADMIN_USER_GET_SUCCESS : '',
  ADMIN_USER_GET_FAILURE : '',

  NOTES_POST_REQUEST : '',
  NOTES_POST_SUCCESS : '',
  NOTES_POST_FAILURE : '',
  
  NOTES_EDIT : '',
  NOTES_INIT : '',

  NOTES_GET_LIST_REQUEST : '',
  NOTES_GET_LIST_SUCCESS : '',
  NOTES_GET_LIST_FAILURE : '',

  NOTES_GET_REQUEST : '',
  NOTES_GET_SUCCESS : '',
  NOTES_GET_FAILURE : '',

  NOTES_PUT_REQUEST : '',
  NOTES_PUT_SUCCESS : '',
  NOTES_PUT_FAILURE : '',


  ADMIN_CLIENT_RECORD_POST_REQUEST : '',
  ADMIN_CLIENT_RECORD_POST_SUCCESS : '',
  ADMIN_CLIENT_RECORD_POST_FAILURE : '',

  ADMIN_CLIENT_RECORD_INIT : '',
  ADMIN_CLIENT_RECORD_EDIT : '',

  ADMIN_CLIENT_RECORD_GET_LIST_REQUEST : '',
  ADMIN_CLIENT_RECORD_GET_LIST_SUCCESS : '',
  ADMIN_CLIENT_RECORD_GET_LIST_FAILURE : '',

  ADMIN_CLIENT_RECORD_DELETE_REQUEST : '',
  ADMIN_CLIENT_RECORD_DELETE_SUCCESS : '',
  ADMIN_CLIENT_RECORD_DELETE_FAILURE : '',

  ADMIN_CLIENT_RECORD_GET_REQUEST : '',
  ADMIN_CLIENT_RECORD_GET_SUCCESS : '',
  ADMIN_CLIENT_RECORD_GET_FAILURE : '',

  ADMIN_CLIENT_RECORD_PUT_REQUEST : '',
  ADMIN_CLIENT_RECORD_PUT_SUCCESS : '',
  ADMIN_CLIENT_RECORD_PUT_FAILURE : '',

  // ADMIN_CLIENT_RECORD_DELETE_REQUEST : '',
  // ADMIN_CLIENT_RECORD_DELETE_SUCCESS : '',
  // ADMIN_CLIENT_RECORD_DELETE_FAILURE : '',

  ACTIVITY_GET_LIST_REQUEST : '',
  ACTIVITY_GET_LIST_SUCCESS : '',
  ACTIVITY_GET_LIST_FAILURE : '',

  JOB_SEARCH_GET_LIST_REQUEST : '',
  JOB_SEARCH_GET_LIST_SUCCESS : '',
  JOB_SEARCH_GET_LIST_FAILURE : '',

  JOB_SEARCH_POST_REQUEST : '',
  JOB_SEARCH_POST_SUCCESS : '',
  JOB_SEARCH_POST_FAILURE : '',

  JOB_SEARCH_EDIT : '',

  JOB_DETAIL_GET_REQUEST : '',
  JOB_DETAIL_GET_SUCCESS : '',
  JOB_DETAIL_GET_FAILURE : '',

  JOB_DETAIL_SEARCH_GET_LIST_REQUEST : '',
  JOB_DETAIL_SEARCH_GET_LIST_SUCCESS : '',
  JOB_DETAIL_SEARCH_GET_LIST_FAILURE : '',

  APPLY_JOB_EDIT : '',
  APPLY_JOB_INIT : '',

  APPLY_JOB_POST_REQUEST : '',
  APPLY_JOB_POST_SUCCESS : '',
  APPLY_JOB_POST_FAILURE : '',

  CLIENT_GET_REQUEST : '',
  CLIENT_GET_SUCCESS : '',
  CLIENT_GET_FAILURE : '',

  CLIENT_MYACCOUNT_PUT_REQUEST : '',
  CLIENT_MYACCOUNT_PUT_SUCCESS : '',
  CLIENT_MYACCOUNT_PUT_FAILURE : '',

  CLIENT_MYACCOUNT_EDIT : '',
  CLIENT_MYACCOUNT_INIT_ME : '',


  CLIENT_REQUISITION_LIST_REQUEST : '',
  CLIENT_REQUISITION_LIST_SUCCESS : '',
  CLIENT_REQUISITION_LIST_FAILURE : '',
  
  CLIENT_REQUISITION_GET_REQUEST : '',
  CLIENT_REQUISITION_GET_SUCCESS : '',
  CLIENT_REQUISITION_GET_FAILURE : '',

  CLIENT_REQUISITION_INIT : '',
  CLIENT_REQUISITION_EDIT : '',

  CLIENT_REQUISITION_PUT_REQUEST : '',
  CLIENT_REQUISITION_PUT_SUCCESS : '',
  CLIENT_REQUISITION_PUT_FAILURE : '',

  CLIENT_REQUISITION_DELETE_REQUEST : '',
  CLIENT_REQUISITION_DELETE_SUCCESS : '',
  CLIENT_REQUISITION_DELETE_FAILURE : '',

  CLIENT_REQUISITION_POST_REQUEST : '',
  CLIENT_REQUISITION_POST_SUCCESS : '',
  CLIENT_REQUISITION_POST_FAILURE : '',


  //Recruiter requisition
  RECRUITER_REQUISITION_EDIT:'',
  RECRUITER_REQUISITION_INIT:'',
  RECRUITER_REQUISITION_GET_LIST_REQUEST:'',
  RECRUITER_REQUISITION_GET_LIST_SUCCESS:'',
  RECRUITER_REQUISITION_GET_LIST_FAILURE:'',

  RECRUITER_REQUISITION_GET_REQUEST:'',
  RECRUITER_REQUISITION_GET_SUCCESS:'',
  RECRUITER_REQUISITION_GET_FAILURE:'',

  RECRUITER_REQUISITION_PUT_REQUEST:'',
  RECRUITER_REQUISITION_PUT_SUCCESS:'',
  RECRUITER_REQUISITION_PUT_FAILURE:'',

  RECRUITER_REQUISITION_POST_REQUEST:'',
  RECRUITER_REQUISITION_POST_SUCCESS:'',
  RECRUITER_REQUISITION_POST_FAILURE:'',

  ADMIN_NEW_CLIENTS_POST_REQUEST:'',
  ADMIN_NEW_CLIENTS_POST_SUCCESS:'',
  ADMIN_NEW_CLIENTS_POST_FAILURE:'',

  ADMIN_NEW_CLIENTS_EDIT:'',
  ADMIN_NEW_CLIENTS_INIT:'',
  ADMIN_NEW_CLIENTS_GET_LIST_REQUEST:'',

  ADMIN_NEW_CLIENTS_GET_LIST_SUCCESS:'',
  ADMIN_NEW_CLIENTS_GET_LIST_FAILURE:'',
  ADMIN_NEW_CLIENTS_GET_REQUEST:'',

  ADMIN_NEW_CLIENTS_GET_SUCCESS:'',
  ADMIN_NEW_CLIENTS_GET_FAILURE:'',
  ADMIN_NEW_CLIENTS_PUT_REQUEST:'',
  ADMIN_NEW_CLIENTS_PUT_SUCCESS:'',

  ADMIN_NEW_CLIENTS_PUT_FAILURE:'',
  ADMIN_NEW_CLIENTS_DELETE_REQUEST:'',

  ADMIN_NEW_CLIENTS_DELETE_SUCCESS:'',
  ADMIN_NEW_CLIENTS_DELETE_FAILURE : '',


  ADMIN_CLIENT_CONTACT_POST_REQUEST : '',
  ADMIN_CLIENT_CONTACT_POST_SUCCESS : '',
  ADMIN_CLIENT_CONTACT_POST_FAILURE : '',

  ADMIN_CLIENT_CONTACT_EDIT : '',
  ADMIN_CLIENT_CONTACT_INIT : '',

  ADMIN_CLIENT_CONTACT_GET_LIST_REQUEST : '',
  ADMIN_CLIENT_CONTACT_GET_LIST_SUCCESS : '',
  ADMIN_CLIENT_CONTACT_GET_LIST_FAILURE : '',

  ADMIN_CLIENT_CONTACT_GET_REQUEST : '',
  ADMIN_CLIENT_CONTACT_GET_SUCCESS : '',
  ADMIN_CLIENT_CONTACT_GET_FAILURE : '',

  ADMIN_CLIENT_CONTACT_PUT_REQUEST : '',
  ADMIN_CLIENT_CONTACT_PUT_SUCCESS : '',
  ADMIN_CLIENT_CONTACT_PUT_FAILURE : '',

  ADMIN_CLIENT_CONTACT_DELETE_REQUEST : '',
  ADMIN_CLIENT_CONTACT_DELETE_SUCCESS : '',
  ADMIN_CLIENT_CONTACT_DELETE_FAILURE : '',

  //Account Executive requisition
  ACCOUNT_EXECUTIVE_REQUISITION_EDIT:'',
  ACCOUNT_EXECUTIVE_REQUISITION_INIT:'',
  ACCOUNT_EXECUTIVE_REQUISITION_GET_LIST_REQUEST:'',
  ACCOUNT_EXECUTIVE_REQUISITION_GET_LIST_SUCCESS:'',
  ACCOUNT_EXECUTIVE_REQUISITION_GET_LIST_FAILURE:'',

  ACCOUNT_EXECUTIVE_REQUISITION_GET_REQUEST:'',
  ACCOUNT_EXECUTIVE_REQUISITION_GET_SUCCESS:'',
  ACCOUNT_EXECUTIVE_REQUISITION_GET_FAILURE:'',

  ACCOUNT_EXECUTIVE_REQUISITION_PUT_REQUEST:'',
  ACCOUNT_EXECUTIVE_REQUISITION_PUT_SUCCESS:'',
  ACCOUNT_EXECUTIVE_REQUISITION_PUT_FAILURE:'',

  ACCOUNT_EXECUTIVE_REQUISITION_POST_REQUEST:'',
  ACCOUNT_EXECUTIVE_REQUISITION_POST_SUCCESS:'',
  ACCOUNT_EXECUTIVE_REQUISITION_POST_FAILURE:'',

  CLIENT_USER_ACCOUNT_INIT_ME:'',
  CLIENT_USER_ACCOUNT_EDIT:'',

  CLIENT_USER_ACCOUNT_GET_REQUEST :'',
  CLIENT_USER_ACCOUNT_GET_SUCCESS :'',
  CLIENT_USER_ACCOUNT_GET_FAILURE :'',

  CLIENT_USER_ACCOUNT_PUT_REQUEST :'',
  CLIENT_USER_ACCOUNT_PUT_SUCCESS :'',
  CLIENT_USER_ACCOUNT_PUT_FAILURE :'',

  CLIENT_DASHBOARD_RECRUITER_POST_REQUEST :'',
  CLIENT_DASHBOARD_RECRUITER_POST_SUCCESS :'',
  CLIENT_DASHBOARD_RECRUITER_POST_FAILURE :'',

  CLIENT_DASHBOARD_RECRUITER_EDIT :'',
  CLIENT_DASHBOARD_RECRUITER_INIT :'',

  CLIENT_DASHBOARD_RECRUITER_GET_LIST_REQUEST :'',
  CLIENT_DASHBOARD_RECRUITER_GET_LIST_SUCCESS :'',
  CLIENT_DASHBOARD_RECRUITER_GET_LIST_FAILURE :'',

  CLIENT_DASHBOARD_RECRUITER_GET_REQUEST :'',
  CLIENT_DASHBOARD_RECRUITER_GET_SUCCESS :'',
  CLIENT_DASHBOARD_RECRUITER_GET_FAILURE :'',

  CLIENT_DASHBOARD_RECRUITER_PUT_REQUEST :'',
  CLIENT_DASHBOARD_RECRUITER_PUT_SUCCESS :'',
  CLIENT_DASHBOARD_RECRUITER_PUT_FAILURE :'',

  CLIENT_DASHBOARD_RECRUITER_DELETE_REQUEST :'',
  CLIENT_DASHBOARD_RECRUITER_DELETE_SUCCESS :'',
  CLIENT_DASHBOARD_RECRUITER_DELETE_FAILURE :'',
  
  RECRUITER_COMPANY_DETAILS_REQUEST :'',
  RECRUITER_COMPANY_DETAILS_SUCCESS :'',
  RECRUITER_COMPANY_DETAILS_FAILURE :'',

};

if (process.env.NODE_ENV === 'production') {
  let idx = Math.floor(Math.random() * 1000);

  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      types[prop] = idx++;
    }
  }
} else {
  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      types[prop] = prop;
    }
  }
}

export default types;
