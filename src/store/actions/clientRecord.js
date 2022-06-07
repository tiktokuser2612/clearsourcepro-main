import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postClientRecord = (data) => (dispatch, getState) => {
    
    if (getState().rootReducer.clientRecord.isPosting) { return Promise.reject(); }

    dispatch({ type: types.ADMIN_CLIENT_RECORD_POST_REQUEST });

    return api.admin.client_records.post(data)
        .then(data => {
        const msg = _get(data, 'msg', 'Post success!');
        const payload = { ...data, msg };

        dispatch({
            type: types.ADMIN_CLIENT_RECORD_POST_SUCCESS,
            payload,
        });
      return payload;
    })
    .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Post Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };

        dispatch({
            type: types.ADMIN_CLIENT_RECORD_POST_FAILURE,
            payload,
        });

        return Promise.reject(payload);
    });
};

export const editClientRecord = data => {
    return {
        type: types.ADMIN_CLIENT_RECORD_EDIT,
        payload: data,
    };
};
  
export const initClientRecord = () => {
    return {
        type: types.ADMIN_CLIENT_RECORD_INIT,
    };
};
  

export const getClientRecordList = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
  
    if (getState().rootReducer.clientRecord.isFetchingList) { return Promise.reject(); }
  
    let condition = {
        current,
        pageSize,
        filters,
        sorter,
        asc,
    };
    
  
    dispatch({
        type: types.ADMIN_CLIENT_RECORD_GET_LIST_REQUEST,
        payload: condition,
    });
  
    return api.admin.client_records.getList(condition)
        .then(data => {
            dispatch({
            type: types.ADMIN_CLIENT_RECORD_GET_LIST_SUCCESS,
            payload: data,
            });
    
            return data;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get List Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.ADMIN_CLIENT_RECORD_GET_LIST_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
};

// Delete a user
export const deleteClientRecord = id => (dispatch, getState) => {
    if (getState().rootReducer.clientRecord.isDeleting) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_CLIENT_RECORD_DELETE_REQUEST });
  
    return api.admin.client_records.delete(id)
        .then(data => {
            const msg = _get(data, 'msg', 'Delete success!');
            const payload = { ...data, msg };
    
            dispatch({
                type: types.ADMIN_CLIENT_RECORD_DELETE_SUCCESS,
                payload,
            });
    
            return payload;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Delete Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
        dispatch({
          type: types.ADMIN_CLIENT_RECORD_DELETE_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
    });
};


export const getClientRecord = id => (dispatch, getState) => {
    if (getState().rootReducer.clientRecord.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_CLIENT_RECORD_GET_REQUEST });
  
    return api.admin.client_records.get(id)
        .then(res => {
            const msg = _get(res, 'msg', 'Get success!');
            const firm_name = _get(res.data, 'law_firm.firm_name', '');
            const firm_phone = _get(res.data, 'law_firm.firm_phone', '');
            const data = {...res.data, firm_name, firm_phone};
            const payload = { data, msg };
    
            dispatch({
            type: types.ADMIN_CLIENT_RECORD_GET_SUCCESS,
            payload,
            });
    
            return res.data;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.ADMIN_CLIENT_RECORD_GET_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
};

export const putClientRecord = (id, data) => (dispatch, getState) => {
    if (getState().rootReducer.clientRecord.isPutting) { return Promise.reject(); }
  

    dispatch({ type: types.ADMIN_CLIENT_RECORD_PUT_REQUEST });
    console.log("reducer_data",data);

    return api.admin.client_records.put(id, data)
        .then(data => {
            const msg = _get(data, 'msg', 'Put success!');
            const payload = { ...data, msg };
    
            dispatch({
                type: types.ADMIN_CLIENT_RECORD_PUT_SUCCESS,
                payload,
            });
    
            return payload;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Put Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.ADMIN_CLIENT_RECORD_PUT_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
  };