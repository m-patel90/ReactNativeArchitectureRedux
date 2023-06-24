import {AsyncStorage} from 'react-native';
import store from '../store';


const initialState = {
  token: null,
  refreshToken: null,
  custFullName: null,
  custDefaultAddress: null,
  customerAddressID:null,
  addressType:"",
  customerID:null,
  dob:null,
  emailID:null,
  gender:"Male",
  mobileNo:null,
  referralCode:null,
  notify:"0",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'Authentication':
      if (action.data.token) {
        AsyncStorage.setItem('token', action.data.token);
      }
      if (action.data.refreshToken) {
        AsyncStorage.setItem('refreshToken', action.data.refreshToken);
      }
      if (action.data.custFullName) {
        AsyncStorage.setItem('custFullName', action.data.custFullName);
      }
      if (action.data.custDefaultAddress) {
        AsyncStorage.setItem('custDefaultAddress', action.data.custDefaultAddress);
      }
      if (action.data.customerID) {
        AsyncStorage.setItem('customerID', JSON.stringify(action.data.customerID));        
      }

      return {
        ...state,
        token: action.data.token || state.token,
        refreshToken: action.data.refreshToken || state.refreshToken,
        custFullName: action.data.custFullName || state.custFullName,
        custDefaultAddress: action.data.custDefaultAddress,
        customerID: action.data.customerID || state.customerID,
        dob:action.data.dob,
        emailID:action.data.emailID,
        gender:action.data.gender,
        mobileNo:action.data.mobileNo || state.mobileNo,
        referralCode:action.data.referralCode || state.referralCode,
        addressType: action.data.addressType,
        customerAddressID: action.data.customerAddressID,
      };
      break;

    case 'RefreshToken':
      if (action.data.token) {
        AsyncStorage.setItem('token', action.data.token);
      }
      if (action.data.refreshToken) {
        AsyncStorage.setItem('refreshToken', action.data.refreshToken);
      }
      return {
        ...state,
        token: action.data.token || state.token,
        refreshToken: action.data.refreshToken || state.refreshToken,
      };
      break;
    default:
      return state;
  }
  return user;
}
