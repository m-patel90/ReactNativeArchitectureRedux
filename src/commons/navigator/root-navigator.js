import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import RegistrationScreen from '../../screens/RegistrationScreen';
import OTPScreen from '../../screens/OTPScreen';
import SocialLoginScreen from '../../screens/SocialLoginScreen';
import { colors, defaultColors } from '../styles/theme';
import { HeaderBackButton } from 'react-navigation-stack';
import WebScreen from '../../screens/WebScreen';
import stringsoflanguages from '../strings/stringsoflanguages';


const Auth = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerShown: false,
    },
  },
});


const App = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerShown: false,
    },
  },
  Auth: {
    screen: Auth,
  },
  DrawerNavigationRoutes: {
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      gesturesEnabled: false,
      headerShown: false,
    },
  },
});

export default createAppContainer(App);
