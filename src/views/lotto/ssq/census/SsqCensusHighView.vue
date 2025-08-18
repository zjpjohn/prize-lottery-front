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
                       :key="index+'_cha_ssq'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
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
import {ssq_blue_categories, ssq_channels, ssq_red_categories} from "../../../../libs/lottery";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../../components/icheck/ICheckRadio";
import {calcRateChart, rateChart} from "../../../../api/ssq-service";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import {ssqPeriodMixin} from "../../../../mixins/period_ssq_mixin";

const blue_list = ['b3', "b5", 'bk'];
export default {
  name: "SsqCensusHighView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  mixins: [ssqPeriodMixin],
  data() {
    return {
      showCalc: false,
      channels: ssq_channels,
      blue_filter: blue_list,
      period: null,
      query: {
        period: null,
        type: 'rk3'
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
    queryRateChart() {
      rateChart(this.query.period).then(data => {
        this.census = data;
        this.buildChart();
      })
    },
    buildChart() {
      let data             = this.census[this.query.type];
      let categories       = this.blue_filter.indexOf(this.query.type) >= 0 ? ssq_blue_categories : ssq_red_categories;
      this.chart.data.rows = categories.map((value, i) => {
        return {
          '号码': value,
          '热度': data ? data.values[0][i] : 0,
        };
      });
    },
    calcRateChart() {
      calcRateChart(this.period).then(res => {
        this.cancelCalcRate();
        this.queryRateChart();
      })
    },
    cancelCalcRate() {
      this.period   = null;
      this.showCalc = false;
    }
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
