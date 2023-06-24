/**
 * This is a utitlity class used for getting dynamic values according to screen sizes
 */
import {Dimensions, PixelRatio} from 'react-native';
class ScreenUtil {
  /**
   * this method will return the precentage of the total screen width
   * @param {percent} PropTypes.number,
   */
  getPercentage = percent => {
    return (Dimensions.get('window').height * percent) / 100;
  };

  /**
   * this method will return the precentage of the total screen width
   * @param {percent} PropTypes.number,
   */
  getWidthPercentage = percent => {
    return (Dimensions.get('window').width * percent) / 100;
  };
}

const util = new ScreenUtil();
export default util;
