<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 40%;margin-top: 24px" v-if="resource">
      <el-form ref="resourceForm"
               :model="resourceDto"
               :rules="rules"
               label-width="100px">
        <div class="page-header" style="margin: 20px 0 24px 24px;font-size: 18px">基础信息</div>
        <el-form-item label="资源标识">
          <div>{{ resource.feNo }}</div>
        </el-form-item>
        <el-form-item label="资源名称">
          <el-input v-model="resourceDto.name" clearable placeholder="请输入资源名称"></el-input>
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
              <el-form-item label="资源类型">
                <div>{{ resource.type.description }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="资源规格" v-if="resource.state.value<2" prop="specs.width">
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
              <el-form-item label="资源规格" v-else>
                <el-row>
                  <el-col :span="3" style="text-align: center">
                    <span>{{ resource.specs.width }}px</span>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <span>x</span>
                  </el-col>
                  <el-col :span="3" style="text-align: center">
                    <span>{{ resource.specs.height }}px</span>
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
            <el-image :src="resourceDto.uri"
                      fit="contain"
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
            <el-button type="primary" @click="submitAction" style="margin-right: 8px">确定</el-button>
          </permission>
          <el-button type="danger" @click="cancelAction">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {editAppResource, resourceDetail} from "../../../api/app-service";

export default {
  name: "ResourceEditView",
  data() {
    return {
      resource: null,
      resourceDto: {
        name: null,
        uri: null,
        defUri: null,
        remark: null,
        specs: {
          width: null,
          height: null,
        },
      },
      rules: {
        'specs.width': [
          {
            type: 'number',
            message: '规格应为数字',
            trigger: 'blur'
          },
          {
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
    resourceDetail() {
      resourceDetail(this.$route.params.resourceId).then(data => {
        this.resource = data;
        if (this.resource) {
          Object.keys(this.resourceDto).forEach(key => {
            if (key !== 'specs') {
              this.resourceDto[key] = this.resource[key];
            } else {
              this.resourceDto.specs = {
                width: this.resource.specs.width,
                height: this.resource.specs.height,
              };
            }
          });
        }
      });
    },
    submitAction() {
      if (this.resource.state.value === 2) {
        this.editAction();
        return;
      }
      this.$refs.resourceForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.editAction();
      });
    },
    editAction() {
      let params = {};
      Object.keys(this.resourceDto)
          .filter(key => key !== 'specs' && this.resourceDto[key] !== this.resource[key])
          .forEach(key => params[key] = this.resourceDto[key])

      if (this.resource.specs.width !== this.resourceDto.specs.width
          || this.resource.specs.height !== this.resourceDto.specs.height) {
        params['specs'] = this.resourceDto.specs;
      }
      if (Object.keys(params).length === 0) {
        this.$message.success('没有更新');
        return;
      }
      editAppResource(Object.assign({id: this.resource.id}, params))
          .then(res => this.$message.success('更新成功'));
    },
    cancelAction() {
      this.$router.back();
    }
  },
  mounted() {
    this.resourceDetail();
  }
}
</script>

<style scoped>

</style>
