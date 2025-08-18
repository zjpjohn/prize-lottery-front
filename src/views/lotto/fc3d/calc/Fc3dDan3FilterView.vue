<template>
  <div>
    <div style="margin-bottom: 24px;padding-top: 16px">
      <el-form ref="filterForm" :inline="true" :model="query" :rules="rules" label-width="80px">
        <el-form-item label="计算期号" prop="period">
          <el-select size="medium"
                     clearable
                     v-model="query.period"
                     placeholder="请选择推荐期号"
                     style="width:160px;margin-right: 16px">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_fsd'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤胆码">
          <el-select
              v-model="query.dan"
              style="width: 200px"
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
              v-model="query.kuaList"
              style="width: 200px"
              multiple
              collapse-tags
              clearable
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
              v-model="query.sumList"
              style="width: 200px"
              multiple
              collapse-tags
              clearable
              placeholder="请选择和值">
            <el-option
                v-for="item in sumList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <permission permit="super">
            <el-button plain type="primary" style="margin-left: 12px" @click="fc3dDanFilter">三胆过滤</el-button>
          </permission>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 20px">
      <div v-if="list.length===0">
        <div class="table-empty" style="width: 800px">
          <img src="../../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
          <span style="color: #8C8C8C">暂无计算数据</span>
        </div>
      </div>
      <div style="margin-left: 32px" v-else>
        <div>
          过滤后符合条件号码
          <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
              list.length
            }}</span>注
        </div>
        <div style="display: flex;flex-wrap: wrap;justify-content: start;align-items: center">
          <div class="result-panel" style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <div v-for="(item,index) in list" :key="index+'_fsd_d3_item'"
                 style="display: block;font-size: 15px; margin:12px 16px 0 0">
              <el-tag :type="item.dataHit===3?'primary':'info'">
                {{ item.data }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.amount }}次
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {d3_categories} from "../../../../libs/lottery";
import {fc3dDan3Filter} from "../../../../api/fc3d-service";

export default {
  name: "Fc3dDan3FilterView",
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      query: {
        period: null,
        dan: null,
        kills: [],
        kuaList: [],
        sumList: [],
      },
      list: [],
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
      return this.query.dan === value;
    },
    fc3dDanFilter() {
      this.$refs.filterForm.validate(valid => {
        if (!valid) {
          return;
        }
        fc3dDan3Filter(this.query).then(data => this.list = data || []);
      });
    },
  }
}
</script>

<style scoped>
.result-panel >>> .el-tag {
  line-height: 34px !important;
  height: 34px !important;
}
</style>