<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 45%" v-if="appInfo!=null">
      <el-form ref="editAppForm"
               :model="appDto"
               label-width="100px">
        <el-form-item label="应用标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ appInfo.seqNo }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ appInfo.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="应用名称">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ appInfo.name }}</span>
        </el-form-item>
        <el-form-item label="应用图标">
          <div v-if="showEdit">
            <div style="display: flex;align-items: center">
              <el-input v-model="appDto.logo" disabled style="margin-right: 16px"
                        placeholder="请上传应用图标"></el-input>
              <el-upload :action="uploadUri"
                         :show-file-list="false"
                         :before-upload="imageFilter"
                         :http-request="uploadLogo">
                <el-button size="small" type="primary" style="height: 36px">上传图片</el-button>
              </el-upload>
            </div>
            <div style="line-height: 32px;height: 32px;color: #7c7c7c">注：图片格式为png,jpg，建议尺寸256*256</div>
          </div>
          <img v-else :src="appInfo.logo+'?x-oss-process=image/resize,w_36,h_36,m_fixed'" alt="">
        </el-form-item>
        <el-form-item label="OpenInstall">
          <el-input v-model="appDto.openInstall" placeholder="请输入OpenInstall的appKey" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.openInstall }}</span>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="appDto.corp" placeholder="请输入公司名称" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.corp }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="appDto.telephone" placeholder="请输入联系方式" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.telephone }}</span>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="appDto.address" placeholder="请输入联系地址" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.address }}</span>
        </el-form-item>
        <el-form-item label="版权信息">
          <el-input v-model="appDto.copyright" placeholder="请输入版权信息" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.copyright }}</span>
        </el-form-item>
        <el-form-item label="备案信息">
          <el-input v-model="appDto.record" placeholder="请输入应用备案信息" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ appInfo.record }}</span>
        </el-form-item>
        <el-form-item label="备注描述">
          <el-input v-model="appDto.remark"
                    type="textarea"
                    :rows="3"
                    v-if="showEdit"
                    placeholder="请输入备注描述信息"></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ appInfo.remark }}
          </div>
        </el-form-item>
        <el-form-item v-if="!showEdit">
          <el-button type="primary" @click="showEdit=true">编辑</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item v-if="showEdit&&appInfo">
          <el-button type="primary" @click="submitEditApp">提交</el-button>
          <el-button type="plain" @click="resetAppInfo">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {editApp, getAppInfo} from "../../api/app-service";
import oss_upload from "../../mixins/oss_upload";

export default {
  name: "AppDetailView",
  mixins: [oss_upload],
  data() {
    return {
      showEdit: false,
      uploadUri: '',
      headers: {},
      appId: this.$route.params.appId,
      appInfo: null,
      appDto: {
        logo: null,
        copyright: null,
        corp: null,
        openInstall: null,
        telephone: null,
        address: null,
        record: null,
        remark: null,
      },
    };
  },
  methods: {
    imageFilter() {
    },
    uploadLogo(params) {
      this.ossUpload({
        file: params.file,
        prefix: '/app/logo/',
        success: url => {
          this.appDto.logo = url;
        }
      })
    },
    queryAppInfo() {
      getAppInfo(this.appId).then(data => {
        this.appInfo = data || null;
        if (this.appInfo != null) {
          Object.assign(this.appDto, data);
        }
      });
    },
    submitEditApp() {
      let params = {};
      Object.keys(this.appDto)
          .filter(key => this.appDto[key] !== this.appInfo[key])
          .forEach(key => params[key] = this.appDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return
      }
      editApp(Object.assign({id: this.appId}, params))
          .then(_ => {
            this.showEdit = false;
            this.queryAppInfo();
          });
    },
    resetAppInfo() {
      this.showEdit = false;
      Object.assign(this.appDto, this.appInfo);
    }
  },
  mounted() {
    this.queryAppInfo();
  }
}
</script>

<style scoped>

</style>
