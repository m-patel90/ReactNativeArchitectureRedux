/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity,Text,Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from '../strings/stringsoflanguages.js';
import { colors, defaultColors, spacings, fonts } from '../styles/theme';
import { hp, wp } from '../utility/Dimens';
import * as api from '../../services/session/api.js';

const LogoutHeader = props => {
  const logout = () => {
    Alert.alert(
      stringsoflanguages.logout,
      stringsoflanguages.logout_msg,
      [
        {
          text: stringsoflanguages.lbl_cancel,
          onPress: () => {
            return null;
          },
        },
        {
          text: stringsoflanguages.lbl_confirm,
          onPress: () => {
            try{
            AsyncStorage.removeItem('mobileNo');
            api.saveTokenOfUser({
            token: '',
            typeOfDevice: Platform.OS === 'ios' ? 2 : 1,
            typeOfUser: 1
          })
          .then(response => {
            console.log("SaveTokenOfUser-> "+JSON.stringify(response));
            AsyncStorage.removeItem('customerID');
            props.navigationProps.navigate('Auth');
          })
          .catch(exception => {
            AsyncStorage.removeItem('customerID');
            props.navigationProps.navigate('Auth');
            throw exception;            
          });
        }catch(err)
        {
          console.log(err);
        }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{flexDirection:'row',alignItems:"center"}} onPress={logout}>
        <Icon containerStyle={{ margin: wp(1) }}
          
          name='power-off'
          type='font-awesome'
          color='#ED0170'
        />
        <Text style={{color:defaultColors.white,paddingLeft:hp(0.5),paddingRight:hp(1),fontSize:fonts.mediumLargeFont}}>{stringsoflanguages.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LogoutHeader;
