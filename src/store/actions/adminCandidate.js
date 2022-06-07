import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postAdminCandidate = data => (dispatch, getState) => {
  if (getState().rootReducer.adminCandidate.isPosting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CANDIDATE_POST_REQUEST });

  return api.admin.candidates.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CANDIDATE_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CANDIDATE_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const editAdminCandidate = data => {
  return {
    type: types.ADMIN_CANDIDATE_EDIT,
    payload: data,
  };
};

export const initAdminCandidate = () => {
  return {
    type: types.ADMIN_CANDIDATE_INIT,
  };
};

export const getListAdminCandidates = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
  if (getState().rootReducer.adminCandidate.isFetchingList) { return Promise.reject(); }

  let condition = {
    current,
    pageSize,
    filters,
    sorter,
    asc,
  };
  

  dispatch({
    type: types.ADMIN_CANDIDATE_GET_LIST_REQUEST,
    payload: condition,
  });

  return api.admin.candidates.getList(condition)
    .then(data => {
      dispatch({
        type: types.ADMIN_CANDIDATE_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CANDIDATE_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const deleteCandidate = id => (dispatch, getState) => {
  if (getState().rootReducer.adminCandidate.isDeleting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CANDIDATE_DELETE_REQUEST });

  return api.admin.candidates.delete(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Delete success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CANDIDATE_DELETE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Delete Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENT_CANDIDATE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const getCandidate = id => (dispatch, getState) => {
  if (getState().rootReducer.adminCandidate.isFetching) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CANDIDATE_GET_REQUEST });

  return api.admin.candidates.get(id)
    .then(res => {
      const msg = _get(res, 'msg', 'Get success!');
      const firm_name = _get(res.data, 'law_firm.firm_name', '');
      const firm_phone = _get(res.data, 'law_firm.firm_phone', '');
      const data = {...res.data, firm_name, firm_phone};
      const payload = { data, msg };

      dispatch({
        type: types.ADMIN_CANDIDATE_GET_SUCCESS,
        payload,
      });

      return res.data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CANDIDATE_GET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const putAdminCandidate = (id, data) => (dispatch, getState) => {
  if (getState().rootReducer.adminCandidate.isPutting) { return Promise.reject(); }

  
  dispatch({ type: types.ADMIN_CANDIDATE_PUT_REQUEST });

  return api.admin.candidates.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CANDIDATE_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CANDIDATE_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


