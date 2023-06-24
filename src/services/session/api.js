import {fetchApi, callApi, callRefreshApi} from '../api';

const endPoints = {
  authenticate: 'api/Auth/CustomerLoginFromMobApp',
  refresh: 'api/Auth/RefreshTokenForCustomer',
  registration: 'api/Auth/CustomerRegistrationFromMobApp',
  validateOTP: 'api/Auth/CustomerValidateOTP',
  resendOTP: 'api/Auth/ResendCustomerOTP',
  saveTokenOfUser: 'api/CustomerApp/SaveTokenOfUser',
  getAppVersionInfo: 'api/Admin/GetAppVersionInfo',
};

// export const authenticate = (email, password) => fetchApi(endPoints.authenticate, {}, 'post', {
// 	Authorization: `Basic ${new Buffer(`${email}:${password}`).toString('base64')}`,
// });

// export const refresh = (token, user) => fetchApi(endPoints.refresh, { token, user }, 'post', {
// 	'Client-ID': apiConfig.clientId,
// 	Authorization: null,
// });

export const authenticate = (payload) =>
  callApi(endPoints.authenticate, payload, 'post');

// export const refresh = (session_id) => callApi(endPoints.refresh, {}, 'get', {
// 'session_id': session_id,
// });

export const refresh = async (payload) => {
  return callRefreshApi(endPoints.refresh, payload, 'post');
};
export const registration = (payload) =>
  callApi(endPoints.registration, payload, 'post');
export const validateOTP = (payload) =>
  callApi(endPoints.validateOTP, payload, 'post');
export const resendOTP = (payload) =>
  callApi(endPoints.resendOTP, payload, 'post');

export const saveTokenOfUser = (payload) =>
  fetchApi(endPoints.saveTokenOfUser, payload, 'post');
export const getAppVersionInfo = (payload) =>
callApi(endPoints.getAppVersionInfo, payload, 'post');
