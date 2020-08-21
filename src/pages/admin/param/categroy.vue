<template>
  <div id="paramPage" @click="showYear = false;showSearch = false">
    <HeadNav type="admin" ref="head"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminParam"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div
                class="model-bg"
                style="min-height:600px;padding-bottom:75px;"
                v-if="powerType == 1"
              >
                <div class="section-title clearfix">
                  <span class="float-left">类目系数配置</span>
                  <span class="float-right click-font" @click="addParamSet">新增系数配置</span>
                </div>
                <div class="search">
                  <div class="content common">
                    <a-input-search
                      placeholder="搜索类目关键字"
                      enter-button="搜索"
                      size="large"
                      v-model="inputVal"
                      @input="inputChange"
                      @search="onSearch"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input-search>
                    <div class="search-content" v-if="showSearch">
                      <div class="loading" v-if="searchLoading">
                        <a-spin tip></a-spin>
                      </div>
                      <div v-else>
                        <div
                          class="search-item"
                          @click="selectSearch(litem,lindex)"
                          v-for="(litem,lindex) in searchList"
                          :key="lindex"
                        >{{litem.name}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="100" />
                      <col width="100" />
                      <col width="300" />
                      <col width="80" />
                      <col width="100" />
                      <col width="150" />
                      <col width="250" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>自增ID</td>
                        <td>类目ID</td>
                        <td>类目名称</td>
                        <td style="text-align:right;">系数</td>
                        <td style="text-align:right;">生效年份</td>
                        <td style="text-align:right;">最后修改时间</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td>
                          <span class="main-font">{{item.id}}</span>
                        </td>
                        <td>
                          <span class="main-font">{{item.cate_id}}</span>
                        </td>
                        <td>
                          <span class="main-font">{{item.cate_name}}</span>
                        </td>
                        <td style="text-align:right;">{{item.ratio}}</td>
                        <td style="text-align:right;">{{item.year}}年</td>
                        <td style="text-align:right;">{{item.update_time}}</td>
                        <td style="text-align:right;">
                          <!-- <span class="click-font" @click="openRead(item,index)">查看修改记录</span> -->
                          <span
                            class="click-font"
                            style="margin-left:10px;"
                            @click="setParam(item,index)"
                            v-if="item.year > Number($moment().format('YYYY'))"
                          >修改</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" style="text-align:center;">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="page">
                  <a-pagination
                    :show-total="total => `共 ${total} 条数据`"
                    :default-current="1"
                    v-model="page"
                    :total="totalSize"
                    :defaultPageSize="page_size"
                    @change="onShowSizeChange"
                  />
                </div>
              </div>
              <div
                class="model-bg"
                v-else
                style="min-height:650px;padding-bottom:75px;position:relative"
              >
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增出版社配置弹层 -->
    <a-modal
      v-model="addParam"
      width="600px"
      :title="paramType == 1?'新增类目系数配置':'修改类目系数配置'"
      on-ok="handleOk"
      @cancel="close"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
      </template>
      <div class="popup" @click="showYear = false">
        <div class="option">
          <span class="lable">*关联类目</span>
          <div class="normal" v-if="paramType == 1">
            <a-auto-complete
              option-label-prop="value"
              style="width: 460px"
              placeholder="搜索类目名称"
              @search="onAddSearch"
              @select="selected"
              v-model="cateName"
            >
              <template slot="dataSource">
                <a-select-option v-for="(opt,index) in dataSource" :key="index" :value="opt.name">
                  <div class="result">
                    <span>{{opt.name}}</span>
                  </div>
                </a-select-option>
              </template>
            </a-auto-complete>
          </div>
          <div class="normal" v-else>{{addInfo.cate_name}}</div>
        </div>
        <div style="padding:0 30px;margin-top:-15px;margin-bottom:-10px;">
          <a-divider />
        </div>
        <div class="option">
          <span class="lable">当前系数</span>
          <div class="normal">
            <span>{{addInfo.currenRatio}}</span>
            <span class="text">默认系数</span>
            <span>{{defaultRatio}}</span>
          </div>
        </div>
        <div class="option">
          <span class="lable">调整为</span>
          <div class="normal">
            <a-input placeholder="请输入系数" v-model="addInfo.ratio" />
          </div>
        </div>
        <div class="option">
          <span class="lable">生效年份</span>
          <div class="normal" v-if="paramType == 1">
            <span @click.stop="showYear = true">
              <a-date-picker
                :allowClear="false"
                placeholder="请选择年份"
                mode="year"
                format="YYYY"
                :open="showYear"
                @panelChange="yearChange($event)"
                :value="addInfo.year"
                inputReadOnly
              />
            </span>
          </div>
          <div class="normal" v-else>{{addInfo.year}}</div>
        </div>
        <div style="height:180px;"></div>
      </div>
    </a-modal>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/param.scss"></style>
<script>
import {
  RATIO_GETS,
  RATIO_LOGS,
  RATIO_ADD,
  RATIO_EDIT,
  RATIO_CURREN
} from "../../../apis/admin.js";
import { COMMON_CATEGORY } from "../../../apis/common.js";
export default {
  data() {
    return {
      powerType: 1,
      page: 1,
      totalSize: 0,
      page_size: 20,
      paramType: 1,
      inputVal: "",
      searchId: 0,
      addParam: false,
      readRecord: false,
      searchList: [],
      dataSource: [],
      list: [],
      cateList: [],
      addInfo: {
        id: 0,
        cate_id: 0,
        cate_name: "",
        currenRatio: 0,
        ratio: "",
        year: ""
      },
      showYear: false,
      defaultRatio: 0,
      showSearch: false,
      searchLoading: false,
      cateName: ""
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.defaultRatio = this.$refs.head.accountInfo.default_ratio.publisher;
    if (this.powerType == 1) {
      this.getData();
      this.getPublishList();
    }
    this.$setSlideHeight();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    // 获取列表
    async getData() {
      let data = {
        type: 2,
        search: this.inputVal,
        id: this.searchId,
        page: this.page,
        page_size: this.page_size
      };
      let res = await RATIO_GETS(data);
      if (res.code == 0) {
        this.list = [];
        this.list = res.data.lists;
        this.totalSize = res.data.count;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    async getCurrenData() {
      let data = {
        type: 2,
        id: this.addInfo.cate_id
      };
      let res = await RATIO_CURREN(data);
      if (res.code == 0) {
        this.addInfo.currenRatio = res.data.current_ratio;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 新增系数
    async add() {
      let data = {
        type: 2,
        id: this.addInfo.cate_id,
        name: this.addInfo.cate_name,
        ratio: this.addInfo.ratio,
        year: this.addInfo.year
      };
      let res = await RATIO_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "新增系数成功");
        // this.page = 1;
        this.getData();
        this.addParam = false;
        this.dataSource = [];
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 类目列表获取
    async getPublishList() {
      let data = {};
      let res = await COMMON_CATEGORY(data);
      if (res.code == 0) {
        this.cateList = res.data;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 修改系数
    async editParam() {
      let data = {
        type: 2,
        id: this.addInfo.id,
        ratio: this.addInfo.ratio
      };
      let res = await RATIO_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "修改成功");
        this.getData();
        this.addParam = false;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    addParamSet() {
      this.paramType = 1;
      this.addInfo.cate_id = 0;
      this.addInfo.cate_name = "";
      this.cateName = "";
      this.addInfo.ratio = "";
      this.addInfo.year = "";
      this.addInfo.currenRatio = 0;
      this.addParam = true;
    },
    setParam(item, index) {
      this.paramType = 2;
      this.addInfo.cate_name = item.cate_name;
      this.addInfo.cate_id = item.cate_id;
      this.addInfo.ratio = item.ratio;
      this.addInfo.year = item.year;
      this.addInfo.currenRatio = item.ratio;
      this.addInfo.id = item.id;
      this.addParam = true;
    },
    inputChange() {
      // console.log(this.inputVal);
      this.searchList = [];
      this.showSearch = true;
      this.searchLoading = true;
      this.searchId = 0;
      this.cateList.map((value, key) => {
        if (value.name.indexOf(this.inputVal) > -1) {
          this.searchList.push(value);
        }
      });
      this.searchLoading = false;
    },
    onSearch() {
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(curren, size) {
      this.page = curren;
      this.getData();
    },
    handleCancel() {
      this.showYear = false;
      this.addParam = false;
      this.readRecord = false;
    },
    handleOk() {
      let _reg = /^\d+(\.\d+)?$/;
      if (this.addInfo.cate_id > 0) {
      } else {
        this.$refs.head.globalTip(1, "请选择关联类目");
        return;
      }
      if (_reg.test(this.addInfo.ratio)) {
      } else {
        this.$refs.head.globalTip(1, "请填写正确的系数类型");
        return;
      }
      if (this.addInfo.year) {
      } else {
        this.$refs.head.globalTip(1, "请选择生效年份");
        return;
      }
      if (this.paramType == 1) {
        this.add();
      } else {
        let _this = this;
        this.$confirm({
          title: "出版社系数变更确认",
          content: "确认修改出版社系数吗？",
          okText: "确定",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            _this.editParam();
          },
          onCancel() {}
        });
      }
    },
    onAddSearch(value) {
      console.log(this.cateName);
      let _value = value.toString();
      this.dataSource = [];
      this.addInfo.cate_id = 0;
      this.addInfo.cate_name = "";
      this.cateList.map((value, key) => {
        if (value.name.indexOf(_value) > -1) {
          this.dataSource.push(value);
        }
      });
    },
    selected(value) {
      this.dataSource.map((val, key) => {
        if (val.name == value) {
          this.addInfo.cate_id = val.category_id;
          this.addInfo.cate_name = val.name;
          this.cateName = val.name;
        }
      });
      this.getCurrenData();
      // console.log(this.addInfo.publisher_name);
    },
    yearChange(e) {
      let _year = e._d.getFullYear();
      let _min = Number(this.$moment().format("YYYY"));
      if (_min >= _year) {
        this.$refs.head.globalTip(1, "只允许选择未来的年份");
      } else {
        this.addInfo.year = _year.toString();
      }
      this.showYear = false;
      // console.log(_year,_min)
    },
    close() {
      this.showYear = false;
    },
    readHandle() {
      this.readRecord = false;
    },
    selectSearch(litem, lindex) {
      console.log(111);
      this.inputVal = litem.name;
      this.searchId = litem.category_id;
    }
  }
};
</script>
