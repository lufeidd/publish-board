<template>
  <div id="taopuPage" @click="bodyClick">
    <HeadNav type="publish" :show="1" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="taopu"></SlideNav>
          <div
            v-if="!goodsPower"
            style="height:10px;margin-right:10px;margin-top:-10px;background-color:#FFF;"
          ></div>
        </div>
        <div class="float-right" v-if="goodsPower">
          <div class="main-container">
            <!-- 搜索品种 -->
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索品种</p>
                <div class="content common" style="position:relative;">
                  <a-input
                    placeholder="搜索品种名称、ISBN"
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
                        v-for="(item1,index1) in dataSource"
                        :key="index1"
                        @click.stop="selected(item1,index1)"
                      >
                        <img
                          :src="item1.cover_pic"
                          alt
                          width="35px"
                          height="35px"
                          v-if="item1.cover_pic"
                        />
                        <span v-else class="no-pic" style="min-width:35px;min-height:35px;"></span>
                        <span class="result-title" :title="item1.title">{{item1.title}}</span>
                      </div>
                    </div>
                    <div class="no-result" v-if="dataSource.length == 0 && showAbout">没有相关商品</div>
                    <div style="text-align:center;margin-top:100px;" v-if="searchLoading">
                      <a-spin tip></a-spin>
                    </div>
                  </div>
                </div>
                <p class="curren" v-if="historyList.length > 0">最近搜索</p>
                <div class="history" v-if="historyList.length > 0">
                  <div
                    class="content"
                    v-for="(item,index) in historyList"
                    :key="index"
                    @click.stop="toDetail(item,index)"
                  >
                    <div>
                      <img
                        :src="item.cover_pic"
                        alt
                        width="100px"
                        height="100px"
                        v-if="item.cover_pic"
                      />
                      <span v-else class="no-pic" style="min-width:100px;min-height:100px;"></span>
                    </div>
                    <div class="title" :title="item.title">{{item.title}}</div>
                    <div class="sale">销售点数 {{item.sale_total}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 时间选择 -->
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg choose clearfix">
                  <div class="float-left">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="e => e.preventDefault()"
                        style="font-size:12px;color:#4576DB;"
                      >
                        {{chooseCategory.name}}
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="padding:5px 15px;color:#515A6E;font-size:12px;"
                            @click="selectCategory(null,-1)"
                          >所有类目</a>
                        </a-menu-item>
                        <a-menu-item v-for="(item,index) in categoryList" :key="index">
                          <a
                            href="javascript:;"
                            style="padding:5px 15px;color:#515A6E;font-size:12px;"
                            @click="selectCategory(item,index)"
                          >{{item.name}}</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div class="float-right">
                    <TimeChoose ref="time" @changeTime="changeTime" @closeDom="closeDom"></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 品种销售排行 -->
            <div class="model-container sale-rank">
              <div class="section-title model-bg">品种销售排行</div>
              <div v-if="goodsPower">
                <div class="table model-bg" v-if="goodsList.length > 0" style="min-height:393px;">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="50" />
                      <col width="310" />
                      <col width="150" />
                      <col width="200" />
                      <col width="100" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排行</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td>类目</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">品种排名（类目）</td>
                        <td style="text-align:right;">品种排名（全部）</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in goodsList" :key="index">
                        <td>{{item.sale_rank}}</td>
                        <td>
                          <div class="goods-desc">
                            <img
                              :src="item.cover_pic"
                              alt
                              width="40px"
                              height="40px"
                              v-if="item.cover_pic"
                            />
                            <span v-else class="no-pic" style="min-width:40px;min-height:40px;"></span>
                            <span
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click.stop="toDetail(item,index)"
                            >{{item.goods_name}}</span>
                          </div>
                        </td>
                        <td>
                          <div
                            class="click-font author"
                          >
                            <div class="author-name" @click.stop="openAuthor(item,index)">{{item.goods_author}}</div>
                            <div class="author-list" v-if="item.active">
                              <div v-if="item.authors.length > 0"><div class="author-item click" v-for="(aitem,aindex) in item.authors" :key="aindex" @click.stop="toAuthor(aitem,aindex)">{{aitem.name}}</div></div>
                              <div v-else><div class="author-item">未查询到对应作者信息</div></div>
                            </div>
                          </div>
                        </td>
                        <td>{{item.cate_node_2}} ＞ {{item.cate_node_3}}</td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.in_all_cate_rank}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.in_all_rank}}</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="7" style="text-align:right;">
                          <a-pagination
                            :show-total="total => `共 ${total} 条数据`"
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
                <div class="model-bg" v-else style="padding:130px 20px;min-height:393px;">
                  <a-empty />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-right" v-else style="width:1080px;">
          <div>
            <div
              class="main-container"
              style="min-height:660px;position:relative;background-color:#FFF;margin-top:10px;"
            >
              <PageNoPower></PageNoPower>
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
import { TOP_GOODSRANK, TOP_HISTORY, TOP_SEARCH } from "../../apis/publish.js";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      goodsPower: true,
      goodsList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      historyList: [],
      categoryList: [],
      chooseCategory: {
        name: "所有类目",
        id: 0
      },
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      isLoading: true,
    };
  },
  mounted() {
    // console.log('aaa',this.$moment().format("YYYY-MM"));
    this.getData();
    this.getCategory();
    this.history();
  },
  updated() {

  },
  methods: {
    // 获取商品排行
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        goods_cate: this.chooseCategory.id,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await TOP_GOODSRANK(data);
      if (res.code == 0) {
        this.total = res.data.total;
        this.goodsList = [];
        res.data.list.map((value,key)=>{
          value.active = false;
          this.goodsList.push(value);
        });
        this.goodsPower = true;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }

      }
    },
    // 获取搜索历史
    async history() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await TOP_HISTORY(data);
      if (res.code == 0) {
        this.historyList = res.data;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取分类列表
    async getCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id:this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_PUBLISHERCATEGORY(data);
      if (res.code == 0) {
        this.categoryList = res.data;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async search(_value) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        search: _value,
        page: 1,
        page_size: 100,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        if (res.data.search == this.inputVal) {
          this.dataSource = res.data.lists.map((value, key) => {
            return value;
          });
        }
        this.searchLoading = false;
        this.showAbout = true;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    inputClick() {},
    inputSearch() {
      this.dataSource = [];
      if (this.inputVal.length > 0) {
        this.showResult = true;
        this.searchLoading = true;
        this.showAbout = false;
        this.search(this.inputVal);
      } else {
        this.showResult = false;
      }
    },
    selected(item1, index1) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item1.goods_id
        }
      });
    },
    // 选择分类
    selectCategory(item, index) {
      // console.log(index)
      this.isLoading = true;
      if (index == -1) {
        this.chooseCategory.name = "所有类目";
        this.chooseCategory.id = 0;
      } else {
        this.chooseCategory.name = item.name;
        this.chooseCategory.id = item.category_id;
      }
      this.page = 1;
      this.getData();
    },
    bodyClick(){
      this.$refs.time.showYear = false;
      this.showResult = false;
      this.goodsList = this.goodsList.map((value,key)=>{
          value.active = false;
        return value;
      })
    },
    closeDom(){
      this.showResult = false;
      this.goodsList = this.goodsList.map((value,key)=>{
          value.active = false;
        return value;
      })
    },
    openAuthor(item,index){
      this.$refs.time.showYear = false;
      this.goodsList = this.goodsList.map((value,key)=>{
        if(index == key){
          value.active = true;
        }else{
          value.active = false;
        }
        return value;
      })
    },
    changeTime(){
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      this.isLoading = true;
      this.page = current;
      this.getData();
    },
    toDetail(item, index) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item.goods_id
        }
      });
    },
    toAuthor(aitem,aindex){
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: aitem.author_id
        }
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.chooseCategory.name = "所有类目";
      this.chooseCategory.id = 0;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.getData();
      this.getCategory();
      this.history();
    }
  }
};
</script>
