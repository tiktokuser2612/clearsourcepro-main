import axios from 'axios';
import _get from 'lodash/get';

import { API_SERVER, USE_FAKE_API } from './index';
import { FAKE_API } from './fakeApi';

import { setApiAuthenticationHeader } from 'utils/setApiAuthenticationHeader';
import store from 'store/index.js';
import types from 'store/types';

// Create instance
const axiosInstance = axios.create();

// Configure axios instances
axios.defaults.baseURL = API_SERVER;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.defaults.baseURL = API_SERVER;
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

// Axios wrapper to handle error
const axiosWrapper = apiCall => apiCall.then(res => res.data).catch(err => Promise.reject(err));

// axios interceptors to handle token expiration
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.config
      && error.response
      && error.response.status === 401
    ) {
      // access token expired, get new one
      const refreshToken = store.getState().rootReducer.auth.refreshToken;

      if (refreshToken) {
        return axios.post('/auth/refresh', { refreshToken: refreshToken })
          .then(response => {
            const accessTokenNew = _get(response, 'data.accessToken', '');
            const refreshTokenNew = _get(response, 'data.refreshToken', '');

            debugger;

            if (accessTokenNew && refreshTokenNew) {
              error.config.headers.common = {
                ...error.config.headers.common,
                authorization: `Bearer ${accessTokenNew}`,
              };
              error.config.headers.authorization = `Bearer ${accessTokenNew}`;
              setApiAuthenticationHeader(accessTokenNew);
              localStorage.accessToken = accessTokenNew;
              localStorage.refreshToken = refreshTokenNew;

              store.dispatch({
                type: types.LOGIN_SUCCESS,
                payload: {
                  accessToken: accessTokenNew,
                  refreshToken: refreshTokenNew,
                },
              });

              return axiosInstance.request(error.config);
            } else {
              return Promise.reject(Error('Can not get access token'));
            }
          });
      }
    }

    return Promise.reject(error);
  },
);

// Define API calls
let api = {
  isFakeApi: false,
  // Authentication APIs
  auth: {
    signup: (data) => axiosWrapper(axiosInstance.post('/auth/signup', data)),
    login: (credentials) => axiosWrapper(axios.post('/auth/login', credentials)),
    logout: () => axiosWrapper(axiosInstance.post('/auth/logout')),
    getMe: () => axiosWrapper(axiosInstance.get('/auth/me')),
    putMe: (data) => axiosWrapper(axiosInstance.post('/auth/me', data)),
    
    requestVerificationEmail: (email) => axiosWrapper(axiosInstance.post('/auth/resend-verification-email', { email })),
    verifyEmail: code => axiosWrapper(axiosInstance.post(`/auth/verify-email/${code}`)),
    requestPwdReset: email => axiosWrapper(axiosInstance.post('/auth/request-password-reset', { email })),
    verifyPwdResetToken: token => axiosWrapper(axiosInstance.post('/auth/verify-password-reset-token', { token })),
    resetPwd: (token, password) => axiosWrapper(axiosInstance.post('/auth/reset-password', { token, password })),
    unsubscribe: (unsubscribeCode, unsubscribeEmail) => axiosWrapper(axiosInstance.post('/unsubscribe', {
      unsubscribeCode,
      unsubscribeEmail,
    })),
    changePassword: (password) => axiosWrapper(axiosInstance.put('/auth/password', { password })),
  },
  public:{
    zipcode: zipcode => axiosWrapper(axios.get('/zipcode/search', { params: { zipcode } })),
    getRecruitersList: recruitersList => axiosWrapper(axios.get('/user/recruiters-list' )),
    getPermissionList: permissionList => axiosWrapper(axios.get('/permission/permission-list' )),
    
  },

  testData: {
    post: data => axiosWrapper(axiosInstance.post('/test-data', data)),
    get: id => axiosWrapper(axiosInstance.get('/test-data/' + id)),
    getList: (current, pageSize, filters, sorter) => axiosWrapper(axiosInstance.get('/test-data', {
      params: {
        current,
        pageSize,
        filters,
        sorter,
      },
    })),
    put: (id, data) => axiosWrapper(axiosInstance.put('/test-data/' + id, data)),
    delete: id => axiosWrapper(axiosInstance.delete('/test-data/' + id)),
  },

  admin: {
    clients: {
      post: data => axiosWrapper(axiosInstance.post('admin/client', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/client/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/clients', condition)),
      // search: (condition) => axiosWrapper(axiosInstance.post('admin/users/search', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.put(`admin/client/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/client/${id}`)),
      getListCompanies: data => axiosWrapper(axiosInstance.get('admin/client/company/list')),
      // password: (id, password, send_email) => axiosWrapper(axiosInstance.put(`/admin/users/${id}/password`, {
      //   password,
      //   send_email,
      // })),
    },

    recruiters: {
      post: data => axiosWrapper(axiosInstance.post('admin/recruiter', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/recruiter/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/recruiters/list', condition)),
      // search: (condition) => axiosWrapper(axiosInstance.post('admin/users/search', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`admin/recruiter/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/recruiter/${id}`)),
      
    },
    requisitions: {
      post: data => axiosWrapper(axiosInstance.post('admin/requisition', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/requisition/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/requisitions/list', condition)),
      getListClients: data => axiosWrapper(axiosInstance.get('admin/requisitions/client/list')),
      put: (id, data) => axiosWrapper(axiosInstance.post(`admin/requisition/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/requisition/${id}`)),
      
    },
    candidates: {
      post: data => axiosWrapper(axiosInstance.post('admin/candidate', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/candidate/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/candidates/list', condition)),
      
      put: (id, data) => axiosWrapper(axiosInstance.post(`admin/candidate/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/candidate/${id}`)),
      
    },

    users: {
      post: data => axiosWrapper(axiosInstance.post('admin/user', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/user/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/users/list', condition)),
      
      put: (id, data) => axiosWrapper(axiosInstance.put(`admin/candidate/${id}`, data)),
      putUser: (id, data) => axiosWrapper(axiosInstance.put(`admin/user/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/candidate/${id}`)),
      
    },
    

    notes: {
      post: data => axiosWrapper(axiosInstance.post('admin/note', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/note/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/notes/list', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.put(`admin/note/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/candidate/${id}`)),
    },


    client_records: {
      post: data => axiosWrapper(axiosInstance.post('admin/client_record', data)),
      get: id => axiosWrapper(axiosInstance.get(`admin/client_record/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/client_records/list', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`admin/client_record/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/client_record/${id}`)),
    },

    activities: {
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/activities/list', condition)),
    },

    jobSearchs : {
      getList: (condition) => axiosWrapper(axiosInstance.post('admin/job/search', condition)),
    },
    hiring_manager : {
      createHiringManager: (data) => axiosWrapper(axiosInstance.post('admin/client/hiringManger', data)),
      getList : (condition) => axiosWrapper(axiosInstance.post('admin/client/hiringManagers', condition)),
      get: id => axiosWrapper(axiosInstance.get(`admin/client/hiringManager/${id}`)),
      put: (id, data) => axiosWrapper(axiosInstance.put(`admin/client/hiringManager/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`admin/client/hiringManager/${id}`)),
    },

    sendMail : {
      mail: (data) => axiosWrapper(axiosInstance.post('admin/sendmail', data)),
    },

    getClients: {
      get: id => axiosWrapper(axiosInstance.get(`admin/clients`)),
    },

    clientRecruiters : {
      getList: id => axiosWrapper(axiosInstance.get(`admin/client/recruiters/list`)),
    },
    accountExecutive : {
      getList: () => axiosWrapper(axiosInstance.get(`admin/executive/list`)),
    },
    getCompanyHiringManager : {
      getList: (data) => axiosWrapper(axiosInstance.post(`admin/company/managers`, data)),
    },
    postActiveInactiveStatus: {
      post: (data, id) => axiosWrapper(axiosInstance.post(`admin/user/status/${id}`, data)),
    },
    
  },

  client : {
    client_details: {
      
      get: id => axiosWrapper(axiosInstance.get(`client/account/view/${id}`)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`client/account/edit/${id}`, data)),
    },
    requisitions : {
      getList: (condition) => axiosWrapper(axiosInstance.post('client/requisitions/list', condition)),
      getCompanyRequisitionList: (condition) => axiosWrapper(axiosInstance.post('client/company/requisitions/list', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`client/requisition/edit/${id}`, data)),
      get: id => axiosWrapper(axiosInstance.get(`client/requisition/view/${id}`)),
      delete: id => axiosWrapper(axiosInstance.delete(`client/requisition/${id}`)),
      post: data => axiosWrapper(axiosInstance.post('client/requisition/create', data)),  
    },
    
    clientRecruiters :{
      get: id => axiosWrapper(axiosInstance.get(`client/recruiter/${id}`)),
    },
    getCompanyHiringManager : {
      getList: (data) => axiosWrapper(axiosInstance.post(`client/company/managers`, data)),
    },
    client_user_details : {
      get: id => axiosWrapper(axiosInstance.get(`client/user/account/${id}`)),
    },
    submit_details : {
      post: (data) => axiosWrapper(axiosInstance.post(`client/user/account/` , data)  ),
    },
    recruiters : {
      getList: (data) => axiosWrapper(axiosInstance.post(`client/recruiters`, data)),
      get: id => axiosWrapper(axiosInstance.get(`client/recruiter/${id}`)),
      post : (data) => axiosWrapper(axiosInstance.post('client/recruiter/create', data)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`client/recruiter/edit/${id}`, data)),
      delete: id => axiosWrapper(axiosInstance.delete(`client/recruiter/${id}`)),
    },
    getHiringManagers : {
      getList: id => axiosWrapper(axiosInstance.get(`client/managers/${id}`)),
    }
  },

  recruiter : {
    requisitions: {
      post: data => axiosWrapper(axiosInstance.post('recruiter/requisition', data)),
      get: id => axiosWrapper(axiosInstance.get(`recruiter/requisition/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('recruiter/requisitions/list', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`recruiter/requisition/${id}`, data)),
    },
    company : {
      getCompanyDetails: () => axiosWrapper(axiosInstance.get(`recruiter/company/info`)),
    },
    notication : {
      getNotificationDetails: () => axiosWrapper(axiosInstance.get(`recruiter/notification`)),
      disableNotification :  (id) => axiosWrapper(axiosInstance.get(`recruiter/disableNotification/${id}`)),
    },
    
  },
  accountExecutive : {
    requisitions: {
      post: data => axiosWrapper(axiosInstance.post('account_executive/requisition', data)),
      get: id => axiosWrapper(axiosInstance.get(`account_executive/requisition/${id}`)),
      getList: (condition) => axiosWrapper(axiosInstance.post('account_executive/requisitions/list', condition)),
      put: (id, data) => axiosWrapper(axiosInstance.post(`account_executive/requisition/${id}`, data)),
    },
    notication : {
      getCompanyAssociationNotificationDetails : () => axiosWrapper(axiosInstance.get(`account_executive/company/association`)),
      disableNotification :  (id) => axiosWrapper(axiosInstance.get(`account_executive/disableNotification/${id}`)),
    }
  },

  job_details : {
    get: id => axiosWrapper(axiosInstance.get(`job/details/${id}`)),
  },
  job_submit : {
    post: data => axiosWrapper(axiosInstance.post('job/submit', data)),
  }



};

if (USE_FAKE_API) {
  api = FAKE_API;
}

export { api, axiosInstance };

export default api;
