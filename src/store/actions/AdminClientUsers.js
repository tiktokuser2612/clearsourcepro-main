import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postAdminClientUser = data => (dispatch, getState) => {
  if (getState().rootReducer.adminClientUsers.isPosting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CLIENTS_USERS_POST_REQUEST });

  return api.admin.clients.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CLIENTS_USERS_POST_REQUEST,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENTS_USERS_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const editAdminClientUsers = data => {
  return {
    type: types.ADMIN_CLIENTS_USERS_EDIT,
    payload: data,
  };
};

export const initAdminClientUsers = () => {
  return {
    type: types.ADMIN_CLIENTS_USERS_INIT,
  };
};

export const getListAdminClients = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
  if (getState().rootReducer.adminClientUsers.isFetchingList) { return Promise.reject(); }

  let condition = {
    current,
    pageSize,
    filters,
    sorter,
    asc,
  };
  console.log('condition::', condition);

  dispatch({
    type: types.ADMIN_CLIENTS_GET_LIST_REQUEST,
    payload: condition,
  });

  return api.admin.clients.getList(condition)
    .then(data => {
      dispatch({
        type: types.ADMIN_CLIENTS_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENTS_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const getAdminClient = id => (dispatch, getState) => {
  if (getState().rootReducer.adminClientUsers.isFetching) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CLIENT_GET_REQUEST });

  return api.admin.clients.get(id)
    .then(res => {
      const msg = _get(res, 'msg', 'Get success!');
      const firm_name = _get(res.data, 'law_firm.firm_name', '');
      const firm_phone = _get(res.data, 'law_firm.firm_phone', '');
      const data = {...res.data, firm_name, firm_phone};
      const payload = { data, msg };

      dispatch({
        type: types.ADMIN_CLIENT_GET_SUCCESS,
        payload,
      });

      return res.data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENT_GET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};



export const putAdminClient = (id, data) => (dispatch, getState) => {
  if (getState().rootReducer.adminClientUsers.isPutting) { return Promise.reject(); }

  
  dispatch({ type: types.ADMIN_CLIENT_PUT_REQUEST });

  return api.admin.clients.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CLIENT_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENT_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const deleteClient = id => (dispatch, getState) => {
  if (getState().rootReducer.adminClientUsers.isDeleting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_CLIENT_DELETE_REQUEST });

  return api.admin.clients.delete(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Delete success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_CLIENT_DELETE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Delete Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_CLIENT_DELETE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};










