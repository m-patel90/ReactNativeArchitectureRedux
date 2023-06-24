import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  Linking
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-community/async-storage';
import {hp, wp} from '../commons/utility/Dimens';
import * as api from '../services/session/api.js';
import {authenticate} from '../services/session/index.js';
import {AndroidVersion} from "../../app.json"

const image = {uri: '../assets/images/splash/LaundroKartLOGO-08.svg'};

const SplashScreen = (props) => {
  let [animating, setAnimating] = useState(true);
  let [current_version, setcurrent_version] = useState(AndroidVersion);
  let [New_version, setNew_version] = useState();
  let [IsMajor, setIsMajor] = useState();

  
  useEffect(() => {
    api
      .getAppVersionInfo({
        PlatForm: 'Android',
        AppName: 'CP',
      })
      .then((response) => {
        console.log('version_response->', response);
        if (response.result == 'Fail') {
          console.log(response);
        } else {
          setNew_version(parseFloat(response.data[0].newversion));
          setIsMajor(response.data[0].major);
          updateVersion();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  updateVersion = () => {
    
    var Current_V = parseFloat(current_version);
    var New_V = parseFloat(New_version);
    console.log("version->",Current_V,New_V)
    
    if (Current_V < New_V) {
      console.log('in if',IsMajor);
      if (IsMajor) {
        showAlertforMajorUpdate();
      } else {
        showAlertforMinorUpdate();
      }
    } else {
      console.log('in else');
      getdata();
    }
  };

  showAlertforMajorUpdate = () => {
    
    Alert.alert(
      'New Version Available',
      'There is a newer version of your favorite laundry App!',
      [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {
          text: 'Update',
          onPress: () => {
            console.log('OK Pressed');
            Linking.openURL('https://play.google.com/store/apps/details?id=com.laundrokart.laundrokartapp')

          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  showAlertforMinorUpdate=()=>{
    Alert.alert(
      'New Version Available',
      'There is a newer version of your favorite laundry App!',
      [
        {
          text: 'Cancel',
          onPress: () => getdata(),
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            console.log('OK Pressed');
            Linking.openURL('https://play.google.com/store/apps/details?id=com.laundrokart.laundrokartapp')

          },
        },
      ],
      {
        cancelable: false,
      },
    );

  }

  getdata = () => {
    setTimeout(() => {
      let userMobile;
      let customerID;
      AsyncStorage.getItem('customerID').then((value) => {
        if (value != null) {
          customerID = value;
          AsyncStorage.getItem('mobileNo').then((item) => {
            userMobile = item;
            console.log('um -> ' + userMobile + 'uc -> ' + customerID);
            if (userMobile != null && customerID != null) {
              // props.navigation.navigate('DrawerNavigationRoutes');
              console.log('IN SUCESS CONDITION');
              // props.navigation.navigate('DrawerNavigationRoutes');
              api
                .authenticate({
                  email: '',
                  mobileNo: userMobile,
                  isSocialLogin: false,
                  isAutoLogin: true,
                })
                .then((response) => {
                  if (response.result == 'Fail') {
                    console.log(response);
                    console.log('hello1');
                    props.navigation.navigate('Auth');
                  } else {
                    authenticate(response);
                    console.log('hello2');
                    props.navigation.navigate('DrawerNavigationRoutes');
                  }
                })
                .catch((error) => {
                  console.log(error);
                  // props.navigation.navigate('Auth');
                });
            } else {
              console.log('IN FAILED CONDITION');
              props.navigation.navigate('Auth');
            }
          });
        } else {
          props.navigation.navigate('Auth');
        }
      });

      // setAnimating(false);
      // props.navigation.navigate('Auth');
    }, 1000);
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={require('../assets/images/Background/MaskGroup23.png')}
      style={{height: '100%', width: '100%'}}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require('../assets/images/splash/LaundroKartLOGO-08.png')}></Image>
      </View>
    </ImageBackground>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logoImage: {
    marginTop: hp(45),
    resizeMode: 'contain',

    width: wp(80),
    height: hp(10),
  },
});
