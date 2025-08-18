<template>
  <div style="margin:48px 32px 0 32px">
    <div style="width: 50%;">
      <el-form ref="addAppForm" :model="appDto" :rules="rules" label-width="100px">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="appDto.name" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用图标" prop="logo">
          <div style="display: flex;align-items: center">
            <el-input v-model="appDto.logo" disabled style="margin-right: 16px" placeholder="请上传应用图标"></el-input>
            <el-upload :action="uploadUri"
                       :show-file-list="false"
                       :before-upload="imageFilter"
                       :http-request="uploadLogo">
              <el-button size="small" type="primary" style="height: 36px">上传图片</el-button>
            </el-upload>
          </div>
          <div style="line-height: 32px;height: 32px;color: #7c7c7c">注：图片格式为png,jpg，建议尺寸256*256</div>
        </el-form-item>
        <el-form-item label="OpenInstall">
          <el-input v-model="appDto.openInstall" placeholder="请输入OpenInstall的appKey"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="corp">
          <el-input v-model="appDto.corp" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input v-model="appDto.telephone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="appDto.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="版权信息" prop="copyright">
          <el-input v-model="appDto.copyright" placeholder="请输入版权信息"></el-input>
        </el-form-item>
        <el-form-item label="备案信息" prop="record">
          <el-input v-model="appDto.record" placeholder="请输入应用备案信息"></el-input>
        </el-form-item>
        <el-form-item label="备注描述" prop="remark">
          <el-input v-model="appDto.remark" type="textarea" :rows="3" placeholder="请输入备注描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="submitAppAction">确 定</el-button>
          <el-button type="plain" @click="resetAppForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addApp} from "../../api/app-service";
import oss_upload from "../../mixins/oss_upload";

export default {
  name: "AppAddView",
  mixins: [oss_upload],
  data() {
    return {
      uploadUri: '',
      headers: {},
      creating: false,
      appDto: {
        name: null,
        logo: null,
        corp: null,
        openInstall: null,
        telephone: null,
        address: null,
        copyright: null,
        record: null,
        remark: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '应用名称为空',
            trigger: 'blur'
          }
        ],
        logo: [
          {
            required: true,
            message: '应用图标为空',
          }
        ],
        copyright: [
          {
            required: true,
            message: '应用版权信息为空',
            trigger: 'blur'
          }
        ],
        corp: [
          {
            required: true,
            message: '公司名称为空',
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '联系方式为空',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '所在地址为空',
            trigger: 'blur'
          }
        ],
        record: [
          {
            required: true,
            message: '备案信息为空',
            trigger: 'blur'
          }
        ],
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
    submitAppAction() {
      this.$refs['addAppForm'].validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        addApp(this.appDto).then(response => {
          this.resetAppForm();
          this.$message.success('创建应用成功');
        });
      })
    },
    resetAppForm() {
      Object.keys(this.appDto).forEach(key => this.appDto[key] = null);
      this.creating = false;
      this.$refs['addAppForm'].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
