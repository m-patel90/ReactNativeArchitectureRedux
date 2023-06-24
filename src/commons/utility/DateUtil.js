class DateUtil {
  getDateForAPI = () => {
    let date = new Date();
    let str =
      date.getFullYear().toString() +
      date.getMonth().toString() +
      date.getDate() +
      date.getHours().toString() +
      date.getMinutes().toString() +
      date.getSeconds().toString() +
      date.getMilliseconds().toString();
    return str;
  };
}

export default new DateUtil();
