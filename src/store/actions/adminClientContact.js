import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postClientHiringManager = data => (dispatch, getState) => {
    if (getState().rootReducer.adminClientContact.isPosting) { return Promise.reject(); }

    dispatch({ type: types.ADMIN_CLIENT_CONTACT_POST_REQUEST });

    return api.admin.hiring_manager.createHiringManager(data)
    .then(data => {
        const msg = _get(data, 'msg', 'Post success!');
        const payload = { ...data, msg };

        dispatch({
            type: types.ADMIN_CLIENT_CONTACT_POST_SUCCESS,
            payload,
        });

        return payload;
    })
    .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Post Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };

        dispatch({
            type: types.ADMIN_CLIENT_CONTACT_POST_FAILURE,
            payload,
        });

        return Promise.reject(payload);
    });
};


export const editClientHiringManager = data => {
    return {
      type: types.ADMIN_CLIENT_CONTACT_EDIT,
      payload: data,
    };
};
  
export const initClientHiringManager = () => {
    return {
        type: types.ADMIN_CLIENT_CONTACT_INIT,
    };
};
  

export const getListClientHiringManagers = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
    
    if (getState().rootReducer.adminClientContact.isFetchingList) { return Promise.reject(); }
  
    let condition = {
      current,
      pageSize,
      filters,
      sorter,
      asc,
    };
    
    console.log('condition',condition); 

    dispatch({
        type: types.ADMIN_CLIENT_CONTACT_GET_LIST_REQUEST,
        payload: condition,
    });
  
    return api.admin.hiring_manager.getList(condition)
        .then(data => {
            dispatch({
            type: types.ADMIN_CLIENT_CONTACT_GET_LIST_SUCCESS,
            payload: data,
            });

            return data;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get List Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.ADMIN_CLIENT_CONTACT_GET_LIST_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
};
  

export const putClientContact = (id, data) => (dispatch, getState) => {
    if (getState().rootReducer.adminClientContact.isPutting) { return Promise.reject(); }
  
    
    dispatch({ type: types.ADMIN_CLIENT_CONTACT_PUT_REQUEST });
  
    return api.admin.hiring_manager.put(id, data)
      .then(data => {
        const msg = _get(data, 'msg', 'Put success!');
        const payload = { ...data, msg };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_PUT_SUCCESS,
          payload,
        });
  
        return payload;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Put Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_PUT_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
};
  
export const getClientHiringManager = id => (dispatch, getState) => {
    if (getState().rootReducer.adminClientContact.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_CLIENT_CONTACT_GET_REQUEST });
  
    return api.admin.hiring_manager.get(id)
      .then(res => {
        const msg = _get(res, 'msg', 'Get success!');
        const data = {...res.data
        };
        const payload = { data, msg };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_GET_SUCCESS,
          payload,
        });
  
        return res.data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_GET_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
};
  
  
export const deleteHiringManager = id => (dispatch, getState) => {
    if (getState().rootReducer.adminClientContact.isDeleting) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_CLIENT_CONTACT_DELETE_REQUEST });
  
    return api.admin.hiring_manager.delete(id)
      .then(data => {
        const msg = _get(data, 'msg', 'Delete success!');
        const payload = { ...data, msg };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_DELETE_SUCCESS,
          payload,
        });
  
        return payload;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Delete Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_CLIENT_CONTACT_DELETE_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
};
  