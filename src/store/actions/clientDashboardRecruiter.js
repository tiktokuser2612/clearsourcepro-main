import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';


export const getListClientDashboardRecuriters = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
    
    let condition = {
      current,
      pageSize,
      filters,
      sorter,
      asc,
    };
    
    dispatch({
      type: types.CLIENT_DASHBOARD_RECRUITER_GET_LIST_REQUEST,
      payload: condition,
    });
  
    return api.client.recruiters.getList(condition)
      .then(data => {
        dispatch({
          type: types.CLIENT_DASHBOARD_RECRUITER_GET_LIST_SUCCESS,
          payload: data,
        });
  
        return data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get List Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.CLIENT_DASHBOARD_RECRUITER_GET_LIST_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };
  

  export const editClientDashboardRecruiter = data => {
    return {
      type: types.CLIENT_DASHBOARD_RECRUITER_EDIT,
      payload: data,
    };
  };
  
  export const initClientDashboardRecruiter = () => {
    return {
      type: types.CLIENT_DASHBOARD_RECRUITER_INIT,
    };
  };

  

  export const getCompanyRecruiter = id => (dispatch, getState) => {
    if (getState().rootReducer.adminRecruiter.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.CLIENT_DASHBOARD_RECRUITER_GET_REQUEST });
  
    return api.client.recruiters.get(id)
      .then(res => {
        const msg = _get(res, 'msg', 'Get success!');
       
        const data = {...res.data};
        const payload = { data, msg };
  
        dispatch({
          type: types.CLIENT_DASHBOARD_RECRUITER_GET_SUCCESS,
          payload,
        });
  
        return res.data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.CLIENT_DASHBOARD_RECRUITER_GET_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
    };

  
export const putClientDashboardRecruiter = (id, data) => (dispatch, getState) => {
  
  dispatch({ type: types.CLIENT_DASHBOARD_RECRUITER_PUT_REQUEST });

  return api.client.recruiters.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const postClientDashboardRecruiter = data => (dispatch, getState) => {

  dispatch({ type: types.CLIENT_DASHBOARD_RECRUITER_POST_REQUEST });

  return api.client.recruiters.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const deleteClientRecruiter = id => (dispatch, getState) => {
  
  dispatch({ type: types.CLIENT_DASHBOARD_RECRUITER_DELETE_REQUEST});

  return api.client.recruiters.delete(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Delete success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_DELETE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Delete Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.CLIENT_DASHBOARD_RECRUITER_DELETE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
