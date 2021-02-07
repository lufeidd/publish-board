// 引入时间戳
import crypto from "crypto";
import {COMMON_TIMESTAMP} from "../apis/common.js";
import { message } from 'ant-design-vue';

export default {
  install: function (Vue, options) {
    // 全局页面loading
    Vue.prototype.$isLoading = true;
    // 系统错误码
    Vue.prototype.$systemCode = /^1\d{3}$/;
    // 当前时间
    Vue.prototype.$currenTime = new Date();
    // "2010-03-01"
    // 接口请求地址
    // Vue.prototype.$baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/apis';
    Vue.prototype.$baseUrl = window.location.protocol + "//" + window.location.hostname + '/apis';
    // 全局提示
    Vue.prototype.$globalTip = function(type, content, code){
      if (code == 1008) {
        localStorage.setItem("loginState", 0);
        this.$router.push({ name: "loginindex" });
        return;
      } else if (code == 5015) {
        this.$router.push({ name: "improve" });
        return;
      } else if (this.$systemCode.test(code)) {
        content = "系统错误";
      }
      switch (type) {
        case 1:
          message.info({
            content: content,
            icon: <a-icon type="exclamation-circle" />,
          });
          break;
        case 2:
          message.info({
            content: content,
            icon: <a-icon type="bell" />,
          });
          break;
      }
    }
    // 获取当前时间
    Vue.prototype.$getDate = function () {
      // let time = new Date();
      let time = this.$currenTime;
      let _year = time.getFullYear();
      let _month = time.getMonth() + 1;
      let _date = time.getDate();
      if (_month < 10) _month = '0' + _month;
      if (_date < 10) _date = '0' + _date;
      return _year + '-' + _month + '-' + _date;
    };
    // 昨天日期
    Vue.prototype.$beforeDate = function () {
      let now = this.$currenTime;
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
      let now = this.$currenTime,
      beginTime = "", endTime = "",lastWeek={};
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
      lastWeek.start = beginTime;
      lastWeek.end = endTime;
      lastWeek.weekth = this.$getCurrenWeek(beginTime);
      // console.log('是的',vYearAndWeek);
      return lastWeek;
    }
    // 获取某个时间是当年的第几周
    Vue.prototype.$getCurrenWeek = function(time){
      var _midval = new this.$moment(time).format("YYYY-MM-DD");
      var vNowDate=this.$moment(_midval);//.add('month',0).add('days',-1);
      var vWeekOfDay=this.$moment(vNowDate).format("E");//算出这周的周几
      var vWeekOfDays=7-vWeekOfDay-1;
      var vStartDate=this.$moment(vNowDate).add(vWeekOfDays,'days');
      var vYearAndWeek=new Date(time).getFullYear()+this.$moment(vStartDate).format("WW");
      // console.log('66',time,vYearAndWeek)
      return vYearAndWeek;
    }
    // 验证码倒计时
    Vue.prototype.$countDown = function (options) {
      let self = this;
      let time = options.time;

      if (typeof time === 'number') {
        this.clock = window.setInterval(() => {
          if (time === 0) {
            clearInterval(this.clock);
            self.desc = "重新发送";
            return false;
          }
          time--;
          options.time = time;
        }, 1000)
      } else {
        // self.$toast('时间格式不正确')
      }
    },
    // 新窗口打开品种详情
    Vue.prototype.$toDetail = function (id) {
      let _url =
        window.location.href.split("#")[0] +
        "#" +
        "/publish/detail?goods_id=" +
        id;
      window.open(_url, "_blank");
    }
    // 新窗口打开作者详情 author_id
    Vue.prototype.$toAuthor = function (id) {
      let _url =
        window.location.href.split("#")[0] +
        "#" +
        "/industry/authordetail?author_id=" +
        id;
      window.open(_url, "_blank");
    }

    // 本地和服务器的时间差值
    Vue.prototype.diffTime = 0
     // 获取并储存服务器和本地时间差
     Vue.prototype.$getServerTime = async function () {
      let data = {
        version: "1.0"
      }
      let localTime = new Date().getTime();
      let res = await SERVER_TIME(data);
      let serverTime = res.response_data.timestamp * 1000;
      this.diffTime = serverTime - localTime;
    }
    // 计算时间戳
    Vue.prototype.$getTimeStamp = function () {
      let localTime = new Date().getTime();
      let timeStamp = parseInt((localTime + this.diffTime) / 1000);
      return timeStamp;
    }
    // ksort
    Vue.prototype.$ksort = function (inputArr) {
      // original by: GeekFG (http://www.0-php.com)
      var tmp_arr = {},
        keys = [],
        sorter,
        i,
        k,
        that = this,
        strictForIn = false,
        populateArr = {};

      // switch (sort_flags) {
      // case "SORT_STRING":
      //   // compare items as strings
      //   sorter = function (a, b) {
      //     return that.strnatcmp(a, b);
      //   };
      //   break;
      // case "SORT_LOCALE_STRING":
      //   // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
      //   var loc = this.i18n_loc_get_default();
      //   sorter = this.php_js.i18nLocales[loc].sorting;
      //   break;
      // case "SORT_NUMERIC":
      //   // compare items numerically
      //   sorter = function (a, b) {
      //     return a + 0 - (b + 0);
      //   };
      //   break;
      // case 'SORT_REGULAR': // compare items normally (don't change types)
      // default:
      sorter = function (a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + "" === a,
          bNumeric = bFloat + "" === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      // break;
      // }

      // Make a list of key names
      for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
          keys.push(k);
        }
      }
      keys.sort(sorter);

      // BEGIN REDUNDANT
      this.php_js = this.php_js || {};
      this.php_js.ini = this.php_js.ini || {};
      // END REDUNDANT
      strictForIn =
        this.php_js.ini["phpjs.strictForIn"] &&
        this.php_js.ini["phpjs.strictForIn"].local_value &&
        this.php_js.ini["phpjs.strictForIn"].local_value !== "off";
      populateArr = strictForIn ? inputArr : populateArr;

      // Rebuild array with sorted key names
      for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
          delete inputArr[k];
        }
      }
      for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
          populateArr[i] = tmp_arr[i];
        }
      }

      return strictForIn || populateArr;
    }
    // 签名
    Vue.prototype.$getSign = function (data) {
      let str = "";
      data = this.$ksort(data);

      Object.keys(data).forEach(function (key) {
        str += key + data[key];
      });
      data = this.$getmd5(str).toUpperCase();

      // console.log("排序并拼接后的data:", str);
      return data;
    }
    Vue.prototype.$getmd5 = function (str) {
      var res;
      var md5 = crypto.createHash("md5");
      //update("中文", "utf8")
      md5.update(str);
      var res = md5.digest("hex");
      // console.log("md5:", res);
      return res;
    }
  }
}
