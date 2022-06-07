import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';

import setApiAuthHeader from 'utils/setApiAuthenticationHeader';
import notifier from 'utils/notifier';

export const signup = data => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingSignup) { return Promise.reject(); }

  dispatch({ type: types.SIGNUP_REQUEST });

  return api.auth.signup(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Signup success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Signup failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.SIGNUP_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const login = credentials => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingLogin) { return Promise.reject(); }

  dispatch({ type: types.LOGIN_REQUEST });

  return api.auth.login(credentials)
    .then(data => {
      const msg = _get(data, 'msg', 'Login success!');
      let payload = { ...data, msg };
      
      if (!payload.accessToken || !payload.refreshToken) {
        return Promise.reject(payload);
      } else {
        localStorage.accessToken = payload.accessToken;
        localStorage.refreshToken = payload.refreshToken;
        setApiAuthHeader(payload.accessToken);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload,
        });

        return payload;
      }
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Login failed!');
      const payload = { ...err, msg };
      console.log("payload | login error::",payload);
      
      dispatch({
        type: types.LOGIN_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
//Change password
export const changePassword = password => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPuttingPassword) { return Promise.reject(); }

  dispatch({ type: types.PUT_PASSWORD_REQUEST });

  return api.auth.changePassword(password)
    .then(data => {
      const msg = _get(data, 'msg', 'Update success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.PUT_PASSWORD_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Update Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.PUT_PASSWORD_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const loginWithStoredToken = () => (dispatch) => {
  if (localStorage.accessToken && localStorage.refreshToken) {
    setApiAuthHeader(localStorage.accessToken);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: {
        accessToken: localStorage.accessToken,
        refreshToken: localStorage.refreshToken,
      },
    });

    dispatch(getMe());

  } else {
    localStorage.clear();
    dispatch({ type: types.GET_ME_FAILURE });
  }
};

export const getMe = () => (dispatch, getState) => {
  if (getState().rootReducer.auth.isFetchingMe) { return Promise.reject(); }

  dispatch({ type: types.GET_ME_REQUEST });

  return api.auth.getMe()
    .then(data => {
      localStorage.user = JSON.stringify(data);

      dispatch({
        type: types.GET_ME_SUCCESS,
        payload: { user: data },
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.GET_ME_FAILURE,
        payload,
      });

      localStorage.clear();
      setApiAuthHeader();

      return Promise.reject(payload);
    });
};

export const logout = () => dispatch => {
  api.auth.logout();

  localStorage.clear();
  setApiAuthHeader();

  dispatch({
    type: types.LOGOUT_SUCCESS,
    payload: {
      msg: 'Logout success!',
    },
  });

  notifier.success('You have been logged out.');

  window.location.href = '/';
};

export const requestResendVerificationEmail = email => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingRequestResendVerificationEmail) { return Promise.reject(); }

  dispatch({ type: types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_REQUEST });

  return api.auth.requestVerificationEmail(email)
    .then(data => {
      const msg = _get(data, 'msg', 'Request success!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Request failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_REQUEST_RESEND_VERIFICATION_EMAIL_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const verifyEmail = code => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingVerifyEmail) { return Promise.reject(); }

  dispatch({ type: types.POST_VERIFY_EMAIL_REQUEST });

  return api.auth.verifyEmail(code)
    .then(data => {
      const msg = _get(data, 'msg', 'Email verified successfully!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_VERIFY_EMAIL_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Email verification failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_VERIFY_EMAIL_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const requestPwdReset = email => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingPwdResetRequest) { return Promise.reject(); }

  dispatch({ type: types.POST_REQUEST_PWD_RESET_REQUEST });

  return api.auth.requestPwdReset(email)
    .then(data => {
      const msg = _get(data, 'msg', 'Request success!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_REQUEST_PWD_RESET_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Request failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_REQUEST_PWD_RESET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const verifyPwdResetToken = token => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingVerifyPwdResetToken) { return Promise.reject(); }

  dispatch({ type: types.POST_VERIFY_PWD_RESET_TOKEN_REQUEST });

  return api.auth.verifyPwdResetToken(token)
    .then(data => {
      const msg = _get(data, 'msg', 'Token verification success!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_VERIFY_PWD_RESET_TOKEN_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Token invalid!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_VERIFY_PWD_RESET_TOKEN_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const resetPwd = (token, password) => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingPwdReset) { return Promise.reject(); }

  dispatch({ type: types.POST_PWD_RESET_REQUEST });

  return api.auth.resetPwd(token, password)
    .then(data => {
      const msg = _get(data, 'msg', 'Password changed!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_PWD_RESET_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Password change failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_PWD_RESET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
export const editMe = data => {
  return {
    type: types.EDIT_ME,
    payload: data,
  };
};

export const initMe = () => {
  return {
    type: types.INIT_ME,
  };
};

export const putMe = data => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPuttingMe) { return Promise.reject(); }

  dispatch({ type: types.PUT_ME_REQUEST });

  return api.auth.putMe(data)
    .then(res => {
      const msg = _get(res, 'msg', 'Update success!');
      const user = { ...res.user};
      const payload = { user, msg };

      dispatch({
        type: types.PUT_ME_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Update Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.PUT_ME_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const unsubscribe = (unsubscribeCode, unsubscribeEmail) => (dispatch, getState) => {
  if (getState().rootReducer.auth.isPostingUnsubscribe) { return Promise.reject(); }

  dispatch({ type: types.POST_UNSUBSCRIBE_REQUEST });

  return api.auth.unsubscribe(unsubscribeCode, unsubscribeEmail)
    .then(data => {
      const msg = _get(data, 'msg', 'Unsubscribe success!');
      let payload = { ...data, msg };

      dispatch({
        type: types.POST_UNSUBSCRIBE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Unsubscribe failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.POST_UNSUBSCRIBE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
