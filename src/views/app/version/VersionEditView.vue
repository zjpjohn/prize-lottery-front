<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="display: flex;justify-content: space-between" v-if="version">
      <div style="width: 48%">
        <div class="page-header" style="margin: 0 0 16px 24px;font-size: 18px;font-weight: 500">版本信息</div>
        <el-form ref="addVersionForm" :model="versionDto" label-width="100px">
          <el-form-item label="版本标识">
            <el-input v-if="canUpdate" v-model="versionDto.appVer" placeholder="请输入应用版本号"></el-input>
            <div v-else>{{ versionDto.appVer }}</div>
          </el-form-item>
          <el-form-item label="升级方式">
            <el-switch v-model="versionDto.force"
                       active-text="强制"
                       inactive-text="静默"
                       :active-value="1"
                       v-if="canUpdate"
                       :inactive-value="0"></el-switch>
            <div v-else>{{ versionDto.force === 0 ? '静默升级' : '强制升级' }}</div>
          </el-form-item>
          <el-form-item label="应用文件夹">
            <el-input v-if="canUpdate" v-model="versionDto.appDir" placeholder="请输入应用存放文件夹"></el-input>
            <div v-else>{{ versionDto.appDir }}</div>
          </el-form-item>
          <el-form-item label="全量包名">
            <el-input v-if="canUpdate" v-model="versionDto.appUnity" placeholder="请输入应用全量包名"></el-input>
            <div v-else>{{ versionDto.appUnity }}</div>
          </el-form-item>
          <el-form-item label="V7包名">
            <el-input v-if="canUpdate" v-model="versionDto.appV7a" placeholder="请输入应用v7包名"></el-input>
            <div v-else>{{ versionDto.appV7a }}</div>
          </el-form-item>
          <el-form-item label="V8包名">
            <el-input v-if="canUpdate" v-model="versionDto.appV8a" placeholder="请输入应用v8包名"></el-input>
            <div v-else>{{ versionDto.appV8a }}</div>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-input v-if="canUpdate" v-model="versionDto.depiction" :rows="6" type="textarea"
                      placeholder="请输入应用描述信息"></el-input>
            <div v-else>{{ versionDto.depiction }}</div>
          </el-form-item>
          <el-form-item label="应用图片">
            <div style="display: flex;align-items: start;">
              <draggable v-model="images"
                         :disabled="!canUpdate"
                         :options="{draggable: '.img-item',ghostClass:'ghost',animation:500}"
                         @end="dragImageEnd">
                <transition-group style="display: flex;align-items: center;flex-wrap: wrap">
                  <div v-for="(img,index) in images"
                       :key="index+'_ver_image'"
                       class="img-item">
                    <el-image :src="img" fit="cover"
                              class="ver-img-item"
                              style="position:absolute;border-radius: 6px;border: 1px #cccccc;"></el-image>
                    <div class="mask" v-if="canUpdate">
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
                         v-if="canUpdate&&this.images.length<6"
                         class="ver-img-item">
                <i class="el-icon-plus upload-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item v-if="!canUpdate">
            <el-button type="primary" @click="canUpdate=true">编 辑</el-button>
            <el-button type="plain" @click="$router.back()">返 回</el-button>
          </el-form-item>
          <el-form-item v-if="canUpdate">
            <el-button type="primary" @click="submitEditVersion">提 交</el-button>
            <el-button type="plain" @click="resetAppVersion">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 48%">
        <div class="page-header" style="margin: 0 0 16px 0;font-size: 18px;font-weight: 500">升级描述</div>
        <div style="display: flex;align-items: start;margin-bottom: 24px" v-if="canUpdate">
          <el-input v-model="upgrade"
                    placeholder="请输入版本升级信息(回车键提交)"
                    :rows="3" maxlength="60" show-word-limit type="textarea"
                    @keyup.enter.native="addUpgrade"></el-input>
        </div>
        <div v-if="upgrades.length>0">
          <draggable v-model="upgrades" :disabled="!canUpdate" animation="500" @end="dragUpgradeEnd">
            <transition-group>
              <div v-for="(content,index) in upgrades"
                   :key="index+'_ver_upgrade'"
                   class="upgrade-content">
            <span style="font-size: 13px">
            {{ index + 1 }}.{{ content }}
            </span>
                <div style="position: absolute;bottom: 8px;right: 8px;cursor: pointer;"
                     @click="removeUpgradeItem(index)" v-if="canUpdate">
                  <i class="el-icon-delete" style="font-size: 22px"></i>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div v-else>
          <div
              style="padding-left:48px;height: 160px;display: flex;flex-direction: column;justify-content: center;align-items: start">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 12px">
            <span>暂无描述内容</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {editAppVersion, getAppVersion} from "../../../api/app-service";
import oss_upload from "../../../mixins/oss_upload";

export default {
  name: "VersionEditView",
  mixins: [oss_upload],
  data() {
    return {
      versionId: this.$route.params.versionId,
      upgrade: null,
      canUpdate: false,
      uploadUri: '',
      version: {},
      upgrades: [],
      images: [],
      versionDto: {
        appVer: null,
        force: null,
        appDir: null,
        appUnity: null,
        appV7a: null,
        appV8a: null,
        depiction: null,
      },
    };
  },
  methods: {
    queryAppVersion() {
      getAppVersion(this.versionId).then(data => {
        this.version = data || {};
        Object.assign(this.versionDto, this.version);
        this.upgrades = this.version['upgrades'];
        this.images   = this.version['images'];
      });
    },
    addUpgrade() {
      if (this.upgrade && this.upgrade.trim().length > 0) {
        this.upgrades.push(this.upgrade.replace(/\r\n/g, ''));
        this.submitEditAction({
          id: this.version.id,
          upgrades: this.upgrades
        });
      }
      this.upgrade = null;
    },
    removeUpgradeItem(index) {
      this.upgrades.splice(index, 1);
      this.submitEditAction({
        id: this.version.id,
        upgrades: this.upgrades
      });
    },
    removeVersionImg(index) {
      this.images.splice(index, 1);
      this.submitEditAction({
        id: this.version.id,
        images: this.images
      });
    },
    dragImageEnd() {
      this.submitEditAction({
        id: this.version.id,
        images: this.images
      });
    },
    dragUpgradeEnd() {
      this.submitEditAction({
        id: this.version.id,
        upgrades: this.upgrades
      });
    },
    submitEditAction(params) {
      editAppVersion(params).then(res => this.queryAppVersion());
    },
    submitEditVersion() {
      let params = {};
      Object.keys(this.versionDto)
          .filter(key => this.versionDto[key] !== this.version[key])
          .forEach(key => params[key] = this.versionDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据.');
        return;
      }
      this.submitEditAction(Object.assign({id: this.version.id}, params));
    },
    resetAppVersion() {
      this.canUpdate = false;
      Object.keys(this.versionDto).forEach(key => this.versionDto[key] = this.version[key]);
    },
    imageFilter() {
    },
    uploadImage(params) {
      this.ossUpload({
        file: params.file,
        prefix: '/app/version/',
        success: url => {
          this.images.push(url);
          this.submitEditAction({
            id: this.version.id,
            images: this.images
          });
        }
      });
    },
  },
  mounted() {
    this.queryAppVersion();
  }
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
  color: #afafaf;
}

i.el-icon-delete:hover {
  color: orangered;
}
</style>
