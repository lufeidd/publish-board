<template>
  <div id="taopuPage">
    <HeadNav type="industry" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="authors"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索作者</p>
                <div class="content common" style="position:relative;">
                  <a-auto-complete
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
                  </a-auto-complete>
                  <div style="text-align:center;margin-top:10px;" v-if="searchLoading">
                    <a-spin tip></a-spin>
                  </div>
                </div>
                <p class="curren" v-if="historyList.length > 0">最近搜索</p>
                <div class="history" v-if="historyList.length > 0">
                  <div
                    class="content"
                    v-for="(item,index) in historyList"
                    :key="index"
                    @click="authorDetail(item,index)"
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
            <!-- 作者库列表 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">
                  作者库
                  <span class="desc">共2000名</span>
                </div>
                <div class="table">
                  <table style="table-layout:fixed;">
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
                        <td style="text-align:center;">作品</td>
                        <td style="text-align:center;">出版社</td>
                        <td style="text-align:right;">生日</td>
                        <td style="text-align:right;">国家</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in 10" :key="index">
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
                              :title="item.name"
                              @click="authorDetail(item,index)"
                            >东野</span>
                          </div>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">32个品种</span>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">7个出版社</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">1988-08-08</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">日本</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="click-dark">编辑</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="6" style="text-align:right;">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
import { INDUSTRY_AUTHOR_SEARCH } from "../../apis/industry.js";
export default {
  data() {
    return {
      inputVal: "",
      dataSource: [],
      searchLoading: false,
      historyList: [],
      total:0,
      page:1,
      pageSize:20,
    };
  },
  mounted() {
    this.$setSlideHeight();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async search(_value) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        search: _value
      };
      let res = await INDUSTRY_AUTHOR_SEARCH(data);
      if (res.code == 0) {
        // if (res.data.search == this.inputVal) {
        this.dataSource = res.data.map((value, key) => {
          return value;
        });
        // }
        this.searchLoading = false;
      } else {
        this.searchLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    inputSearch(value) {
      console.log(111);
      this.dataSource = [];
      if (value.length > 0) {
        let _value = value.toString();
        this.searchLoading = true;
        this.search(_value);
      }
    },
    selected(value) {
      console.log(222);
      let author_id;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (value == this.dataSource[i].name) {
          author_id = this.dataSource[i].author_id;
        }
      }
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: author_id
        }
      });
    },
    onShowSizeChange(current,pageSize){

    },
    authorDetail(item,index){
      this.$router.push({
        name:"authordetail",
        query:{
          author_id:item.author_id
        }
      })
    }
  }
};
</script>
