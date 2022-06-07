import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postRecruiterRequisition = data => (dispatch, getState) => {
  if (getState().rootReducer.recruiterRequisition.isPosting) { return Promise.reject(); }

  dispatch({ type: types.RECRUITER_REQUISITION_POST_REQUEST });

  return api.recruiter.requisitions.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.RECRUITER_REQUISITION_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.RECRUITER_REQUISITION_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const editRecruiterRequisition = data => {
    return {
      type: types.RECRUITER_REQUISITION_EDIT,
      payload: data,
    };
  };
  
  export const initRecruiterRequisition = () => {
    return {
      type: types.RECRUITER_REQUISITION_INIT,
    };
  };
  
  export const getListRecruiterRequisitions = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
    if (getState().rootReducer.recruiterRequisition.isFetchingList) { return Promise.reject(); }
  
    let condition = {
      current,
      pageSize,
      filters,
      sorter,
      asc,
    };
    
  
    dispatch({
      type: types.RECRUITER_REQUISITION_GET_LIST_REQUEST,
      payload: condition,
    });
  
    return api.recruiter.requisitions.getList(condition)
      .then(data => {
        dispatch({
          type: types.RECRUITER_REQUISITION_GET_LIST_SUCCESS,
          payload: data,
        });
  
        return data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get List Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.RECRUITER_REQUISITION_GET_LIST_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

  export const getRecruiterRequisition = id => (dispatch, getState) => {
    if (getState().rootReducer.recruiterRequisition.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.RECRUITER_REQUISITION_GET_REQUEST });
  
    return api.recruiter.requisitions.get(id)
      .then(res => {
        const msg = _get(res, 'msg', 'Get success!');
        const data = {...res.data};
        const payload = { data, msg };
  
        dispatch({
          type: types.RECRUITER_REQUISITION_GET_SUCCESS,
          payload,
        });
  
        return res.data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.RECRUITER_REQUISITION_GET_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

  export const putRecruiterRequisition = (id, data) => (dispatch, getState) => {
    if (getState().rootReducer.recruiterRequisition.isPutting) { return Promise.reject(); }
  
    
    dispatch({ type: types.RECRUITER_REQUISITION_PUT_REQUEST });
  
    return api.recruiter.requisitions.put(id, data)
      .then(data => {
        const msg = _get(data, 'msg', 'Put success!');
        const payload = { ...data, msg };
  
        dispatch({
          type: types.RECRUITER_REQUISITION_PUT_SUCCESS,
          payload,
        });
  
        return payload;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Put Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.RECRUITER_REQUISITION_PUT_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

  