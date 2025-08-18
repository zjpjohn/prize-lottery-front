<template>
  <div class="adDashboard">
    <div style="padding: 48px;text-align: center;">
      <div style="text-align: right;margin-bottom: 20px">
        <el-select style="width: 240px"
                   v-model="acctId"
                   no-data-text="暂无可选账户公司"
                   placeholder="暂无广告账户公司">
          <el-option v-for="(item,index) in acctList"
                     :key="'acct_corp_'+index"
                     :label="item.corp"
                     :value="item.acctId"></el-option>
        </el-select>
      </div>
      <el-row :gutter="48">
        <el-col :span="6">
          <div class="reward-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 18px;font-weight:600;">昨日预估收益</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.yesterdayRev }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">昨日广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.yesterdayImp }}次</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="reward-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 18px;font-weight:600;">本周预估收益</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.weekRev }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本周广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.weekImp }}次</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="reward-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 18px;font-weight:600;">本月预估收益</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.monthRev }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本月广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.monthImp }}次</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="reward-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 18px;font-weight:600;">上月预估收益</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.lastMonthRev }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">上月广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.lastMonthImp }}次</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top: 48px">
        <el-row :gutter="48">
          <el-col :span="18">
            <div class="advert-panel">
              <div style="padding: 24px;display: flex;align-items: center;justify-content: space-between">
                <div style="font-size: 18px;font-weight: 600">{{ incomeChart.title.text }}</div>
                <div>
                  <el-date-picker v-model="chartQuery.day"
                                  type="date"
                                  :clearable="false"
                                  style="margin-right: 24px;width: 160px"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  placeholder="请选择日期">
                  </el-date-picker>
                  <el-select v-model="chartQuery.adType"
                             style="width: 160px"
                             placeholder="请选择广告类型">
                    <el-option v-for="(item,index) in adTypes"
                               height="360px"
                               :key="item.value+'_ad_type'"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <ve-line :judge-width="true"
                         :data="incomeChart.data"
                         :yAxis="incomeChart.yAxis"
                         :xAxis="incomeChart.xAxis"
                         :tooltip="incomeChart.extend.tooltip"
                         height="400px"
                         :settings="incomeChart.settings"
                         :mark-point="incomeChart.markPoint"></ve-line>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="advert-panel">
              <div style="text-align: left;padding: 24px 20px 20px 30px;font-size: 18px;font-weight: 600">
                广告收益排行榜
              </div>
              <div v-for="(item,index) in adIncomes" :key="index" style="text-align:left;padding: 14px 20px;">
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
                    <div style="flex: 3">
                      <div style="font-size: 17px;font-weight: 500;">{{ item.type.label }}</div>
                      <div style="font-size: 14px;color: #9c9c9c;margin-top: 4px">
                        昨日收益<span style="color: black">{{ item.last }}</span>元
                      </div>
                    </div>
                    <div style="flex: 1;font-size: 20px;font-weight: 600;color: orangered">
                      +{{ item.revenue }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin: 48px 0">
        <div class="report-panel">
          <div style="text-align: right">
            <el-select v-model="dayType"
                       style="width: 200px"
                       clearable
                       placeholder="请选择广告类型">
              <el-option v-for="(item,index) in adTypes"
                         height="360px"
                         :key="item.value+'_ad_type'"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <el-table stripe :data="dayMetrics"
                    :row-style="{height:'48px',color:'black'}"
                    :header-cell-style="{color:'#333333',height: '48px'}">
            <el-table-column label="统计日期" prop="days"></el-table-column>
            <el-table-column label="展现次数" prop="impCnt"></el-table-column>
            <el-table-column label="请求次数" prop="reqCnt"></el-table-column>
            <el-table-column label="返回次数" prop="retCnt"></el-table-column>
            <el-table-column label="点击次数" prop="clkCnt"></el-table-column>
            <el-table-column label="广告收益(元)">
              <template v-slot="scope">
                <span>{{ scope.row.revCnt.toFixed(2) + '元' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="广告点击率(平均)">
              <template v-slot="scope">
                <span>{{ (scope.row.clkRate * 100).toFixed(0) + '%' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="广告填充率(平均)">
              <template v-slot="scope">
                <span>{{ (scope.row.fillRate * 100).toFixed(0) + '%' }}</span>
              </template>
            </el-table-column>
            <div slot="empty">
              <div class="table-empty">
                <img src="../../assets/images/empty.png" alt="" style="width: 84px">
                <span>暂无广告数据</span>
              </div>
            </div>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {activeAcctCorps, adDayMetrics, adMetrics, incomeChart, incomeMetrics,} from "../../api/ads-service";
import {unit_type} from "../../libs/advert";
import {formatDate} from "../../libs/date-utils";
import 'echarts/lib/component/markPoint'

export default {
  name: "AdsDashboardView",
  data() {
    return {
      rewardDate: null,
      metricsDate: null,
      adTypes: unit_type,
      acctId: null,
      acctList: [],
      adIncomes: [],
      dayType: 10,
      dayMetrics: [],
      adMetrics: {
        yesterdayRev: 0,
        yesterdayImp: 0,
        weekRev: 0,
        weekImp: 0,
        monthRev: 0,
        monthImp: 0,
        lastMonthRev: 0,
        lastMonthImp: 0,
      },
      chartQuery: {
        adType: 10,
        day: formatDate(new Date()),
      },
      incomeChart: {
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
            showSymbol: false,
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
            '小时',
            '收益'
          ],
          rows: []
        },
      },
    };
  },
  methods: {
    getActiveCorp() {
      activeAcctCorps().then(data => {
        this.acctList = data || [];
        if (this.acctList.length > 0) {
          this.acctId = this.acctList[0].acctId;
          this.loadAdMetrics();
        }
      })
    },
    loadAdMetrics() {
      this.queryAdMetrics();
      this.queryAdIncomes();
      this.queryIncomeChart();
      this.queryDayMetrics();
    },
    queryAdMetrics() {
      if (this.acctId == null) {
        return;
      }
      adMetrics(this.acctId).then(data => {
        if (data == null) {
          return;
        }
        let {
              yesterdayRev,
              yesterdayImp,
              weekRev,
              weekImp,
              monthRev,
              monthImp,
              lastMonthRev,
              lastMonthImp
            }                       = data;
        this.adMetrics.yesterdayRev = yesterdayRev || 0;
        this.adMetrics.yesterdayImp = yesterdayImp || 0;
        this.adMetrics.weekRev      = weekRev || 0;
        this.adMetrics.weekImp      = weekImp || 0;
        this.adMetrics.monthRev     = monthRev || 0;
        this.adMetrics.monthImp     = monthImp || 0;
        this.adMetrics.lastMonthRev = lastMonthRev || 0;
        this.adMetrics.lastMonthImp = lastMonthImp || 0;
      });
    },
    queryAdIncomes() {
      if (this.acctId == null) {
        return;
      }
      incomeMetrics(this.acctId).then(data => this.adIncomes = data || []);
    },
    queryDayMetrics() {
      if (this.acctId == null) {
        return;
      }
      adDayMetrics({
        acctId: this.acctId,
        type: this.dayType
      }).then(data => this.dayMetrics = data || []);
    },
    queryIncomeChart() {
      if (this.acctId == null) {
        return;
      }
      let adType             = this.adTypes.filter(t => t.value === this.chartQuery.adType)[0];
      this.incomeChart.title = {text: `${adType.label}收益`};
      let params             = Object.assign({acctId: this.acctId}, this.chartQuery);
      incomeChart(params).then(data => {
        let xaxis  = data.xaxis;
        let series = data.series['default'];
        let rows   = [];
        for (let i = 0; i < xaxis.length; i++) {
          let xaxisTick = parseInt(xaxis[i].substring(6)) + ":00";
          rows.push({
            '小时': xaxisTick,
            '收益': series[i],
          });
        }
        this.incomeChart.data.rows = rows;
      });
    },
  },
  mounted() {
    this.getActiveCorp();
  },
  watch: {
    chartQuery: {
      deep: true,
      handler(value, old) {
        this.queryIncomeChart();
      }
    },
    acctId(value) {
      this.loadAdMetrics();
    },
    dayType(value) {
      this.queryDayMetrics();
    }
  }
}
</script>

<style scoped>
.reward-panel {
  padding: 20px 28px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.advert-panel {
  background-color: white;
  height: 460px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.report-panel {
  padding: 24px 24px 32px 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.reward-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #f2f2f2 !important;
}

.adDashboard >>> .el-input__inner {
  border: 1px solid #e8e8e8 !important;
}

</style>
