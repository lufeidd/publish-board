<template>
  <div id="taopuPage" @click="showResult = false">
    <HeadNav
      type="industry"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="authors"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索作者</p>
                <div class="content common" style="position: relative">
                  <a-input
                    placeholder="搜索作者名称"
                    size="large"
                    @input="inputSearch"
                    @focus="inputSearch"
                    @click.stop="inputClick"
                    v-model="inputVal"
                  >
                    <div slot="prefix">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-search" />
                      </svg>
                      <span class="rowLine">|</span>
                    </div>
                  </a-input>
                  <div class="search-result" v-if="showResult">
                    <div class="list" v-if="dataSource.length > 0">
                      <div
                        class="result-content"
                        v-for="(item1, index1) in dataSource"
                        :key="index1"
                        @click.stop="selected(item1, index1)"
                      >
                        <img
                          :src="item1.photo"
                          alt
                          style="width: 35px; height: 35px"
                          v-if="item1.photo"
                        />
                        <span
                          v-else
                          class="no-pic"
                          style="min-width: 35px; min-height: 35px"
                        ></span>
                        <span class="result-title" :title="item1.name">{{
                          item1.name
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="no-result"
                      v-if="dataSource.length == 0 && showAbout"
                    >
                      没有相关作者
                    </div>
                    <div
                      style="text-align: center; margin-top: 100px"
                      v-if="searchLoading"
                    >
                      <a-spin tip></a-spin>
                    </div>
                  </div>
                  <!-- <a-auto-complete
                    option-label-prop="value"
                    style="width: 800px"
                    placeholder="搜索品种名称、ISBN"
                    @search="inputSearch"
                    @select="selected"
                    v-model="inputVal"
                  >
                    <template slot="dataSource">
                      <a-select-option
                        v-for="(opt,index) in dataSource"
                        :key="index"
                        :value="opt.name"
                      >
                        <div class="result">
                          <img :src="opt.photo" alt width="35px" height="35px" v-if="opt.photo" />
                          <span v-else class="no-pic" style="min-width:35px;min-height:35px;"></span>
                          <span>{{opt.name}}</span>
                        </div>
                      </a-select-option>
                    </template>
                    <a-input style="height:40px;">
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input>
                  </a-auto-complete>-->
                  <div
                    style="text-align: center; margin-top: 10px"
                    v-if="searchLoading"
                  >
                    <a-spin tip></a-spin>
                  </div>
                </div>
                <p class="curren" v-if="historyList.length > 0">最近搜索</p>
                <div class="history" v-if="historyList.length > 0">
                  <div
                    class="content"
                    v-for="(item, index) in historyList"
                    :key="index"
                    @click="$toAuthor(item.author_id)"
                  >
                    <div>
                      <img
                        :src="item.photo"
                        alt
                        style="width: 100px; height: 100px"
                        v-if="item.photo"
                      />
                      <span
                        v-else
                        class="no-pic"
                        style="min-width: 100px; min-height: 100px"
                      ></span>
                    </div>
                    <div class="title" :title="item.name">{{ item.name }}</div>
                    <div class="sale">[{{ item.country }}]</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 作者库列表 -->
            <div class="model-container">
              <div class="model-bg" style="min-height: 393px">
                <div class="section-title">
                  作者库
                  <span class="desc">共{{ total }}名</span>
                </div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="300" />
                      <col width="140" />
                      <col width="140" />
                      <col width="240" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>作者</td>
                        <td style="text-align: center">作品</td>
                        <td style="text-align: center">出版社</td>
                        <td style="text-align: right">生日</td>
                        <td style="text-align: right">国家</td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="authorList.length > 0">
                      <tr v-for="(item, index) in authorList" :key="index">
                        <td>
                          <div class="goods-desc">
                            <span class="goods-image" v-if="item.photo">
                              <img
                                :src="item.photo"
                                alt
                                style="width: 40px; height: 40px"
                              />
                            </span>
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="click-font goods-name"
                              :title="item.name"
                              @click="$toAuthor(item)"
                              >{{ item.name }}</span
                            >
                          </div>
                        </td>
                        <td style="text-align: center">
                          <span class="main-font"
                            >共{{ item.goods_count }}部作品</span
                          >
                        </td>
                        <td style="text-align: center">
                          <span class="main-font"
                            >涵盖{{ item.supplier_count }}家出版机构</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font" v-if="item.birth_date">{{
                            item.birth_date
                          }}</span>
                          <span class="main-font" v-else>--</span>
                        </td>
                        <td style="text-align: right">
                          <span class="main-font" v-if="item.country">{{
                            item.country
                          }}</span>
                          <span class="main-font" v-else>--</span>
                        </td>
                        <td style="text-align: right">
                          <span class="click-font" @click="toEdit(item, index)"
                            >编辑</span
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" style="text-align: center">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot v-if="authorList.length > 0">
                      <tr>
                        <td colspan="6" style="text-align: right">
                          <a-pagination
                            :show-total="(total) => `共 ${total} 条数据`"
                            :default-current="1"
                            :total="total"
                            v-model="page"
                            :defaultPageSize="pageSize"
                            @change="onShowSizeChange"
                          />
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div
                class="model-bg"
                style="
                  min-height: 660px;
                  padding-bottom: 75px;
                  position: relative;
                "
              >
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
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
import {
  INDUSTRY_AUTHOR_SEARCH,
  INDUSTRY_AUTHOR_LISTS,
  INDUSTRY_AUTHOR_HISTORY,
} from "../../apis/industry.js";
export default {
  data() {
    return {
      pagePower: true,
      inputVal: "",
      dataSource: [],
      searchLoading: false,
      showResult: false,
      showAbout: false,
      historyList: [],
      authorList: [],
      total: 0,
      page: 1,
      pageSize: 20,
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
    this.getHistory();
  },
  updated() {},
  methods: {
    async search(_value) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        search: _value,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_SEARCH(data);
      if (res.code == 0) {
        // if (res.data.search == this.inputVal) {
        this.dataSource = res.data.map((value, key) => {
          return value;
        });
        // }
        this.searchLoading = false;
        this.showAbout = true;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.authorList = [];
        this.authorList = res.data.list;
        this.total = res.data.count;
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
    async getHistory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_HISTORY(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.historyList = res.data;
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    inputClick() {},
    inputSearch() {
      // console.log(111);
      this.dataSource = [];
      if (this.inputVal.length > 0) {
        this.showResult = true;
        this.showAbout = false;
        this.searchLoading = true;
        this.search(this.inputVal);
      } else {
        this.showResult = false;
      }
    },
    selected(item1, index1) {
      // console.log(222);
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: item1.author_id,
        },
      });
    },
    onShowSizeChange(current, pageSize) {
      this.isLoading = true;
      this.page = current;
      this.getData();
    },
    authorDetail(item, index) {
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: item.author_id,
        },
      });
    },
    toEdit(item, index) {
      this.$router.push({
        name: "authoredit",
        query: {
          author_id: item.author_id,
        },
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
      this.getHistory();
    },
  },
};
</script>
