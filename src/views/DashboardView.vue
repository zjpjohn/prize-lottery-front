<template>
  <div class="dashboard-container">
    <div style="text-align: right;">
      <div style="display: inline-block">
        <div class="day-panel">
          <div v-for="(day,index) in dayList"
               :key="day.value+'_day'"
               style="padding: 4px 14px;border-radius: 4px;cursor: pointer;background-color: #f5f5f5"
               :style="{
                 color:day.value===days?'red':'black',
                 marginRight:index<dayList.length-1?'16px':'0'
               }"
               @click="days=day.value">
            <span style="font-size: 13px">{{ day.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="48" type="flex">
      <el-col>
        <div class="total-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">用户</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 18px;font-weight: 500;margin-right: 12px">总用户</span>
            <span style="font-size: 30px;font-weight: 600;">{{ user.total }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div style="width:100%; display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">{{ daysText }}新增</div>
            <div>
              <span style="font-size: 16px;font-weight: 600">{{ user.increment }}</span>
              <span style="font-size: 15px;font-weight: 500">人</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="total-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">应用</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 18px;font-weight: 500;margin-right: 12px">总启动</span>
            <span style="font-size: 30px;font-weight: 600;">{{ launch.total }}</span>
            <span style="font-size: 18px;font-weight: 600">次</span>
          </div>
          <div style="width:100%; display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">{{ daysText }}总活跃</div>
            <div>
              <span style="font-size: 16px;font-weight: 600">{{ launch.active }}</span>
              <span style="font-size: 15px;font-weight: 500">人</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="total-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">会员</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 18px;font-weight: 500;margin-right: 12px">总人数</span>
            <span style="font-size: 30px;font-weight: 600;">{{ member.totalUser }}</span>
            <span style="font-size: 18px;font-weight: 600">人</span>
          </div>
          <div style="width:100%; display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">{{ daysText }}新增量</div>
            <div>
              <span style="font-size: 16px;font-weight: 600">{{ member.timeUser }}</span>
              <span style="font-size: 15px;font-weight: 500">人</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="total-panel">
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div style="font-size: 17px;font-weight:bold;">收益</div>
          </div>
          <el-divider></el-divider>
          <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
            <span style="font-size: 18px;font-weight: 500;margin-right: 12px">总金额</span>
            <span style="font-size: 30px;font-weight: 600;">{{ parseInt(member.totalPayed) / 100 }}</span>
            <span style="font-size: 18px;font-weight: 600">元</span>
          </div>
          <div style="width:100%; display: flex;align-items: center;justify-content: space-between;">
            <div style="font-size: 16px;">{{ daysText }}新增</div>
            <div>
              <span style="font-size: 16px;font-weight: 600">{{ parseInt(member.timePayed) / 100 }}</span>
              <span style="font-size: 15px;font-weight: 500">元</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 48px;width: 100%">
      <el-row :gutter="48" type="flex">
        <el-col :span="18">
          <div class="advert-panel">
            <div style="padding: 24px">
              <div style="font-size: 18px;font-weight: 600">{{ memberChart.title.text }}</div>
            </div>
            <div style="text-align: center">
              <ve-line ref="memberCharts"
                       :judge-width="true"
                       :data="memberChart.data"
                       :yAxis="memberChart.yAxis"
                       :xAxis="memberChart.xAxis"
                       :tooltip="memberChart.extend.tooltip"
                       height="370px"
                       :settings="memberChart.settings"
                       :mark-point="memberChart.markPoint"></ve-line>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="advert-panel">
            <div style="text-align: left;padding: 24px 20px 20px 24px;font-size: 18px;font-weight: 600">会员售卖排行榜
            </div>
            <div v-for="(item,index) in packRanks" :key="index" style="text-align:left;padding: 12px 32px;">
              <div style="display: flex;align-items: center;justify-content: start;">
                <div style="margin-right: 10px">
                  <img :src="require(`../assets/images/rank${index+1}.png`)"
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
    <div style="margin-top: 48px;width: 100%">
      <div class="pack-panel">
        <div style="padding: 20px 24px;font-size: 18px;font-weight: 600">套餐收益占比</div>
        <div v-if="packMetrics.packs.length>0"
             style="padding:0 48px;display: flex;align-items: center;justify-content: space-between">
          <div v-for="(item,index) in packMetrics.packs"
               :key="item.packNo"
               style="display: flex;align-items: center">
            <circle-progressbar style="overflow: hidden;height: 100px;"
                                :barColor="colors[index]"
                                :id="index"
                                backgroundColor="rgba(0,0,0,0.05)"
                                :width="100" :radius="15" :isAnimation="true"
                                :progress="Math.floor(item.successAmt*100.0/packMetrics.total)">
              <div style="font-size: 17px;font-weight: bold;" :style="{color:colors[index]}">
                {{ Math.floor(item.successAmt * 100.0 / packMetrics.total) }}%
              </div>
            </circle-progressbar>
            <div style="margin-left: 24px">
              <span style="font-size: 15px;color: #333333;font-weight: bold">{{ item.packName }}</span>
              <div style="color: black;display:flex;align-items: center;margin-top: 8px">
                <span style="font-size: 24px;font-weight: 600">{{ item.successAmt / 100 }}</span>
                <span style="font-size: 15px;font-weight: 500;">元</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else
             style="padding:0 48px;display: flex;align-items: center;justify-content: center">
          <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
            <img src="../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 16px">
            <span style="color: #909399;font-size: 14px">暂无会员套餐信息</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 48px 0;">
      <div class="member-panel">
        <el-table stripe :data="userMembers"
                  style="width: 100%"
                  :row-style="{height:'56px'}"
                  :header-cell-style="{color:'#333',height: '56px'}">
          <el-table-column label="用户标识" prop="userId"></el-table-column>
          <el-table-column label="手机号" prop="phone"></el-table-column>
          <el-table-column label="用户昵称" prop="nickname"></el-table-column>
          <el-table-column label="会员状态" prop="state.label"></el-table-column>
          <el-table-column label="累计开通" prop="times"></el-table-column>
          <el-table-column label="过期截止" prop="expireAt" width="180px"></el-table-column>
          <el-table-column label="上次过期" prop="lastExpire" width="180px"></el-table-column>
          <el-table-column label="最新开通" prop="renewTime" width="180px"></el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无会员信息</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {memberTotal, totalUserMetrics} from "../api/user-service";
import circleProgressbar from 'vue-circleprogressbar'
import {memberList, packCensusChart, packRankMetrics} from "../api/member-service";

const dayList   = [
  {
    name: '本周',
    value: 7
  },
  {
    name: '月度',
    value: 30
  },
  {
    name: '季度',
    value: 90
  }
];
const colorList = [
  '#c479a2',
  '#f48f7b',
  '#88c898',
  '#8495b1',
  '#bab0b0',
];
export default {
  name: "DashboardView",
  components: {circleProgressbar},
  data() {
    return {
      colors: colorList,
      dayList: dayList,
      days: 7,
      user: {
        total: 0,
        increment: 0,
      },
      launch: {
        total: 0,
        active: 0,
      },
      member: {
        totalUser: 0,
        timeUser: 0,
        totalPayed: 0,
        timePayed: 0,
      },
      chartData: {
        xaxis: [],
        series: {
          'payAmt': [],
          'payCnt': [],
        },
      },
      memberChart: {
        title: {text: '会员收益趋势'},
        settings: {
          area: true,
          showLine: [
            '总金额',
            '总人数',
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
      packRanks: [],
      packMetrics: {
        total: 0,
        packs: [],
      },
      userMembers: [],
    };
  },
  computed: {
    daysText() {
      return dayList.filter(e => e.value === this.days)[0].name;
    },
  },
  methods: {
    queryMemberTotal() {
      memberTotal(this.days).then(data => this.member = data);
    },
    queryUserMetrics() {
      totalUserMetrics(this.days).then(data => {
        this.user.total     = data.totalUser;
        this.user.increment = data.totalIncr;
        this.launch.total   = data.totalLaunch;
        this.launch.active  = data.totalActive;
      });
    },
    queryMemberChart() {
      packCensusChart(15).then(data => {
        this.chartData = data;
        this.metricsChart();
      });
    },
    metricsChart() {
      let xaxis = this.chartData.xaxis;
      let rows  = [];
      for (let i = 0; i < xaxis.length; i++) {
        rows.push({
          '天': xaxis[i],
          '总金额': this.chartData.series['payAmt'][i] / 100,
          '总人数': this.chartData.series['payCnt'][i],
        });
      }
      this.memberChart.data.rows = rows;
    },
    queryPackRanks() {
      packRankMetrics().then(data => {
        this.packRanks = data || [];
        if (data !== null && data.length > 0) {
          let total = 0;
          let items = [];
          for (const index in data) {
            total += parseInt(data[index].payAmt);
            items.push({
              packNo: data[index].packNo,
              packName: data[index].packName,
              successAmt: parseInt(data[index].payAmt),
            });
          }
          this.packMetrics.packs = items;
          this.packMetrics.total = total > 0 ? total : 1.0;
        }
      });
    },
    queryMemberList() {
      memberList({
        page: 1,
        limit: 5
      }).then(data => this.userMembers = data.records || []);
    }
  },
  mounted() {
    this.queryMemberTotal();
    this.queryUserMetrics();
    this.queryPackRanks();
    this.queryMemberChart();
    this.queryMemberList();
    this.$nextTick(() => {
      this.$refs.memberCharts.resize();
    });
  },
  watch: {
    days(value) {
      this.queryUserMetrics();
      this.queryMemberTotal();
    }
  }
}
</script>

<style scoped>

.dashboard-container {
  text-align: center;
  padding: 32px 80px 48px 80px;
}

.day-panel {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.total-panel {
  position: relative;
  padding: 28px 24px 28px 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.total-panel .total-header {
  position: absolute;
  top: -4px;
  left: -4px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  padding: 5px 12px;
  text-align: center;
  border-radius: 8px 0 8px 0;
}

.total-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #f1f1f1;
}

.advert-panel {
  background-color: white;
  height: 420px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.pack-panel {
  text-align: left;
  background-color: white;
  height: 200px;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.pack-panel >>> .content {
  position: relative;
}

.pack-panel >>> .center_text {
  width: 100px;
  text-align: center;
  position: absolute;
  top: 40px;
}

.member-panel {
  min-height: 300px;
  padding: 8px 48px 32px 48px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f4f4f4 0 0 20px 2px;
}

.transfer-panel >>> .el-table::before {
  height: 0 !important;
}

</style>
