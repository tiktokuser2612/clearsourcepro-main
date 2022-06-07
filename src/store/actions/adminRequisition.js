import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';

export const postAdminRequisition = data => (dispatch, getState) => {
  if (getState().rootReducer.adminRequisition.isPosting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_REQUISITION_POST_REQUEST });

  return api.admin.requisitions.post(data)
    .then(data => {
      const msg = _get(data, 'msg', 'Post success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_REQUISITION_POST_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Post Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_REQUISITION_POST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const editAdminRequisition = data => {
  return {
    type: types.ADMIN_REQUISITION_EDIT,
    payload: data,
  };
};

export const initAdminRequisition = () => {
  return {
    type: types.ADMIN_REQUISITION_INIT,
  };
};

export const getListAdminRequisitions = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
  if (getState().rootReducer.adminRequisition.isFetchingList) { return Promise.reject(); }

  let condition = {
    current,
    pageSize,
    filters,
    sorter,
    asc,
  };
  

  dispatch({
    type: types.ADMIN_REQUISITION_GET_LIST_REQUEST,
    payload: condition,
  });

  return api.admin.requisitions.getList(condition)
    .then(data => {
      dispatch({
        type: types.ADMIN_REQUISITION_GET_LIST_SUCCESS,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_REQUISITION_GET_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

// export const getListClients = () => (dispatch, getState) => {
//   if (getState().rootReducer.adminRequisition.isFetchingList) { return Promise.reject(); }

//   // let condition = {
//   //   current,
//   //   pageSize,
//   //   filters,
//   //   sorter,
//   //   asc,
//   // };
  

//   dispatch({
//     type: types.CLIENT_GET_LIST_REQUEST,
//     // payload: condition,
//   });

//   return api.admin.requisitions.getListClients()
//     .then(data => {
//       dispatch({
//         type: types.CLIENT_GET_LIST_SUCCESS,
//         payload: data,
//       });

//       return data;
//     })
//     .catch(err => {
//       const msg = _get(err, 'response.data.msg', 'Get List Failed!');
//       const errors = _get(err, 'response.data.errors', {});
//       const payload = { ...err, msg, errors };

//       dispatch({
//         type: types.CLIENT_GET_LIST_FAILURE,
//         payload,
//       });

//       return Promise.reject(payload);
//     });
// };




export const deleteRequisition = id => (dispatch, getState) => {
  if (getState().rootReducer.adminRequisition.isDeleting) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_REQUISITION_DELETE_REQUEST });

  return api.admin.requisitions.delete(id)
    .then(data => {
      const msg = _get(data, 'msg', 'Delete success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_REQUISITION_DELETE_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Delete Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_REQUISITION_DELETE_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const getRequisition = id => (dispatch, getState) => {
  if (getState().rootReducer.adminRequisition.isFetching) { return Promise.reject(); }

  dispatch({ type: types.ADMIN_REQUISITION_GET_REQUEST });

  return api.admin.requisitions.get(id)
    .then(res => {
      const msg = _get(res, 'msg', 'Get success!');
      const data = {...res.data};
      const payload = { data, msg };

      dispatch({
        type: types.ADMIN_REQUISITION_GET_SUCCESS,
        payload,
      });

      return res.data;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_REQUISITION_GET_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const putAdminRequisition = (id, data) => (dispatch, getState) => {
  if (getState().rootReducer.adminRequisition.isPutting) { return Promise.reject(); }

  
  dispatch({ type: types.ADMIN_REQUISITION_PUT_REQUEST });

  return api.admin.requisitions.put(id, data)
    .then(data => {
      const msg = _get(data, 'msg', 'Put success!');
      const payload = { ...data, msg };

      dispatch({
        type: types.ADMIN_REQUISITION_PUT_SUCCESS,
        payload,
      });

      return payload;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Put Failed!');
      const errors = _get(err, 'response.data.errors', {});
      const payload = { ...err, msg, errors };

      dispatch({
        type: types.ADMIN_REQUISITION_PUT_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};
