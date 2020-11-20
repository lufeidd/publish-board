<template>
  <div id="organizePage">
    <div>
      <HeadNav type="organize" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
      <div class="wd-1220">
        <div class="clearfix">
          <div class="float-left">
            <SlideNav type="organize" sort="organizeInfo"></SlideNav>
          </div>
          <div class="float-right">
            <div class="main-container">
              <div class="model-container">
                <div class="model-bg" v-if="pagePower == 1" style="min-height:660px;">
                  <div class="section-title clearfix">
                    <span class="float-left">机构信息</span>
                    <span class="float-right click-font" @click="edit" v-if="!isEdit">编辑</span>
                  </div>
                  <div class="container">
                    <div class="option">
                      <span class="lable">*机构名称</span>
                      <div class="normal" v-if="isEdit">
                        <a-input placeholder v-model="editInfo.organization_name" />
                      </div>
                      <div class="normal" v-else>
                        <span>{{baseInfo.organization_name}}</span>
                      </div>
                    </div>
                    <div class="option">
                      <span class="lable">*绑定出版单位</span>
                      <div class="normal">
                        <span>{{baseInfo.supplier_name}}</span>
                      </div>
                    </div>
                    <div class="option">
                      <span class="lable">*机构类型</span>
                      <div class="normal">
                        <span>{{baseInfo.type == 1?'正式':'试用'}}</span>
                      </div>
                    </div>
                    <div style="padding:0 20px;margin:10px 0;">
                      <!-- <a-divider /> -->
                      <div class="line"></div>
                    </div>
                    <div class="option">
                      <span class="lable">地址</span>
                      <div class="normal" v-if="isEdit">
                        <a-input placeholder v-model="editInfo.address" />
                      </div>
                      <div class="normal" v-else>
                        <span v-if="baseInfo.address">{{baseInfo.address}}</span>
                        <span v-else>--</span>
                      </div>
                    </div>
                    <div class="option">
                      <span class="lable">联系人</span>
                      <div class="normal" v-if="isEdit">
                        <a-input placeholder v-model="editInfo.contact_name" />
                      </div>
                      <div class="normal" v-else>
                        <span v-if="baseInfo.contact_name">{{baseInfo.contact_name}}</span>
                        <span v-else>--</span>
                      </div>
                    </div>
                    <div class="option">
                      <span class="lable">联系电话</span>
                      <div class="normal" v-if="isEdit">
                        <a-input placeholder v-model="editInfo.contact_mobile" />
                      </div>
                      <div class="normal" v-else>
                        <span v-if="baseInfo.contact_mobile">{{baseInfo.contact_mobile}}</span>
                        <span v-else>--</span>
                      </div>
                    </div>
                    <div class="option">
                      <span class="lable">联系邮箱</span>
                      <div class="normal" v-if="isEdit">
                        <a-input placeholder v-model="editInfo.contact_email" />
                      </div>
                      <div class="normal" v-else>
                        <span v-if="baseInfo.contact_email">{{baseInfo.contact_email}}</span>
                        <span v-else>--</span>
                      </div>
                    </div>
                    <div class="option" v-if="isEdit">
                      <span class="lable"></span>
                      <div class="normal">
                        <a-button type="primary" @click="save">保存修改</a-button>
                        <a-button type="default" style="margin-left:5px;" @click="isEdit = false">放弃</a-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="model-bg"
                  style="min-height:660px;padding-bottom:75px;position:relative"
                  v-else
                >
                  <PageNoPower></PageNoPower>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
#organizePage {
  padding-bottom: 20px;
  & .container {
    padding: 15px 10px;
    & .option {
      font-size: $fontSize - 2;
      margin-bottom: 20px;
      & .lable {
        display: inline-block;
        width: 90px;
        text-align: right;
      }

      & .normal {
        display: inline-block;
        position: relative;
        color: $fontColor1;
        margin-left: 10px;
        width: 460px;
      }
    }
    & .line{
      height: 1px;
      background-color: $themeColor5;
    }
  }
}
</style>
<script>
import { ORGANIZATION_GET, ORGANIZATION_EDIT } from "../../apis/admin.js";
import { SUPPLIER_GET } from "../../apis/common.js";
export default {
  data() {
    return {
      pagePower: 1,
      baseInfo: {
        organization_id: "", // 机构id
        supplier_id: "", // 出版社id
        supplier_name: "",
        organization_name: "", // 机构名字
        // short_name: "", // 短名
        type: 1, // 类型, 1正式,2 试用
        // state: 1, // 状态, 1正常, 0删除
        address: "", //地址
        contact_name: "",
        contact_mobile: "",
        contact_email: ""
        // resource_ids: "401,403,107,701", // 机构权限
        // create_time: "2020-07-24 13:21:13", // 创建时间
        // update_time: "2020-07-24 13:21:13" // 更新时间
      },
      editInfo: {
        organization_id: "", // 机构id
        supplier_id: "", // 出版社id
        supplier_name: "",
        organization_name: "", // 机构名字
        // short_name: "", // 短名
        type: 1, // 类型, 1正式,2 试用
        // state: 1, // 状态, 1正常, 0删除
        address: "", //地址
        contact_name: "",
        contact_mobile: "",
        contact_email: ""
      },
      isEdit: false
    };
  },
  mounted() {
    this.getData();
    this.getPublisher();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_GET(data);
      if (res.code == 0) {
        this.pagePower = 1;
        this.baseInfo.organization_id = res.data.organization_id;
        this.baseInfo.supplier_id = res.data.supplier_id;
        this.baseInfo.organization_name = res.data.organization_name;
        this.baseInfo.type = res.data.type;
        this.baseInfo.address = res.data.address;
        this.baseInfo.contact_name = res.data.contact_name;
        this.baseInfo.contact_mobile = res.data.contact_mobile;
        this.baseInfo.contact_email = res.data.contact_email;
      } else {
        if(res.code == 1009){
          this.pagePower = 0;
        }else{
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 绑定出版社获取
    async getPublisher() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await SUPPLIER_GET(data);
      if (res.code == 0) {
        this.baseInfo.supplier_name = res.data.supplier_name;
        // console.log(this.baseInfo);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async save() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.editInfo.supplier_id,
        organization_name: this.editInfo.organization_name,
        type: this.editInfo.type,
        address: this.editInfo.address,
        contact_name: this.editInfo.contact_name,
        contact_mobile: this.editInfo.contact_mobile,
        contact_email: this.editInfo.contact_email,
        organization_id: this.editInfo.organization_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "修改成功", 0);
        this.baseInfo = this.editInfo;
        this.isEdit = false;
        this.$refs.head.publishInfo.organization_name = this.baseInfo.organization_name;
        this.$refs.head.accountInfo.extra = this.$refs.head.accountInfo.extra.map(
          (value, key) => {
            if (value.organization_id == this.baseInfo.organization_id) {
              value.organization_name = this.baseInfo.organization_name;
            }
            return value;
          }
        );
        localStorage.setItem(
          "headInfo",
          JSON.stringify(this.$refs.head.accountInfo)
        );
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    edit() {
      this.isEdit = true;
      this.editInfo = this.baseInfo;
    },
    publisherChange() {
      // this.pagePower = this.$refs.head.publishInfo.user_organization_type;
      this.getData();
      this.getPublisher();
    }
  }
};
</script>
