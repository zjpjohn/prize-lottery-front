<template>
  <div style="margin-bottom: 24px;padding-top: 16px">
    <el-form ref="filterForm" :inline="true" :model="query" :rules="rules" label-width="80px">
      <el-form-item label="计算期号" prop="period">
        <el-select size="medium"
                   clearable
                   v-model="query.period"
                   placeholder="请选择推荐期号"
                   style="width:160px;">
          <el-option v-for="(item,index) in periods"
                     :key="index+'_p_s_lotto'"
                     :label="'第 '+item+' 期'"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤胆码">
        <el-select
            v-model="query.dan"
            style="width: 180px"
            clearable
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
            v-model="query.killList"
            style="width: 180px"
            multiple
            collapse-tags
            clearable
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
            style="width: 180px"
            multiple
            clearable
            collapse-tags
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
        <el-slider
            v-model="sum"
            range
            style="width: 200px"
            :min="0"
            :max="27">
        </el-slider>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="wensFilterCalc">过滤计算</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 16px">
      <div v-if="result===null">
        <div class="table-empty" style="width: 800px">
          <img src="../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
          <span style="color: #8C8C8C">暂无过滤号码</span>
        </div>
      </div>
      <div style="margin-left: 16px" v-else>
        <div style="margin-bottom: 16px">
          开奖期号<span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
            result.period
          }}</span>
        </div>
        <div style="margin-bottom: 16px">
          开奖号码<span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
            result.lottery
          }}</span>
        </div>
        <div style="margin-bottom: 16px" v-if="result.next">
          下期开奖<span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
            result.next
          }}</span>
        </div>
        <div style="margin-bottom: 16px">
          分段断组<span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
            result.segment
          }}</span>
        </div>
        <div style="margin-bottom: 16px">
          四胆码表<span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
            result.danTable
          }}</span>
        </div>
        <div style="margin-bottom: 16px">
          过滤后符合条件号码
          <span style="font-weight: 600;color: #ff0033;margin: 0 6px">{{
              result.size
            }}</span>注
        </div>
        <div style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.values"
                  :key="'wens_item_'+index"
                  style="margin: 12px 16px 0 0;color: #333333;font-size: 14px"
                  :style="{'backgroundColor':item.hit===1?'#1E90FF':'#F1F1F1','color':item.hit===1?'white':'#333333'}">
            {{ item.value }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {lotteryPeriods, wensFilter} from "../../../api/lotto-service";
import {d3_categories} from "../../../libs/lottery";

export default {
  name: "LotteryWensFilterView",
  data() {
    return {
      type: this.$route.query.type,
      periods: [],
      sum: [
        6,
        21
      ],
      query: {
        period: null,
        dan: null,
        kuaList: [],
        killList: [],
      },
      result: null,
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
          label: `${e}跨`,
        };
      })
    },
  },
  methods: {
    disableDan(value) {
      return this.query.killList.includes(value);
    },
    disableKill(value) {
      return this.query.dan === value;
    },
    lottoPeriods() {
      lotteryPeriods(this.type, 120).then(data => this.periods = data || []);
    },
    wensFilterCalc() {
      let params = Object.assign({
        type: this.type,
        sum: {
          min: this.sum[0],
          max: this.sum[1],
        }
      }, this.query);
      wensFilter(params).then(data => this.result = data);
    }
  },
  mounted() {
    this.lottoPeriods();
  }
}
</script>

<style scoped>

</style>