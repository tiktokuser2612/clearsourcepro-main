import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';

export const initApplyJob = () => {
    return {
      type: types.APPLY_JOB_INIT,
    };
  };
  

export const editApplyJob = data => {
  
  // const wholeArr = new Array();
  
  // wholeArr.push(data); 

  // console.log('action_data',wholeArr);
  
  return {
        type: types.APPLY_JOB_EDIT,
        payload: data,
    };
};


export const postJobApply = data => (dispatch, getState) => {
  if (getState().rootReducer.applyJob.isPosting) { return Promise.reject(); }

  dispatch({ type: types.APPLY_JOB_POST_REQUEST });

  return api.job_submit.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.APPLY_JOB_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.APPLY_JOB_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

