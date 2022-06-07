import types from '../types';

const INITIAL_DATA = {
  'id': '',
  'firstname': '',
  'lastname': '',
  'username': '',
  'email': '',
  'phone': '',
  'password': '',
  'hiring_dates': '',
  'address': '',
  'city' : '',
  'state': '',
  'zip' : '',
  'note_title' : '',
  'note_description' : '',
  'jv_invitation_status' : '',
  notes: [],
};

const INITIAL_STATE = {
  isStoredTokenVerified: false,

  isPostingSignup: false,
  isPostingLogin: false,
  isFetchingMe: false,
  isPuttingPassword: false,
  isPuttingMe: false,

  accessToken: '',
  refreshToken: '',
  data: { ...INITIAL_DATA },
  edited: false,
  user: null,
  user_role: null,

  isPostingRequestResendVerificationEmail: false,
  isPostingVerifyEmail: false,

  isPostingPwdResetRequest: false,
  isPostingVerifyPwdResetToken: false,
  isPostingPwdReset: false,

  isPostingUnsubscribe: false,

  msg: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Signup
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isPostingSignup: true,
        msg: '',
      };
    case types.SIGNUP_SUCCESS:
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        isPostingSignup: false,
        msg: action.payload.msg,
      };

    // Login
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isPostingLogin: true,
        msg: '',
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isPostingLogin: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user || state.user,
        user_role: action.payload.user_role || state.user_role,
        msg: action.payload.msg,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isPostingLogin: false,
        accessToken: '',
        refreshToken: '',
        msg: action.payload.msg,
      };

    // Get me
    case types.GET_ME_REQUEST:
      return {
        ...state,
        isFetchingMe: true,
        msg: '',
      };
    case types.GET_ME_SUCCESS:
      return {
        ...state,
        isFetchingMe: false,
        user: action.payload.user,
        user_role: action.payload.user_role,
        isStoredTokenVerified: true,
        msg: '',
      };
    case types.GET_ME_FAILURE:
      return {
        ...state,
        isFetchingMe: false,
        user: null,
        user_role: null,
        accessToken: '',
        refreshToken: '',
        isStoredTokenVerified: true,
        msg: '',
      };

      // Edit by user action
    case types.EDIT_ME:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        edited: true,
      };

    case types.INIT_ME:
      return {
        ...state,
        data: { ...INITIAL_DATA, ...state.user },
        edited: false,
      };

    case types.PUT_ME_REQUEST:
      return {
        ...state,
        isPuttingMe: true,
      };
    case types.PUT_ME_SUCCESS:
      return {
        ...state,
        isPuttingMe: false,
        edited: false,
        user: action.payload.user,
      };
    case types.PUT_ME_FAILURE:
      return {
        ...state,
        isPuttingMe: false,
      };

      
    // Put password change
    case types.PUT_PASSWORD_REQUEST:
      return {
        ...state,
        isPuttingPassword: true,
      };
    case types.PUT_PASSWORD_SUCCESS:
    case types.PUT_PASSWORD_FAILURE:
      return {
        ...state,
        isPuttingPassword: false,
      };

    // Logout
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        user_role: null,
        accessToken: '',
        refreshToken: '',
        msg: action.payload.msg,
      };

    // Resend verify email
    case types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        isPostingRequestResendVerificationEmail: true,
      };

    case types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_SUCCESS:
    case types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_FAILURE:
      return {
        ...state,
        isPostingRequestResendVerificationEmail: false,
      };

    // Verify email
    case types.POST_VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isPostingVerifyEmail: true,
      };

    case types.POST_VERIFY_EMAIL_SUCCESS:
    case types.POST_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isPostingVerifyEmail: false,
      };

    // Request pwd reset
    case types.POST_REQUEST_PWD_RESET_REQUEST:
      return {
        ...state,
        isPostingPwdResetRequest: true,
      };

    case types.POST_REQUEST_PWD_RESET_SUCCESS:
    case types.POST_REQUEST_PWD_RESET_FAILURE:
      return {
        ...state,
        isPostingPwdResetRequest: false,
      };

    // Verify pwd reset token
    case types.POST_VERIFY_PWD_RESET_TOKEN_REQUEST:
      return {
        ...state,
        isPostingVerifyPwdResetToken: true,
      };

    case types.POST_VERIFY_PWD_RESET_TOKEN_SUCCESS:
    case types.POST_VERIFY_PWD_RESET_TOKEN_FAILURE:
      return {
        ...state,
        isPostingVerifyPwdResetToken: false,
      };

    // Reset pwd
    case types.POST_PWD_RESET_REQUEST:
      return {
        ...state,
        isPostingPwdReset: true,
      };

    case types.POST_PWD_RESET_SUCCESS:
    case types.POST_PWD_RESET_FAILURE:
      return {
        ...state,
        isPostingPwdReset: false,
      };

    // Unsubscribe
    case types.POST_UNSUBSCRIBE_REQUEST:
      return {
        ...state,
        isPostingUnsubscribe: true,
      };

    case types.POST_UNSUBSCRIBE_SUCCESS:
    case types.POST_UNSUBSCRIBE_FAILURE:
      return {
        ...state,
        isPostingUnsubscribe: false,
      };

    // Initial state
    default:
      return state;
  }
};

export default authReducer;
