import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    // Button-Labels
    lbl_submit: 'SUBMIT',
    lbl_updatePickup: 'UPDATE PICKUP',
    lbl_APPLY: 'APPLY',
    lbl_cancel: 'Cancel',
    lbl_confirm: 'Confirm',
    lbl_login_username: 'Email',
    lbl_login_password: 'Password',
    lbl_login: 'Login',
    lbl_Signup: 'Signup',
    lbl_Proceed: 'Proceed',
    lbl_getOTP: 'Get OTP',
    lbl_placeOrder: 'PLACE YOUR ORDER',
    lbl_scheduleOrder: 'SCHEDULE YOUR ORDER',
    lbl_confirmLocation: 'CONFIRM LOCATION & PROCEED',
    lbl_OK: 'OK',
    lbl_paywithPaytm: "Pay via Paytm",
    lbl_payNow: "Pay Now",
    lbl_Invalid: "Invalid",

    // Validation Messages
    password_validate: 'Must contain Minimum 8 characters, uppercase & lowercase letter, a number & a special character',
    email_validate: 'Please enter valid email',
    mobile_validate: 'Please enter valid mobile number',
    Name_required: 'Name is required',
    email_required: 'Email ID is required',
    mobile_required: 'Mobile Number is required',
    password_required: 'Password is required',
    confirmPassword_required: 'Confirm Password is required',
    confirmPassword_match: 'Password & Confirm Password does not match',
    OTP_required: "OTP is required",
    valid_mobile: 'Enter valid mobile number',

    // Place Holders
    enter_email: 'Email',
    enter_password: 'Enter Password',
    enter_confirmPassword: 'Enter Confirm Password',
    enter_Name: "Name",
    enter_lastName: "Enter Last Name",
    enter_mobileNumber: "Mobile Number",
    enter_referralCode: "Enter Referral Code",
    enter_EmailOTP: "Enter Email OTP",
    enter_MobileOTP: "Enter Mobile OTP",

    home: 'Home',
    schedule_pickup: 'Schedule pickup',
    my_address: 'My Addresses',
    price_list: 'Pricing',
    select_location: 'Select Location',
    transactions: 'Transactions',
    transactions_LIST: 'TRANSACTIONS',
    my_orders: 'My Orders',
    order_details: 'Order Details',
    reschedule: 'Reschedule pickup',
    ReferFriend: "Refer a Friend",
    wallet: "Wallet",
    order_summary: 'Order Summary',
    notifications: 'Notifications',
    contact_us: 'Contact Us',
    profile: 'Profile',
    offer: 'Offer',
    offers: "Offers",
    store: 'Our Stores',
    about_us: 'About Us',
    faq: 'FAQ',
    privacy_policy: 'Privacy Policies',
    terms_conditions: 'Terms & Conditions',
    logout: 'LOGOUT',
    logout_msg: 'Are you sure want to logout?',
    lbl_set_location: 'Set location',
    txt_set_location: 'It is super easy to set your location\nthrough our custom map',
    lbl_schedule_pickup: 'Schedule Pickup',
    lbl_delivery: 'Give your premium Cloth\n a premium care',
    lbl_skip: 'skip',
    message: "Message",
    lbl_addressExists: "This address type already exists, try another option",
    lbl_addressTypeReq: "Please select address type",
    lbl_req: "Required",
    lbl_PromoReq: "Please enter promocode!",
    lbl_CouponRequired: "Please enter cash coupon code",
    lbl_HouseNoReq: "House no/Flat no/Floor/Street is required",
    yourLocation: "YOUR LOCATION",
    tagLocation: "Tag this location for later",
    lbl_invoiceExists: "Invoice ID already exists",
    lbl_expired: "Expired",


    //Pickup Methods
    normal: 'Normal',
    semi_express: 'Semi-Express',
    express: 'Express',
    pickup_confirm: 'Your Pickup is confirmed',
    //Services
    lbl_select_services: 'Select Services',
    lbl_star: '5 Star',
    lbl_dry: 'Dry Cleaning',
    lbl_steam: 'Steam Ironing',
    lbl_iron: 'Wash & Iron',
    lbl_wash: 'Wash & Fold',
    lbl_shoe: 'Shoe Laundry',
    lbl_carpet: 'Carpet Cleaning',
    lbl_upholestry: 'Upholestry',
    lbl_darning: 'Darning & Dying',

    lbl_ok: 'OK',

    //share 
    lbl_share_msg_prefix: 'Hi! Download the LaundroKart app and sign up using my referral code ',
    
    lbl_share_msg: 'to earn Rs.75 Lk credits, while I get Rs.75 Lk credits on your first order completion.',
    lbl_share_msg_suffix: '\nDownload LaundroKart app from below link\n',
    

    //Dateslot
    lbl_pickup_date_slot: 'Pickup Date & Time',
    lbl_delivery_date_slot: 'Delivery Date & Time',

    //Store
    lbl_search_location: 'Search for your location',
    lbl_store_prefix: 'LaundroKart-',
    lbl_err_title: 'Error',
    lbl_err_msg: 'Something went wrong. Please try again later!!',
    lbl_NotAvailable: 'Not available',
    lbl_alreadyExists: "Already exists",

    //Tabs
    tab_home: 'HOME',
    tab_store: 'STORE',
    tab_schedule: 'SCHEDULE',
    tab_wallet: 'WALLET',
    tab_orders: 'MY ORDERS',

    // Refer Friends
    lbl_referral_code: 'REFERAL CODE',
    lbl_invite_friend: 'Invite friend and both of you get ',
    lbl_lk_credits: ' LK Credits',
    // delivery method component
    lbl_delivery_hrs: 'Delivery in xx hours',

    //Location permission
    permission_denied_msg: 'Location permission is denied. Please grant permission from application settings!!',

    // OTP
    hi: "Hi",
    otpMissing: "OTP Missing",
    otpReq: "OTP is required",
    changeNumber: "< CHANGE NUMBER",
    enterOtpSentTo: "Enter the OTP sent to",
    dontRecOtp: "Didn't receive the OTP?",
    resendOtp: "RESEND OTP",

    // contact_us
    msg_missing: 'Alert',
    lbl_success: 'Success',
    msg_blank: 'Message should not be blank. Please enter valid message!!',
    msg_sent: 'Message sent sucessfully.',
    or: "or",


    //Edit Profile
    lbl_dob: 'Select Birth Date',
    lbl_validation: 'Validate',

    // loginScreen
    mobilePrefix: "+91 ",
    welcomeText: "Welcome,",
    loginText: "Login to LaundroKart",
    orLoginWith: "Or login with",

    // myorders
    invoice: "INVOICE",
    cancelOrder: "CANCEL ORDER",
    editOrder: "EDIT ORDER",
    viewDetails: "VIEW DETAILS",
    feedback: "FEEDBACK",
    noOrders: "NO ACTIVE ORDERS",
    noRecentOrders: "There are no recent orders to show",
    orderDelivered: "Your Order has been successfully delivered",
    orderCancelled: "Unfortunately! Your order has been cancelled",
    rateExperience: "Please rate your experience",
    orderNo: " Order Number - ",
    download: "Download",
    noInvoice: "No invoice found",

    // orderDetails
    DeliveryCharges: "Delivery Charges",
    PackagingCharges: "Packaging Charges",
    OtherCharges: "Other Charges",
    AddOn: "Add On service amount",
    Discount: "Discount",
    cgst: "CGST",
    sgst: "SGST",
    orderID: "ORDER ID - ",
    taxCharges: "Taxes & Charges",
    adjustedAdmin: 'Adjusted by Admin',
    paidLess: 'Paid Less Amount',
    reqID: "REQUEST ID - ",
    pickAdd: "Pickup address",
    Add: "Address",
    pickDateTime: "Pickup date & time",
    deliveryDateTime: "Delivery date & time",
    deliveryDate: "Delivery date",
    readyDelivery: "Order Ready for Delivery",
    outProcessing: "Out for Processing",
    delivered: "Order Delivered",
    previousPaymentPending: "*Previous payment pending",
    total: "Total",
    payNow: "Pay Now",
    paymentDone: "Payment done successfully",
    walletAdjusted: "adjusted as LK Wallet Bonus",
    totalPay: "Total payable amount",
    totalAmountPay: "Total amount to be paid",
    note: "Note : ",
    totalWeight: "Total Weight",
    totalsqft : "Total Square Foot",
    viewMore : "(view more)",
    paymentSuccess : "Payment Successful",
    

    // notfication
    dismiss: "DISMISS",
    clearAll: "CLEAR ALL",
    noNotification: "NO NOTIFICATIONS YET",

    //Lk Wallet
    package_prefix: 'Avail wash worth ₹ ',
    package_suffix: ' with this package',
    buy: 'BUY',
    package_buy_success: 'Package bought sucessfully!!',
    load_more: 'LOAD MORE',
    enter_code: "Enter Code",
    coupon_sucess: 'Coupon redeemed successfully!',

    // homeScreen 
    inviteCredits: "Invite friends to LaundroKart & earn",
    lkCredit: "LK Credits",
    starDryClean: "5 Star Dry Cleaning",
    dryCleaning: "Dry Cleaning",
    Laundry: "Laundry",
    shoeLaundry: "Shoe Laundry",
    carpetClean: "Carpet Cleaning",
    Upholstery: "Upholstery",
    DarningDying: "Darning & Dying",

    //success modal
    thank_txt: 'Thank you for choosing us',
    thankContact_txt: 'Thank you for contacting us',
    reqId: "REQUEST ID - ",
    buy_package_remark: 'Bought from Customer app',

    //price list screen
    knowMore: "know more",
    exclusiveGST :"Prices are exclusive GST",

    //schedule pickup screen
    CHANGE: "CHANGE",
    ADD: "ADD",
    selectServices: "Select Services",
    minOrder: "Minimum delivery charges of Rs. 49 applicable for all orders",
    pickupSummary: "Pickup Summary",
    pickupDateTime: "Pickup date & time",
    deliveryDateTime: "Delivery date & time",
    services: "Services",
    Promocode: "Promocode",
    remark: "Remark",
    pickupAlreadyExist: "Pickup already exists",
    promo_applied: "Promocode applied successfully!",

    // select location map screen
    delete: "DELETE",
    useCurrLocation: "Use Current Location",
    savedAdd: "Saved Address",

    // select location map screen
    enterAddDetails: "Enter address details",
    home: "HOME",
    office: "OFFICE",
    other: "OTHER",

    // transaction screen
    cash: "CASH",
    redeemCoupan: "Redeem Coupon",
    Packages: "Packages",

    //paytm
    payment: 'Payment',
    payment_failed_msg: 'Payment failed ! Please try it again.',

    lbl_status: 'Status'

  },
});

export default strings;
