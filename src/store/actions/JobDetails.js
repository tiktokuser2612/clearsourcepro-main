import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';


export const getJobDetail = id => (dispatch, getState) => {
    if (getState().rootReducer.jobDetails.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.JOB_DETAIL_GET_REQUEST });
  
    return api.job_details.get(id)
        .then(res => {
            const msg = _get(res, 'msg', 'Get success!');
            const firm_name = _get(res.data, 'law_firm.firm_name', '');
            const firm_phone = _get(res.data, 'law_firm.firm_phone', '');
            const data = {...res.data, firm_name, firm_phone};
            const payload = { data, msg };
    
            dispatch({
            type: types.JOB_DETAIL_GET_SUCCESS,
            payload,
            });
    
            return res.data;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.JOB_DETAIL_GET_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
};

export const getJobDetailsSearchList = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
    if (getState().rootReducer.jobDetails.isFetchingList) { return Promise.reject(); }
    
    let condition = {
      current,
      pageSize,
      filters,
      sorter,
      asc,
    };
    
    dispatch({
      type: types.JOB_DETAIL_SEARCH_GET_LIST_REQUEST,
      payload: condition,
    });
  
    return api.admin.jobSearchs.getList(condition)
        .then(data => {
            dispatch({
                type: types.JOB_DETAIL_SEARCH_GET_LIST_SUCCESS,
                payload: data,
            });
            
            return data;
        })
        .catch(err => {

            console.log('job');
            const msg = _get(err, 'response.data.msg', 'Get List Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
                type: types.JOB_DETAIL_SEARCH_GET_LIST_FAILURE,
                payload,
            });
    
            return Promise.reject(payload);
        });
    };

  