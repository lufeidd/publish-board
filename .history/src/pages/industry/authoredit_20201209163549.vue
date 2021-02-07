<template>
  <div id="userPage" @click="showResult = false">
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
          <div class="main-container" v-if="pagePower == 1">
            <div class="model-container">
              <div class="model-bg" style="min-height: 660px">
                <div class="section-title">作者信息</div>
                <div class="container" style="padding-bottom: 20px">
                  <div class="option">
                    <span class="lable top">作者头像</span>
                    <div class="normal">
                      <img
                        :src="authorInfo.photo"
                        alt=""
                        style="width:80px;height:80px;"
                        v-if="authorInfo.photo"
                      />
                      <span
                        v-else
                        class="no-pic"
                        style="
                          min-width: 80px;
                          min-height: 80px;
                          border-radius: 10px;
                        "
                      ></span>
                    </div>
                    <div
                      class="uploadPackage"
                      style="
                        display: inline-block;
                        vertical-align: top;
                        margin-left: 5px;
                        width:100px;
                        height:32px;
                        overflow:hidden;
                      "
                    >
                      <a-upload
                        name="file"
                        accept=".png,.jpg,.jpeg"
                        @change="handleChange"
                      >
                        <a-button >
                          <a-icon type="upload" /> 上传图片
                        </a-button>
                      </a-upload>
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable">*作者名称</span>
                    <div class="normal" style="width: 460px">
                      <a-input
                        placeholder="输入作者名称"
                        v-model="authorInfo.name"
                      />
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable">*国家</span>
                    <div class="normal">
                      <a-dropdown :trigger="['click']" v-model="choose">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                          style="color: #4576db; font-size: 12px"
                        >
                          {{ authorInfo.country }}
                          <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <a-input
                            style="margin: 5px 10px; width: 200px"
                            placeholder="请输入国家名称"
                            v-model="inputVal"
                            @change="onSearch"
                          />
                          <a-menu-item
                            v-for="(item, index) in chooseList"
                            :key="index"
                          >
                            <a
                              href="javascript:;"
                              style="
                                padding: 5px 15px;
                                color: #4576db;
                                font-size: 12px;
                              "
                              @click="selectOpt(item, index)"
                              >{{ item.country }}</a
                            >
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable">*生日</span>
                    <div class="normal" style="width: 460px">
                      <a-date-picker
                        @change="onChangeBirth"
                        inputReadOnly
                        v-model="authorInfo.birthday"
                      />
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable">逝世</span>
                    <div class="normal" style="width: 460px">
                      <a-date-picker
                        @change="onChangeDeath"
                        inputReadOnly
                        v-model="authorInfo.death_date"
                      />
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable top">作者介绍</span>
                    <div class="normal" style="width: 800px">
                      <a-textarea
                        placeholder="请输入作者介绍"
                        v-model="authorInfo.description"
                        style="height: 180px"
                      />
                    </div>
                  </div>
                  <div class="option" style="margin-top: 50px">
                    <span class="lable"></span>
                    <div class="normal">
                      <a-button type="primary" @click="save">保存修改</a-button>
                      <a-button
                        type="default"
                        style="margin-left: 5px"
                        @click="$router.go(-1)"
                        >放弃</a-button
                      >
                      <a-button
                        type="default"
                        style="margin-left: 5px"
                        @click="merge"
                        >合并作者</a-button
                      >
                    </div>
                  </div>
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
    <!-- 作者合并 -->
    <a-modal
      v-model="addOrganize"
      width="600px"
      title="作者合并"
      on-ok="handleOk"
    >
      <template slot="footer">
        <!-- <a-button key="back" @click="handleCancel">取消</a-button> -->
        <a-button key="submit" type="primary" @click="handleOk">合并</a-button>
      </template>
      <div class="popup" style="height: 215px" @click="showResult = false">
        <span>选择作者</span>
        <div style="width: 310px; display: inline-block; position: relative">
          <a-input
            placeholder="搜索作者名称"
            @input="searchAuthor"
            @focus="searchAuthor"
            @click.stop="inputClick"
            v-model="inputAuthor"
          >
          </a-input>
          <div class="search-result" v-if="showResult">
            <div class="list" v-if="dataSource.length > 0">
              <div
                class="result-content"
                v-for="(item, index) in dataSource"
                :key="index"
                @click.stop="onSelect(item, index)"
              >
                <span class="result-title" :title="item.name">{{
                  item.name
                }}</span>
              </div>
            </div>
            <div class="no-result" v-if="dataSource.length == 0 && showAbout">
              没有相关作者
            </div>
            <div
              style="text-align: center; margin-top: 50px"
              v-if="searchLoading"
            >
              <a-spin tip></a-spin>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/user/information.scss"></style>
<script>
import {
  INDUSTRY_AUTHOR_INFO,
  INDUSTRY_AUTHOR_SEARCH,
  INDUSTRY_AUTHOR_EDIT,
  INDUSTRY_AUTHOR_MERGE,
} from "../../apis/industry.js";
import { COMMON_UPLOAD, COMMON_COUNTRY } from "../../apis/common.js";
export default {
  data() {
    return {
      pagePower: 1,
      authorId: 0,
      isLoading: true,
      pic: "",
      authorInfo: {},
      countryList: [],
      chooseList: [],
      choose: false,
      inputVal: "",
      inputAuthor: "",
      addOrganize: false,
      chooseId: 0,
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
    };
  },
  mounted() {
    this.authorId = this.$route.query.author_id;
    this.pagePower = this.$refs.head.accountInfo.type;
    if (this.pagePower == 1) {
      this.getData();
    }else{
      this.isLoading = false;
    }
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        author_id: this.authorId,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_INFO(data);
      if (res.code == 0) {
        // this.pagePower = true;
        this.authorInfo = res.data;
        this.pic = res.data.photo;
        this.authorInfo.birthday = this.authorInfo.birthday.replace(
          /年|月/g,
          "-"
        );
        this.authorInfo.birthday = this.authorInfo.birthday.replace(/日/g, "");
        this.authorInfo.death_date = this.authorInfo.death_date.replace(
          /年|月/g,
          "-"
        );
        this.authorInfo.death_date = this.authorInfo.death_date.replace(
          /日/g,
          ""
        );
        this.getCountry();
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          // this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getCountry(file) {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_COUNTRY(data);
      if (res.code == 0) {
        this.countryList = [];
        this.chooseList = [];
        this.countryList = res.data;
        this.chooseList = res.data;
        res.data.map((value, key) => {
          if (this.authorInfo.country == value.country) {
            this.authorInfo.countryCode = value.code;
          }
        });
        this.isLoading = false;
        // console.log(this.authorInfo);
      } else {
        this.isLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async upload(_content) {
      var tStamp = this.$getTimeStamp();
      let data = {
        // aaa: _content,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let formData = new FormData(),
        _this = this;
      formData.append("file", _content);
      formData.append("timestamp", tStamp);
      formData.append("sign", data.sign);
      // console.log("data", formData);
      this.$axios({
        url: _this.$baseUrl + "/common/upload",
        method: "post",
        data: formData,
      })
        .then((res) => {
          // console.log(res);
          if(res.data.code == 0){
            _this.$refs.head.globalTip(2, "上传成功", 0);
            _this.authorInfo.photo = res.data.data.file;
          }else{
            _this.$refs.head.globalTip(1, res.data.message, res.data.code);
          }
        })
    },
    async saveAuthor() {
      // console.log(this.authorInfo)
      var tStamp = this.$getTimeStamp();
      let data = {
        author_id: this.authorId,
        pic: this.authorInfo.photo,
        author_name: this.authorInfo.name,
        country_code: this.authorInfo.countryCode,
        birth_date: this.authorInfo.birthday,
        death_date: this.authorInfo.death_date,
        description: this.authorInfo.description,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "保存成功", 0);
        let _this = this;
        setTimeout(() => {
          _this.$router.go(-1);
        }, 1000);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async mergeAuthor() {
      var tStamp = this.$getTimeStamp();
      let data = {
        author_id: this.authorId,
        target_author_id: this.chooseId,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_MERGE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "合并成功", 0);
        let _this = this;
        setTimeout(() => {
          _this.$router.go(-1);
        }, 1000);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async getAuthorData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        search: this.inputAuthor,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_AUTHOR_SEARCH(data);
      if (res.code == 0) {
        this.dataSource = res.data;
        this.searchLoading = false;
        this.showAbout = true;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info);
        this.upload(info.file.originFileObj);
      }
    },
    onSearch() {
      this.chooseList = [];
      this.countryList.map((value, key) => {
        if (value.country.indexOf(this.inputVal) > -1) {
          this.chooseList.push(value);
        }
      });
    },
    selectOpt(item, index) {
      this.authorInfo.country = item.country;
      this.authorInfo.countryCode = item.code;
      this.choose = false;
      this.inputVal = "";
      this.chooseList = [];
      this.chooseList = this.countryList;
    },
    onChangeBirth(date, dateString) {
      // console.log(date,dateString);
      this.authorInfo.birthday = dateString;
    },
    onChangeDeath(date, dateString) {
      this.authorInfo.death_date = dateString;
    },
    save() {
      if (this.authorInfo.name.length == 0) {
        this.$refs.head.globalTip(1, "作者名称不能为空", 0);
        return;
      }
      if (this.authorInfo.country.length == 0) {
        this.$refs.head.globalTip(1, "国家不能为空", 0);
        return;
      }
      if (this.authorInfo.birthday.length == 0) {
        this.$refs.head.globalTip(1, "作者生日不能为空", 0);
        return;
      }
      this.saveAuthor();
    },
    handleOk() {
      if (this.chooseId == 0) {
        this.$refs.head.globalTip(1, "请选择作者", 0);
        return;
      }
      var _this = this;
      this.$confirm({
        title: "确认合并",
        content:
          "确认将“" +
          _this.authorInfo.name +
          "”合并至作者“" +
          _this.inputAuthor +
          "”，合并后无法撤销。合并后，“" +
          _this.authorInfo.name +
          "”将被删除，其下的所有品种将转移至“" +
          _this.inputAuthor +
          "”，作者信息以“" +
          _this.inputAuthor +
          "”为准。",
        okText: "确认",
        cancelText: "取消",
        okType: "primary",
        onOk() {
          _this.mergeAuthor();
        },
        onCancel() {},
      });
    },
    merge() {
      this.addOrganize = true;
      this.chooseId = 0;
      this.dataSource = [];
      this.inputAuthor = "";
    },
    searchAuthor() {
      // console.log(value);
      this.chooseId = 0;
      this.dataSource = [];
      this.showResult = true;
      this.searchLoading = true;
      this.showAbout = false;
      this.getAuthorData();
    },
    onSelect(item, index) {
      // console.log("select");
      this.chooseId = item.author_id;
      this.inputAuthor = item.name;
      this.showResult = false;
    },
    inputClick() {},
    publisherChange() {
      this.pagePower = this.$refs.head.accountInfo.type;
    },
  },
};
</script>
