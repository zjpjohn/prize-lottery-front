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
                       :key="index+'_cha_qlc'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
      <permission permit="super">
        <el-button plain type="primary" @click="showCalc=true">热门分析</el-button>
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
      <div slot="title" class="title">热门分析</div>
      <el-input v-model="period" placeholder="请输入热门分析期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcHotChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcHot">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {qlc_categories, qlc_channels} from "../../../../libs/lottery";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../../components/icheck/ICheckRadio";
import {calcHotChart, hotChart} from "../../../../api/qlc-service";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import {qlcPeriodMixin} from "../../../../mixins/period_qlc_mixin";

export default {
  name: "QlcCensusHotView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  mixins: [qlcPeriodMixin],
  data() {
    return {
      showCalc: false,
      channels: qlc_channels,
      period: null,
      query: {
        period: null,
        type: 'k3'
      },
      census: null,
      chart: {
        title: {text: '热门专家预测统计'},
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
    queryHotChart() {
      hotChart(this.query.period).then(data => {
        this.census = data;
        this.buildChart();
      })
    },
    buildChart() {
      let data             = this.census[this.query.type];
      this.chart.data.rows = qlc_categories.map((value, i) => {
        return {
          '号码': value,
          '热度': data ? data.values[0][i] : 0,
        };
      });
    },
    calcHotChart() {
      calcHotChart(this.period).then(res => {
        this.cancelCalcHot();
        this.queryHotChart();
      })
    },
    cancelCalcHot() {
      this.period   = null;
      this.showCalc = false;
    },
  },
  mounted() {
    this.queryHotChart();
  },
  watch: {
    'query.period'(value) {
      this.queryHotChart();
    },
    'query.type'(value) {
      this.buildChart();
    }
  }
}
</script>

<style scoped>

</style>
