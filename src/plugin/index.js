
export default {
  install: function (Vue, options) {
    // 全局loading
    Vue.prototype.$loading = false;
    // 获取当前时间
    Vue.prototype.$getDate = function () {
      let time = new Date("2013-12-30");
      let _year = time.getFullYear();
      let _month = time.getMonth() + 1;
      let _date = time.getDate();
      if (_month < 10) _month = '0' + _month;
      if (_date < 10) _date = '0' + _date;
      return _year + '-' + _month + '-' + _date;
    };
    // 昨天日期
    Vue.prototype.$beforeDate = function () {
      let now = new Date("2013-12-30");
      let _time = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      let _year = _time.getFullYear();
      let _month = _time.getMonth() + 1;
      let _date = _time.getDate();
      if (_month < 10) _month = '0' + _month;
      if (_date < 10) _date = '0' + _date;
      return _year + '-' + _month + '-' + _date;
    }
    // 获取当前时间的上一周日期
    Vue.prototype.$weekDate = function () {
      // console.log(new Date("2013-12-30"));
      let now = new Date("2013-12-30"), beginTime = "", endTime = "",lastWeek={};
      var weekDate = new Date(now.getTime() - 7 * 24 * 3600 * 1000);// 计算开始时间用
      var weekDate2 = new Date(now.getTime() - 7 * 24 * 3600 * 1000);// 计算结束时间用

      var day = weekDate.getDay();
      var time = weekDate.getDate() - day + (day === 0 ? -6 : 1);

      var startDate = new Date(weekDate.setDate(time));
      var endDate = new Date(weekDate2.setDate(time + 6));
      let startMonth = startDate.getMonth() + 1,
      startDay = startDate.getDate(),
      endMonth = endDate.getMonth() + 1,
      endDay = endDate.getDate();
      if (startMonth < 10) startMonth = '0' + startMonth;
      if (startDay < 10) startDay = '0' + startDay;
      if (endMonth < 10) endMonth = '0' + endMonth;
      if (endDay < 10) endDay = '0' + endDay;

      beginTime = startDate.getFullYear() + '-' + startMonth + '-' + startDay;
      endTime = endDate.getFullYear() + '-' + endMonth + '-' + endDay;
      var today = new Date("2013-12-30");
      var firstDay = new Date(today.getFullYear(), 0, 1);
      var dayOfWeek = firstDay.getDay();
      var spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
      var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
      var result = Math.ceil(d / 7);
      lastWeek.start = beginTime;
      lastWeek.end = endTime;
      if(result < 10) result = '0' + result;
      lastWeek.weekth = today.getFullYear() + result.toString();
      return lastWeek;
    }
    // 验证码倒计时
    Vue.prototype.$countDown = function (options) {
      let self = this
      let time = options.time

      if (typeof time === 'number') {
        this.clock = window.setInterval(() => {
          if (time === 0) {
            clearInterval(this.clock)
            self.desc = "重新发送"
            return false
          }
          time--
          options.time = time;
        }, 1000)
      } else {
        // self.$toast('时间格式不正确')
      }
    },
    // 侧边栏高度设置
    Vue.prototype.$setSlideHeight = function () {
      var _height = document.getElementsByClassName('main-container')[0].offsetHeight + 'px';
      document.getElementById("slideNav").style.height = _height;
      // console.log('高度',_height);
    }
  }
}
