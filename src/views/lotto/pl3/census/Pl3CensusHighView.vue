<template>
  <div>
    <div>
      <el-select v-model="query.period" clearable placeholder="选择预测期号"
                 style="width: 200px;margin-right: 12px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_o'"
                   :value="item"
                   :label="'第'+item+'期'"></el-option>
      </el-select>
      <i-check-radio-group v-model="query.type">
        <i-check-radio :value="item.value"
                       :label="item.label"
                       :key="index+'_cha_pls'"
                       size="small"
                       v-for="(item,index) in channels"
                       v-if="item.vip"></i-check-radio>
      </i-check-radio-group>
      <permission permit="super">
        <el-button plain type="primary" @click="showCalc=true">牛人分析</el-button>
      </permission>
    </div>
    <div style="margin-top: 80px;display: flex;justify-content: center">
      <div style="width: 85%">
        <ve-histogram :judge-width="true"
                      :data="chart.data"
                      :title="chart.title"
                      height="460px"
                      v-if="census"
                      :mark-point="chart.markPoint"
                      :settings="chart.settings"></ve-histogram>
      </div>
    </div>
    <el-dialog :visible.sync="showCalc" width="400px">
      <div slot="title" class="title">牛人分析</div>
      <el-input v-model="period" placeholder="请输入牛人分析期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcRateChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcRate">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {d3_categories, pls_channels} from "../../../../libs/lottery";
import {calcRateChart, rateChart} from "../../../../api/pl3-service";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../../components/icheck/ICheckRadio";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import {pl3PeriodMixin} from "../../../../mixins/period_pl3_mixin";

export default {
  name: "Pl3CensusHighView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  mixins: [pl3PeriodMixin],
  data() {
    return {
      showCalc: false,
      channels: pls_channels,
      period: null,
      query: {
        period: null,
        type: 'd3'
      },
      census: null,
      chart: {
        title: {text: '牛人专家预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 64,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: ['号码', '热度'],
          rows: [],
        },
      },
    };
  },
  methods: {
    calcRateChart() {
      calcRateChart(this.period).then(res => {
        this.cancelCalcRate();
        this.queryRateChart();
      });
    },
    cancelCalcRate() {
      this.period   = null;
      this.showCalc = false;
    },
    queryRateChart() {
      rateChart(this.query.period).then(data => {
        this.census = data;
        this.buildChart();
      })
    },
    buildChart() {
      let data = this.census[this.query.type];
      let rows = [];
      for (let i = 0; i < d3_categories.length; i++) {
        rows.push({
          '号码': d3_categories[i],
          '热度': data ? data.values[0][i] : 0,
        });
      }
      this.chart.data.rows = rows;
    },
  },
  mounted() {
    this.queryRateChart();
  },
  watch: {
    'query.period'(value) {
      this.queryRateChart();
    },
    'query.type'(value) {
      this.buildChart();
    }
  }
}
</script>

<style scoped>

</style>
