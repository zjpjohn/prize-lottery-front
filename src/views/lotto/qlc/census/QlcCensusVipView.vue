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
        <el-button plain type="primary" @click="showCalc=true">付费分析</el-button>
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
      <div slot="title" class="title">付费计算</div>
      <el-input v-model="period" placeholder="请输入付费计算期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcVipChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcVip">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {calcVipChart, vipChart} from "../../../../api/qlc-service";
import {qlc_categories, qlc_channels} from "../../../../libs/lottery";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../../components/icheck/ICheckRadio";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import {qlcPeriodMixin} from "../../../../mixins/period_qlc_mixin";

export default {
  name: "QlcCensusVipView",
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
          stack: {'热度': ['前10', '前20', '前50', '前100', '全部']},
        },
        data: {
          title: {text: '付费专家预测趋势统计图'},
          columns: ['号码', '前10', '前20', '前50', '前100', '全部'],
          rows: [],
        },
      },
    };
  },
  methods: {
    queryVipChart() {
      vipChart(this.query).then(data => {
        let {
              period,
              level10,
              level20,
              level50,
              level100,
              level150
            }                = data;
        this.chart.data.rows = qlc_categories.map((value, i) => {
          return {
            '号码': value,
            '前10': level10.values[0][i],
            '前20': level20.values[0][i],
            '前50': level50.values[0][i],
            '前100': level100.values[0][i],
            '全部': level150.values[0][i],
          };
        })
      })
    },
    calcVipChart() {
      calcVipChart(this.period).then(res => {
        this.cancelCalcVip();
        this.queryVipChart();
      })
    },
    cancelCalcVip() {
      this.period   = null;
      this.showCalc = false;
    },
  },
  mounted() {
    this.queryVipChart();
  },
  watch: {
    query: {
      deep: true,
      handler(value) {
        this.queryVipChart();
      }
    }
  }
}
</script>

<style scoped>

</style>
