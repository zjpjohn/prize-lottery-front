<template>
  <div style="margin: 32px 32px 0 32px;">
    <el-form :inline="true" :model="query" :rules="rules" ref="queryForm" label-width="90px">
      <el-form-item label="预测期号" prop="period">
        <el-select size="medium"
                   clearable
                   v-model="query.period"
                   placeholder="请选择期号"
                   style="width:160px;">
          <el-option v-for="(item,index) in periods"
                     :key="index+'_f_s_fsd'"
                     :label="'第'+item+'期'"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤胆码" prop="dans">
        <el-select
            v-model="query.dans"
            style="width: 200px"
            multiple
            collapse-tags
            filterable
            clearable
            allow-create
            default-first-option
            placeholder="请选择胆码">
          <el-option
              v-for="item in numList"
              :key="item.value"
              :label="item.label"
              :disabled="disableDan(item.value)"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤杀码" prop="kills">
        <el-select
            v-model="query.kills"
            style="width: 200px"
            multiple
            collapse-tags
            filterable
            clearable
            allow-create
            default-first-option
            placeholder="请选择杀码">
          <el-option
              v-for="item in killList"
              :key="item.value"
              :label="item.label"
              :disabled="disableKill(item.value)"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤跨度" prop="kuas">
        <el-select
            v-model="query.kuas"
            style="width: 200px"
            multiple
            collapse-tags
            filterable
            clearable
            allow-create
            default-first-option
            placeholder="请选择跨度">
          <el-option
              v-for="item in kuaList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="recommendFilter">组合计算</el-button>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="saveFilterResult">保存结果</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px">
      <div v-if="result" style="margin-left: 32px">
        <div v-if="result.zu6.items!=null && result.zu6.items.length>0">
          <div style="font-size: 17px;font-weight: 600;margin-bottom: 32px">组六推荐</div>
          <div style="display: flex;flex-wrap: wrap;">
            <el-tag v-for="(item,index) in result.zu6.items"
                    :key="'zu6_'+index"
                    style="margin-right: 16px;"
                    :type="item.hit===1?'primary':'info'">{{ item.value }}
            </el-tag>
          </div>
        </div>
        <div v-if="result.zu3.items!=null && result.zu3.items.length>0">
          <div style="font-size: 17px;font-weight: 600;margin: 32px 0">组三推荐</div>
          <div style="display: flex;flex-wrap: wrap;">
            <el-tag v-for="(item,index) in result.zu3.items"
                    :key="'zu3_'+index"
                    style="margin-right: 16px;"
                    :type="item.hit===1?'primary':'info'">{{ item.value }}
            </el-tag>
          </div>
        </div>
      </div>
      <div style="margin-left: 32px" v-else>
        <div class="table-empty" style="width: 800px">
          <img src="../../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
          <span style="color: #8C8C8C">暂无计算结果</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {pl3PeriodMixin} from "../../../../mixins/period_pl3_mixin";
import {d3_categories} from "../../../../libs/lottery";
import {comRecommendAna} from "../../../../api/pl3-service";

export default {
  name: "Pl3RecommendFilterView",
  mixins: [pl3PeriodMixin],
  data() {
    return {
      result: null,
      query: {
        period: null,
        dans: [],
        kills: [],
        kuas: [],
      },
      rules: {
        period: [
          {
            required: true,
            message: '预测数据期号为空',
            trigger: 'blur'
          }
        ],
        dans: [
          {
            required: true,
            message: '过滤胆码为空',
            trigger: 'blur'
          }
        ],
        kills: [
          {
            required: true,
            message: '过滤杀码为空',
            trigger: 'blur'
          }
        ],
        kuas: [
          {
            required: true,
            message: '过滤跨度为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  computed: {
    numList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `胆${e}`,
        };
      })
    },
    killList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `杀${e}`,
        };
      })
    },
    kuaList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `跨度${e}`,
        };
      })
    },
  },
  methods: {
    disableDan(value) {
      return this.query.kills.includes(value);
    },
    disableKill(value) {
      return this.query.dans.includes(value);
    },
    recommendFilter() {
      this.$refs.queryForm.validate(valid => {
        if (!valid) {
          return;
        }
        let filterDto = Object.assign({save: false}, this.query);
        comRecommendAna(filterDto).then(data => this.result = data);
      });
    },
    saveFilterResult() {
      if (!this.result) {
        this.$message.error('请先进行过滤计算');
        return;
      }
      this.$refs.queryForm.validate(valid => {
        if (!valid) {
          return;
        }
        let saveDto = Object.assign({save: true}, this.query);
        comRecommendAna(saveDto).then(data => {
          this.$message.success('保存成功');
          this.result = data;
        });
      });
    },
  },
}
</script>

<style scoped>
.result-panel >>> .el-tag {
  line-height: 34px !important;
  height: 34px !important;
}
</style>