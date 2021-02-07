<template>
  <div id="readerPage">
    <HeadNav type="publish" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="reader"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <!-- 读者概况 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">读者概况</div>
                <div class="data-choose" style="padding:20px 15px;">
                  <span class="data-block">
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">读者基数</span>
                    </div>
                    <div class="data-font">{{readerBase}}</div>
                  </span>
                  <span class="data-block">
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">人均购买</span>
                    </div>
                    <div class="data-font">{{readerAverage}}本</div>
                  </span>
                </div>
              </div>
            </div>
            <!-- 基础特征 -->
            <div class="model-container basic">
              <div class="model-bg">
                <div class="section-title">基础特征</div>
                <div class="feature">
                  <div class="clearfix" style="padding:15px;">
                    <div class="float-left" style="width:500px;">
                      <div>性别分布</div>
                      <div v-if="ringData1.length > 0">
                        <div id="ring1" style="width:400px;margin-top:20px;"></div>
                      </div>
                      <div style="width:500px;" v-else>
                        <div class="no-data">数据量较小，暂不支持分析</div>
                      </div>
                      <div style="margin-top:20px;">消费能力</div>
                      <div v-if="ringData2.length > 0">
                        <div id="ring2" style="width:400px;margin-top:20px;"></div>
                      </div>
                      <div style="width:500px;" v-else>
                        <div class="no-data">数据量较小，暂不支持分析</div>
                      </div>
                    </div>
                    <div class="float-left" style="margin-left:10px;width:500px;">
                      <div style="margin-left:40px;">年龄分布</div>
                      <div v-if="columnData1.length > 0">
                        <div id="column1" style="width:400px;margin-left:90px;margin-top:20px;"></div>
                      </div>
                      <div style="width:500px;margin-left:38px;" v-else>
                        <div class="no-data">数据量较小，暂不支持分析</div>
                      </div>
                      <div style="margin-top:20px;margin-left:40px;">兴趣分布</div>
                      <div v-if="columnData2.length > 0">
                        <div id="column2" style="width:400px;margin-left:90px;margin-top:20px;"></div>
                      </div>
                      <div style="width:500px;margin-left:38px;" v-else>
                        <div class="no-data">数据量较小，暂不支持分析</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 地域 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">地域</div>
                <div class="clearfix" style="padding-bottom:15px;" v-if="barData1.length > 0">
                  <div class="float-left" style="position:relative;margin-top:15px;">
                    <div id="map" style="height:284px;width:520px;"></div>
                  </div>
                  <div class="float-left" style="width:500px;margin-left:45px;">
                    <p style="margin-top:15px;">地域（省）</p>
                    <div id="bar-chart1"></div>
                  </div>
                </div>
                <div class="no-data" v-else>数据量较小，暂不支持分析</div>
              </div>
            </div>
            <!-- 偏好 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">偏好</div>
                <div class="clearfix" style="padding:10px 15px 15px 15px;">
                  <div class="float-left" style="width:500px;margin-right:50px;">
                    <p>类目偏好</p>
                    <div v-if="barData2.length > 0">
                      <div id="bar-chart2"></div>
                    </div>
                    <div class="no-data" v-else>数据量较小，暂不支持分析</div>
                  </div>
                  <div class="float-left" style="width:500px;">
                    <p>作家偏好</p>
                    <div v-if="barData3.length > 0">
                      <div id="bar-chart3"></div>
                    </div>
                    <div class="no-data" v-else>数据量较小，暂不支持分析</div>
                  </div>
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
<style scoped lang="scss">
#readerPage {
  padding-bottom: 20px;
  & .data-block {
    display: inline-block;
    width: 220px;
    padding: 10px 15px;
    background-color: #f4f7fd;
    margin-right: 10px;
  }
  & .no-data {
    padding: 118px 0;
    font-size: $fontSize - 2;
    text-align: center;
  }
}
</style>
<script>
import { Chart, registerShape } from "@antv/g2";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import { READER_BASE } from "../../apis/publish.js";
export default {
  data() {
    return {
      pagePower: true,
      readerBase: 0,
      readerAverage: 0,
      ringData1: [],
      ringChange1: null,
      ringData2: [],
      ringChange2: null,
      columnData1: [],
      columnChange1: null,
      columnData2: [],
      columnChange2: null,
      barData1: [],
      barChange1: null,
      barData2: [],
      barChange2: null,
      barData3: [],
      barChange3: null,
      barMapData: [],
      isFirst: true,
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await READER_BASE(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.ringData1 = [];
        this.ringData2 = [];
        this.columnData1 = [];
        this.columnData2 = [];
        this.barData1 = [];
        this.barData2 = [];
        this.barData3 = [];
        if (Object.keys(res.data).length > 0) {
          let _total1 = 0,_total2 = 0,_total3 = 0,_total4 = 0;
          this.readerBase = res.data.reader_num;
          this.readerAverage = res.data.reader_avg_buy;
          res.data.persona_sex.map((value,key)=>{
            _total1 += Number(value.value);
          });
          res.data.persona_sex.map((value,key)=>{
            value.value = Math.round((Number(value.value)/_total1)*100);
            this
          });
          this.ringData2 = res.data.persona_money;
          this.columnData1 = res.data.persona_age;
          this.columnData2 = res.data.persona_role;
          this.barData1 = res.data.persona_region.map((value, key) => {
            this.barMapData.push(value.name);
            value.name = value.name;
            return value;
          });
          this.barData2 = res.data.persona_cate.map((value, key) => {
            value.name = value.name;
            return value;
          });
          this.barData3 = res.data.persona_author.map((value, key) => {
            value.name = value.name;
            return value;
          });
          let _this = this;
          setTimeout(() => {
            if (this.isFirst) {
              if (_this.ringData1.length > 0) _this.initRing1();
              if (_this.columnData1.length > 0) _this.initColumn1();
              if (_this.ringData2.length > 0) _this.initRing2();
              if (_this.columnData2.length > 0) _this.initColumn2();
              if (_this.barData1.length > 0) _this.initMap();
              if (_this.barData1.length > 0)
                _this.inintBar1(_this.barData1[0].value);
              if (_this.barData2.length > 0)
                _this.inintBar2(_this.barData2[0].value);
              if (_this.barData3.length > 0)
                _this.inintBar3(_this.barData3[0].value);
            } else {
              if (_this.ringData1.length > 0){
                _this.ringChange1.changeData(_this.ringData1);
              }
              if (_this.ringData2.length > 0){
                _this.ringChange2.changeData(_this.ringData2);
              }
              if (_this.columnData1.length > 0){
                _this.columnChange1.destroy();
                _this.initColumn1();
                // _this.columnChange1.changeData(_this.columnData1);
              }
              if (_this.columnData2.length > 0){
                _this.columnChange2.destroy();
                _this.initColumn2();
                // _this.columnChange2.data(_this.columnData2);
                // _this.columnChange2.render();
              }
              if (_this.barData1.length > 0){
                _this.barChange1.destroy();
                _this.inintBar1(_this.barData1[0].value);
              }
              if (_this.barData2.length > 0){
                _this.barChange2.destroy();
                _this.inintBar2(_this.barData2[0].value);
              }
              if (_this.barData3.length > 0){
                _this.barChange3.destroy();
                _this.inintBar3(_this.barData3[0].value);
              }
              if (_this.barData1.length > 0) {
                _this.initMap();
              }
            }
            _this.isFirst = false;
          }, 500);
        } else {
          this.isFirst = true;
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 环形图
    initRing1() {
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.003;
      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path
            }
          });
        }
      });

      this.ringChange1 = new Chart({
        container: "ring1",
        autoFit: true,
        height: 234,
      });

      this.ringChange1.data(this.ringData1);
      this.ringChange1.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4
      });
      this.ringChange1.tooltip({
        showTitle: false,
        showMarkers: false
      });
      this.ringChange1.legend({
        position: "right"
      });
      this.ringChange1
        .interval()
        .adjust("stack")
        .position("value")
        .color("name", name => {
          if (name == "女") {
            return "#2F6CE4";
          } else if (name == "男") {
            return "#F3D145";
          } else {
            return "#FE8B4A";
          }
        })
        .shape("slice-shape");
      this.ringChange1.interaction("element-active");
      this.ringChange1.render();
    },
    initRing2() {
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.003;
      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path
            }
          });
        }
      });

      this.ringChange2 = new Chart({
        container: "ring2",
        autoFit: true,
        height: 234
      });

      this.ringChange2.data(this.ringData2);
      this.ringChange2.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4
      });
      this.ringChange2.tooltip({
        showTitle: false,
        showMarkers: false
      });
      this.ringChange2.legend({
        position: "right"
      });
      this.ringChange2
        .interval()
        .adjust("stack")
        .position("value")
        .color("name", name => {
          if (name == "高消费") {
            return "#2F6CE4";
          } else if (name == "中高消费") {
            return "#F3D145";
          } else if (name == "中低消费") {
            return "#E4966A";
          } else {
            return "#5ABAFC";
          }
        })
        .shape("slice-shape");
      this.ringChange2.interaction("element-active");
      this.ringChange2.render();
    },
    // 柱状图
    initColumn1() {
      let _this = this;
      this.columnChange1 = new Chart({
        container: "column1",
        autoFit: true,
        autoHide: false,
        height: 234
      });
      this.columnChange1.data(this.columnData1);
      this.columnChange1.scale("value", {
        nice: true
      });
      this.columnChange1.axis("name", {
        tickLine: null,
        autoHide: false,
        autoRotate: false
      });
      this.columnChange1.axis("value", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      this.columnChange1.tooltip({
        showMarkers: false
      });
      this.columnChange1.interaction("active-region");
      this.columnChange1.legend(false);
      this.columnChange1
        .interval()
        .position("name*value")
        .color("name", val => {
          if (val == this.columnData1[0].name) {
            return "#2665E3";
          } else if (val == this.columnData1[1].name) {
            return "#F2CF30";
          } else if (val == this.columnData1[2].name) {
            return "#FE8540";
          } else if (val == this.columnData1[3].name) {
            return "#51B6FC";
          } else if (val == this.columnData1[4].name) {
            return "#BB65E1";
          } else if (val == this.columnData1[5].name) {
            return "#1AC9A8";
          }
        });
      this.columnChange1.render();
    },
    initColumn2() {
      let _this = this;
      this.columnChange2 = new Chart({
        container: "column2",
        autoFit: true,
        autoHide: false,
        height: 234
      });
      this.columnChange2.data(this.columnData2);
      this.columnChange2.scale("value", {
        nice: true
      });
      this.columnChange2.axis("name", {
        tickLine: null,
        autoHide: false,
        autoRotate: false
      });
      this.columnChange2.axis("value", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      this.columnChange2.tooltip({
        showMarkers: false
      });
      this.columnChange2.interaction("active-region");
      this.columnChange2.legend(false);
      this.columnChange2
        .interval()
        .position("name*value")
        .color("name", val => {
          if (val == this.columnData2[0].name) {
            return "#2665E3";
          } else if (val == this.columnData2[1].name) {
            return "#F2CF30";
          } else if (val == this.columnData2[2].name) {
            return "#FE8540";
          } else if (val == this.columnData2[3].name) {
            return "#51B6FC";
          } else if (val == this.columnData2[4].name) {
            return "#BB65E1";
          } else if (val == this.columnData2[5].name) {
            return "#1AC9A8";
          }
        });
      this.columnChange2.render();
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
                  let _arr = _this.barMapData;
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
                  } else if (value.indexOf(_arr[5]) > -1 && _arr[5]) {
                    return "#BDCEF1";
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
              return `<span>${props.NAME_CHN}</span>`;
            }
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
    inintBar1(_max) {
      // console.log("max", _max);
      let _height = this.barData1.length*25.4;
      this.barChange1 = new Chart({
        container: "bar-chart1",
        autoFit: true,
        height: _height
      });
      this.barChange1.data(this.barData1.reverse());
      this.barChange1.scale({
        value: {
          max: 150,
          min: 0,
          alias: " "
        }
      });
      this.barChange1.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
        label: {
          textStyle: {
            textAlign: "left"
          }
        }
      });

      this.barChange1.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: {
          line:{
            style:{
              fillOpacity:0,
              strokeOpacity:0
            }
          }
        },
        title: null
      });
      this.barChange1.legend(false);
      this.barChange1.coordinate().transpose();
      this.barChange1.tooltip(false);
      this.barChange1
        .interval()
        .position("name*value")
        .size(8)
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false | true
          },
          // offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      this.barChange1.render();
    },
    inintBar2(_max) {
      // console.log("max", _max);
      let _height = this.barData2.length*25.4;
      this.barChange2 = new Chart({
        container: "bar-chart2",
        autoFit: true,
        autoHide: false,
        height: _height
      });
      this.barChange2.data(this.barData2.reverse());
      this.barChange2.scale({
        value: {
          max: 150,
          min: 0,
          alias: " "
        }
      });
      this.barChange2.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null
        // label: {
        // textStyle: {
        // textAlign: "start"
        // }
        // }
      });

      this.barChange2.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: {
          line:{
            style:{
              fillOpacity:0,
              strokeOpacity:0
            }
          }
        },
        title: null
      });
      this.barChange2.legend(false);
      this.barChange2.coordinate().transpose();
      this.barChange2.tooltip(false);
      this.barChange2
        .interval()
        .position("name*value")
        .size(8)
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false
          },
          // offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      this.barChange2.render();
    },
    inintBar3(_max) {
      // console.log("max", _max);
      let _height = this.barData3.length*25.4;
      this.barChange3 = new Chart({
        container: "bar-chart3",
        autoFit: true,
        autoHide: false,
        height: _height
      });
      this.barChange3.data(this.barData3.reverse());
      this.barChange3.scale({
        value: {
          max: 150,
          min: 0,
          alias: " "
        }
      });
      this.barChange3.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
      });

      this.barChange3.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: {
          line:{
            style:{
              fillOpacity:0,
              strokeOpacity:0
            }
          }
        },
        title: null
      });
      this.barChange3.legend(false);
      this.barChange3.coordinate().transpose();
      this.barChange3.tooltip(false);
      this.barChange3
        .interval()
        .position("name*value")
        .size(8)
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false
          },
          // offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      this.barChange3.render();
    },
    publisherChange() {
      this.isLoading = true;
      if(!this.pagePower){
        this.isFirst = true;
      }
      this.getData();
    }
  }
};
</script>
