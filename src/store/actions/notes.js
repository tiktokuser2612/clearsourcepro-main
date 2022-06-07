import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postNotes = data => (dispatch, getState) => {
  if (getState().rootReducer.notes.isPosting) { return Promise.reject(); }

  dispatch({ type: types.NOTES_POST_REQUEST });

  return api.admin.notes.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.NOTES_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.NOTES_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const editNotes = data => {
  return {
    type: types.NOTES_EDIT,
    payload: data,
  };
};

export const initNotes = () => {
  return {
    type: types.NOTES_INIT,
  };
};

export const getNotesList = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, dsc= true) => (dispatch, getState) => {
  if (getState().rootReducer.notes.isFetchingList) { return Promise.reject(); }

  let condition = {
    current,
    pageSize,
    filters,
    sorter,
    dsc,
  };
  
  dispatch({
    type: types.NOTES_GET_LIST_REQUEST,
    payload: condition,
  });

  return api.admin.notes.getList(condition)
    .then(data => {
      dispatch({
        type: types.NOTES_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.NOTES_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};


export const getNote = id => (dispatch, getState) => {
  if (getState().rootReducer.notes.isFetching) { return Promise.reject(); }

  dispatch({ type: types.NOTES_GET_REQUEST });

  return api.admin.notes.get(id)
    .then(res => {
      const msg = _get(res, 'msg', 'Get success!');
      const firm_name = _get(res.data, 'law_firm.firm_name', '');
      const firm_phone = _get(res.data, 'law_firm.firm_phone', '');
      const data = {...res.data, firm_name, firm_phone};
      const payload = { data, msg };

      dispatch({
        type: types.NOTES_GET_SUCCESS,
        payload,
      });

      return res.data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.NOTES_GET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const putNotes = (id, data) => (dispatch, getState) => {
  if (getState().rootReducer.notes.isPutting) { return Promise.reject(); }
  
  dispatch({ type: types.NOTES_PUT_REQUEST });

  return api.admin.notes.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.NOTES_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.NOTES_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
