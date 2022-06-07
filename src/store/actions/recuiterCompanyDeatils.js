import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';

export const getRecruiterCompanyDetails = id => (dispatch, getState) => {
    
    // if (getState().rootReducer.recruiterCompanyDetail.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.RECRUITER_COMPANY_DETAILS_REQUEST });
    return api.recruiter.company.getCompanyDetails()
        .then(res => {
            const msg = _get(res, 'msg', 'Get success!');
        
            const data = {...res.data};
            const payload = { data, msg };
    
            dispatch({
                type: types.RECRUITER_COMPANY_DETAILS_SUCCESS,
                payload,
            });
    
            return res.data;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.RECRUITER_COMPANY_DETAILS_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
    };


