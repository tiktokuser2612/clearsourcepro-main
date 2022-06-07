// Returns successful promise with provided data

const RESPONSE_DELAY = 500;

const apiWrapper = (data, isSuccess = true, status = 200, statusText = 'OK') => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve({
        data,
        status,
        statusText,
      });
    } else {
      reject({
        message: statusText,
        response: {
          data,
          status,
          statusText,
        },
      });
    }
  }, RESPONSE_DELAY);
});

export const FAKE_API = {
  isFakeApi: true,
  auth: {
    login: (credentials) => apiWrapper({
      message: 'Login successful.',
      data: {
        access_token: 'PSEUDO_FAKE_ACCESS_TOKEN',
        refresh_token: 'PSEUDO_FAKE_REFRESH_TOKEN',
        token_type: 'Bearer',
        expires: 3600,
      },
    }),
    refresh: (refreshToken) => apiWrapper({
      message: 'Token generation successful',
      data: {
        access_token: 'PSEUDO_FAKE_ACCESS_TOKEN_2',
        refresh_token: 'PSEUDO_FAKE_REFRESH_TOKEN_2',
        token_type: 'Bearer',
        expires: 3600,
      },
    }),
    getMe: () => apiWrapper({
      message: 'Get profile successful.',
      data: {
        user: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe.ace@marketkarma.com',
        },
      },
    }),
    logout: () => apiWrapper({
      message: 'Logged out.',
      data: {},
    }),
  },
  testData: {
    getIndex: (current, pageSize, filters, sorter) => apiWrapper({
      message: 'Get list successful.',
      data: {
        current,
        pageSize,
        filters,
        sorter,
        total: 999,
        items: [],
      },
    }),
  },
};

export default FAKE_API;
