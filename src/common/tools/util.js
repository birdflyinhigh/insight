import moment from 'moment';
export const Methods = {
  getYear: () => {
    return (new Date()).getFullYear();
  },
  getMonth: () => {
    return (new Date()).getMonth() + 1;
  },
  getLastYear: () => {
    // Jan, get last full year Dec
    if((new Date()).getMonth() === 0){
      return (new Date()).getFullYear() - 1;
    }
    // cur year, pass Jan
    return (new Date()).getFullYear();
  },
  getLastMonth: () => {
    // Jan, get last full year Dec
    if((new Date()).getMonth() === 0){
      return 12;
    }
    // cur month
    return (new Date()).getMonth() + 1;
  },
  generateMonth: (end)=>{
    let aMonth = [];
    let endMonth = end ? end : 13;
    for(let i = 1; i < endMonth; i++){
      aMonth.push({
        key: i,
        value: i + "月"
      });
    }
    return aMonth;
  },
  generateYear: (startYear) => {
    let curYear = (new Date()).getFullYear();
    let aYear = [];
    for(let i = curYear; i >= startYear; i--){
      aYear.push(i);
    }
    return aYear;
  },
  generateUniYearMonths: (year = (new Date().getFullYear)) => {
    let tempMonth = Methods.generateMonth(Methods.getMonth() + 1);
    if(year != (new Date()).getFullYear()){
      // not cur year, full 12 months
     tempMonth = Methods.generateMonth();
    }
    // default curMonth or last year curMonth
    let tempMonthId = tempMonth[tempMonth.length - 1]["key"];
    return {
      tempMonth,
      tempMonthId
    }
  },
  generateHref: (lastPart) => {
    let root = window.location.href.split('/')[0];
    return (root + '/' + lastPart);
  },
  computeTableLen: (data) => {
    let len = 0;
    data.forEach((item, index) => {
      item.forEach((item1, index1) => {
        len += item1.length;
      });      
    });
    return len;
  },
  getNextPage(curPage, pageSize, data){
    //从0开始
    let temp = {};
    let len = 0;
    if(data instanceof Array){
      return {
        data:[],
        total: 1
      };
    }else{
      for(let key in data){
        len = data[key].length;
        temp[key] = data[key].slice(curPage*pageSize, (curPage + 1)*pageSize);
      }
      return {
        data:temp,
        total: len
      };
    }
  }
}
export const ComptUtils = {
  getLocationProps: (props, key) => {
    let locationState = props.location.state;
    if(!locationState) return props[key];
    return typeof locationState[key] !== 'undefined' ? locationState[key] : props[key];
  },
  generateToolArr: (str) => {
    return str.split("</br>");
  }
}