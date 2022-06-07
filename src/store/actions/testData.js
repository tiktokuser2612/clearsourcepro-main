import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';

export const postTestData = data => (dispatch, getState) => {
  if (getState().rootReducer.testData.isPosting) { return Promise.reject(); }

  dispatch({ type: types.TEST_DATA_POST_REQUEST });

  return api.testData.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.TEST_DATA_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.TEST_DATA_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const getTestData = id => (dispatch, getState) => {
  if (getState().rootReducer.testData.isFetching) { return Promise.reject(); }

  dispatch({ type: types.TEST_DATA_GET_REQUEST });

  return api.testData.get(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Get success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.TEST_DATA_GET_SUCCESS,
        payload,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.TEST_DATA_GET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const getListTestData = (current, pageSize, filters, sorter) => (dispatch, getState) => {
  if (getState().rootReducer.testData.isFetchingList) { return Promise.reject(); }

  dispatch({
    type: types.TEST_DATA_GET_LIST_REQUEST,
    payload: {
      current,
      pageSize,
      filters,
      sorter,
    },
  });

  return api.testData.getList(current, pageSize, filters, sorter)
    .then(data => {
      dispatch({
        type: types.TEST_DATA_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.TEST_DATA_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const editTestData = data => {
  return {
    type: types.TEST_DATA_EDIT,
    payload: data,
  };
};

export const initTestData = () => {
  return {
    type: types.TEST_DATA_INIT,
  };
};

export const putTestData = (id, data) => (dispatch, getState) => {
  if (getState().rootReducer.testData.isPutting) { return Promise.reject(); }

  dispatch({ type: types.TEST_DATA_PUT_REQUEST });

  return api.testData.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.TEST_DATA_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.TEST_DATA_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const deleteTestData = id => (dispatch, getState) => {
  if (getState().rootReducer.testData.isDeleting) { return Promise.reject(); }

  dispatch({ type: types.TEST_DATA_DELETE_REQUEST });

  return api.testData.delete(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Delete success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.TEST_DATA_DELETE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Delete Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.TEST_DATA_DELETE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
