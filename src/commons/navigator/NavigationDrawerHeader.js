/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {wp} from '../utility/Dimens'

const NavigationDrawerHeader = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon containerStyle={{margin: wp(1)}} color="white" name="menu" />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
