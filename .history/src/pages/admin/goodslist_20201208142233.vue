<template>
  <div id="organizePage" @click="bodyClick">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="goods"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <!-- <div class="model-container">
              <div class="model-bg total-user">全平台总计 {{goodsCount}} 个品种</div>
            </div>-->
            <div class="model-container">
              <div
                class="model-bg"
                style="min-height: 660px; padding-bottom: 75px"
              >
                <div class="section-title">
                  品种列表
                  <span class="desc">共{{ goodsCount }}个品种</span>
                </div>
                <div class="search">
                  <div class="content common">
                    <a-input-search
                      placeholder="搜索品种ID、ISBN、品种名称"
                      enter-button="搜索"
                      size="large"
                      @search="onSearch"
                      v-model="inputVal"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input-search>
                  </div>
                </div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="100" />
                      <col width="250" />
                      <col width="100" />
                      <col width="150" />
                      <col width="130" />
                      <col width="150" />
                      <col width="200" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>品种ID</td>
                        <td>品种信息</td>
                        <td>作者</td>
                        <td style="text-align: center">ISBN</td>
                        <td style="text-align: center">出版社</td>
                        <td style="text-align: right">出版时间</td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="userList.length > 0">
                      <tr v-for="(item, index) in userList" :key="index">
                        <td>{{ item.goods_id }}</td>
                        <td>
                          <div class="goods-desc">
                            <img
                              :src="item.cover_pic"
                              alt
                              width="40px"
                              height="40px"
                              v-if="item.cover_pic"
                            />
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="click-font goods-name"
                              :title="item.title"
                              @click="toDetail(item, index)"
                              >{{ item.title }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <div class="click-font author">
                            <div
                              class="author-name"
                              @click.stop="openAuthor(item, index)"
                            >
                              {{ item.author }}
                            </div>
                            <div class="author-list" v-if="item.active">
                              <div v-if="item.authors.length > 0">
                                <div
                                  class="author-item click"
                                  v-for="(aitem, aindex) in item.authors"
                                  :key="aindex"
                                  @click.stop="toAuthor(aitem.author_id)"
                                >
                                  {{ aitem.name }}
                                </div>
                              </div>
                              <div v-else>
                                <div class="author-item">
                                  未查询到对应作者信息
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style="text-align: center">{{ item.isbn }}</td>
                        <td style="text-align: center">
                          {{ item.publisher_short }}
                        </td>
                        <td style="text-align: right">
                          {{ item.publish_date }}
                        </td>
                        <td style="text-align: right">
                          <span
                            class="click-font"
                            @click="toDetail(item, index)"
                            >详情</span
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" style="text-align: center">
                          <div style="margin-top: 20px" v-if="searchLoading">
                            <a-spin tip="正在加载中..."></a-spin>
                          </div>
                          <a-empty v-else />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div class="page">
                  <a-pagination
                    :show-total="(total) => `共 ${total} 条数据`"
                    :default-current="1"
                    :total="total"
                    :defaultPageSize="page_size"
                    v-model="page"
                    @change="onShowSizeChange"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
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
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import { TOP_SEARCH } from "../../apis/publish.js";
export default {
  data() {
    return {
      powerType: 2,
      goodsCount: 0,
      readOrganize: false,
      page: 1,
      page_size: 20,
      total: 0,
      userList: [],
      inputVal: "",
      searchLoading: false,
      userInfo: {
        user_id: 0, // 用户ID
        type: 3, // 用户类型 1, 超管, 2普通(用户和机构管理员)
        account: 13112345678, // 账号
        mobile: 13112345678, // 手机
        pic: "", // 图像
        state: 1, // 状态, 1正常, 0删除
        email: "", // 邮箱
        create_time: "", // 创建时间
        count: 1, // 加入机构数量
        organization_id: 0, // 机构id
        organization_name: "", // 机构名字
      },
      isLoading: false,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.goodsCount = this.$refs.head.accountInfo.goods_count;
    if (this.powerType == 1) {
      // this.getData()
    }
  },
  updated() {},
  methods: {
    onSearch(value) {
      if (this.inputVal.length > 0) {
        this.page = 1;
        this.userList = [];
        this.searchLoading = true;
        this.getData();
      } else {
        this.$refs.head.globalTip(1, "请输入搜索内容", 0);
      }
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.userList = [];
      this.searchLoading = true;
      this.getData();
    },
    bodyClick() {
      this.userList = this.userList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    openAuthor(item, index) {
      this.userList = this.userList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    toDetail(item, index) {
      // console.log(111)
      let _url =
        window.location.href.split("#")[0] +
        "#" +
        "/publish/detail?goods_id=" +
        item.goods_id;
      // console.log(_url)
      window.open(_url, "_blank");
    },
    toAuthor(id) {
      let _url =
        window.location.href.split("#")[0] +
        "#" +
        "/industry/authordetail?author_id=" +
        id;
      // console.log(_url)
      window.open(_url, "_blank");
    },
    // 获取列表数据
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        page: this.page,
        page_size: this.page_size,
        search: this.inputVal,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        this.userList = [];
        this.total = res.data.count;
        this.searchLoading = false;
        res.data.lists.map((value, key) => {
          value.active = false;
          this.userList.push(value);
        });
      } else {
        this.searchLoading = false;
        this.total = 0;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
  },
};
</script>
