import React, {Component} from 'react';
import Root from './src/commons/navigator/root-navigator';
import {Alert, View,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase";
import store from './src/store/store';
import {Provider} from 'react-redux';
import { setNotify } from './src/store/actions/index';


export default class App extends Component {
  async componentDidMount() {
    //we check if user has granted permission to receive push notifications.
    console.log("fcm componentDidMount ");
    this.checkPermission();
    // Register all listener for notification 
    this.createNotificationListeners();
  }

  async checkPermission() {
    console.log("fcm checkPermission");
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      this.requestPermission();
    }
  }

  async getToken() {    
    let fcmToken = await AsyncStorage.getItem('fcmToken');    
    if (!fcmToken) {      
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token        
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  
   
  async createNotificationListeners() {
    try {
    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // const { title, body } = notification;      
      // var cache = [];
      // console.log("notification value --> " + JSON.stringify(notification, (key, value) => {
      //   if (typeof value === 'object' && value !== null) {
      //     if (cache.includes(value)) return;
      //     cache.push(value);
      //   }
      //   return value;
      // }));
      // cache = null;      
      this.showAlert(notification);
      // update redux reducer
      store.dispatch(
        setNotify({                                        
          notify: "1",
        }),
    );
    });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log("onNotificationOpened");

      // this.displayNotification(title, body);
      // update redux reducer
      store.dispatch(
        setNotify({                                        
          notify: "1",
        }),
    );
    });

    // This listener triggered when app is closed and we click,tapped and opened notification 
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log("getInitialNotification");
      const { title, body } = notificationOpen.notification;
      // this.displayNotification(title, body);
      // update redux reducer
      store.dispatch(
        setNotify({                                        
          notify: "1",
        }),
    );
    }
  } catch (error) {
    console.log(error);      
  }
  }

  showAlert = notification => {
    const notificationData = new firebase.notifications.Notification()
      .setNotificationId('1')
      .setTitle(notification.title)
      .setSound('default')
      .setData(notification.data)
      .setBody(notification.body);
    // if android
    notificationData.android
      .setChannelId('12345')
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setVibrate(500);
    firebase
      .notifications()
      .displayNotification(notificationData)
      .then(x => {
        console.log('Send');
      })
      .catch(err => console.log('Error' + err));
  };

  displayNotification(title, body) {
    // we display notification in alert box with title and body
    Alert.alert(
      title, body,
      [
        { text: 'Ok', onPress: () => console.log('ok pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    let home = (
      <Provider store={store}>
        <Root />
      </Provider>
    );
    return home;
  }
}
