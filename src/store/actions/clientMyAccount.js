import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';
import { DEFAULT_PAGINATION_PER_PAGE } from '../../constants';



    export const getClientData = id => (dispatch, getState) => {
        if (getState().rootReducer.clientMyAccount.isFetchingList) { return Promise.reject(); }
    
        dispatch({ type: types.CLIENT_GET_REQUEST });
    
        return api.client.client_details.get(id)
        .then(data => {
            const msg = _get(data, 'msg', 'Get success!');
            const payload = { ...data, msg };
    
            dispatch({
                type: types.CLIENT_GET_SUCCESS,
                payload,
            });
    
            return payload;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Get Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
                type: types.CLIENT_GET_FAILURE,
                payload,
            });
    
            return Promise.reject(payload);
        });
    };
  
    export const editClientData = data => {

        return {
            type: types.CLIENT_MYACCOUNT_EDIT,
            payload: data,
        };
    };

    export const initMe = () => {
        return {
            type: types.CLIENT_MYACCOUNT_INIT_ME,
        };
    };


    export const putClientData = (id, data) => (dispatch, getState) => {
        if (getState().rootReducer.clientMyAccount.isPutting) { return Promise.reject(); }
        
        console.log('account_data_action',data);
        
        dispatch({ type: types.CLIENT_MYACCOUNT_PUT_REQUEST });
    
        return api.client.client_details.put(id, data)
        .then(data => {
            const msg = _get(data, 'msg', 'Put success!');
            const payload = { ...data, msg };
    
            dispatch({
            type: types.CLIENT_MYACCOUNT_PUT_SUCCESS,
            payload,
            });
    
            return payload;
        })
        .catch(err => {
            const msg = _get(err, 'response.data.msg', 'Put Failed!');
            const errors = _get(err, 'response.data.errors', {});
            const payload = { ...err, msg, errors };
    
            dispatch({
            type: types.CLIENT_MYACCOUNT_PUT_FAILURE,
            payload,
            });
    
            return Promise.reject(payload);
        });
    };