<template>
  <div style="margin: 32px 32px 0 32px">
    <permission permit="super">
      <div class="page-title">预测管理</div>
      <div style="margin: 24px 0;display: flex;align-items: center">
        <el-input size="medium"
                  v-model="period"
                  clearable
                  placeholder="请输入期号"
                  prefix-icon="el-icon-search"
                  style="width: 200px;margin-right: 16px"></el-input>
        <el-button size="medium" icon="el-icon-refresh-left" @click="fetchQlcData">同步数据</el-button>
        <el-button size="medium" icon="el-icon-s-operation" @click="calcQlcHit">命中计算</el-button>
        <el-button type="text" :icon="history?'el-icon-minus':'el-icon-plus'" @click="history=!history">
          历史计算
        </el-button>
        <el-button size="medium" icon="el-icon-refresh-right" v-if="history" @click="fetchHistoryData">历史数据
        </el-button>
        <el-button size="medium" icon="el-icon-refresh-right" v-if="history" @click="incrHistoryData">增量历史
        </el-button>
        <el-button size="medium" icon="el-icon-aim" v-if="history" @click="calcHistoryHit">历史命中</el-button>
        <el-button size="medium" icon="el-icon-aim" v-if="history" @click="incrHistoryHit">增量命中</el-button>
      </div>
    </permission>
    <div class="page-title">预测数据</div>
    <div style="margin-top: 24px;display: flex;align-items: center">
      <el-select size="medium" v-model="query.period" placeholder="请选择期号" clearable
                 style="width:200px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_fsd'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <i-check-radio-group v-model="query.type">
        <i-check-radio :value="item.value"
                       :label="item.label"
                       :key="index+'_cha_fsd'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
      <permission permit="super">
        <el-button plain type="primary" style="margin-left: 12px" @click="toWholeBest">优选专家</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data.records" stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="预测期号" prop="period" width="120px"></el-table-column>
        <el-table-column label="专家名称" width="160px">
          <template v-slot="scope">
            <span>{{ limitName(scope.row.master.name, 6) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近7期" prop="neRate.count" width="100px"></el-table-column>
        <el-table-column label="最近15期" prop="meRate.count" width="100px"></el-table-column>
        <el-table-column label="最近30期" prop="hiRate.count" width="100px"></el-table-column>
        <el-table-column label="上期排名" prop="rank" width="100px"></el-table-column>
        <el-table-column label="热门专家" prop="hot" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.hot===1" style="color: orange;font-size: 14px">热门</span>
            <span v-if="scope.row.hot===0" style="color: grey;font-size: 14px">一般</span>
          </template>
        </el-table-column>
        <el-table-column label="付费专家" prop="vip" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.vip===1" style="color: orange;font-size: 14px">付费</span>
            <span v-if="scope.row.vip===0" style="color: grey;font-size: 14px">免费</span>
          </template>
        </el-table-column>
        <el-table-column label="命中个数" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.data.dataHit!=null">{{ scope.row.data.dataHit }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="预测数据" min-width="360px">
          <template v-slot="scope">
            <span v-if="scope.row.data.hitData">{{ scope.row.data.hitData }}</span>
            <span v-else>{{ scope.row.data.data }}</span>
          </template>
        </el-table-column>
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
  batchCalcHit,
  calcHit,
  fetchForecast,
  fetchIncrHistory,
  fetchQlcHistory,
  incrCalcHit,
  rankedDataList
} from "../../../api/qlc-service";
import {limitName, qlc_channels} from "../../../libs/lottery";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import {qlcPeriodMixin} from "../../../mixins/period_qlc_mixin";

export default {
  name: "QlcDataView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  mixins: [qlcPeriodMixin],
  data() {
    return {
      history: false,
      channels: qlc_channels,
      period: null,
      page: 1,
      limit: 10,
      query: {
        period: null,
        type: 'k3'
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    limitName,
    queryRankedData() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      rankedDataList(condition).then(data => this.data = data);
    },
    fetchQlcData() {
      if (this.period == null || this.period === '') {
        this.$message.warning('请输入同步期号');
        return;
      }
      this.$confirm('是否要手动同步预测数据？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchForecast(this.period).then(res => {
          this.period = null;
          this.$message.success('同步成功');
        })
      });
    },
    calcQlcHit() {
      if (this.period == null || this.period === '') {
        this.$message.warning('请输入计算期号');
        return;
      }
      this.$confirm('是否要手动计算预测数据命中？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        calcHit(this.period).then(res => {
          this.period = null;
          this.$message.success('计算成功');
        })
      });
    },
    calcHistoryHit() {
      this.$confirm('计算历史数据命中非常耗时，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchCalcHit().then(res => {
          this.$message.success('计算成功');
        });
      });
    },
    fetchHistoryData() {
      this.$confirm('是否要手动同步历史预测数据？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchQlcHistory().then(res => {
          this.$message.success('同步成功');
        })
      });
    },
    incrHistoryData() {
      this.$confirm('是否要同步增量专家历史预测数据？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchIncrHistory().then(res => {
          this.$message.success('同步成功');
        });
      });
    },
    incrHistoryHit() {
      this.$confirm('计算增量专家历史数据命中非常耗时，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        incrCalcHit().then(res => {
          this.$message.success('计算成功');
        });
      });
    },
    toWholeBest() {
      this.$router.push('/qlc/data/whole')
    },
  },
  mounted() {
    this.queryRankedData();
  },
  watch: {
    query: {
      deep: true,
      handler(value) {
        this.page = 1;
        this.queryRankedData();
      }
    },
    page(value) {
      this.queryRankedData();
    }
  }
}
</script>

<style scoped>

</style>
