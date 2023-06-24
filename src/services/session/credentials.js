import store from '../../store/store.js';
import {refreshTokenCall} from './index.js';

var jwt_decode = require('jwt-decode');
function isTokenExpired (token) {
  var decoded = jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }  
}

export async function getVerifiedKeys () {
    console.log('Loading keys from storage')
    let token=store.getState().user.token;
    // let refreshToken=store.getState().user.refreshToken;
  
    if (token!=null) {
        
      if (!isTokenExpired(token)) {
        console.log('returning access')
        return "success";
      } else {
        console.log('token expired')        
  
        // if (!isTokenExpired(refreshToken)) {          
          await refreshTokenCall();

        //   await AsyncStorage.setItem('keys', JSON.stringify(response))
          console.log('TOKEN REFRESHED')          
  
          return "Token Updated";
        // } else {
        //   console.log('refresh expired, please login')
        //   return;
        // }
      }
    } 
    else {
      console.log('access not available please login')
      return "Fail";
    }
  }
  