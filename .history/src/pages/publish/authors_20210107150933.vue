<template>
  <div id="taopuPage" style="padding-bottom: 20px" @click="showResult = false">
    <HeadNav
      type="publish"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="authors"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索作者</p>
                <div class="content common" style="position: relative">
                  <a-input-search
                    placeholder="搜索作者名称"
                    size="large"
                    enter-button="搜索"
                    @input="inputSearch"
                    @focus="inputSearch"
                    @click.stop="inputClick"
                    v-model="inputVal"
                    @search="onSearch"
                  >
                    <div slot="prefix">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-search" />
                      </svg>
                      <span class="rowLine">|</span>
                    </div>
                  </a-input-search>
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
                  <div
                    style="text-align: center; margin-top: 10px"
                    v-if="searchLoading"
                  >
                    <a-spin tip></a-spin>
                  </div>
                </div>
                <p class="curren" v-if="historyList.length > 0">最近查看</p>
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
                    <div class="sale">
                      <span v-if="item.country">[{{ item.country }}]</span
                      ><span v-else>--</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 作者列表 -->
            <div class="model-container">
              <div class="model-bg" style="min-height: 660px">
                <div class="section-title">
                  本社作者
                  <span class="desc">共{{ total }}名</span>
                </div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="55" />
                      <col width="255" />
                      <col width="140" />
                      <col width="140" />
                      <col width="240" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
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
                        <td>{{ index + 1 + (pageSize * page - pageSize) }}</td>
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
                              @click="$toAuthor(item.author_id)"
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
                        <td colspan="7" style="text-align: right">
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
import { MYAUTHOR_LISTS,MYAUTHOR_HISTORY,MYAUTHOR_SEARCH } from "../../apis/publish.js";
export default {
  data() {
    return {
      pagePower: true,
      total: 0,
      page: 1,
      pageSize: 20,
      authorList: [],
      isLoading: true,
      inputVal: "",
      dataSource: [],
      searchLoading: false,
      showResult: false,
      showAbout: false,
      historyList: [],
    };
  },
  mounted() {
    this.getData();
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        name: this.inputVal,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYAUTHOR_LISTS(data);
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
    async search(_value) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        search: _value,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYAUTHOR_SEARCH(data);
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
    async getHistory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYAUTHOR_HISTORY(data);
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
    onSearch() {
      if (this.inputVal.length > 0) {
        this.showResult = false;
        this.page = 1;
        this.isLoading = true;
        this.getData();
      }else{
        this.$refs.head.globalTip(1, "请输入作者名称", 0);
      }
    },
    inputSearch(e) {
      // console.log(e.relatedTarget == undefined);
      if (e.relatedTarget == undefined || e.relatedTarget == null) {
        this.dataSource = [];
        if (this.inputVal.length > 0) {
          this.showResult = true;
          this.showAbout = false;
          this.searchLoading = true;
          this.search(this.inputVal);
        } else {
          this.showResult = false;
        }
      } else {
      }
    },
    selected(item1, index1) {
      // console.log(222);
      // this.$toAuthor(item1.author_id);
      this.inputVal = item1.name;
      this.showResult = false;
      this.page = 1;
      this.isLoading = true;
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      this.isLoading = true;
      this.page = current;
      this.getData();
    },
    toEdit(item, index) {
      let _url =
        window.location.href.split("#")[0] +
        "#" +
        "/industry/authoredit?author_id=" +
        item.author_id;
      window.open(_url, "_blank");
    },
    publisherChange() {
      this.isLoading = true;
      this.showResult = false;
      this.page = 1;
      this.getData();
      this.getHistory();
    },
  },
};
</script>
