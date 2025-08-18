<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 40%;margin-top: 24px">
      <div style="margin-left: 24px">
        <div class="page-header" style="margin-bottom: 16px">批量导入</div>
        <div style="display: flex;align-items: center">
          <el-input v-model="jsonPath" placeholder="请上传符合规则的应用资源集合json文件"
                    style="margin-right: 16px" disabled=""></el-input>
          <el-upload :action="uploadAction"
                     :multiple="false"
                     :show-file-list="false"
                     :auto-upload="false"
                     :on-change="jsonFileHandle">
            <el-button size="small" type="primary" style="height: 36px;margin-right: 16px">选择文件</el-button>
          </el-upload>
          <el-button size="small" type="primary" style="height: 36px;margin-right: 4px"
                     :disabled="batchJson==null"
                     :loading="creating"
                     @click="submitBatchAction">确定上传
          </el-button>
          <el-button size="small" type="plain" style="height: 36px"
                     @click="cancelBatch">取消上传
          </el-button>
        </div>
      </div>
      <div class="page-header" style="margin: 20px 0 24px 24px;">创建资源</div>
      <el-form ref="resourceForm"
               :model="resourceDto"
               :rules="rules"
               label-width="100px">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="resourceDto.name" placeholder="请输入资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源标识" prop="feNo">
          <el-input v-model="resourceDto.feNo" placeholder="请输入资源标识" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="resourceDto.remark"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入备注信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-row>
            <el-col :span="10">
              <el-form-item label="资源类型" prop="type">
                <el-select clearable v-model="resourceDto.type" placeholder="选择资源类型">
                  <el-option label="应用图标" :value="1"></el-option>
                  <el-option label="背景图片" :value="2"></el-option>
                  <el-option label="其他资源" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="资源规格" prop="specs.width">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model.number="resourceDto.specs.width"
                              placeholder="请输入资源宽度"
                              clearable></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <span>x</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model.number="resourceDto.specs.height"
                              placeholder="请输入资源高度"
                              clearable></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="资源地址" prop="uri">
          <el-input v-model="resourceDto.uri" placeholder="请输入资源地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="默认资源" prop="defUri">
          <el-input v-model="resourceDto.defUri" placeholder="请输入默认资源" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源展示">
          <div style="display: flex;align-items: center">
            <el-image :src="resourceDto.uri" fit="contain"
                      style="background-color:#f5f5f5;height: 160px;width: 100px;margin-right:24px">
              <div slot="error" class="image-error">
                <span>{{ resourceDto.uri ? '图片错误' : '没有图片' }}</span>
              </div>
            </el-image>
            <el-image :src="resourceDto.defUri" fit="contain"
                      style="background-color:#f5f5f5;height: 160px;width: 100px">
              <div slot="error" class="image-error">
                <span>{{ resourceDto.uri ? '图片错误' : '没有图片' }}</span>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item>
          <permission permit="super">
            <el-button type="primary" :loading="creating" @click="submitAction" style="margin-right: 8px">确定
            </el-button>
          </permission>
          <el-button type="plain" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addAppResource, batchAppResource} from "../../../api/app-service";

export default {
  name: "ResourceAddView",
  data() {
    return {
      appNo: this.$route.params.appNo,
      uploadAction: '',
      jsonPath: null,
      batchJson: null,
      creating: false,
      resourceDto: {
        name: null,
        feNo: null,
        type: null,
        uri: null,
        defUri: null,
        remark: null,
        specs: {
          width: null,
          height: null,
        },
      },
      rules: {
        name: [
          {
            required: true,
            message: '资源名成为空',
            trigger: 'blur'
          }
        ],
        feNo: [
          {
            required: true,
            message: '资源标识为空',
            trigger: 'blur'
          }
        ],
        uri: [
          {
            required: true,
            message: '资源地址为空',
            trigger: 'blur'
          }
        ],
        defUri: [
          {
            required: true,
            message: '默认资源为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '资源类型为空',
            trigger: 'blur'
          }
        ],
        'specs.width': [
          {
            required: true,
            message: '资源规格为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '规格应为数字',
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              let {height} = this.resourceDto.specs;
              if (!value || !height) {
                return callback(new Error('资源规格为空'));
              }
              let regPos = /^\d+(\.\d+)?$/;
              if (!regPos.test(height)) {
                return callback(new Error('规格应为数字'));
              }
              return callback();
            },
          }
        ],
      },
    };
  },
  methods: {
    jsonFileHandle(file) {
      this.jsonPath = file.name;
      if (file.raw.type !== 'application/json') {
        this.$message.error('请上传json文件');
        return;
      }
      let reader = new FileReader();
      reader.readAsText(file.raw, "UTF-8");
      let that      = this;
      reader.onload = (evt) => {
        try {
          that.batchJson = JSON.parse(evt.target.result);
        } catch (e) {
          this.$message.error('json格式错误');
        }
      };
    },
    submitBatchAction() {
      this.creating = true;
      batchAppResource({
        appNo: this.appNo,
        resources: this.batchJson
      }).then(res => {
        this.$message.success('导入成功');
        this.cancelBatch();
      });
    },
    cancelBatch() {
      this.creating  = false;
      this.jsonPath  = null;
      this.batchJson = null;
    },
    submitAction() {
      this.$refs.resourceForm.validate(valid => {
        if (!valid) {
          return;
        }
        let command   = Object.assign({appNo: this.appNo}, this.resourceDto);
        this.creating = true;
        addAppResource(command).then(res => {
          this.resetForm();
          this.$message.success('创建成功');
        });
      })
    },
    resetForm() {
      Object.keys(this.resourceDto).forEach(key => {
        this.resourceDto[key] = key !== 'specs' ? null : {
          width: null,
          height: null
        };
      });
      this.creating = false;
      this.$refs.resourceForm.resetFields();
    }
  }
}
</script>

<style>

.image-error {
  width: 100%;
  height: 100%;
  color: #9c9c9c;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
