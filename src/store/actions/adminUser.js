import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';



export const postAdminUser = data => (dispatch, getState) => {
    if (getState().rootReducer.adminUser.isPosting) { return Promise.reject(); }
    
    dispatch({ type: types.ADMIN_USER_POST_REQUEST });
  
    return api.admin.users.post(data)
        .then(data => {
            const msg = _get(data, 'msg', 'Post success!');
            const payload = { ...data, msg };
    
            dispatch({
              type: types.ADMIN_USER_POST_SUCCESS,
              payload,
            });
    
            return payload;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Post Failed!');            
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };

            dispatch({
              type: types.ADMIN_USER_POST_FAILURE,
              payload,
            });
    
            return Promise.reject(payload);
        });
};

export const initAdminUser = () => {
    return {
        type: types.ADMIN_USER_INIT,
    };
};

export const editAdminUser = data => {
    return {
        type: types.ADMIN_USER_EDIT,
        payload: data,
    };
};
// // Get a User
// export const getAdminUser = id => (dispatch, getState) => {
//   if (getState().rootReducer.adminUser.isFetching) { return Promise.reject(); }

//   dispatch({ type: types.ADMIN_USER_GET_REQUEST });

//   return api.admin.users.get(id)
//     .then(res => {
//       const msg = _get(res, 'msg', 'Get success!');

//       const data = {...res.data};
//       const payload = { data, msg };

//       dispatch({
//         type: types.ADMIN_CANDIDATE_GET_SUCCESS,
//         payload,
//       });

//       return res.data;
//     })
//     .catch(err => {
//       const msg = _get(err, 'response.data.msg', 'Get Failed!');
//       const errors = _get(err, 'response.data.errors', {});
//       const payload = { ...err, msg, errors };

//       dispatch({
//         type: types.ADMIN_CANDIDATE_GET_FAILURE,
//         payload,
//       });

//       return Promise.reject(payload);
//     });
// };  




//Get All Admin User
export const getAdminUsers = id => (dispatch, getState) => {
    if (getState().rootReducer.adminUser.isFetching) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_USER_GET_REQUEST });
  
    return api.admin.users.get(id)
      .then(res => {
        const msg = _get(res, 'msg', 'Get success!');
        
        let p_temp = {...getState().rootReducer.adminUser.permission}
        res.data.permissions.map(p => {
          p_temp[p.details.parent.permission][p.details.permission][p.permission] = p.status
        })

        const data = {...res.data, permission:p_temp};
        const payload = { data, msg };

        dispatch({
          type: types.ADMIN_USER_GET_SUCCESS,
          payload,
          p_temp
        });
  
        return res.data;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_USER_GET_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

// Get Recuriters User List
  export const getListUserRecuriters = (current = 1, pageSize = DEFAULT_PAGINATION_PER_PAGE, filters = [], sorter = null, asc = true) => (dispatch, getState) => {
    if (getState().rootReducer.adminUser.isFetchingList) { return Promise.reject(); }
  
    let condition = {
      current,
      pageSize,
      filters,
      sorter,
      asc,
    };
    
  
    dispatch({
      type: types.ADMIN_USER_GET_LIST_REQUEST,
      payload: condition,
    });
  
    return api.admin.users.getList(condition)
      .then(data => {
        dispatch({
          type: types.ADMIN_USER_GET_LIST_SUCCESS,
          payload: data,
        });
  
        return data;
      })
      .catch(err => {
        console.log("Action",err);
        const msg = _get(err, 'response.data.msg', 'Get List Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_USER_GET_LIST_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

// Delete a user
  export const deleteUser = id => (dispatch, getState) => {
    if (getState().rootReducer.adminUser.isDeleting) { return Promise.reject(); }
  
    dispatch({ type: types.ADMIN_USER_DELETE_REQUEST });
  
    return api.admin.users.delete(id)
      .then(data => {
        const msg = _get(data, 'msg', 'Delete success!');
        const payload = { ...data, msg };
  
        dispatch({
          type: types.ADMIN_USER_DELETE_SUCCESS,
          payload,
        });
  
        return payload;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Delete Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_USER_DELETE_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };

  // Put User
  export const putAdminUser = (id, data) => (dispatch, getState) => {
    if (getState().rootReducer.adminUser.isPutting) { return Promise.reject(); }
  
    
    dispatch({ type: types.ADMIN_USER_PUT_REQUEST });
  
    return api.admin.users.putUser(id, data)
      .then(data => {
        const msg = _get(data, 'msg', 'Put success!');
        const payload = { ...data, msg };
  
        dispatch({
          type: types.ADMIN_USER_PUT_SUCCESS,
          payload,
        });
  
        return payload;
      })
      .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Put Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };
  
        dispatch({
          type: types.ADMIN_USER_PUT_FAILURE,
          payload,
        });
  
        return Promise.reject(payload);
      });
  };