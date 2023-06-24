import {fetchApi, callApi} from '../api';

const endPoints = {
  getAddressByCustId: 'api/Admin/GetCustomerAddressesByCustomerId',
  getAddressDetailByCustAddressId: 'api/Admin/GetCustomerAddressDetailByCustomerAddressID',
  saveCustAddress: 'api/Admin/SaveCustomerAddressFromMobile',
  updateCustAddress: 'api/Admin/SaveUpdateCustomerAddressMaster',
  deleteCustAddress: 'api/Admin/DeleteCustomerAddressByCustomerAddressID',
  getHolidayList: 'api/Admin/GetHolidaylistByStoreID',


  getPriceList: 'api/CustomerApp/GetSampleRateCard',
  getServicesList: 'api/CustomerApp/GetServicesForOrder',
  getStoreMaster: 'api/Admin/GetStoreMaster',

  getStoreSlots: 'api/CustomerApp/GetStoreSlotsByCustomerAddressID',
  getTimeCard: 'api/CustomerApp/GetSampleTimeCard',
  savePickupRequest: 'api/Store/SaveUpdatePickupRequest',
  validatePromocode: 'api/Store/ValidatePromocode',

  getReferFriendsDetail: 'api/LKWallet/GetReferFriendsDetail',
  contactUs: 'api/Auth/ContactUs',
  resendCustomerOtp: 'api/Auth/ResendCustomerOTP',
  updateCustomerProfile: 'api/CustomerApp/UpdateCustomerProfile',
  updateOTPProfile: 'api/CustomerApp/SendMobileUpdateOTPFromProfile',

  getOrderList: 'api/Store/GetOrderListForMobile',
  reschedulePickup: 'api/Store/ReschedulePickupRequest',
  getOrderDetails: 'api/Store/getMobileOrderDetails',
  getPickupDetails: 'api/Store/GetPickupRequestByPickupID',
  saveFeedback: 'api/CustomerApp/SaveFeedbackofOrder',
  getCancelOrderReasons: 'api/DropDownList/GetPickupCancelReasonList',
  cancelOrder: 'api/Store/CancelPickupRequest',

  getMyWalletByCustomerID: 'api/LKWallet/GetMyWalletByCustomerID',
  buyLKPackage: 'api/LKWallet/BuyLKPackage',
  createPaytmCheckSum: 'api/CustomerApp/CreatePaytmCheckSum',

  getHomePageContent: 'api/Store/GetHomePageContent',

  getOffersList: 'api/Store/GetMobileOffersList',

  getLKTransactionsByCustomerID: 'api/LKWallet/GetLKTransactionsByCustomerID',
  redeemCashCoupon: 'api/LKWallet/RedeemCashCoupon',
  getNotifications: 'api/CustomerApp/GetNotifications',
  dismissNotification: 'api/CustomerApp/DismissNotification',

  makePayment: 'api/Store/SaveUpdateInvoicePaymentInfo',
  downloadServiceInvoice: 'api/Store/GetPerformaInvoiceByOrderID',

  getServiceIconsByServiceID: 'api/Admin/GetServiceIconsByServiceID',
};

// Address apis
export const getAddressByCustId = (payload) =>
  fetchApi(endPoints.getAddressByCustId, payload, 'get');
export const getAddressDetailByCustAddressId = (payload) =>
  fetchApi(endPoints.getAddressDetailByCustAddressId, payload, 'get');
export const saveCustAddress = (payload) =>
  fetchApi(endPoints.saveCustAddress, payload, 'post');
export const updateCustAddress = (payload) =>
  fetchApi(endPoints.updateCustAddress, payload, 'post');
export const deleteCustAddress = (payload) =>
  fetchApi(endPoints.deleteCustAddress, payload, 'post');
export const getHolidayList = (payload) =>
  fetchApi(endPoints.getHolidayList, payload, 'get');


// PriceList apis
export const getPriceList = (payload) =>
  fetchApi(endPoints.getPriceList, payload, 'get');
export const getServicesList = (payload) =>
  fetchApi(endPoints.getServicesList, payload, 'get');
export const getStoreMaster = (payload) =>
  fetchApi(endPoints.getStoreMaster, payload, 'post');

// SchedulePickup apis

export const getStoreSlots = (payload) =>
  fetchApi(endPoints.getStoreSlots, payload, 'get');
export const getTimeCard = (payload) =>
  fetchApi(endPoints.getTimeCard, payload, 'get');

export const savePickupRequest = (payload) =>
  fetchApi(endPoints.savePickupRequest, payload, 'post');
export const validatePromocode = (payload) =>
  fetchApi(endPoints.validatePromocode, payload, 'post');

//referFriend api
export const getReferFriendsDetail = (payload) =>
  fetchApi(endPoints.getReferFriendsDetail, payload, 'post');

//contact us
export const contactUs = (payload) =>
  fetchApi(endPoints.contactUs, payload, 'post');

//edit Profile
export const resendCustomerOtp = (payload) =>
  fetchApi(endPoints.resendCustomerOtp, payload, 'post');
export const updateCustomerProfile = (payload) =>
  fetchApi(endPoints.updateCustomerProfile, payload, 'post');
export const updateOTPProfile = (payload) =>
  fetchApi(endPoints.updateOTPProfile, payload, 'post');

// orders apis
export const getOrderList = (payload) =>
  fetchApi(endPoints.getOrderList, payload, 'post');
export const reschedulePickup = (payload) =>
  fetchApi(endPoints.reschedulePickup, payload, 'post');
export const getOrderDetails = (payload) =>
  fetchApi(endPoints.getOrderDetails, payload, 'get');
export const saveFeedback = (payload) =>
  fetchApi(endPoints.saveFeedback, payload, 'post');
export const getPickupDetails = (payload) =>
  fetchApi(endPoints.getPickupDetails, payload, 'get');
export const getCancelOrderReasons = (payload) =>
  fetchApi(endPoints.getCancelOrderReasons, payload, 'get');
export const cancelOrder = (payload) =>
  fetchApi(endPoints.cancelOrder, payload, 'post');

// Lk Credits Apis
export const getMyWalletByCustomerID = (payload) =>
  fetchApi(endPoints.getMyWalletByCustomerID, payload, 'post');
export const buyLKPackage = (payload) =>
  fetchApi(endPoints.buyLKPackage, payload, 'post');
export const createPaytmCheckSum = (payload) =>
  fetchApi(endPoints.createPaytmCheckSum, payload, 'post');
export const getLKTransactionsByCustomerID = (payload) =>
  fetchApi(endPoints.getLKTransactionsByCustomerID, payload, 'post');
export const redeemCashCoupon = (payload) =>
  fetchApi(endPoints.redeemCashCoupon, payload, 'post');

// HomeSceen apis
export const getHomePageContent = (payload) =>
  fetchApi(endPoints.getHomePageContent, payload, 'get');

// Offers apis

export const getOffersList = (payload) =>
  fetchApi(endPoints.getOffersList, payload, 'post');

//Notification Apis
export const getNotifications = (payload) =>
  fetchApi(endPoints.getNotifications, payload, 'post');
export const dismissNotification = (payload) =>
  fetchApi(endPoints.dismissNotification, payload, 'post');

// orderDetailsScreen apis

export const makePayment = (payload) =>
  fetchApi(endPoints.makePayment, payload, 'post');
export const downloadServiceInvoice = (payload) =>
  fetchApi(endPoints.downloadServiceInvoice, payload, 'get');

// Service,Tasks Icons
export const getServiceIconsByServiceID = (payload) =>
  fetchApi(endPoints.getServiceIconsByServiceID, payload, 'post');
