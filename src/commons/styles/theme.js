import {Dimensions} from 'react-native'
import ScreenUtil from '../utility/ScreenUtil'
import { isXL, hp } from '../utility/Dimens';
const colors={
    primaryColor:'#011F5B',
    lightButtonColor:'#5EB1BF',
    lightTextColor:'#5EB1BF',
    darkTextColor:'#011F5B',
    grayTextColor:'#BDBDBE',
    neroColor:'#1C1C1C',
    pink:'#EC1672',
    grey:'#6D6D6D',
    iconColor:'#ED0170',    
    lightPink:'#FFF2F8',
    border:'#FFDCED',
    light_blue:'#664384',
    grey:'#F1F1F1'    
}

const fonts={
    smallFont:isXL()?hp(1)*0.75 : ScreenUtil.getPercentage(1),
    smallMediumFont:isXL()?hp(1.25)*0.75 : ScreenUtil.getPercentage(1.25),
    mediumFont:isXL()?hp(1.9)*0.75 :hp(1.9),
    mediumLargeFont:isXL()?hp(2.3)*0.75 :hp(2.3),
    largeFont:isXL()?hp(2.8)*0.75 :hp(2.8),
    normalElevation:16,
    highElevation:24    
}

const spacings={
    smallSpace:ScreenUtil.getPercentage(2),
    smallMediumSpace:ScreenUtil.getPercentage(2.5),
    mediumSpace:ScreenUtil.getPercentage(2.6),
    mediumLargeSpace:ScreenUtil.getPercentage(2.75),
    largeSpace:ScreenUtil.getPercentage(3),
}

const defaultColors={
    white:'white',
    black:'black',
    transparent:'transparent',
    red : 'red',
    gray : 'gray',
    blue : 'blue',
    green : 'green',
    purple: '#623E81',
    pink: "#FFF2F8"    
}
export {colors,fonts,spacings,defaultColors}
// const appIcons={
//     success:require('../../assets/images/common/transaction_success/success.png'),
//     failure: require('../../assets/images/common/transaction_failed/transactionFailed.png'),
//     placeHolder:require('../../assets/images/imgplaceholder.png'),
//     logo:require('../../assets/images/splash/logo/logo.png')
// }
// export {colors,fonts,spacings,defaultColors,appIcons}
