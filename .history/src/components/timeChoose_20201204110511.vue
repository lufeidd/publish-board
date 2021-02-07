<template>
  <div class="time-choose">
    <span class="time-text">统计时间 {{ dateText }}</span>
    <span class="time-picker">
      <span :class="dateType == 2 ? 'picker active' : 'picker'">周</span>
      <a-week-picker
        class="week"
        placeholder="Select Week"
        :allowClear="false"
        @change="weekChange"
        :disabledDate="disabledEndWeek"
        :value="chooseWeek"
      />
    </span>
    <span class="time-picker">
      <span :class="dateType == 3 ? 'picker active' : 'picker'">月</span>
      <a-month-picker
        class="week"
        :allowClear="false"
        @change="monthChange"
        placeholder="Select month"
        :value="chooseMonth"
        :disabledDate="disabledEndMonth"
      />
    </span>
    <span class="time-picker">
      <span :class="dateType == 4 ? 'picker active' : 'picker'">年</span>
      <span
        @click.stop="showYear = true;$emit('closeDom')"
      >
        <a-date-picker
          class="week"
          :allowClear="false"
          mode="year"
          format="YYYY"
          :open="showYear"
          @panelChange="yearChange($event)"
          :value="chooseYear"
          :disabledDate="disabledEndDate"
          inputReadOnly
        />
      </span>
    </span>
    <span class="time-picker">
      <span :class="canSub ? 'picker' : 'picker disabled'" @click="subLeft">
        <a-icon type="left" />
      </span>
    </span>
    <span class="time-picker">
      <span :class="canAdd ? 'picker' : 'picker disabled'" @click="addRight">
        <a-icon type="right" />
      </span>
    </span>
  </div>
</template>
<style scoped lang="scss">
.time-choose {
  & .time-text {
    font-size: $fontSize - 2;
  }
  & .time-picker {
    position: relative;
    display: inline-block;
    // cursor: pointer;
    margin-left: 10px;

    & .picker {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      color: $themeColor80;
      box-sizing: border-box;
      border: 1px solid $themeColor80;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      font-size: $fontSize - 2;

      &.active {
        background-color: $themeColor80;
        color: $clf;
      }
      &.disabled {
        cursor: not-allowed;
        border-color: $themeColor20;
        color: $themeColor20;
      }
    }

    & .week {
      width: 32px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
<script>
export default {
  data() {
    return{
      cycle: "",
      dateType: 2,
      oneDay: "",
      showYear: false,
      chooseWeek: null,
      chooseMonth: null,
      chooseYear: null,
      dateText: "",
      canSub: true,
      canAdd: false,
    }
  },
  mounted(){
    this.cycle = this.$weekDate().weekth;
    this.oneDay = this.$weekDate().start.replace(/-/g, "");
    this.chooseWeek = this.$weekDate().start;
    this.chooseMonth = this.$weekDate().start;
    this.chooseYear = this.$weekDate().start;
    this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
  },
  methods:{
    weekChange(date, dateString) {
      // var _day = date._d.getDate();
      const startDate = date.day(1).format("YYYY-MM-DD"); // 周一日期
      const endDate = date.day(7).format("YYYY-MM-DD"); // 周日日期
      // console.log(666, date, dateString.replace(/-|周/g, ""));
      let _weekth = date.week();
      if (_weekth < 10) {
        _weekth = "0" + _weekth;
      }
      if (
        startDate <
        this.$moment()
          .startOf("week")
          .format("YYYY-MM-DD")
      ) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
      this.dateType = 2;
      this.chooseWeek = startDate;
      this.dateText = startDate + "~" + endDate;
      this.cycle = dateString.split("-")[0] + _weekth;
      this.oneDay = startDate.replace(/-/g, "");
      this.$emit("changeTime");
    },
    monthChange(date, dateString) {
      // var _day = date._d.getDate();
      const startDate = date
        .month(date.month())
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = date
        .month(date.month())
        .endOf("month")
        .format("YYYY-MM-DD");
      // console.log(dateString, startDate, endDate);
      let _month = date.month() + 1;
      if (_month < 10) {
        _month = "0" + _month;
      }
      if (
        startDate <
        this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD")
      ) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
      this.dateType = 3;
      this.chooseMonth = startDate;
      this.dateText = startDate + "~" + endDate;
      this.cycle = dateString.split("-")[0] + _month;
      this.oneDay = startDate.replace(/-/g, "");
      this.$emit("changeTime");
    },
    yearChange(e) {
      if (
        e._d.getFullYear().toString() >=
        this.$moment().format("YYYY")
      ) {
        this.chooseYear = this.$moment().format("YYYY");
        this.canAdd = false;
      } else {
        this.chooseYear = e._d.getFullYear().toString();
        this.canAdd = true;
      }
      console.log(666,this.chooseYear)
      this.dateType = 4;
      this.cycle = this.chooseYear;
      this.oneDay = this.$moment(this.chooseYear)
        .format("YYYY-MM-DD")
        .replace(/-/g, "");
      this.dateText =
        this.chooseYear + "-01-01 ~ " + this.chooseYear + "-12-31";
      this.showYear = false;
      this.$emit("changeTime");
    },
    subLeft() {
      let _max = "";
      if (this.dateType == 2) {
        _max = this.$weekDate().start;
        if (this.chooseWeek <= _max) {
          let end = this.$moment(this.chooseWeek)
            .week(this.$moment(this.chooseWeek).week() - 1)
            .endOf("week")
            .format("YYYY-MM-DD");
          this.chooseWeek = this.$moment(this.chooseWeek)
            .week(this.$moment(this.chooseWeek).week() - 1)
            .startOf("week")
            .format("YYYY-MM-DD");
          this.cycle = this.$getCurrenWeek(this.chooseWeek);
          this.oneDay = this.chooseWeek.replace(/-/g, "");
          this.dateText = this.chooseWeek + "~" + end;
          this.canAdd = true;
        }
      } else if (this.dateType == 3) {
        _max = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        if (this.chooseMonth <= _max) {
          let end = this.$moment(this.chooseMonth)
            .month(this.$moment(this.chooseMonth).month() - 1)
            .endOf("month")
            .format("YYYY-MM-DD");
          this.chooseMonth = this.$moment(this.chooseMonth)
            .month(this.$moment(this.chooseMonth).month() - 1)
            .startOf("month")
            .format("YYYY-MM-DD");
          this.cycle = this.$moment(end).format("YYYY-MM").replace(/-/,"");
          this.oneDay = this.chooseMonth.replace(/-/g, "");
          this.dateText = this.chooseMonth + "~" + end;
          this.canAdd = true;
        }
      } else if (this.dateType == 4) {
        _max = this.$moment().format("YYYY");
        // console.log(111, this.chooseYear, _max, this.chooseYear <= _max);
        if (this.chooseYear <= _max) {
          this.chooseYear = (Number(this.chooseYear) - 1).toString();
          this.cycle = (Number(this.cycle) - 1).toString();
          this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
          this.oneDay = this.$moment(this.chooseYear)
            .format("YYYY-MM-DD")
            .replace(/-/g, "");
          this.canAdd = true;
        }
      }
      this.$emit("changeTime");
    },
    addRight() {
      if (this.canAdd) {
        let _max = "";
        if (this.dateType == 2) {
          _max = this.$weekDate().start;
          if (this.chooseWeek < _max) {
            let end = this.$moment(this.chooseWeek)
              .week(this.$moment(this.chooseWeek).week() + 1)
              .endOf("week")
              .format("YYYY-MM-DD");
            this.chooseWeek = this.$moment(this.chooseWeek)
              .week(this.$moment(this.chooseWeek).week() + 1)
              .startOf("week")
              .format("YYYY-MM-DD");
            this.cycle = this.$getCurrenWeek(this.chooseWeek);
            this.oneDay = this.chooseWeek.replace(/-/g, "");
            this.dateText = this.chooseWeek + "~" + end;
            if (this.chooseWeek >= _max) this.canAdd = false;
          }
        } else if (this.dateType == 3) {
          _max = this.$moment()
            .startOf("month")
            .format("YYYY-MM-DD");
          if (this.chooseMonth < _max) {
            let end = this.$moment(this.chooseMonth)
              .month(this.$moment(this.chooseMonth).month() + 1)
              .endOf("month")
              .format("YYYY-MM-DD");
            this.chooseMonth = this.$moment(this.chooseMonth)
              .month(this.$moment(this.chooseMonth).month() + 1)
              .startOf("month")
              .format("YYYY-MM-DD");
            this.cycle = this.$moment(end).format("YYYY-MM").replace(/-/,"");
            this.oneDay = this.chooseMonth.replace(/-/g, "");
            this.dateText = this.chooseMonth + "~" + end;
            if (this.chooseMonth >= _max) this.canAdd = false;
          }
        } else if (this.dateType == 4) {
          _max = this.$moment().format("YYYY");
          if (this.chooseYear < _max) {
            this.chooseYear = (Number(this.chooseYear) + 1).toString();
            this.cycle = (Number(this.cycle) + 1).toString();
            this.oneDay = this.$moment(this.chooseYear)
              .format("YYYY-MM-DD")
              .replace(/-/g, "");
            this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
            if (this.chooseYear >= _max) this.canAdd = false;
          }
        }
        this.$emit("changeTime");
      }
    },
    disabledEndWeek(endValue) {
      const startValue = this.$moment(this.$currenTime);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() <= endValue.valueOf();
    },
    disabledEndMonth(endValue) {
      // const startValue = new Date(this.$currenTime);
      const startValue = this.$moment(this.$currenTime);
      console.log(endValue.year(),startValue.year());
      if (!endValue || !startValue) {
        return false;
      }
      if(startValue.year() >= endValue.year()){
        consoe
        return (startValue.month() + 1) <= endValue.month();
      }
    },
    disabledEndDate(endValue) {
      // const startValue = new Date(this.$currenTime);
      const startValue = this.$moment(this.$currenTime);
      // console.log(endValue,startValue);
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() <= endValue.valueOf();
    },
  }
};
</script>
