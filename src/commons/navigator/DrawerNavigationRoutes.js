import React from 'react';
import { Image, ImageBackground, Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import { defaultColors, colors, fonts } from '../styles/theme';
import { hp, wp, isIphoneXorAbove } from '../utility/Dimens'
import HomeScreen from '../../screens/HomeScreen';

const TabBarComponent = (props) => (<BottomTabBar {...props} />);
const Home_StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: stringsoflanguages.home,
      header: null,
      headerStyle: {
        backgroundColor: defaultColors.purple,
      },
      headerTintColor: defaultColors.white,
    }),
  },
});

const TabNavigatorRoutes = createBottomTabNavigator({
  HomeScreen: {
    screen: Home_StackNavigator,
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      tabBarLabel: stringsoflanguages.tab_home,
      tabBarIcon: ({ tintColor, focused }) => (
        <Image style={{ tintColor: tintColor, resizeMode: 'contain', }} source={focused ? require('../../assets/images/tab_icon/browser_focused.png') : require('../../assets/images/tab_icon/browser.png')}></Image>
      ),
      tabBarVisible: navigation.state.index > 0 ? false : true
    }),
  },
  StoreScreen: {
    screen: Store_StackNavigator,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: stringsoflanguages.tab_store,
      tabBarIcon: ({ tintColor, focused }) => (
        <Image source={focused ? require('../../assets/images/tab_icon/shop_focused.png') : require('../../assets/images/tab_icon/shop.png')} style={{ tintColor: tintColor, resizeMode: 'contain' }}></Image>
      )
    },
  },
  SchedulePickupScreen: {
    screen: SchedulePickup_StackNavigator,
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      // tabBarLabel: stringsoflanguages.tab_schedule,
      tabBarLabel: ({ tintColor }) => (
        <Text style={{
          color: tintColor,
          alignSelf: "center",
          marginLeft: Platform.OS == "ios" ? hp(1.7) : hp(1.4),
          fontSize: isIphoneXorAbove() ? fonts.smallMediumFont * 1.20 : fonts.smallMediumFont * 1.10,
        }}>
          {stringsoflanguages.tab_schedule} </Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Image style={{
          resizeMode: 'contain', marginBottom: hp(2.5),
          marginLeft: hp(1.4)
        }} source={require('../../assets/images/tab_icon/logogss-02.png')}></Image>
      ),
      tabBarVisible: navigation.state.index > 0 ? false : true
    }),
  },
  WalletScreen: {
    screen: Wallet_StackNavigator,
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      tabBarLabel: stringsoflanguages.tab_wallet,
      tabBarIcon: ({ tintColor, focused }) => (
        <Image style={{ tintColor: tintColor, resizeMode: 'contain' }} source={focused ? require('../../assets/images/tab_icon/wallet_focused.png') : require('../../assets/images/tab_icon/wallet.png')}></Image>
      ),
      tabBarVisible: navigation.state.index > 0 ? false : true
    }),
  },
  MyOrdersScreen: {
    screen: MyOrders_StackNavigator,
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
      tabBarLabel: stringsoflanguages.tab_orders,
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ tintColor: tintColor, resizeMode: 'contain' }} source={require('../../assets/images/tab_icon/past.png')} ></Image>
      ),
      tabBarVisible: navigation.state.index > 0 ? false : true
    }),
  },

}, {
  tabBarOptions: {
    activeTintColor: '#ec1672',
    inactiveTintColor: '#818181',
    labelStyle: {
      fontSize: isIphoneXorAbove() ? fonts.smallMediumFont * 1.20 : fonts.smallMediumFont * 1.10,
      paddingBottom: hp(0.5),
    },

    style: {
      // height: isIphoneXorAbove() ? '13%' : '10%',
      // paddingTop: '3%',
      backgroundColor: 'transparent',
      paddingBottom: wp(1.5)
    },
  },
  tabBarComponent: props => {
    return (

      <React.Fragment>
        <ImageBackground
          source={require('../../assets/images/tab_icon/Layer_4.png')}
          style={{ width: wp(100) }}
        >

          <TabBarComponent {...props} />
        </ImageBackground>
      </React.Fragment>
    )
  },
  initialRouteName: 'HomeScreen',
  activeColor: '#ec1672',
  inactiveColor: '#818181',

});

const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: Home_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home Screen',
      },
    },
    TabNavigatorRoutes: {
      screen: TabNavigatorRoutes,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLabel: 'Tab Screen',
      },
    }
  },

  {
    contentComponent: null,
    drawerOpenRoute: 'DrawerClose',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    edgeWidth: 0,
    drawerWidth: '0%',
  },
);
export default DrawerNavigatorRoutes;
