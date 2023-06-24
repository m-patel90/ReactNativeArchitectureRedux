import React, {useState, useEffect, useRef} from 'react';
import {Input, Card, Icon, Overlay, Image as Img} from 'react-native-elements';
import {ActivityIndicator, Platform} from 'react-native';
import * as api from '../services/data/api.js';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  FlatList,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

import Loader from '../components/Loader';
import stringsoflanguages from '../commons/strings/stringsoflanguages';
import store from '../store/store.js';
import {setCustAddress} from '../store/actions/index';
import {colors, defaultColors, spacings, fonts} from '../commons/styles/theme';
import {hp, wp, sm, isXL, isIphoneXorAbove} from '../commons/utility/Dimens';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

var servicesList = [];
var currentServiceStepIndex = 0;
const HomeScreen = (props) => {
  var defaultAdd = store.getState().user.custDefaultAddress;
  var defaultAddType = store.getState().user.addressType;
  var temp = store.getState().user.notify;
  console.log('temp->', temp,typeof temp);
  let [scrollViewWidth, setscrollViewWidth] = useState(0);
  let [ReferalPoints, setReferalPoints] = useState(0);
  let [footerImageSRC, setfooterImageSRC] = useState('');
  let [headerImages, setheaderImages] = useState([]);
  let [FullAddress, setFullAddress] = useState(defaultAdd);
  let [isGoogleAddress, setisGoogleAddress] = useState(false);
  let [Loading, setLoading] = useState(false);
  let [notify, setNotify] = useState('0');
  let [forceRefresh, setForceRefresh] = useState(1);

  const servicesFlatList = useRef(null);
  useEffect(() => {
    const isFocused = props.navigation.isFocused();
    if (isFocused) {
      setNotify(store.getState().user.notify);
      setLoading(false);
      getServiceList();
      console.log('focused section');
    }

    const navFocusListener = props.navigation.addListener('didFocus', () => {
      // do some API calls here
      setNotify(store.getState().user.notify);
      setForceRefresh(Math.floor(Math.random() * 100));
      setLoading(false);
      if (
        servicesList != undefined &&
        servicesList != null &&
        servicesList.length > 0
      ) {
        getHomePageContent();
      } else {
        getServiceList();
      }
      console.log('listener section');
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  const getHomePageContent = async () => {
    setLoading(true);
    try {
      api
        .getHomePageContent({})
        .then((response) => {
          setLoading(false);
          if (response.result == 'Success') {
            console.log(response);
            try {
              if (
                response.data.address != null &&
                response.data.address != '' &&
                response.data.address.length > 0
              ) {
                defaultAddType = response.data.addressType;
                setisGoogleAddress(false);
                setFullAddress(response.data.address);
                let addID = response.data.customerAddressID + '';
                if (addID != store.getState().user.customerAddressID) {
                  console.log('call redux store');
                  store.dispatch(
                    setCustAddress({
                      addressType: response.data.addressType,
                      customerAddressID: response.data.customerAddressID + '',
                      custDefaultAddress: response.data.address,
                    }),
                  );
                }
              } else {
                Geocoder.init('AIzaSyBQR0y2ydglcT4xTXgGj3qx4J2HoM5ueaY');
                getGeolocation();
                if (
                  store.getState().user.customerAddressID != null &&
                  store.getState().user.customerAddressID != '' &&
                  store.getState().user.customerAddressID.length > 0
                ) {
                  console.log('call redux store make address blank');
                  store.dispatch(
                    setCustAddress({
                      addressType: '',
                      customerAddressID: null,
                      custDefaultAddress: null,
                    }),
                  );
                }
              }
            } catch (err) {
              console.warn('in catch', err);
            }
            setheaderImages(response.data.lstHeaderImage);
            setReferalPoints(response.data.referalPoint);
            setfooterImageSRC(response.data.footerImage);
          } else {
            setLoading(false);
            console.log(response);
            Alert.alert(stringsoflanguages.lbl_err_title, response.message);
          }
        })
        .catch((exception) => {
          Alert.alert(
            stringsoflanguages.lbl_err_title,
            stringsoflanguages.lbl_err_msg,
          );
          throw exception;
        });
    } catch (err) {
      console.warn('in catch', err);
      setLoading(false);
    }
  };

  const getServiceList = async () => {
    setLoading(true);
    try {
      api
        .getServicesList({})
        .then((response) => {
          if (response.result == 'Success') {
            let services = response.data;
            try {
              servicesList = services.filter(
                (service) =>
                  service.serviceID != 1 &&
                  service.serviceID != 2 &&
                  service.serviceID != 4 &&
                  service.serviceID != 5,
              );
              currentServiceStepIndex = 0;
            } catch (error) {
              console.warn(error);
            }
          }
          setLoading(false);
          getHomePageContent();
        })
        .catch((exception) => {
          Alert.alert(
            stringsoflanguages.lbl_err_title,
            stringsoflanguages.lbl_err_msg,
          );
          throw exception;
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const _renderImages = ({item}) => {
    return (
      <View style={styles.scrollSection}>
        <View
          style={{
            marginLeft: wp(1),
            marginTop: wp(4),
          }}>
          <Img
            style={{height: hp(22), width: wp(70)}}
            source={{
              uri:
                item === '' ? require('../assets/images/NotFound.png') : item,
            }}
            resizeMode="contain"
            placeholderStyle={{
              backgroundColor: 'white',
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={styles.overlay} />
        </View>
      </View>
    );
  };

  const getGeolocation = () => {
    Geocoder.init('AIzaSyBQR0y2ydglcT4xTXgGj3qx4J2HoM5ueaY');
    if (Platform.OS === 'ios') {
      callLocation();
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            callLocation();
          } else {
            alert(stringsoflanguages.permission_denied_msg);
          }
        } catch (err) {
          //alert('err', err);
          console.warn('in catch', err);
        }
      }
      requestLocationPermission();
    }
  };

  const callLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        console.log('Fetch latitude->' + currentLatitude + currentLongitude);
        if (currentLongitude != null && currentLongitude != '') {
          setCurentLocation(currentLatitude, currentLongitude);
        }
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: false, timeout: 20000},
    );
  };

  const setCurentLocation = (currLat, currLong) => {
    Geocoder.from(currLat, currLong)
      .then((json) => {
        arrAddress = json.results[0].address_components;
        arrAddress.map((i, address_component) => {
          setFullAddress(json.results[0].formatted_address);
          setisGoogleAddress(true);
          console.log('FullAddress is', FullAddress);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _previousStep = () => {
    console.log('prev tapped...');
    try {
      if (currentServiceStepIndex > 0) {
        currentServiceStepIndex = currentServiceStepIndex - 1;
        servicesFlatList.current.scrollToIndex({
          index: currentServiceStepIndex,
          animated: true,
          viewPosition: 1,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const _nextStep = () => {
    console.log('next tapped...');
    try {
      if (currentServiceStepIndex < servicesList.length - 1) {
        currentServiceStepIndex = currentServiceStepIndex + 1;
        servicesFlatList.current.scrollToIndex({
          index: currentServiceStepIndex,
          animated: true,
          viewPosition: 1,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getItemLayout = (data, index) => {
    return {
      length: hp(18),
      offset: hp(18) * index,
      index,
    };
  };

  const _renderServices = ({item}) => {
    const localColor = defaultColors.white;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log('service selected id' + item.serviceID);
            props.navigation.navigate('PriceList', {serviceID: item.serviceID});
          }}>
          <View style={(styles.scrollSection, localColor)}>
            <View style={{alignSelf: 'center'}}>
              <Image
                style={{height: hp(9.5), width: hp(7.9), alignSelf: 'center'}}
                source={{
                  uri:
                    item.serviceImage == ''
                      ? require('../assets/images/NotFound.png')
                      : item.serviceImage,
                }}
                resizeMode="contain"
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>

            <Text
              style={{
                color: colors.neroColor,
                fontSize: fonts.mediumFont,
                textAlign: 'center',
                width: hp(15),
                alignSelf: 'center',
              }}>
              {item.serviceName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.parentBody}>
      <StatusBar
        key={forceRefresh}
        barStyle={Platform.OS == 'android' ? '' : 'dark-content'}
      />

      <Loader loading={Loading} />

      <View style={{}}>
        <View
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('ReferFriendScreen')}>
          <View
            style={{
              // paddingTop: wp(2),

              flexDirection: 'row',
              height: wp(14),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: wp(0.5),
              borderBottomColor: '#A2A2A21C',
              borderTopWidth: wp(0.5),
              borderTopColor: '#A2A2A21C',
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}>
              <View
                style={{
                  marginLeft: wp(4),
                  marginRight: wp(2),
                  backgroundColor: '#664384',
                  alignItems: 'center',
                  height: wp(10),
                  width: wp(10),
                  borderRadius: wp(7),
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/images/group/group.png')}
                  style={{
                    height: hp(4),
                    width: wp(6),
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            {FullAddress != null && FullAddress != '' ? (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SelectLocation');
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="map-marker" type="font-awesome" color="#EC1672" />
                  <Text style={{fontSize: wp(4)}}>
                    {isGoogleAddress === false
                      ? ' ' + defaultAddType + ' - '
                      : ''}
                    {FullAddress != null && FullAddress != ''
                      ? FullAddress.length > 20
                        ? `${FullAddress.substring(0, 20)}...`
                        : FullAddress
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('NotificationScreen');
                }}>
                <View style={{flexDirection: 'column', marginTop: wp(-10)}}>
                  <View
                    style={{
                      marginLeft: wp(3.4),
                    }}>
                    <Text
                      style={{
                        color: notify == '1' ? '#F95F84' : defaultColors.white,
                        fontSize: wp(12),
                      }}>
                      .
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: wp(-5.5),
                    }}>
                    <Image
                      style={{height: hp(4.7), width: wp(13)}}
                      source={require('../assets/images/notification/notification.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: wp(100)}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              horizontal={true}
              scrollEnabled={true} // remove if you want user to swipe
            >
              <FlatList
                horizontal={true}
                data={headerImages}
                renderItem={(item) => _renderImages(item)}
                keyExtractor={(item) => item}
              />
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            marginTop: wp(4),
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('ReferFriendScreen')}>
            <View
              style={{
                backgroundColor: '#B9DAFF',
                flexDirection: 'row',
                height: wp(12),
                alignItems: 'center',
              }}>
              <View style={{}}>
                <Image
                  style={{height: hp(4.5), width: wp(12)}}
                  source={require('../assets/images/invitation/invitation.png')}
                  resizeMode="contain"
                />
              </View>
              <View style={{width: wp(84)}}>
                <Text style={{color: '#08070D', fontSize: wp(3.1)}}>
                  {stringsoflanguages.inviteCredits} {ReferalPoints}{' '}
                  {stringsoflanguages.lkCredit}
                </Text>
              </View>
              <View style={{marginLeft: wp(1)}}>
                <Icon
                  name="angle-right"
                  type="font-awesome"
                  color="#08070D"
                  size={19}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: wp(100),
            // height: hp(53),
            padding: wp(3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: wp(95),
              height: hp(20),
              backgroundColor: 'white',
              padding: wp(1),
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PriceList', {
                  serviceID: 1,
                })
              }>
              <View
                style={{
                  width: wp(45.2),
                  height: hp(16),
                  backgroundColor: '#FFB8B8',
                  padding: wp(2),
                  borderRadius: wp(3),
                  marginRight: wp(2),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(22),
                    height: hp(14),
                  }}>
                  <View
                    style={{
                      width: wp(26),
                      height: hp(6),
                    }}>
                    <Text
                      style={{
                        color: '#313030',
                        fontSize: wp(3.8),
                        fontWeight: 'bold',
                      }}>
                      {stringsoflanguages.starDryClean}
                    </Text>
                  </View>
                  <View style={{marginTop: wp(7)}}>
                    <View
                      style={{
                        backgroundColor: defaultColors.white,
                        borderRadius: wp(5),
                        width: wp(5),
                        height: wp(5),
                        marginRight: wp(3),
                      }}>
                      <Icon
                        size={19}
                        name="angle-right"
                        type="font-awesome"
                        color="#A7A6A6"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(18),
                    height: hp(14),
                    marginRight: wp(3),
                  }}>
                  <Image
                    style={{height: hp(16), width: wp(20)}}
                    source={require('../assets/images/service1/service1.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PriceList', {
                  serviceID: 4,
                })
              }>
              <View
                style={{
                  backgroundColor: '#9CF3D4',
                  width: wp(45.2),
                  height: hp(16),
                  padding: wp(2),
                  borderRadius: wp(3),
                  marginRight: wp(2),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(22),
                    height: hp(14),
                  }}>
                  <View
                    style={{
                      width: wp(26),
                      height: hp(6),
                    }}>
                    <Text
                      style={{
                        color: '#313030',
                        fontSize: wp(3.8),
                        fontWeight: 'bold',
                      }}>
                      {stringsoflanguages.dryCleaning}
                    </Text>
                  </View>
                  <View style={{marginTop: wp(7)}}>
                    <View
                      style={{
                        backgroundColor: defaultColors.white,
                        borderRadius: wp(5),
                        width: wp(5),
                        height: wp(5),
                        marginRight: wp(3),
                      }}>
                      <Icon
                        size={19}
                        name="angle-right"
                        type="font-awesome"
                        color="#A7A6A6"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(18),
                    height: hp(14),
                    marginRight: wp(3),
                  }}>
                  <Image
                    style={{height: hp(16), width: wp(20)}}
                    source={require('../assets/images/service2/service2.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: wp(95),
              height: hp(20),
              backgroundColor: 'white',
              padding: wp(1),
              marginTop: wp(-5),
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PriceList', {
                  serviceID: 2,
                })
              }>
              <View
                style={{
                  backgroundColor: '#F3E777',
                  width: wp(45.2),
                  height: hp(16),
                  padding: wp(2),
                  borderRadius: wp(3),
                  marginRight: wp(2),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(22),
                    height: hp(14),
                  }}>
                  <View
                    style={{
                      width: wp(26),
                      height: hp(6),
                    }}>
                    <Text
                      style={{
                        color: '#313030',
                        fontSize: wp(3.8),
                        fontWeight: 'bold',
                      }}>
                      {stringsoflanguages.Laundry}
                    </Text>
                  </View>
                  <View style={{marginTop: wp(7)}}>
                    <View
                      style={{
                        backgroundColor: defaultColors.white,
                        borderRadius: wp(5),
                        width: wp(5),
                        height: wp(5),
                        marginRight: wp(3),
                      }}>
                      <Icon
                        size={19}
                        name="angle-right"
                        type="font-awesome"
                        color="#A7A6A6"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(18),
                    height: hp(14),
                    marginRight: wp(3),
                  }}>
                  <Image
                    style={{height: hp(16), width: wp(20)}}
                    source={require('../assets/images/service3/service3.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PriceList', {
                  serviceID: 5,
                })
              }>
              <View
                style={{
                  backgroundColor: '#F9BEFE',
                  width: wp(45.2),
                  height: hp(16),
                  padding: wp(2),
                  borderRadius: wp(3),
                  marginRight: wp(2),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(22),
                    height: hp(14),
                  }}>
                  <View
                    style={{
                      width: wp(26),
                      height: hp(6),
                    }}>
                    <Text
                      style={{
                        color: '#313030',
                        fontSize: wp(3.8),
                        fontWeight: 'bold',
                      }}>
                      {stringsoflanguages.shoeLaundry}
                    </Text>
                  </View>
                  <View style={{marginTop: wp(7)}}>
                    <View
                      style={{
                        backgroundColor: defaultColors.white,
                        borderRadius: wp(5),
                        width: wp(5),
                        height: wp(5),
                        marginRight: wp(3),
                      }}>
                      <Icon
                        size={19}
                        name="angle-right"
                        type="font-awesome"
                        color="#A7A6A6"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',

                    width: wp(18),
                    height: hp(14),
                    marginRight: wp(3),
                  }}>
                  <Image
                    style={{height: hp(16), width: wp(20)}}
                    source={require('../assets/images/service4/service4.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{alignItems: 'flex-start'}}
              onPress={() => {
                _previousStep();
              }}>
              <View
                style={{
                  marginRight: wp(4),
                  marginTop: wp(10),
                  marginLeft: wp(4),
                }}>
                <View>
                  <Icon name="angle-left" type="font-awesome" color="#A7A6A6" />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{width: wp(79), marginTop: hp(1)}}>
              <FlatList
                ref={servicesFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={'center'}
                snapToInterval={hp(18)}
                data={servicesList}
                renderItem={(item) => _renderServices(item)}
                keyExtractor={(item) => item.serviceID}
                getItemLayout={(data, index) => getItemLayout(data, index)}
              />
            </View>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => {
                _nextStep();
              }}>
              <View
                style={{
                  marginRight: wp(4),
                  marginTop: wp(10),
                  marginLeft: wp(5),
                }}>
                <View style={{}}>
                  <Icon
                    name="angle-right"
                    type="font-awesome"
                    color="#A7A6A6"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {footerImageSRC != '' ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: wp(2),
            }}>
            <Img
              style={{height: hp(25), width: wp(100)}}
              // source={{ uri: footerImageSRC === "" ? require('../assets/images/NotFound.png') : footerImageSRC }}
              source={{uri: footerImageSRC}}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parentBody: {
    backgroundColor: defaultColors.white,
    flex: 1,
    marginTop:
      Platform.OS === 'ios' ? (isIphoneXorAbove ? wp(8) : wp(0)) : wp(0),
  },

  scrollSection: {
    ...Platform.select({
      ios: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: wp(1),
        backgroundColor: defaultColors.white,
      },
      android: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: wp(1),
        backgroundColor: defaultColors.white,
      },
    }),
  },
  header: {
    display: 'flex',
    marginTop: wp(4),
    flexDirection: 'row',
    height: hp(6.5),
    backgroundColor: '#FFF2F8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: wp(4.1),
    color: '#141212',
  },
});
