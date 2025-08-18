<template>
  <div class="dashboard-container">
    <el-row :gutter="48">
      <el-col :span="6">
        <div class="metrics-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">昨日会员</div>
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
            <div style="font-size: 17px;font-weight:bold;">本周会员</div>
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
            <div style="font-size: 17px;font-weight:bold;">本月会员</div>
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
            <div style="font-size: 17px;font-weight:bold;">上月会员</div>
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
              <el-select v-model="chartDay" style="width: 160px" placeholder="请选择统计天数">
                <el-option v-for="(type,index) in chartDays"
                           :key="type.value+'_chart_day'"
                           :label="type.label"
                           :value="type.value"></el-option>
              </el-select>
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
          <div class="rank-panel">
            <div style="text-align: left;padding: 24px 24px 16px 32px;font-size: 18px;font-weight: 600">
              套餐排行榜
            </div>
            <div v-for="(item,index) in packRanks" :key="index" style="text-align:left;padding: 12px 32px;">
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
                    <div style="font-size: 16px;font-weight: bold;">{{ item.packName }}</div>
                    <div style="font-size: 14px;font-weight: 500;">总计出售{{ item.payCnt }}单</div>
                  </div>
                  <div>
                    <span style="font-size: 13px;color:orange">总计</span>
                    <span style="font-size: 20px;font-weight: 600;color: orangered">{{ item.payAmt / 100 }}</span>
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
      <div class="pack-panel">
        <div style="display: flex;align-items: center;justify-content: start">
          <permission permit="super" style="margin-right: 16px">
            <el-button plain
                       type="primary"
                       @click="gotoCreate">
              创建套餐
            </el-button>
          </permission>
          <el-button plain type="primary" @click="gotoPrivilege">特权管理</el-button>
        </div>
        <el-table :data="packList"
                  style="width:100%;margin-top: 4px"
                  :row-style="{height:'54px',color:'black'}"
                  :header-cell-style="{color:'#333333',height: '50px'}">
          <el-table-column label="套餐标识" prop="seqNo" width="220px"></el-table-column>
          <el-table-column label="套餐名称" prop="name"></el-table-column>
          <el-table-column label="套餐价格">
            <template v-slot="scope">
              <span>{{ scope.row.price / 100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="折扣价格">
            <template v-slot="scope">
              <span>{{ scope.row.discount / 100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
            <template v-slot="scope">
              <span>{{ unitType[scope.row.timeUnit.value] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="套餐状态">
            <template v-slot="scope">
              <span>{{ scope.row.state.label }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优先级">
            <template v-slot="scope">
              <span>{{ scope.row.priority === 1 ? '推荐套餐' : '一般套餐' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-link :underline="false"
                       type="plain"
                       style="margin-right: 10px"
                       @click="goPackDetail(scope.row.seqNo)">详情
              </el-link>
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       @click="packState({
                     packNo:scope.row.seqNo,
                     state:2,
                     btn:'上架',
                     message:'是否要上架当前套餐'})">上架
              </el-link>
              <el-link :underline="false"
                       type="danger"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===2"
                       @click="packState({
                     packNo:scope.row.seqNo,
                     state:1,
                     btn:'下架',
                     message:'是否要下架当前套餐'})">下架
              </el-link>
              <el-link :underline="false"
                       type="warning"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       @click="packState({
                     packNo:scope.row.seqNo,
                     state:0,
                     btn:'删除',
                     message:'是否要删除当前套餐'})">删除
              </el-link>
              <el-link :underline="false"
                       type="plain"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===0"
                       @click="packState({
                     packNo:scope.row.seqNo,
                     state:1,
                     btn:'撤销',
                     message:'是否要撤销删除当前套餐'})">撤销
              </el-link>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无套餐信息</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {editPack, packCensusChart, packList, packRankMetrics, packTimeMetrics} from "../../api/member-service";
import {unitMap} from "../../libs/pack_time_unit";

const chart_days = [
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
export default {
  name: 'MemberDashboardView',
  data() {
    return {
      chartDays: chart_days,
      unitType: unitMap,
      packList: [],
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
      chartDay: 15,
      chartData: {
        xaxis: [],
        series: {
          'payAmt': [],
          'payCnt': [],
        },
      },
      chart: {
        title: {text: ''},
        settings: {
          showLine: [
            '总金额',
            '总人数'
          ],
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            splitLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
          },
          {
            type: 'value',
            splitNumber: 5,
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
            '总金额',
            '总人数',
          ],
          rows: []
        },
      },
    };
  },
  methods: {
    gotoCreate() {
      this.$router.push('/member/pack/create');
    },
    gotoPrivilege() {
      this.$router.push('/member/pack/privilege');
    },
    goPackDetail(packNo) {
      this.$router.push(`/member/pack/detail/${packNo}`);
    },
    queryPackRanks() {
      packRankMetrics().then(data => this.packRanks = data || []);
    },
    queryTimeMetrics() {
      packTimeMetrics().then(data => this.metrics = data);
    },
    queryPackChart() {
      packCensusChart(this.chartDay).then(data => {
        this.chartData = data;
        this.metricsChart();
      });
    },
    metricsChart() {
      this.chart.title = {text: `${this.chartDay}天会员统计`};
      let xaxis        = this.chartData.xaxis;
      let rows         = [];
      for (let i = 0; i < xaxis.length; i++) {
        rows.push({
          '天': xaxis[i],
          '总金额': this.chartData.series['payAmt'][i] / 100,
          '总人数': this.chartData.series['payCnt'][i],
        });
      }
      this.chart.data.rows = rows;
    },
    queryPackList() {
      packList().then(data => this.packList = data || []);
    },
    packState({
                packNo,
                state,
                btn,
                message
              }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: btn,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editPack({
          packNo: packNo,
          state: state
        }).then(res => {
          this.$message.success(`${btn}成功`);
          this.queryPackList();
        });
      });
    }
  },
  created() {
    this.queryTimeMetrics();
    this.queryPackRanks();
    this.queryPackChart();
    this.queryPackList();
  },
  watch: {
    chartDay(value) {
      this.queryPackChart();
    }
  }
}
</script>

<style scoped>
.dashboard-container {
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

.chart-panel, .rank-panel {
  background-color: white;
  height: 440px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.pack-panel {
  min-height: 320px;
  padding: 24px 48px 32px 48px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.metrics-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #f1f1f1;
}

.pack-panel >>> .el-table::before {
  height: 0 !important;
}
</style>