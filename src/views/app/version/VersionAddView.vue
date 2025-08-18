<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="display: flex;justify-content: space-between">
      <div style="width: 46%">
        <div class="page-header" style="margin: 0 0 16px 24px;font-size: 18px;font-weight: 500">版本信息</div>
        <el-form ref="addVersionForm" :model="versionDto" :rules="rules" label-width="100px">
          <el-form-item label="版本标识" prop="appVer">
            <el-input v-model="versionDto.appVer" placeholder="请输入应用版本号"></el-input>
          </el-form-item>
          <el-form-item label="升级方式">
            <el-switch v-model="versionDto.force"
                       active-text="强制"
                       inactive-text="可选"
                       :active-value="1"
                       :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="应用文件夹" prop="appDir">
            <el-input v-model="versionDto.appDir" placeholder="请输入应用存放文件夹"></el-input>
          </el-form-item>
          <el-form-item label="全量包名" prop="appUnity">
            <el-input v-model="versionDto.appUnity" placeholder="请输入应用全量包名"></el-input>
          </el-form-item>
          <el-form-item label="v7包名" prop="appV7a">
            <el-input v-model="versionDto.appV7a" placeholder="请输入应用v7包名"></el-input>
          </el-form-item>
          <el-form-item label="v8包名" prop="appV8a">
            <el-input v-model="versionDto.appV8a" placeholder="请输入应用v8包名"></el-input>
          </el-form-item>
          <el-form-item label="应用描述" prop="depiction">
            <el-input v-model="versionDto.depiction"
                      :rows="4"
                      type="textarea"
                      placeholder="请输入应用描述信息"></el-input>
          </el-form-item>
          <el-form-item label="应用图片">
            <div style="display: flex;align-items: start">
              <draggable v-model="versionDto.images"
                         :options="{draggable: '.img-item',ghostClass:'ghost',animation:500}">
                <transition-group style="display: flex;align-items: center;flex-wrap: wrap">
                  <div v-for="(img,index) in versionDto.images"
                       :key="index+'_ver_image'"
                       class="img-item">
                    <img :src="img" alt=""
                         class="ver-img-item"
                         style="position:absolute;border-radius: 6px;border: 1px #cccccc;">
                    <div class="mask">
                      <div class="img-operate">
                        <i class="el-icon-circle-close" @click="removeVersionImg(index)"></i>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </draggable>
              <el-upload :action="uploadUri"
                         :show-file-list="false"
                         :before-upload="imageFilter"
                         :http-request="uploadImage"
                         class="ver-img-item">
                <i class="el-icon-plus upload-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="creating" @click="submitVersionAdd">提 交</el-button>
            <el-button type="plain" @click="clearVersionAdd">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 50%">
        <div class="page-header" style="margin: 0 0 16px 0;font-size: 18px;font-weight: 500">升级描述</div>
        <div style="display: flex;align-items: start;margin-bottom: 24px">
          <el-input v-model="upgrade"
                    placeholder="请输入版本升级信息(回车键提交)"
                    :rows="3" maxlength="60" show-word-limit type="textarea"
                    @keyup.enter.native="addUpgrade"></el-input>
        </div>
        <div v-if="versionDto.upgrades.length>0">
          <draggable v-model="versionDto.upgrades" animation="1000">
            <transition-group>
              <div v-for="(content,index) in versionDto.upgrades"
                   :key="index+'_ver_upgrade'"
                   class="upgrade-content">
            <span style="font-size: 13px">
            {{ index + 1 }}.{{ content }}
            </span>
                <div style="position: absolute;bottom: 8px;right: 8px;cursor: pointer"
                     @click="removeUpgradeItem(index)">
                  <i class="el-icon-delete" style="font-size: 22px"></i>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div v-else>
          <div
              style="padding-left:48px;height: 160px;background-color:#f8f8f8;display: flex;flex-direction: column;justify-content: center;align-items: start">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 12px">
            <span>暂无版本升级信息</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addAppVersion} from "../../../api/app-service";
import oss_upload from "../../../mixins/oss_upload";

export default {
  name: "VersionAddView",
  mixins: [oss_upload],
  data() {
    return {
      appNo: this.$route.params.appNo,
      upgrade: null,
      uploadUri: '',
      creating: false,
      versionDto: {
        appVer: null,
        appDir: null,
        appUnity: null,
        appV7a: null,
        appV8a: null,
        depiction: null,
        force: 0,
        upgrades: [],
        images: [],
      },
      rules: {
        appVer: [
          {
            required: true,
            message: '应用版本号为空',
            trigger: 'blur'
          }
        ],
        appDir: [
          {
            required: true,
            message: '下载应用文件夹为空',
            trigger: 'blur'
          }
        ],
        appUnity: [
          {
            required: true,
            message: '应用全量包名为空',
            trigger: 'blur'
          }
        ],
        appV7a: [
          {
            required: true,
            message: '应用armv7包名为空',
            trigger: 'blur'
          }
        ],
        appV8a: [
          {
            required: true,
            message: '应用armv8包名为空',
            trigger: 'blur'
          }
        ],
        depiction: [
          {
            required: true,
            message: '应用描述为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    addUpgrade() {
      if (this.upgrade && this.upgrade.trim().length > 0) {
        this.versionDto.upgrades.push(this.upgrade.replace(/\r\n/g, ''));
      }
      this.upgrade = null;
    },
    removeUpgradeItem(index) {
      this.versionDto.upgrades.splice(index, 1);
    },
    removeVersionImg(index) {
      this.versionDto.images.splice(index, 1);
    },
    imageFilter() {
    },
    uploadImage(params) {
      this.ossUpload({
        file: params.file,
        prefix: '/app/version/',
        success: url => {
          this.versionDto.images.push(url);
        }
      })
    },
    submitVersionAdd() {
      this.$refs['addVersionForm'].validate(valid => {
        if (!valid) {
          return;
        }
        if (this.versionDto.upgrades.length === 0) {
          this.$message.error('升级描述为空.');
          return;
        }
        if (this.versionDto.images.length === 0) {
          this.$message.error('应用图片为空.');
          return;
        }
        this.creating = true;
        addAppVersion(Object.assign({appNo: this.appNo}, this.versionDto))
            .then(res => {
              this.$message.success('应用版本创建成功.');
              this.clearVersionAdd();
            })
      })
    },
    clearVersionAdd() {
      this.upgrade    = null;
      this.versionDto = {
        version: null,
        appUri: null,
        upgrades: [],
        images: []
      };
      this.creating   = false;
      this.$refs['addVersionForm'].resetFields();
    },
  },
}
</script>

<style scoped>
.upgrade-content {
  height: 40px;
  position: relative;
  background: #f8f8f8;
  padding: 16px 24px;
  border-radius: 6px;
  margin-bottom: 16px;
}


.ver-img-item {
  width: 85px;
  height: 150px;
}

.ver-img-item >>> .el-upload {
  width: 85px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-icon {
  font-size: 28px;
  text-align: center;
  line-height: 150px;
  color: #999999;
}

.img-item {
  width: 85px;
  height: 150px;
  margin-right: 20px;
  position: relative;
  border: 1px solid #f1f1f1;
  border-radius: 6px;
}

.img-item .mask {
  display: none;
  position: absolute;
  z-index: 1;
  width: 85px;
  height: 150px;
  background-color: rgba(0, 0, 0, .45);
  border-radius: 6px;
}

.img-item .mask .img-operate {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
}

.img-item .mask i {
  font-size: 28px;
}

.img-item:hover .mask {
  display: block;
}

i.el-icon-delete {
  color: #acacac;
}

i.el-icon-delete:hover {
  color: orangered;
}
</style>
