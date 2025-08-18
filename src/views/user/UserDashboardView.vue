<template>
  <div class="metrics-container">
    <el-row :gutter="48">
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">昨日新增用户</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 30px;font-weight: 600;">{{ metrics.yesterdayIncr }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div
              style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">昨日应用启动</div>
            <div style="font-size: 16px;">总计{{ metrics.yesterdayLaunch }}次</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">本周新增用户</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
            <span style="font-size: 30px;font-weight: bold;">{{ metrics.weekIncr }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div
              style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">本周应用启动</div>
            <div style="font-size: 16px;">总计{{ metrics.weekLaunch }}次</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">本月新增用户</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
            <span style="font-size: 30px;font-weight: bold;">{{ metrics.monthIncr }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div
              style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">本月应用启动</div>
            <div style="font-size: 16px;">总计{{ metrics.monthLaunch }}次</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">上月新增用户</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
            <span style="font-size: 28px;font-weight: bold;">{{ metrics.lastIncr }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div
              style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">上月应用启动</div>
            <div style="font-size: 16px;">总计{{ metrics.lastLaunch }}次</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 48px;">
      <el-row :gutter="48">
        <el-col :span="18">
          <div class="chart-panel">
            <div style="padding: 24px;display: flex;align-items: center;justify-content: space-between">
              <div style="font-size: 18px;font-weight: 600">{{ chart.title.text }}</div>
              <div>
                <el-select v-model="chartType"
                           style="margin-right:24px;width: 160px"
                           @change="metricsChart"
                           placeholder="请选择指标类型">
                  <el-option v-for="(type,index) in chartTypes"
                             :key="type.value+'_chart_type'"
                             :label="type.label"
                             :value="type.value"></el-option>
                </el-select>
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
          <div class="invite-panel">
            <div style="text-align: left;padding: 24px 20px 16px 32px;font-size: 18px;font-weight: 600">邀请排行榜</div>
            <div v-for="(item,index) in topInvites" :key="index" style="text-align:left;padding: 7px 32px;">
              <div style="display: flex;align-items: center;justify-content: start;">
                <div style="margin-right: 10px">
                  <img :src="require(`../../assets/images/rank${index+1}.png`)"
                       style="width: 26px;height: 26px;margin-top: 2px"
                       alt="排名" v-if="index<=2">
                  <div v-else
                       style="text-align:center;width: 26px;height: 26px;font-size: 22px;font-weight: 700;color: orange">
                    {{ index + 1 }}
                  </div>
                </div>
                <div style="flex-grow:1;display: flex;align-items: center;justify-content: space-between">
                  <div style="text-align: left;color: black">
                    <div style="font-size: 15px;font-weight: 600;">{{ item.nickname }}</div>
                    <div style="font-size: 14px;font-weight: 500;">{{ item.phone|marker }}</div>
                  </div>
                  <div>
                    <span style="font-size: 20px;font-weight: 600;color: orangered">{{ item.invites }}</span>
                    <span style="font-size: 13px;color:orange">人</span>
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
        <el-table :data="trends" style="width:100%;margin-top: 20px"
                  :row-style="{height:'60px',color:'black'}"
                  :header-cell-style="{color:'#333333',height: '60px'}">
          <el-table-column label="统计日期" prop="day">
            <template v-slot="scope">
              <span style="font-weight: 500;font-size: 16px">{{ scope.row.day }}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增用户">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.incr.value }}</span>
                <img :src="trendImages[scope.row.incr.trend.toString()]"
                     v-if="scope.row.incr.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="日活用户">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.active.value }}</span>
                <img :src="trendImages[scope.row.active.trend.toString()]"
                     v-if="scope.row.active.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="受邀用户">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.invite.value }}</span>
                <img :src="trendImages[scope.row.invite.trend.toString()]"
                     v-if="scope.row.invite.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="启动次数">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">{{ scope.row.launch.value }}</span>
                <img :src="trendImages[scope.row.launch.trend.toString()]"
                     v-if="scope.row.launch.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="平均启动次数">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <span style="padding-top:4px;font-weight: 500;font-size: 16px">
                      {{ scope.row.launchAvg.value }}
                </span>
                <img :src="trendImages[scope.row.launchAvg.trend.toString()]"
                     v-if="scope.row.launchAvg.trend!==0"
                     style="height:16px " alt="趋势"/>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无趋势统计数据</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {metricsTrends, userMetrics, userMetricsChart} from "../../api/user-service";
import {topUserAgent} from "../../api/agent-service";
import 'echarts/lib/component/markPoint'
import {phoneEncode} from "../../libs/lottery";

const chart_types = [
  {
    label: '日增用户数',
    value: 'added'
  },
  {
    label: '日活用户数',
    value: 'active'
  },
  {
    label: '日启动次数',
    value: 'launch'
  },
  {
    label: '日平均启动',
    value: 'launchAvg'
  },
  {
    label: '日邀请人数',
    value: 'invite'
  },
];
const chart_days  = [
  {
    label: '最近10天',
    value: 10
  },
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
  '1': require('../../assets/images/up.png'),
  '-1': require('../../assets/images/down.png'),
  '0': require('../../assets/images/keep.png'),
};
export default {
  name: "UserDashboardView",
  filters: {
    marker(phone) {
      return phoneEncode(phone);
    }
  },
  data() {
    return {
      chartDays: chart_days,
      chartTypes: chart_types,
      trendImages: trend_images,
      trends: [],
      topInvites: [],
      metrics: {
        yesterdayIncr: 0,
        yesterdayAct: 0,
        yesterdayLaunch: 0,
        weekIncr: 0,
        weekAct: 0,
        weekLaunch: 0,
        monthIncr: 0,
        monthAct: 0,
        monthLaunch: 0,
        lastIncr: 0,
        lastAct: 0,
        lastLaunch: 0,
      },
      chartType: 'added',
      chartDay: 10,
      chartData: {
        xaxis: [],
        series: {
          'added': [],
          'active': [],
          'launch': [],
          'launchAvg': [],
          'invite': [],
        },
      },
      chart: {
        title: {text: ''},
        settings: {
          area: true
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
            }
          }
        ],
        extend: {
          tooltip: {
            trigger: 'axis',
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
          ],
        },
        data: {
          columns: [
            '天',
            '人次'
          ],
          rows: []
        },
      },
    };
  },

  methods: {
    queryUserMetrics() {
      userMetrics().then(data => this.metrics = data);
    },
    queryMetricsTrends() {
      metricsTrends().then(data => this.trends = data || []);
    },
    queryTopInvites() {
      topUserAgent().then(data => this.topInvites = data || []);
    },
    queryMetricsChart() {
      userMetricsChart(this.chartDay).then(data => {
        this.chartData = data;
        this.metricsChart(this.chartType);
      })
    },
    metricsChart(type) {
      let cType        = this.chartTypes.filter(c => c.value === type)[0];
      this.chart.title = {text: cType.label};
      let series       = this.chartData.series[type];
      let xaxis        = this.chartData.xaxis;
      let rows         = [];
      for (let i = 0; i < xaxis.length; i++) {
        rows.push({
          '天': xaxis[i],
          '人次': series[i]
        });
      }
      this.chart.data.rows = rows;
    }
  },
  mounted() {
    this.queryUserMetrics();
    this.queryTopInvites();
    this.queryMetricsChart();
    this.queryMetricsTrends();
  },
  watch: {
    chartDay: {
      deep: true,
      handler(value, old) {
        this.queryMetricsChart();
      }
    }
  },
}
</script>

<style scoped>
.metrics-container {
  padding: 48px;
  text-align: center;
  overflow: auto;
}

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

.chart-panel, .invite-panel {
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
