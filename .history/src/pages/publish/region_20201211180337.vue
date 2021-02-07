<template>
  <div id="regionPage" @click="$refs.time.showYear = false">
    <HeadNav type="publish" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="region"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
            <div class="model-container">
              <div class="model-bg clearfix" style="padding:7px 15px;">
                <div class="float-left"></div>
                <div class="float-right">
                  <TimeChoose ref="time" @changeTime="changeTime"></TimeChoose>
                </div>
              </div>
            </div>
            </a-affix>
            <!-- 地域简况 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">地域简况</div>
                <div class="clearfix">
                  <div
                    class="float-left"
                    style="position:relative;padding-top:15px;margin-left:-30px;"
                  >
                    <div id="map" style="height:284px;width:520px;"></div>
                  </div>
                  <div class="float-left">
                    <div class="container">
                      <div class="content">
                        <div class="title">销售指数排名前5名</div>
                        <p class="desc">
                          <span v-if="cityTop">{{cityTop}}</span>
                          <span v-else>--</span>
                        </p>
                        <div class="title">销售增长最多</div>
                        <p class="desc">
                          <span v-if="incrTop.name">{{incrTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text red"
                            v-if="incrTop.compare_rate > 0"
                          >+{{incrTop.compare_rate}}%</span>
                          <span v-else class="text red">--</span>
                        </p>
                      </div>
                      <div class="content">
                        <div class="title">读者基数最高</div>
                        <p class="desc">
                          <span v-if="readerTop.name">{{readerTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text"
                            v-if="readerTop.reader_total"
                          >{{readerTop.reader_total}}</span>
                          <span class="text" v-else>--</span>
                        </p>
                        <div class="title">销售下降最多</div>
                        <p class="desc">
                          <span v-if="decrTop.name">{{decrTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text green"
                            v-if="decrTop.compare_rate < 0"
                          >{{decrTop.compare_rate}}%</span>
                          <span class="text green" v-else>--</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 地域排行 -->
            <div class="model-container">
              <div class="model-bg" style="min-height:254px;padding-bottom:20px;">
                <div class="section-title">地域排行</div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="60" />
                      <col width="200" />
                      <col width="270" />
                      <col width="120" />
                      <col width="120" />
                      <col width="280" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align:center;">排名</td>
                        <td>省份</td>
                        <td style="text-align:right;">读者基数</td>
                        <td style="text-align:right;">销售指数</td>
                        <td style="text-align:right;">上期对比</td>
                        <td style="text-align:right;">说明</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td style="text-align:center;">{{item.rank}}</td>
                        <td>
                          <span class="main-font">{{item.name}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span v-if="item.reader_total">{{item.reader_total}}</span>
                            <span v-else>--</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="percent" v-if="item.compare_rate > 0">+{{item.compare_rate}}%</span>
                          <span class="green" v-else-if="item.compare_rate  < 0">{{item.compare_rate}}%</span>
                          <span v-else>{{item.compare_rate}}</span>
                        </td>
                        <td
                          style="text-align:right;"
                          v-if="item.rank_compare < 0"
                        >较上期排名上升 {{item.rank_compare*-1}} 名</td>
                        <td
                          style="text-align:right;"
                          v-else-if="item.rank_compare > 0"
                        >较上期排名下降 {{item.rank_compare}} 名</td>
                        <td style="text-align:right;" v-else>{{}}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style lang="scss" scoped>
#regionPage {
  padding-bottom: 20px;
  & .container {
    padding: 15px;
    & .content {
      display: inline-block;
      margin-left: 50px;
      & .title {
        font-size: $fontSize - 2;
      }
      & .desc {
        color: $fontColor1;
        margin-top: 10px;
        margin-bottom: 20px;
        & .text {
          margin-left: 40px;
          &.red {
            color: $red;
          }
          &.green {
            color: $green;
          }
        }
      }
    }
  }
}
</style>
<script>
import { MYREGION_INDEX } from "../../apis/publish.js";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
export default {
  data() {
    return {
      pagePower: true,
      cityTop: "",
      readerTop: {
        name: "",
        reader_total: 0
      },
      incrTop: {
        name: "",
        compare_rate: 0
      },
      decrTop: {
        name: "",
        compare_rate: 0
      },
      list: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await MYREGION_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data.rank_list;
        this.cityTop = res.data.sale_top;
        this.readerTop = res.data.reader_top;
        this.incrTop = res.data.incr_top;
        this.decrTop = res.data.decr_top;
        setTimeout(()=>{
          this.initMap();
        },500)
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message,res.code);
        }

      }
    },
    changeTime(){
      this.isLoading = true;
      this.getData();
    },
    initMap() {
      let _this = this;
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: "blank",
          autoFit: true,
          zoom: 3,
          minZoom: 1,
          maxZoom: 10
        })
      });
      scene.setMapStatus({
        dragEnable: false, //是否允许地图拖拽
        keyboardEnable: false, // 是否允许形键盘事件
        doubleClickZoom: false, // 双击放大
        zoomEnable: false, // 滚动缩放
        rotateEnable: false // 旋转
      });
      const attachMapContainer = document.createElement("div");
      attachMapContainer.id = "attach";
      attachMapContainer.style.cssText =
        "position: absolute;height:80px;width:50px;right:50px;bottom:20px;border:1px solid #F4F7FD;";
      document.getElementById("map").parentElement.append(attachMapContainer);

      scene.on("loaded", () => {
        new CountryLayer(scene, {
          data: [],
          joinBy: ["NAME_CHN", "name"],
          depth: 1,
          provinceStroke: "#FFF",
          stroke: "#D1DDF5",
          countyStroke: "#FFF",
          cityStroke: "#FFF",
          cityStrokeWidth: 0,
          // chinaNationalWidth: 0,
          coastlineWidth: 0,
          chinaNationalStroke: "#D1DDF5",
          label: {
            enable: false
          },
          fill: {
            color: {
              field: "NAME_CHN",
              values:
                ("name",
                function(value) {
                  // console.log(value)
                  let _arr = _this.cityTop.split("、");
                  // console.log(_arr)
                  if (value.indexOf(_arr[0]) > -1 && _arr[0]) {
                    return "#4777D8";
                  } else if (value.indexOf(_arr[1]) > -1 && _arr[1]) {
                    return "#6E94E1";
                  } else if (value.indexOf(_arr[2]) > -1 && _arr[2]) {
                    return "#82A3E5";
                  } else if (value.indexOf(_arr[3]) > -1 && _arr[3]) {
                    return "#96B2E8";
                  } else if (value.indexOf(_arr[4]) > -1 && _arr[4]) {
                    return "#A0B9EA";
                  } else {
                    return "#D1DDF5";
                  }
                })
            },
            activeColor: "#4777D8"
          },
          popup: {
            enable: true,
            Html: props => {
              // return `<span>${props.NAME_CHN}</span>`;
              let _name = props.NAME_CHN,
                _num = 0;
              this.list.map((value, key) => {
                if (_name.indexOf(value.name) > -1) {
                  _num = value.sale_total;
                }
              });
              return `<span>${props.NAME_CHN}<br>销售指数：${_num}</span>`;
            }
            // lnglat :[116.2825, 39.9]
          }
        });
      });
      // 添加附图，附图需要和主图保持一致
      const scene2 = new Scene({
        id: "attach",
        logoVisible: false,
        map: new Mapbox({
          center: [113.60540108435657, 12.833692637803168],
          pitch: 0,
          style: "blank",
          zoom: 1.93,
          minZoom: 0,
          maxZoom: 3,
          interactive: false
        })
      });
      scene2.on("loaded", () => {
        new CountryLayer(scene2, {
          data: [],
          label: {
            enable: false
          },
          popup: {
            enable: true
          },
          autoFit: false,
          depth: 1,
          fill: {
            color: {
              field: "NAME_CHN",
              values: [
                "#feedde",
                "#fdd0a2",
                "#fdae6b",
                "#fd8d3c",
                "#e6550d",
                "#a63603"
              ]
            }
          }
        });
      });

    },
    publisherChange() {
      this.isLoading = true;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.getData();
    }
  }
};
</script>
