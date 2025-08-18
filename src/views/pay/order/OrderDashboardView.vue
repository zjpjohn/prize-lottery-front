<template>
  <div style="padding: 48px;">
    <el-row :gutter="48">
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">昨日订单量</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 30px;font-weight: 600;">{{ parseInt(metrics.yesterdayAmt) / 100 }}</span>
            <span style="font-size: 18px;font-weight: 600">元</span>
          </div>
          <div
              style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">昨日下单数</div>
            <div style="font-size: 16px;">总计{{ metrics.yesterdayCnt }}单</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">本周订单量</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 30px;font-weight: 600;">{{ parseInt(metrics.weekAmt) / 100 }}</span>
            <span style="font-size: 18px;font-weight: 600">元</span>
          </div>
          <div
              style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">本周下单数</div>
            <div style="font-size: 16px;">总计{{ metrics.weekCnt }}单</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">本月订单量</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 30px;font-weight: 600;">{{ parseInt(metrics.monthAmt) / 100 }}</span>
            <span style="font-size: 18px;font-weight: 600">元</span>
          </div>
          <div
              style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">本月下单数</div>
            <div style="font-size: 16px;">总计{{ metrics.monthCnt }}单</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">上月订单量</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 30px;font-weight: 600;">{{ parseInt(metrics.lastMonthAmt) / 100 }}</span>
            <span style="font-size: 18px;font-weight: 600">元</span>
          </div>
          <div
              style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">上月下单数</div>
            <div style="font-size: 16px;">总计{{ metrics.lastMonthCnt }}单</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 48px">
      <el-row :gutter="48">
        <el-col :span="18">
          <div class="chart-panel">
            <div style="padding: 24px;display: flex;align-items: center;justify-content: space-between">
              <div style="font-size: 18px;font-weight: 600">{{ chart.title.text }}</div>
              <div>
                <el-link :underline="false"
                         type="primary"
                         style="margin-right: 16px;font-size: 17px;font-weight: 500"
                         @click="goOrderList">订单管理
                </el-link>
                <el-select v-model="chartDay" style="width: 160px" placeholder="请选择统计天数">
                  <el-option v-for="(type,index) in chartDays"
                             :key="type.value+'_chart_day'"
                             :label="type.label"
                             :value="type.value"></el-option>
                </el-select>
              </div>
            </div>
            <div style="padding: 0 16px">
              <ve-line :judge-width="true"
                       :data="chart.data"
                       :yAxis="chart.yAxis"
                       :xAxis="chart.xAxis"
                       :tooltip="chart.extend.tooltip"
                       height="360px"
                       :settings="chart.settings"
                       :mark-point="chart.markPoint"></ve-line>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="pack-panel">
            <div style="text-align: left;padding: 24px 24px 16px 32px;font-size: 18px;font-weight: 600">套餐排行榜
            </div>
            <div v-for="(item,index) in packRanks" :key="index" style="text-align:left;padding: 12px 32px;">
              <div style="display: flex;align-items: center;justify-content: start;">
                <div style="margin-right: 10px">
                  <img :src="require(`../../../assets/images/rank${index+1}.png`)"
                       style="width: 26px;height: 26px;margin-top: 2px"
                       alt="排名" v-if="index<=2">
                  <div v-else
                       style="text-align:center;width: 26px;height: 26px;font-size: 22px;font-weight: 700;color: orange">
                    {{ index + 1 }}
                  </div>
                </div>
                <div style="flex-grow:1;display: flex;align-items: center;justify-content: space-between">
                  <div style="text-align: left;color: black">
                    <div style="font-size: 16px;font-weight: bold;">{{ item.packName }}</div>
                    <div style="font-size: 14px;font-weight: 500;">总计出售{{ item.successCnt }}单</div>
                  </div>
                  <div>
                    <span style="font-size: 13px;color:orange">总计</span>
                    <span style="font-size: 20px;font-weight: 600;color: orangered">{{ item.successAmt }}</span>
                    <span style="font-size: 13px;color:orange">元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 48px 0">
      <div class="trend-panel">
        <el-table :data="trends"
                  style="width:100%;margin-top: 20px"
                  :row-style="{height:'60px',color:'black'}"
                  :header-cell-style="{color:'#333333',height: '60px'}">
          <el-table-column label="统计日期">
            <template v-slot="scope">
              <span style="font-weight: 500;font-size: 16px">{{ scope.row.day }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成功金额">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{
                    parseInt(scope.row.successAmt.value) / 100
                  }}</span>
                <img :src="trendImages[scope.row.successAmt.trend.toString()]"
                     v-if="scope.row.successAmt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="成功订单">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.successCnt.value }}</span>
                <img :src="trendImages[scope.row.successCnt.trend.toString()]"
                     v-if="scope.row.successCnt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="失败金额">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{
                    parseInt(scope.row.failureAmt.value) / 100
                  }}</span>
                <img :src="trendImages[scope.row.failureAmt.trend.toString()]"
                     v-if="scope.row.failureAmt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="失败订单">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.failureCnt.value }}</span>
                <img :src="trendImages[scope.row.failureCnt.trend.toString()]"
                     v-if="scope.row.failureCnt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="关闭金额">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">
                      {{ parseInt(scope.row.closedAmt.value) / 100 }}
                </span>
                <img :src="trendImages[scope.row.closedAmt.trend.toString()]"
                     v-if="scope.row.closedAmt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="关闭订单">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">
                      {{ scope.row.closedCnt.value }}
                </span>
                <img :src="trendImages[scope.row.closedCnt.trend.toString()]"
                     v-if="scope.row.closedCnt.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无趋势统计数据</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {orderChart, orderMetrics, orderTrends} from "../../../api/payment-service";
import 'echarts/lib/component/markPoint'
import {packRankMetrics} from "../../../api/member-service";

const chart_days   = [
  {
    label: '最近15天',
    value: 15
  },
  {
    label: '最近20天',
    value: 20
  },
  {
    label: '最近25天',
    value: 25
  },
  {
    label: '最近30天',
    value: 30
  },
];
const trend_images = {
  '1': require('../../../assets/images/up.png'),
  '-1': require('../../../assets/images/down.png'),
  '0': require('../../../assets/images/keep.png'),
};
export default {
  name: "OrderDashboardView",
  data() {
    return {
      chartDays: chart_days,
      trendImages: trend_images,
      trends: [],
      packRanks: [],
      metrics: {
        yesterdayAmt: 0,
        yesterdayCnt: 0,
        weekAmt: 0,
        weekCnt: 0,
        monthAmt: 0,
        monthCnt: 0,
        lastMonthAmt: 0,
        lastMonthCnt: 0,
      },
      chartType: 'success',
      chartDay: 15,
      chartData: {
        xaxis: [],
        series: {
          'success': [],
          'failure': [],
          'closed': [],
        },
      },
      chart: {
        title: {text: ''},
        settings: {
          showLine: [
            '成功订单',
            '关闭订单'
          ],
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 35,
              fontSize: '10',
            }
          }
        ],
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(0,0,0,0.03)'
              }
            }
          },
          series: {
            barWidth: 64,
          },
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            },
          ],
        },
        data: {
          columns: [
            '天',
            '成功订单',
            '失败订单',
            '关闭订单'
          ],
          rows: []
        },
      },
    };
  },
  methods: {
    goOrderList() {
      this.$router.push('/pay/order/manager/list')
    },
    queryPackRanks() {
      packRankMetrics().then(data => this.packRanks = data || []);
    },
    queryOrderTrends() {
      orderTrends().then(data => this.trends = data || []);
    },
    queryOrderChart() {
      orderChart(this.chartDay).then(data => {
        this.chartData = data;
        this.metricsChart();
      });
    },
    metricsChart() {
      this.chart.title = {text: `${this.chartDay}天订单统计`};
      let xaxis        = this.chartData.xaxis;
      let rows         = [];
      for (let i = 0; i < xaxis.length; i++) {
        rows.push({
          '天': xaxis[i],
          '成功订单': this.chartData.series['success'][i] / 100,
          '失败订单': this.chartData.series['failure'][i] / 100,
          '关闭订单': this.chartData.series['closed'][i] / 100,
        });
      }
      this.chart.data.rows = rows;
    }
  },
  mounted() {
    this.queryOrderMetrics();
    this.queryPackRanks();
    this.queryOrderTrends();
    this.queryOrderChart();
  },
  watch: {
    chartDay(value) {
      this.queryOrderChart();
    },
  },
}
</script>

<style scoped>
.metrics-panel {
  padding: 16px 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.chart-panel, .pack-panel {
  background-color: white;
  height: 440px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.trend-panel {
  min-height: 320px;
  padding: 0 48px 32px 48px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.metrics-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #f1f1f1;
}

.trend-panel >>> .el-table::before {
  height: 0 !important;
}
</style>
