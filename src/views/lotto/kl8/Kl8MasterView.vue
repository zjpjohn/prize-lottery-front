<template>
  <div style="margin: 32px 32px 0 32px">
    <permission permit="super">
      <div style="margin-top: 24px">
        <el-input v-model="period" placeholder="请输入计算期号" clearable
                  style="width: 160px;margin-right: 12px"></el-input>
        <el-button @click="vipMaster">付费计算</el-button>
        <el-button @click="rankMaster">排名计算</el-button>
        <el-button @click="rateMaster">成绩排名</el-button>
        <el-button type="text" :icon="history?'el-icon-minus':'el-icon-plus'" @click="history=!history">
          历史计算
        </el-button>
        <el-button v-if="history" @click="initRankMaster">历史排名</el-button>
        <el-button v-if="history" @click="initRateMaster">初始成绩</el-button>
      </div>
    </permission>
    <div style="margin-top:32px;display: flex;align-items: start;width: 98%">
      <el-select v-model="query.period" placeholder="预测排名期号" clearable
                 style="width: 236px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_kl8'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <i-check-radio-group v-model="query.type">
        <i-check-checkbox v-model="query.vip" label="付费" size="small"></i-check-checkbox>
        <i-check-checkbox v-model="query.hot" label="热门" size="small"></i-check-checkbox>
        <i-check-radio :label="item.label"
                       :value="item.value"
                       :key="index+'_k_s_m'"
                       size="small"
                       style="margin-bottom: 16px"
                       v-for="(item,index) in channels">
        </i-check-radio>
      </i-check-radio-group>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="data.records"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="master.masterId" width="180px"></el-table-column>
        <el-table-column label="名称" prop="master.name" width="180px"></el-table-column>
        <el-table-column label="头像" width="160px">
          <template v-slot="scope">
            <img :src="scope.row.master.avatar" style="width: 28px;height: 28px" alt="">
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
  calcRank,
  calcRate,
  initCalcRank,
  initCalcRate,
  kl8LottoMasters,
  latestRankPeriod
} from "../../../api/kl8-service";
import {lastFsdPeriod} from "../../../libs/period";
import {kl8_channels} from "../../../libs/lottery";
import ICheckCheckbox from "../../../components/icheck/ICheckCheckbox";
import ICheckRadioGroup from '../../../components/icheck/ICheckRadioGroup'
import ICheckRadio from '../../../components/icheck/ICheckRadio'

export default {
  name: "Kl8MasterView",
  components: {
    ICheckCheckbox,
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      channels: kl8_channels,
      history: false,
      period: null,
      periods: [],
      page: 1,
      limit: 10,
      query: {
        period: null,
        type: 'd10',
        hot: null,
        vip: null,
      },
      data: {
        total: 0,
        current: 1,
        records: [],
      },
    };
  },
  methods: {
    queryKl8Masters() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      kl8LottoMasters(condition).then(data => this.data = data);
    },
    rankKl8Period() {
      latestRankPeriod().then(period => {
        if (period) {
          for (let i = 0; i < 10; i++) {
            this.periods.push(lastFsdPeriod(period, i));
          }
        }
      })
    },
    initRankMaster() {
      this.$confirm('初始化计算专家排名非常耗时，是否继续', '重要提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        initCalcRank().then(res => {
          this.$message.success('计算成功');
        });
      })
    },
    initRateMaster() {
      this.$confirm('初始化计算预测专家命中率非常耗时，是否继续？', '重要提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        initCalcRate().then(res => {
          this.$message.success('计算成功');
        })
      });
    },
    vipMaster() {

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
      });
    },
  },
  mounted() {
    this.rankKl8Period();
    this.queryKl8Masters();
  },
  watch: {
    query: {
      deep: true,
      handler(value, old) {
        this.queryKl8Masters();
      }
    },
    page(value) {
      this.queryKl8Masters();
    }
  },
}
</script>

<style scoped>

</style>
