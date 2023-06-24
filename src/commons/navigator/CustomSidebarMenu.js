import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from '../strings/stringsoflanguages';
import { defaultColors, spacings, fonts, colors } from '../styles/theme';
import { hp } from '../utility/Dimens';


const CustomSidebarMenu = props => {
  let items = [
    {
      navOptionName: stringsoflanguages.home,
      screenToNavigate: 'HomeScreen',
    },
    {
      navOptionName: stringsoflanguages.logout,
      screenToNavigate: 'logout',
    },
  ];

  const handleClick = (index, screenToNavigate) => {
    if (screenToNavigate === 'logout') {
      props.navigation.toggleDrawer();
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
              AsyncStorage.clear();
              props.navigation.navigate('Auth');
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      props.navigation.toggleDrawer();
      props.navigation.navigate(screenToNavigate);
    }
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: fonts.largeFont, color: defaultColors.blue }}>
            {'Name'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>User Name</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <View style={{ width: '100%', flex: 1 }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacings.smallSpace,
              color: defaultColors.blue,
              backgroundColor: colors.lightTextColor,
            }}
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }>
            <Text style={{ fontSize: fonts.mediumFont, color: defaultColors.white }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: defaultColors.blue,
    paddingTop: spacings.largeSpace,
    color: defaultColors.white,
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: defaultColors.blue,
    padding: spacings.smallMediumSpace,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(10) / 2,
    color: defaultColors.white,
    backgroundColor: defaultColors.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: defaultColors.white,
    alignSelf: 'center',
    paddingHorizontal: spacings.smallSpace,
    fontWeight: 'bold',
    fontSize: fonts.mediumLargeFont,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: spacings.smallMediumSpace,
    backgroundColor: defaultColors.white,
    marginTop: spacings.smallMediumSpace,
    marginBottom: spacings.smallSpace,
  },
});
export default CustomSidebarMenu;
