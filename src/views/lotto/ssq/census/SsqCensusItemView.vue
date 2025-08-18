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
        <el-button plain type="primary" @click="showCalc=true">分类分析</el-button>
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
      <div slot="title" class="title">分类分析</div>
      <el-input v-model="period" placeholder="请输入分类分析期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcItemChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcItem">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup.vue";
import ICheckRadio from "../../../../components/icheck/ICheckRadio.vue";
import {ssqPeriodMixin} from "../../../../mixins/period_ssq_mixin";
import {ssq_blue_categories, ssq_channels, ssq_red_categories} from "../../../../libs/lottery";
import {calcItemChart, itemChart} from "../../../../api/ssq-service";

const blue_list = [
  'b3',
  "b5",
  'bk'
];
export default {
  name: "SsqCensusItemView",
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
            '前100',
            '前150',
            '前200',
          ],
        },
        data: {
          title: {text: '预测趋势统计图'},
          columns: [
            '号码',
            '前10',
            '前20',
            '前50',
            '前100',
            '前150',
            '前200'
          ],
          rows: [],
        },
      },
    };
  },
  methods: {
    calcItemChart() {
      calcItemChart(this.period).then(res => {
        this.cancelCalcItem();
        this.queryItemChart();
      })
    },
    cancelCalcItem() {
      this.period   = null;
      this.showCalc = false;
    },
    queryItemChart() {
      itemChart(this.query).then(data => {
        let {
              period,
              level10,
              level20,
              level50,
              level100,
              level150,
              level200
            }                = data;
        let categories       = this.blue_filter.indexOf(this.query.type) >= 0 ?
            ssq_blue_categories :
            ssq_red_categories;
        this.chart.data.rows = categories.map((value, i) => {
          return {
            '号码': value,
            '前10': level10.values[0][i],
            '前20': level20.values[0][i],
            '前50': level50.values[0][i],
            '前100': level100.values[0][i],
            '前150': level150.values[0][i],
            '前200': level200.values[0][i],
          };
        })
      });
    },
  },
  mounted() {
    this.queryItemChart();
  },
  watch: {
    query: {
      deep: true,
      handler(value) {
        this.queryItemChart();
      }
    }
  }
}
</script>

<style scoped>

</style>