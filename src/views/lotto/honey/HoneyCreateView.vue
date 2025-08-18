<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 50%;margin-top: 24px">
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
                     :loading="upload"
                     @click="submitBatchAction">确定上传
          </el-button>
          <el-button size="small" type="plain" style="height: 36px"
                     @click="cancelBatch">取消上传
          </el-button>
        </div>
      </div>
      <div class="page-header" style="margin: 20px 0 24px 24px;">单条新增</div>
      <el-form ref="honeyForm"
               :model="honey"
               :rules="rules"
               label-width="100px">
        <el-form-item label="数据期号" prop="period">
          <el-input v-model="honey.period" style="width: 324px" placeholder="请输入数据期号" clearable></el-input>
        </el-form-item>
        <el-form-item label="开奖日期" prop="lottoDate">
          <el-date-picker
              style="width: 324px"
              v-model="honey.lottoDate"
              value-format="yyyy/MM/dd"
              type="date"
              placeholder="选择开奖日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="配胆数据" prop="values">
          <div style="margin-bottom: 4px">
            <div v-if="honey.values.length>0"
                 style="display: flex;align-items: center;justify-content: start;height: 50px">
              <span v-for="(cell,index) in honey.values"
                    style="margin-right: 8px">
                <span
                    style="display:inline-block;color:white;width: 30px;height: 32px;line-height: 32px;text-align: center;background-color: #3a8ee6">
                {{ cell }}
                </span>
              </span>
              <span
                  style="cursor:pointer;display:inline-block;color:#6c6c6c;font-size:10px; border:1px #9f9f9f solid;width: 30px;height: 30px;line-height: 30px;text-align: center;"
                  @click="removeCell">
                删除
              </span>
            </div>
            <div v-else style="height: 50px;line-height: 50px">
              <span style="color: #9c9c9c">暂无配胆数据</span>
            </div>
            <div>
              <el-button size="mini"
                         v-for="(item,index) in d3Categories"
                         :type="value===item?'primary':''"
                         @click="pickValue(item)" :key="'cell_value_'+index">
                {{ item }}
              </el-button>
              <el-button plain type="primary" size="mini" @click="addCell">添加</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="submitAddAction">提交</el-button>
          <el-button plain type="danger" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addHoney, addHoneyBatch} from "../../../api/lotto-service";
import {d3_categories} from "../../../libs/lottery";

export default {
  name: "HoneyCreateView",
  data() {
    return {
      d3Categories: d3_categories,
      type: this.$route.query.type,
      jsonPath: null,
      uploadAction: '',
      batchJson: null,
      upload: false,
      value: null,
      honey: {
        period: null,
        lottoDate: null,
        values: [],
      },
      rules: {
        period: [
          {
            required: true,
            message: '数据期号为空',
            trigger: 'blur'
          }
        ],
        lottoDate: [
          {
            required: true,
            message: '开奖期号为空',
            trigger: 'blur'
          },
        ],
        values: [
          {
            required: true,
            validator: (rules, value, callback) => {
              if (this.honey.values.length === 0) {
                return callback(new Error('配胆数据为空'));
              }
              if (this.honey.values.length !== 16) {
                return callback(new Error('配胆数据长度为16'));
              }
              return callback();
            },
          }
        ]
      }
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
          if (that.batchJson.type !== this.type) {
            this.$message.error('数据集类型不匹配');
            return;
          }
          if (!that.batchJson.data || that.batchJson.data.length === 0) {
            that.$message.error('数据集为空');
          }
        } catch (e) {
          this.$message.error('json格式错误');
        }
      };
    },
    cancelBatch() {
      this.upload    = false;
      this.jsonPath  = null;
      this.batchJson = null;
    },
    submitBatchAction() {
      if (!this.batchJson || !this.batchJson.data) {
        this.$message.error('批量数据集为空');
        return;
      }
      this.$confirm('是否要批量导入绕胆图数据', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upload = true;
        addHoneyBatch(this.type, this.batchJson.data).then(res => {
          this.$message.success('批量导入成功');
          this.cancelBatch();
        });
      });
    },
    pickValue(value) {
      if (this.value === value) {
        this.value = null;
        return;
      }
      this.value = value;
    },
    addCell() {
      if (this.honey.values.length > 16) {
        this.$message.error('绕胆数据长度仅允许为16');
        return;
      }
      if (this.value === null) {
        this.$message.error('请选择绕胆数据信息');
        return;
      }
      this.honey.values.push(this.value);
      this.value = null;
    },
    removeCell() {
      if (this.honey.values.length >= 1) {
        this.honey.values.splice(this.honey.values.length - 1, 1);
      }
    },
    submitAddAction() {
      this.$refs.honeyForm.validate(valid => {
        if (!valid) {
          return;
        }
        addHoney(this.type, this.honey).then(res => {
          this.resetForm();
          this.$message.success('添加成功');
        });
      });
    },
    resetForm() {
      this.$refs.honeyForm.resetFields();
      Object.keys(this.honey).forEach(key => {
        this.honey[key] = key === 'values' ? [] : null;
      });
    }
  }
}
</script>

<style scoped>

</style>