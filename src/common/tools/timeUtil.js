import moment from 'moment';
function Time() {
  this.curDate = moment();
}
Time.prototype = {
  getCurWeekDay: function () {  //有问题 慎用
    const week = this.curDate.isoWeekday();
    return moment().subtract(week).format('YYYY-MM-DD')

  },
  getCurMonth: function () {
    const month = this.curDate.month();
    const formatMonth = moment().month(month).format('YYYY-MM-DD');
    const endNum = formatMonth.length - 3;
    return `${formatMonth.slice(0, endNum)}-01`;
  },
  getCurSeason: function () {
    // 每个季度开头的月份，构造的时候-1
    const seasonKey = [1, 4, 7, 9];
    const quarter = this.curDate.quarter();
    const startMonth = seasonKey[quarter - 1] - 1;
    const formatQuarter = moment().month(startMonth).format('YYYY-MM-DD');
    const endNum = formatQuarter.length - 3;
    return `${formatQuarter.slice(0, endNum)}-01`;
  },
  getCurYear: function () {
    const year = this.curDate.year();
    const formatMonth = moment().year(year).format('YYYY-MM-DD');
    return `${formatMonth.slice(0, 4)}-01-01`;
  },

  // 新增方法：获取本周开始日期   日期有问题，需解决？？？
  getCurWeek: function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var date = now.getDate(); //获取当前日(1-31)
    var day = now.getDay(); //获取当前星期X(0-6,0代表星期天)
    var n = day !== 0 ? day - 1 : 7 - 1;
    if (date - day >= 0) {  //本周开始日期在当前月份
        date = date - n;
    } else {    //在上一个月份
        if (month != 1) {  //在当前年
            month -= 1;
            var last = new Date(year, month, 0);
            var lastDate = last.getDate();
            date = lastDate + date - n;

        } else {  //在上一年12月份
            year -= 1;
            month = 12;
            date = 31 + date - n;
        }
    }
    return year + '-' + month + '-' + date;
  },

  getAllDate: function () {
    return {
      firstDayWeek: this.getCurWeekDay(),
      yesterDay: moment().subtract(1, "days").format('YYYY-MM-DD'),
      recent7Day: moment().subtract(7, "days").format('YYYY-MM-DD'),
      recent30Day: moment().subtract(30, "days").format('YYYY-MM-DD'),
      curMonth: this.getCurMonth(),
      curSeason: this.getCurSeason(),
      curYear: this.getCurYear(),
      curweek: this.getCurWeek(),
    }
  }
}
export default Time;
