<template>
  <div>
    <div style="padding: 48px;text-align: center;">
      <div style="text-align: right;margin-bottom: 20px">
        <el-button type="primary" plain style="margin-right: 16px" @click="gotoMediaView">媒体管理</el-button>
        <el-select style="width: 240px"
                   v-model="appNo"
                   no-data-text="暂无可选媒体应用"
                   placeholder="暂无媒体应用">
          <el-option v-for="(item,index) in appList"
                     :key="'media_app_'+index"
                     :label="item.name"
                     :value="item.seqNo"></el-option>
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
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.yesterdayIncome }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">昨日广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.yesterdayShow }}次</div>
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
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.weekIncome }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本周广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.weekShow }}次</div>
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
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.monthIncome }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本月广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.monthShow }}次</div>
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
              <span style="font-size: 28px;font-weight: 600;">{{ adMetrics.lastMonthIncome }}</span>
              <span style="font-size: 18px;font-weight: 600">元</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">上月广告展现量</div>
              <div style="font-size: 16px;">{{ adMetrics.lastMonthShow }}次</div>
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
                  <el-select v-model="chartQuery.days" style="width: 160px;margin-right: 16px"
                             placeholder="选择统计天数">
                    <el-option label="最近10天" :value="10"></el-option>
                    <el-option label="最近半月" :value="15"></el-option>
                    <el-option label="最近20天" :value="20"></el-option>
                    <el-option label="最近一月" :value="30"></el-option>
                  </el-select>
                  <el-select v-model="chartQuery.type"
                             style="width: 160px"
                             placeholder="请选择广告类型">
                    <el-option v-for="(item,index) in adTypes"
                               height="360px"
                               :key="index+'_ad_type'"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <ve-line :data="incomeChart.data"
                         :yAxis="incomeChart.yAxis"
                         :xAxis="incomeChart.xAxis"
                         :tooltip="incomeChart.extend.tooltip"
                         height="420px"
                         :settings="incomeChart.settings"
                         :mark-point="incomeChart.markPoint"></ve-line>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="advert-panel">
              <div style="text-align: left;padding: 24px 20px 16px 30px;font-size: 18px;font-weight: 600">
                广告收益排行榜
              </div>
              <div v-for="(item,index) in adIncomes" :key="index" style="text-align:left;padding: 10px 20px;">
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
                        本周收益<span style="color: black">{{ item.week }}</span>元
                      </div>
                    </div>
                    <div style="flex: 1;font-size: 20px;font-weight: 600;color: orangered">
                      +{{ item.yesterday }}
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
          <div style="display: flex;align-items: center;justify-content: end;margin-bottom: 16px">
            <el-date-picker
                v-model="reportQuery.date"
                type="date"
                style="margin-right: 16px"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择收益日期">
            </el-date-picker>
            <el-select v-model="reportQuery.type"
                       style="width: 180px"
                       clearable
                       placeholder="请选择广告类型">
              <el-option v-for="(item,index) in adTypes"
                         height="360px"
                         :key="item.value+'_ad_type'"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <el-table stripe :data="reportList.records"
                    :row-style="{height:'48px',color:'black'}"
                    :header-cell-style="{color:'#333333',height: '48px'}">
            <el-table-column label="日期" prop="statsDate"></el-table-column>
            <el-table-column label="广告位" prop="unitId"></el-table-column>
            <el-table-column label="广告类型">
              <template v-slot="scope">
                {{ scope.row.type.label }}
              </template>
            </el-table-column>
            <el-table-column label="展现量" prop="showCnt"></el-table-column>
            <el-table-column label="点击量" prop="clickCnt"></el-table-column>
            <el-table-column label="点击率" prop="clickRate"></el-table-column>
            <el-table-column label="广告收益" prop="income"></el-table-column>
            <el-table-column label="千次展现收益" prop="ecpm"></el-table-column>
            <div slot="empty">
              <div class="table-empty">
                <img src="../../assets/images/empty.png" alt="" style="width: 84px">
                <span>暂无收益数据</span>
              </div>
            </div>
          </el-table>
          <div style="text-align: left">
            <el-pagination background
                           style="margin-top: 16px"
                           layout="total,prev,pager,next"
                           :page-size="limit"
                           :current-page.sync="page"
                           :total="reportList.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {adset_type} from "../../libs/advert";
import {adIncomeChart, adReportList, adTimeMetrics, adTypeIncomes} from "../../api/adset-service";
import {getAppList} from "../../api/app-service";

export default {
  name: "AdsetDashboardView",
  data() {
    return {
      adTypes: adset_type,
      appNo: null,
      appList: [],
      adIncomes: [],
      limit: 6,
      page: 1,
      dateRange: [],
      reportQuery: {
        type: null,
        date: null,
      },
      reportList: {
        current: 1,
        total: 0,
        records: [],
      },
      adMetrics: {
        yesterdayIncome: 0,
        yesterdayShow: 0,
        weekIncome: 0,
        weekShow: 0,
        monthIncome: 0,
        monthShow: 0,
        lastMonthIncome: 0,
        lastMonthShow: 0,
      },
      chartQuery: {
        type: 4,
        days: 10,
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
            '日期',
            '收益'
          ],
          rows: []
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
    };
  },
  methods: {
    gotoMediaView() {
      this.$router.push('/ads/adset/media');
    },
    getAdAppList() {
      getAppList().then(data => {
        this.appList = data || [];
        if (this.appList.length > 0) {
          this.appNo = this.appList[0].seqNo;
          this.loadAdMetrics();
        }
      });
    },
    loadAdMetrics() {
      this.queryAdMetrics();
      this.queryAdIncomes();
      this.queryIncomeChart();
      this.queryReportList();
    },
    queryAdMetrics() {
      if (this.appNo == null) {
        return;
      }
      adTimeMetrics(this.appNo).then(data => {
        if (data == null) {
          return;
        }
        let {
              yesterdayIncome,
              yesterdayShow,
              weekIncome,
              weekShow,
              monthIncome,
              monthShow,
              lastMonthIncome,
              lastMonthShow
            }                          = data;
        this.adMetrics.yesterdayIncome = yesterdayIncome || 0;
        this.adMetrics.yesterdayShow   = yesterdayShow || 0;
        this.adMetrics.weekIncome      = weekIncome || 0;
        this.adMetrics.weekShow        = weekShow || 0;
        this.adMetrics.monthIncome     = monthIncome || 0;
        this.adMetrics.monthShow       = monthShow || 0;
        this.adMetrics.lastMonthIncome = lastMonthIncome || 0;
        this.adMetrics.lastMonthShow   = lastMonthShow || 0;
      });
    },
    queryAdIncomes() {
      if (this.appNo == null) {
        return;
      }
      adTypeIncomes(this.appNo).then(data => this.adIncomes = data || []);
    },
    queryIncomeChart() {
      if (this.appNo == null) {
        return;
      }
      let adType             = this.adTypes.filter(t => t.value === this.chartQuery.type)[0];
      this.incomeChart.title = {text: `${adType.label}收益`};
      adIncomeChart(Object.assign({appNo: this.appNo}, this.chartQuery)).then(data => {
        let xaxis  = data.xaxis;
        let series = data.series['default'];
        let rows   = [];
        for (let i = 0; i < xaxis.length; i++) {
          rows.push({
            '日期': xaxis[i],
            '收益': series[i],
          });
        }
        this.incomeChart.data.rows = rows;
      });
    },
    queryReportList() {
      if (this.appNo == null) {
        return;
      }
      adReportList(Object.assign({
        appNo: this.appNo,
        limit: this.limit,
        page: this.page,
      }, this.reportQuery)).then(data => this.reportList = data);
    },
  },
  mounted() {
    this.getAdAppList();
  },
  watch: {
    appNo(value) {
      this.loadAdMetrics();
    },
    chartQuery: {
      deep: true,
      handler(value, old) {
        this.queryIncomeChart();
      }
    },
    reportQuery: {
      deep: true,
      handler(value, old) {
        this.queryReportList();
      }
    },
    page(value) {
      this.queryReportList();
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
  height: 480px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.report-panel {
  padding: 24px 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.reward-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #f1f1f1 !important;
}

.adDashboard >>> .el-input__inner {
  border: 1px solid #e8e8e8 !important;
}
</style>