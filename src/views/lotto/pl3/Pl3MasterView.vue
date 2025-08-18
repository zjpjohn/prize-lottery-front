<template>
  <div style="margin: 32px 32px 0 32px">
    <div class="page-title">专家管理</div>
    <permission permit="super">
      <div style="margin-top: 24px">
        <el-input v-model="period" placeholder="请输入计算期号" clearable
                  style="width: 160px;margin-right: 12px"></el-input>
        <el-button plain @click="homeMaster">首页提取</el-button>
        <el-button plain @click="vipMaster">付费提取</el-button>
        <el-button plain @click="rankMaster">排名计算</el-button>
        <el-button plain @click="rateMaster">成绩计算</el-button>
        <el-button type="text" :icon="history?'el-icon-minus':'el-icon-plus'" @click="history=!history">历史计算
        </el-button>
        <el-button v-if="history" @click="initRankMaster">历史排名</el-button>
        <el-button v-if="history" @click="initRateMaster">初始成绩</el-button>
        <el-button v-if="history" @click="incrRateMaster">增量成绩</el-button>
        <el-button v-if="history" @click="loadTypeMaster">导入专家</el-button>
      </div>
    </permission>
    <div style="margin-top: 32px;display: flex;align-items: center">
      <el-select v-model="query.period" placeholder="预测排名期号" clearable
                 style="width: 160px;margin-right: 16px">
        <el-option v-for="(item,index) in periodList"
                   :key="index+'_p_s_fsd'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <i-check-checkbox v-model="query.vip" label="付费" size="small"></i-check-checkbox>
      <i-check-checkbox v-model="query.hot" label="热门" size="small"></i-check-checkbox>
      <i-check-radio-group v-model="query.type">
        <i-check-radio :value="item.value"
                       :label="item.label"
                       :key="index+'_f_s_c'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
    </div>
    <div style="margin-top: 24px">
      <el-table :data="data.records" stripe
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="master.masterId" width="180px"></el-table-column>
        <el-table-column label="名称" prop="master.name" width="240px"></el-table-column>
        <el-table-column label="头像">
          <template v-slot="scope">
            <img :src="scope.row.master.avatar+'?x-oss-process=image/resize,w_24'"
                 style="width: 24px;height: 24px" alt="">
          </template>
        </el-table-column>
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="综合排名" prop="rank"></el-table-column>
        <el-table-column label="单项排名" prop="irank"></el-table-column>
        <el-table-column label="上期排名" prop="lastIRank">
          <template v-slot="scope">
            <span v-if="scope.row.lastIRank">{{ scope.row.lastIRank }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="首页(是/否)">
          <template v-slot="scope">
            <span v-if="scope.row.homed===1" style="color: #409EFF">是</span>
            <span v-if="scope.row.homed===0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="热门(是/否)">
          <template v-slot="scope">
            <span v-if="scope.row.hot===1" style="color: #409EFF">是</span>
            <span v-if="scope.row.hot===0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="付费(是/否)" prop="vip">
          <template v-slot="scope">
            <span v-if="scope.row.vip===1" style="color: #409EFF">付费</span>
            <span v-if="scope.row.vip===0">免费</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" prop="source"></el-table-column>
        <el-table-column label="浏览量" prop="browse"></el-table-column>
        <el-table-column label="订阅量" prop="subscribe"></el-table-column>
        <el-table-column label="预测成绩" prop="hit.count"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
      <div style="margin-top: 16px">
        <el-pagination
            background
            layout="total,prev,pager,next"
            :current-page.sync="page"
            :page-size="limit"
            :total="data.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  batchCalcRank,
  batchCalcRate,
  calcRank,
  calcRate,
  extractHome,
  extractVip,
  incrCalcRate,
  latestRank,
  lotteryMasters
} from "../../../api/pl3-service";
import {lastPlsPeriod} from "../../../libs/period";
import {pls_channels} from "../../../libs/lottery";
import ICheckCheckbox from "../../../components/icheck/ICheckCheckbox";
import ICheckCheckboxGroup from "../../../components/icheck/ICheckCheckboxGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import {initLoadMaster} from "../../../api/master-service";

export default {
  name: "Pl3MasterView",
  components: {
    ICheckCheckbox,
    ICheckCheckboxGroup,
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      period: null,
      history: false,
      channels: pls_channels,
      periodList: [],
      page: 1,
      limit: 10,
      query: {
        period: null,
        type: 'd3',
        hot: null,
        vip: null,
      },
      data: {
        current: 1,
        total: 1,
        records: [],
      },
    };
  },
  methods: {
    queryPl3Master() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      lotteryMasters(condition).then(data => this.data = data);
    },
    rankPeriod() {
      latestRank().then(period => {
        if (period) {
          for (let i = 0; i < 10; i++) {
            this.periodList.push(lastPlsPeriod(period, i));
          }
        }
      })
    },
    homeMaster() {
      extractHome(this.period).then(res => {
        this.period = null;
        this.$message.success('计算成功');
      })
    },
    vipMaster() {
      extractVip(this.period).then(res => {
        this.period = null;
        this.$message.success('计算成功');
      })
    },
    rankMaster() {
      calcRank(this.period).then(res => {
        this.period = null;
        this.$message.success('计算成功');
      })
    },
    rateMaster() {
      calcRate(this.period).then(res => {
        this.period = null;
        this.$message.success('计算成功');
      })
    },
    initRankMaster() {
      this.$confirm('初始化计算专家排名非常耗时，是否继续', '重要提示',
          {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            batchCalcRank().then(res => {
              this.$message.success('计算成功');
            })
          })
    },
    initRateMaster() {
      this.$confirm('初始化计算专家预测命中率非常耗时，是否继续', '重要提示',
          {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            batchCalcRate().then(res => {
              this.$message.success('计算成功');
            })
          });
    },
    incrRateMaster() {
      this.$confirm('增量计算专家历史预测命中率非常耗时，是否继续', '重要提示',
          {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            incrCalcRate().then(res => {
              this.$message.success('计算成功');
            })
          });
    },
    loadTypeMaster() {
      this.$confirm('导入平台预测专家操作非常耗时，是否继续？', '重要提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        initLoadMaster('pl3').then(res => {
          this.$message.success('导入成功');
        })
      });
    },
  },
  mounted() {
    this.rankPeriod();
    this.queryPl3Master();
  },
  watch: {
    query: {
      deep: true,
      handler(value, old) {
        this.page = 1;
        this.queryPl3Master();
      }
    },
    page(value) {
      this.queryPl3Master();
    }
  },
}
</script>

<style scoped>

</style>
