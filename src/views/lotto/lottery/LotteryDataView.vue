<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="margin: 0 24px 0 0">
      <permission permit="super">
        <div>
          <el-button type="primary" icon="el-icon-refresh" @click="refreshLatest">同步奖号</el-button>
          <el-button type="success" icon="el-icon-download" @click="showLotto=true">批量导入</el-button>
          <el-button v-if="type==='fc3d'||type==='pl3'"
                     type="info"
                     icon="el-icon-download"
                     @click="showTrial=true">试机号
          </el-button>
          <el-button type="success"
                     plain
                     icon="el-icon-download"
                     v-if="type==='pl3'||type==='pl5'"
                     @click="showRange=true">自定义导入
          </el-button>
          <el-button plain @click="initialOmitCalc" v-if="type!=='fc3d'&&type!=='pl3'">号码遗漏</el-button>
          <el-button plain @click="initializeKuaOmit" v-if="type==='pl5'">跨度遗漏</el-button>
          <el-button plain @click="initializeSumOmit" v-if="type==='pl5'">和值遗漏</el-button>
          <el-button plain @click="initializeItem" v-if="type==='pl5'">分位遗漏</el-button>
        </div>
      </permission>
      <div style="margin-top: 16px">
        <permission permit="super" v-if="type==='fc3d'||type==='pl3'">
          <el-button plain @click="initialOmitCalc">号码遗漏</el-button>
          <el-button plain @click="initializeKuaOmit">跨度遗漏</el-button>
          <el-button plain @click="initializeSumOmit">和值遗漏</el-button>
          <el-button plain @click="initializeCode">万能选号</el-button>
          <el-button plain @click="initializeDan">胆码计算</el-button>
          <el-button plain @click="initializeOtt">模3遗漏</el-button>
          <el-button plain @click="initializeTrend">形态遗漏</el-button>
          <el-button plain @click="initializeMatch">对码遗漏</el-button>
          <el-button plain @click="initializeItem">分位遗漏</el-button>
          <el-button plain @click="initializeN3Com">开奖组选</el-button>
          <el-button plain @click="initializeN3Same">历史同号</el-button>
        </permission>
      </div>
      <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 16px">
        <div>
          <span style="margin-right: 12px">星期查询</span>
          <el-select v-model="week" placeholder="请输入查询星期" clearable
                     style="width: 200px">
            <el-option v-for="(item,index) in weeks" :label="item.name" :value="item.value"
                       :key="'week_'+item.value"></el-option>
          </el-select>
        </div>
        <div v-if="newest" style="display: flex;align-items: center">
          <span style="margin-right: 16px;font-size: 20px;">第{{ newest.period }}期</span>
          <ball type="red"
                :value="ball"
                style="margin-right: 6px"
                v-for="(ball,index) in splitBall(newest.red)"
                :key="newest.period+'_'+index+'_'+type+'_r_newest'"></ball>
          <div v-if="newest.blue && newest.blue!==''" style="margin-left: 12px">
            <ball type="blue"
                  :value="ball"
                  v-for="(ball,index) in splitBall(newest.blue)"
                  :key="newest.period+''+index+'_'+type+'_b_newest'"></ball>
          </div>
        </div>
      </div>
      <div style="margin-top: 24px;">
        <el-table stripe
                  :data="lotteries.records"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
          <el-table-column label="开奖期号" width="140px">
            <template v-slot="scope">
              <span>{{ scope.row.lottery.period }}期</span>
            </template>
          </el-table-column>
          <el-table-column label="开奖号码">
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <div style="display: flex;align-items: center;min-width: 120px">
                  <ball type="red"
                        :value="ball"
                        :size="28"
                        v-for="(ball,index) in splitBall(scope.row.lottery.red)"
                        :key="scope.row.lottery.period+'_'+index+'_'+type+'_r_lotto'"></ball>
                </div>
                <div v-if="scope.row.lottery.blue && scope.row.lottery.blue!==''" style="margin-left: 12px">
                  <ball type="blue"
                        :value="ball"
                        :size="28"
                        v-for="(ball,index) in splitBall(scope.row.lottery.blue)"
                        :key="scope.row.lottery.period+''+index+'_'+type+'_b_lotto'"></ball>
                </div>
                <div v-if="(type==='fc3d'||type==='pl3')"
                     style="margin-left: 20px;min-width: 120px">
                  <div style="display: flex;align-items: center"
                       v-if="scope.row.lottery.shi!==null&&scope.row.lottery.shi!==''">
                    <ball type="orange"
                          :value="ball"
                          :size="28"
                          v-for="(ball,index) in splitBall(scope.row.lottery.shi)"
                          :key="scope.row.lottery.period+'_'+index+'_'+type+'_shi_lotto'"></ball>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="历史同号" width="120px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.lottery.last">{{ scope.row.lottery.last }}期</span>
            </template>
          </el-table-column>
          <el-table-column label="历史遗漏" width="100px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.lottery.lastDelta&&scope.row.lottery.lastDelta>0">
                {{ scope.row.lottery.lastDelta }}期</span>
            </template>
          </el-table-column>
          <el-table-column label="两码组合" width="360px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.danZu">{{ scope.row.danZu.zuHeTxt }}
                <span style="margin-left: 12px">{{ scope.row.danZu.dan.join('') }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="进位和差" width="80px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.jinWei">{{ scope.row.jinWei.join(' ') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两码偶合" width="80px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.evenSum">{{ scope.row.evenSum.join(' ') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期胆码" width="100px" v-if="type==='fc3d'||type==='pl3'">
            <template v-slot="scope">
              <span v-if="scope.row.wens">{{ scope.row.wens.weekDan }}</span>
              <span v-if="scope.row.lottery.red" style="font-size: 14px">
                <span v-if="lotteryDanHit(scope.row.lottery.red,scope.row.wens.weekDanTable)"
                      style="margin-left: 4px;color: limegreen">√</span>
                <span v-else style="margin-left: 4px;color: red">×</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="开奖日期" width="120px">
            <template v-slot="scope">
              {{ scope.row.lottery.lotDate }}
            </template>
          </el-table-column>
          <el-table-column label="开奖星期" width="120px">
            <template v-slot="scope">
              <span>{{ getWeekDay(scope.row.lottery.lotDate) }}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无数据</span>
            </div>
          </div>
        </el-table>
      </div>
      <div style="text-align: right;margin-top: 16px">
        <el-pagination
            background
            layout="total,prev,pager,next"
            :current-page.sync="page"
            :page-size="limit"
            :total="lotteries.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="showLotto" width="450px" :before-close="dialogLottoClose">
      <div slot="title" class="title">批量导入开奖号</div>
      <el-form label-width="90px">
        <el-form-item label="导入期数">
          <el-input v-model="batch" placeholder="输入期数(默认30期)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="fetchBatchLotteries">导 入</el-button>
        <el-button size="mini" type="plain" @click="dialogLottoClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showRange" width="450px" :before-close="dialogRangeClose">
      <div slot="title" class="title">自定义导入开奖号</div>
      <el-form ref="fetchRangeForm" label-width="90px" :model="lottoRange" :rules="rules">
        <el-form-item label="开始期号" prop="start">
          <el-input v-model="lottoRange.start" placeholder="请输入开始期号"></el-input>
        </el-form-item>
        <el-form-item label="截止期号" prop="end">
          <el-input v-model="lottoRange.end" placeholder="请输入截止期号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="fetchRangeLotteries">导 入</el-button>
        <el-button size="mini" type="plain" @click="dialogRangeClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showTrial" width="450px" :before-close="dialogTrialClose">
      <div slot="title" class="title">批量导入试机号</div>
      <el-form label-width="90px">
        <el-form-item label="导入期数">
          <el-input v-model="batch" placeholder="输入期数(默认30期)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="fetchLottoTrials">导 入</el-button>
        <el-button size="mini" type="plain" @click="dialogTrialClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  calcItemOmit,
  calcKuaOmit,
  calcMatchOmit,
  calcSumOmit,
  calcTrendOmit,
  fetchLatestLottery,
  fetchLotteries,
  fetchLotteryTrails,
  fetchRangeLotteries,
  initializeOmit,
  initNum3Com,
  initNum3Same,
  lotteryList,
  lottoCodeInit,
  lottoDanInit,
  lottoOttInit,
  newestLottery,
} from "../../../api/lotto-service";
import Ball from "../../../components/lotto/Ball";
import {kua, weekMap, weeks} from "../../../libs/lottery";
import {calcDanHit, calcWensInfo} from "../../../libs/wens_utils";
import {jinWeiDiff} from "../../../libs/jin_wei_utils";
import {calcEvenSum} from "../../../libs/even_sum_utils";
import {lottoDanZu} from "../../../libs/lottery_zuhe";

const weekDays = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];
export default {
  name: "LotteryDataView",
  components: {Ball},
  data() {
    return {
      type: this.$route.query.type,
      page: 1,
      limit: 12,
      week: null,
      newest: null,
      batch: 30,
      showLotto: false,
      showRange: false,
      showTrial: false,
      lottoRange: {
        start: null,
        end: null,
      },
      lotteries: {
        current: 1,
        total: 0,
        records: [],
      },
      rules: {
        start: [
          {
            required: true,
            message: '开始期号不允许为空',
            trigger: 'blur'
          }
        ],
        end: [
          {
            required: true,
            message: '截止期号不允许为空',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  computed: {
    weeks() {
      return weekMap[this.$route.query.type] || weeks;
    }
  },
  methods: {
    kua,
    getWeekDay(dateStr) {
      let date = new Date(dateStr);
      return weekDays[date.getDay()];
    },
    queryLottery() {
      lotteryList({
        week: this.week,
        type: this.type,
        page: this.page,
        limit: this.limit
      }).then(data => {
        this.lotteries = {
          total: data.total,
          current: data.current,
          records: data.records.map((e) => {
            return {
              lottery: e,
              danZu: e.red && (this.type === 'fc3d' || this.type === 'pl3') ? lottoDanZu(e.red) : null,
              evenSum: e.red && (this.type === 'fc3d' || this.type === 'pl3') ? calcEvenSum(e.red) : null,
              jinWei: e.red && (this.type === 'fc3d' || this.type === 'pl3') ?
                  jinWeiDiff(e.red, {shi: true}) :
                  null,
              wens: e.red && (this.type === 'fc3d' || this.type === 'pl3') ? calcWensInfo(e.red, e.lotDate) : null,
            };
          })
        };
      });
    },
    queryNewest() {
      newestLottery(this.type).then(data => this.newest = data);
    },
    splitBall(value) {
      if (value) {
        return value.trim().split(/\s+/);
      }
      return [];
    },
    fetchLottoTrials() {
      fetchLotteryTrails({
        type: this.type,
        size: this.batch
      })
          .then(res => {
            this.$message.success('同步成功');
            this.page = 1;
            this.queryLottery();
            this.dialogTrialClose();
          });
    },
    refreshLatest() {
      fetchLatestLottery(this.type).then(data => {
        this.$message.success('同步成功');
        this.page = 1;
        this.queryNewest();
        this.queryLottery();
      });
    },
    initialOmitCalc() {
      this.$confirm('是否手动初始化选号基本遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        initializeOmit(this.type).then(data => this.$message.success('计算遗漏成功'));
      });
    },
    initializeKuaOmit() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化选号跨度遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcKuaOmit(this.type).then(data => this.$message.success('计算跨度遗漏成功'));
      });
    },
    initializeSumOmit() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化选号和值遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcSumOmit(this.type).then(data => this.$message.success('计算和值遗漏成功'));
      });
    },
    initializeCode() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化万能选号遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        lottoCodeInit(this.type).then(data => this.$message.success('计算万能码遗漏成功'));
      });
    },
    initializeDan() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化胆码推荐遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        lottoDanInit(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeOtt() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化012路遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        lottoOttInit(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeTrend() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化号码形态遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcTrendOmit(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeMatch() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化对码号码遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcMatchOmit(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeItem() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化分位形态遗漏？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcItemOmit(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeN3Com() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化历史号码组选数据？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        initNum3Com(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    initializeN3Same() {
      if (this.type !== 'fc3d' && this.type !== 'pl3') {
        this.$message.error('仅只支持福彩3D和排列三');
        return;
      }
      this.$confirm('是否手动初始化开奖历史同期数据？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        initNum3Same(this.type).then(res => {
          this.$message.success('初始计算成功');
        });
      });
    },
    fetchBatchLotteries() {
      fetchLotteries({
        type: this.type,
        size: this.batch
      })
          .then(res => {
            this.$message.success('同步成功');
            this.page = 1;
            this.queryNewest();
            this.queryLottery();
            this.dialogLottoClose();
          });
    },
    dialogLottoClose() {
      this.batch     = 30;
      this.showLotto = false;
    },
    fetchRangeLotteries() {
      this.$refs.fetchRangeForm.validate(valid => {
        if (!valid) {
          return;
        }
        fetchRangeLotteries(Object.assign({type: this.type}, this.lottoRange)).then(res => {
          this.$message.success('同步成功');
          this.page = 1;
          this.queryNewest();
          this.queryLottery();
          this.dialogRangeClose();
        })
      });
    },
    dialogRangeClose() {
      this.$refs.fetchRangeForm.resetFields();
      this.showRange = false;
      Object.keys(this.lottoRange).filter(key => this.lottoRange[key] = null);
    },
    dialogTrialClose() {
      this.batch     = 30;
      this.showTrial = false;
    },
    lotteryDanHit(lottery, dan) {
      return calcDanHit(lottery, dan);
    },
    danHitIndex(index, dan) {
      if (index === 0) {
        return 1;
      }
      let ball = this.lotteries.records[index - 1].lottery.red;
      if (ball == null || ball.length === 0) {
        return 1;
      }
      return calcDanHit(ball, dan) ? 2 : 3;
    }
  },
  mounted() {
    this.queryNewest();
    this.queryLottery();
  },
  watch: {
    '$route'(to, from) {
      this.type      = to.query.type;
      this.page      = 1;
      this.week      = null;
      this.lotteries = {
        current: 1,
        total: 0,
        records: [],
      };
      this.queryNewest();
      this.queryLottery();
    },
    page(val, old) {
      this.queryLottery();
    },
    week(value) {
      this.page = 1;
      this.queryLottery();
    },
  }
}
</script>

<style scoped>

</style>
