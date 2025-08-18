<template>
  <div style="margin: 16px 0 24px 0;">
    <div style="margin-right: 24px">
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
        <el-form-item label="过滤胆码">
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
        <el-form-item label="过滤杀码">
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
        <el-form-item label="过滤跨度">
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
        <el-form-item label="过滤和值">
          <el-select
              v-model="query.sums"
              style="width: 200px"
              multiple
              collapse-tags
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="请选择和值">
            <el-option
                v-for="item in sumList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最少出现">
          <el-input-number style="width: 160px"
                           v-model="query.minSize"
                           :min="2" :max="5"
                           label="号码最少出现次数"></el-input-number>
        </el-form-item>
        <el-form-item label="最多出现">
          <el-input-number style="width: 160px"
                           v-model="query.maxSize"
                           :min="7" :max="13"
                           label="号码最多出现次数"></el-input-number>
        </el-form-item>
        <el-form-item>
          <permission permit="super">
            <el-button plain type="primary" style="margin-left: 12px" @click="fc3dCombineFilter">组合过滤</el-button>
          </permission>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 20px">
      <div v-if="result.size===0">
        <div class="table-empty" style="width: 800px">
          <img src="../../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
          <span style="color: #8C8C8C">暂无计算数据</span>
        </div>
      </div>
      <div style="margin-left: 32px" v-else>
        <div>
          过滤后符合条件号码
          <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
              result.size
            }}</span>注
        </div>
        <div style="display: flex;flex-wrap: wrap;justify-content: start;align-items: center">
          <div class="result-panel">
            <el-tag v-for="(item,index) in result.data" :key="index+'_pls_com_item'"
                    type="primary"
                    style="font-size: 15px; margin:16px 20px 0 0">
              {{ item.key }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.value }}次
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {com7Combine} from "../../../../api/fc3d-service";
import {d3_categories} from "../../../../libs/lottery";

export default {
  name: "Fc3dCalcComView",
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      result: {
        data: [],
        size: 0,
      },
      query: {
        period: null,
        dans: [],
        kills: [],
        kuas: [],
        sums: [],
        minSize: 3,
        maxSize: 9,
      },
      rules: {
        period: [
          {
            required: true,
            message: '预测数据期号为空',
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
    sumList() {
      let result = [];
      for (let i = 0; i <= 27; i++) {
        result.push({
          value: `${i}`,
          label: `和值-${i}`,
        });
      }
      return result;
    }
  },
  methods: {
    disableDan(value) {
      return this.query.kills.includes(value);
    },
    disableKill(value) {
      return this.query.dans.includes(value);
    },
    fc3dCombineFilter() {
      this.$refs.queryForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.result = {
          data: [],
          size: 0
        };
        com7Combine(this.query).then(data => this.result = data);
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
