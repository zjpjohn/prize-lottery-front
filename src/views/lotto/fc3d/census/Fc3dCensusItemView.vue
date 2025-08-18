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
                       :key="index+'_cha_fsd'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
      <permission permit="super">
        <el-button plain type="primary" @click="showCalc=true">分类统计</el-button>
      </permission>
    </div>
    <div style="margin-top: 80px;display: flex;justify-content: center">
      <div v-if="this.duplex.indexOf(query.type)>=0"
           style="display: flex;align-items: center;justify-content:center;width: 100%">
        <div style="width: 85%">
          <div style="display: flex;align-items: center;margin-bottom: 16px">
            <div v-for="(type,index) in chart.directs"
                 :class="['type_btn',type.value===chart.direct?'picked':'unpicked']"
                 :key="index+'_lt_type'"
                 @click="pickDirect(type.value)">{{ type.label }}
            </div>
          </div>
          <ve-histogram :judge-width="true"
                        :data="chart.ddata"
                        :title="chart.ddata.title"
                        height="460px"
                        :mark-point="chart.markPoint"
                        :settings="chart.settings"></ve-histogram>
        </div>
      </div>
      <div v-else style="width: 85%">
        <ve-histogram :judge-width="true"
                      :data="chart.data"
                      :title="chart.data.title"
                      height="460px"
                      :mark-point="chart.markPoint"
                      :settings="chart.settings"></ve-histogram>
      </div>
    </div>
    <el-dialog :visible.sync="showCalc" width="400px">
      <div slot="title" class="title">分类计算</div>
      <el-input v-model="period" placeholder="请输入分类计算期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcItemChart">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcItem">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ICheckRadio from "../../../../components/icheck/ICheckRadio.vue";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup.vue";
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {d3_categories, fsd_channels} from "../../../../libs/lottery";
import {calcFc3dItemChart, getFc3dItemChart} from "../../../../api/fc3d-service";

const duplex = [
  'cb3',
  'cb4',
  'cb5'
];
export default {
  name: "Fc3dCensusItemView",
  components: {
    ICheckRadio,
    ICheckRadioGroup,
  },
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      showCalc: false,
      channels: fsd_channels,
      duplex: duplex,
      period: null,
      query: {
        period: null,
        type: 'd3',
      },
      chart: {
        directs: [
          {
            label: '百位',
            value: 'bai'
          },
          {
            label: '十位',
            value: 'shi'
          },
          {
            label: '个位',
            value: 'ge'
          }
        ],
        direct: 'bai',
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
          title: {text: '分类专家预测趋势统计图'},
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
        ddata: {
          title: {text: ''},
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
        duplex: {
          bai: {
            title: {text: '百位趋势统计图'},
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
          shi: {
            title: {text: '十位趋势统计图'},
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
          ge: {
            title: {text: '个位趋势统计图'},
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
          }
        },
      },
    };
  },
  methods: {
    calcItemChart() {
      calcFc3dItemChart(this.period).then(res => {
        this.cancelCalcItem();
        this.queryItemChart();
      });
    },
    cancelCalcItem() {
      this.period   = null;
      this.showCalc = false;
    },
    queryItemChart() {
      getFc3dItemChart(this.query).then(data => {
        let {
              period,
              level10,
              level20,
              level50,
              level100,
              level150,
              level200,
            } = data;
        if (this.duplex.indexOf(this.query.type) >= 0) {
          let dataBai = [],
              dataShi = [],
              dataGe  = [];
          for (let i = 0; i < d3_categories.length; i++) {
            dataBai.push({
              '号码': d3_categories[i],
              '前10': level10.values[0][i],
              '前20': level20.values[0][i],
              '前50': level50.values[0][i],
              '前100': level100.values[0][i],
              '前150': level150.values[0][i],
              '前200': level200.values[0][i],
            });
            dataShi.push({
              '号码': d3_categories[i],
              '前10': level10.values[1][i],
              '前20': level20.values[1][i],
              '前50': level50.values[1][i],
              '前100': level100.values[1][i],
              '前150': level150.values[1][i],
              '前200': level200.values[1][i],
            });
            dataGe.push({
              '号码': d3_categories[i],
              '前10': level10.values[2][i],
              '前20': level20.values[2][i],
              '前50': level50.values[2][i],
              '前100': level100.values[2][i],
              '前150': level150.values[2][i],
              '前200': level200.values[2][i],
            });
          }
          this.chart.duplex.bai.rows = dataBai;
          this.chart.duplex.shi.rows = dataShi;
          this.chart.duplex.ge.rows  = dataGe;
          this.pickDirect('bai');
        } else {
          this.chart.data.rows = d3_categories.map((value, i) => {
            return {
              '号码': d3_categories[i],
              '前10': level10.values[0][i],
              '前20': level20.values[0][i],
              '前50': level50.values[0][i],
              '前100': level100.values[0][i],
              '前150': level150.values[0][i],
              '前200': level200.values[0][i],
            };
          });
        }
      });
    },
    pickDirect(direct) {
      this.chart.direct = direct;
      this.chart.ddata  = this.chart.duplex[direct];
    }
  },
  mounted() {
    this.queryItemChart();
  },
  watch: {
    query: {
      deep: true,
      handler(value, old) {
        this.queryItemChart();
      }
    }
  }
}
</script>

<style scoped>

</style>