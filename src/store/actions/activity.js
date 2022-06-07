import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';


export const editNotes = data => {
  return {
    type: types.ACTIVITY_EDIT,
    payload: data,
  };
};

export const initNotes = () => {
  return {
    type: types.ACTIVITY_INIT,
  };
};

export const getActivitiesList = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
  if (getState().rootReducer.notes.isFetchingList) { return Promise.reject(); }

  let condition = {
    current,
    pageSize,
    filters,
    sorter,
    asc,
  };
  
  dispatch({
    type: types.ACTIVITY_GET_LIST_REQUEST,
    payload: condition,
  });

  return api.admin.activities.getList(condition)
    .then(data => {
      dispatch({
        type: types.ACTIVITY_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ACTIVITY_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};



