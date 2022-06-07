import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';


export const getClientUserAccount = id => (dispatch, getState) => {
    // if (getState().rootReducer.clientMyAccount.isFetchingList) { return Promise.reject(); }

    
    dispatch({ type: types.CLIENT_USER_ACCOUNT_GET_REQUEST });

    return api.client.client_user_details.get(id)
    .then(data => {
        const msg = _get(data, 'msg', 'Get success!');
        const payload = { ...data, msg };

        dispatch({
            type: types.CLIENT_USER_ACCOUNT_GET_SUCCESS,
            payload,
        });

        return payload;
    })
    .catch(err => {
        const msg = _get(err, 'response.data.msg', 'Get Failed!');
        const errors = _get(err, 'response.data.errors', {});
        const payload = { ...err, msg, errors };

        dispatch({
            type: types.CLIENT_USER_ACCOUNT_GET_FAILURE,
            payload,
        });

        return Promise.reject(payload);
    });
};

export const editClientUserAccount = data => {

    return {
        type: types.CLIENT_USER_ACCOUNT_EDIT,
        payload: data,
    };
};

export const initClientUserAccount = () => {
    return {
        type: types.CLIENT_USER_ACCOUNT_INIT_ME,
    };
};


export const putClientUserAccount = ( data) => (dispatch, getState) => {
    // if (getState().rootReducer.adminRequisition.isPutting) { return Promise.reject(); }
  
    
    dispatch({ type: types.ADMIN_REQUISITION_PUT_REQUEST });
  
    return api.client.submit_details.post(data)
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