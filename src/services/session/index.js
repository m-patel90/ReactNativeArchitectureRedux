import * as api from './api';
import {authentication, refreshToken} from '../../store/actions/index.js';
import store from '../../store/store.js';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SESSION_TIMEOUT_THRESHOLD = 1; // Will refresh the access token 1 minutes before it expires
const SESSION_TIMEOUT = 15; // Token refresh interval

let sessionTimeout = null;

const setSessionTimeout = () => {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(
    refreshTokenCall, // eslint-disable-line no-use-before-define
    (SESSION_TIMEOUT - SESSION_TIMEOUT_THRESHOLD) * 60 * 1000,
  );
};

const onRefreshTokenSuccess = async response => {
  console.log('refresh token => ' + JSON.stringify(response));
  if (response.result === 'Success') {    
    store.dispatch(
      refreshToken({
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      }),
    );
    // setSessionTimeout();
  }
  
};

const onRequestSuccess = response => {
  console.log(response);
  console.log('STORE DATA => ' + JSON.stringify(store.getState()));
  store.dispatch(
    authentication({
      token: response.data.token,
      refreshToken: response.data.refreshToken,
      custFullName: response.data.custFullName,
      custDefaultAddress: response.data.custDefaultAddress,
      customerID: response.data.customerID,
      dob: response.data.dob,
      emailID: response.data.emailID,
      gender: response.data.gender,
      mobileNo: response.data.mobileNo,
      referralCode: response.data.referralCode,
      addressType: response.data.addressType,
      customerAddressID: response.data.customerAddressID,
    }),
  );

  console.log('STORE DATA => ' + JSON.stringify(store.getState()));
  saveTokenOfUser();
  // setSessionTimeout();
};

const onRequestFailed = exception => {
  console.log('call failed');
  throw exception;
};

export const refreshTokenCall = async () => {
  // return;
  console.log("In RefreshTokenCall");
  return api.refresh({
      token: store.getState().user.token,
      refreshToken: store.getState().user.refreshToken,
    })
    .then(await onRefreshTokenSuccess)
    .catch(onRequestFailed);
};

export const authenticate = response => {
  onRequestSuccess(response);
};

export const saveTokenOfUser = () => {
  try {
    AsyncStorage.getItem('fcmToken').then(value => {
      if (value) {
        api
          .saveTokenOfUser({
            token: value,
            typeOfDevice: Platform.OS === 'ios' ? 2 : 1,
            typeOfUser: 1
          })
          .then(response => {
            console.log("SaveTokenOfUser-> "+JSON.stringify(response));
          })
          .catch(exception => {
            throw exception;
          });
      }
    });
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
  }
  catch (err) {
    console.log(err)
  }
};
