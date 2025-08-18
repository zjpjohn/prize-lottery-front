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
        <el-button plain type="primary" @click="showCalc=true">全量分析</el-button>
      </permission>
    </div>
    <div style="margin-top: 80px;display: flex;justify-content: center">
      <div style="width: 85%">
        <ve-histogram :judge-width="true"
                      :data="chart.data"
                      :title="chart.data.title"
                      height="460px"
                      :mark-point="chart.markPoint"
                      :settings="chart.settings"></ve-histogram>
      </div>
    </div>
    <el-dialog :visible.sync="showCalc" width="400px">
      <div slot="title" class="title">全量分析</div>
      <el-input v-model="period" placeholder="请输入全量分析期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcFullChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcFull">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {ssq_blue_categories, ssq_channels, ssq_red_categories} from "../../../../libs/lottery";
import {calcAllChart, fullChart} from "../../../../api/ssq-service";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../../components/icheck/ICheckRadio";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import {ssqPeriodMixin} from "../../../../mixins/period_ssq_mixin";

const blue_list = [
  'b3',
  "b5",
  'bk'
];
export default {
  name: "SsqCensusAllView",
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
        type: 'rk3',
      },
      chart: {
        markPoint: {
          data: [
            {
              name: '最大值',
              type: 'max'
            },
            {
              name: '最小值',
              type: 'min'
            }
          ]
        },
        settings: {
          showLine: [
            '前400',
            '前600',
            '前800',
            '全部'
          ],
        },
        data: {
          title: {text: '预测趋势统计图'},
          columns: [
            '号码',
            '前100',
            '前200',
            '前400',
            '前600',
            '前800',
            '全部'
          ],
          rows: [],
        },
      },
    };
  },
  methods: {
    queryFullChart() {
      fullChart(this.query).then(data => {
        let {
              period,
              level100,
              level200,
              level400,
              level600,
              level800,
              level1000
            }                = data;
        let categories       = this.blue_filter.indexOf(this.query.type) >= 0 ?
            ssq_blue_categories :
            ssq_red_categories;
        this.chart.data.rows = categories.map((value, i) => {
          return {
            '号码': value,
            '前100': level100.values[0][i],
            '前200': level200.values[0][i],
            '前400': level400.values[0][i],
            '前600': level600.values[0][i],
            '前800': level800.values[0][i],
            '全部': level1000.values[0][i],
          };
        })
      });
    },
    calcFullChart() {
      calcAllChart(this.period).then(res => {
        this.cancelCalcFull();
        this.queryFullChart();
      })
    },
    cancelCalcFull() {
      this.period   = null;
      this.showCalc = false;
    },
  },
  mounted() {
    this.queryFullChart();
  },
  watch: {
    query: {
      deep: true,
      handler(value) {
        this.queryFullChart();
      }
    }
  }
}
</script>

<style scoped>

</style>
