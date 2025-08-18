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
      <el-form ref="aroundForm"
               :model="around"
               :rules="rules"
               label-width="100px">
        <el-form-item label="数据期号" prop="period">
          <el-input v-model="around.period" style="width: 324px" placeholder="请输入数据期号" clearable></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="type">
          <el-select style="width: 324px" clearable v-model="around.type" placeholder="请选择数据类型">
            <el-option label="开奖号" :value="1"></el-option>
            <el-option label="试机号" :value="2"></el-option>
            <el-option label="开机号" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开奖日期" prop="lottoDate">
          <el-date-picker
              style="width: 324px"
              v-model="around.lottoDate"
              value-format="yyyy/MM/dd"
              type="date"
              placeholder="选择开奖日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="绕胆数据" prop="cells">
          <div style="margin-bottom: 4px">
            <div v-if="around.cells.length>0"
                 style="display: flex;align-items: center;justify-content: start;height: 50px">
              <span v-for="(cell,index) in around.cells"
                    style="margin-right: 8px">
                <span
                    style="display:inline-block;color:white;width: 32px;height: 32px;line-height: 32px;text-align: center;"
                    :style="{backgroundColor:colors[cell.type]}">
                {{ cell.value }}
                </span>
              </span>
              <span
                  style="cursor:pointer;display:inline-block;color:#6c6c6c;font-size:10px; border:1px #9f9f9f solid;width: 32px;height: 32px;line-height: 32px;text-align: center;"
                  @click="removeCell">
                删除
              </span>
            </div>
            <div v-else style="height: 50px;line-height: 50px">
              <span style="color: #9c9c9c">暂无绕胆数据</span>
            </div>
          </div>
          <div>
            <div>
              <el-button size="mini"
                         v-for="(item,index) in Object.keys(cellType)"
                         :type="cellDto.type===item?'primary':''"
                         @click="pickType(item)" :key="'cell_type_'+index">
                {{ cellType[item] }}
              </el-button>
            </div>
            <div style="margin-top: 4px">
              <el-button size="mini"
                         v-for="(item,index) in d3Categories"
                         :type="cellDto.value===item?'primary':''"
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
import {addAround, addAroundBatch} from "../../../api/lotto-service";
import {cell_type, colors, d3_categories} from "../../../libs/lottery";


export default {
  name: "AroundCreateView",
  data() {
    return {
      d3Categories: d3_categories,
      cellType: cell_type,
      colors: colors,
      lotto: this.$route.query.type,
      uploadAction: '',
      jsonPath: null,
      batchJson: null,
      upload: false,
      cellDto: {
        value: null,
        type: null,
      },
      around: {
        type: null,
        period: null,
        lottoDate: null,
        cells: [],
      },
      rules: {
        type: [
          {
            required: true,
            message: '数据类型为空',
            trigger: 'blur'
          }
        ],
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
        cells: [
          {
            required: true,
            validator: (rules, value, callback) => {
              if (this.around.cells.length === 0) {
                return callback(new Error('绕胆数据为空'));
              }
              if (this.around.cells.length !== 11) {
                return callback(new Error('绕胆数据长度为11'));
              }
              return callback();
            },
          }
        ]
      },
    };
  },
  methods: {
    d3_categories() {
      return d3_categories
    },
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
          if (that.batchJson.lotto !== that.lotto) {
            this.$message.error('数据集类型不匹配');
            return;
          }
          if (!that.batchJson.items || that.batchJson.items.length === 0) {
            that.$message.error('数据集为空');
          }
        } catch (e) {
          this.$message.error('json格式错误');
        }
      };
    },
    submitBatchAction() {
      this.$confirm('是否要批量导入绕胆图数据', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upload = true;
        addAroundBatch(this.batchJson).then(res => {
          this.$message.success('批量导入成功');
          this.cancelBatch();
        });
      });
    },
    submitAddAction() {
      this.$refs.aroundForm.validate(valid => {
        if (!valid) {
          return;
        }
        addAround(Object.assign({lotto: this.lotto}, this.around)).then(res => {
          this.resetForm();
          this.$message.success('添加成功');
        });
      });
    },
    resetForm() {
      this.$refs.aroundForm.resetFields();
      Object.keys(this.around).forEach(key => {
        this.around[key] = key === 'cells' ? [] : null;
      });
    },
    cancelBatch() {
      this.upload    = false;
      this.jsonPath  = null;
      this.batchJson = null;
    },
    pickType(type) {
      if (this.cellType.type === type) {
        this.cellType.type = null;
        return;
      }
      this.cellDto.type = type;
    },
    pickValue(value) {
      if (this.cellDto.value === value) {
        this.cellDto.value = null;
        return;
      }
      this.cellDto.value = value;
    },
    addCell() {
      if (this.around.cells.length > 11) {
        this.$message.error('绕胆数据长度仅允许为11');
        return;
      }
      if (this.cellDto.type === null || this.cellDto.value === null) {
        this.$message.error('请选择绕胆数据信息');
        return;
      }
      this.around.cells.push({
        value: this.cellDto.value,
        type: this.cellDto.type,
      });
      this.cellDto = {
        value: null,
        type: null
      };
    },
    removeCell() {
      if (this.around.cells.length >= 1) {
        this.around.cells.splice(this.around.cells.length - 1, 1);
      }
    },
  },
}
</script>

<style scoped>

</style>