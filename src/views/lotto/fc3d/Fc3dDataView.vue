<template>
  <div style="margin:32px 32px 0 32px">
    <permission permit="super">
      <div class="page-title">预测管理</div>
      <div style="margin: 24px 0;display: flex;align-items: center">
        <el-input size="medium"
                  v-model="period"
                  clearable
                  placeholder="请输入期号"
                  prefix-icon="el-icon-search"
                  style="width: 160px;margin-right: 16px"></el-input>
        <el-button size="medium" icon="el-icon-refresh-left" @click="fetchFc3dData">同步数据</el-button>
        <el-button size="medium" icon="el-icon-s-operation" @click="calcFc3dHit">命中计算</el-button>
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
                 style="width:160px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_fsd'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <el-select size="medium" v-model="query.mark" placeholder="是否标记" clearable
                 style="width:130px;margin-right: 16px">
        <el-option label="已标记" :value="1"></el-option>
        <el-option label="未标记" :value="0"></el-option>
      </el-select>
      <i-check-radio-group v-model="query.type">
        <i-check-radio :value="item.value"
                       :label="item.label"
                       :key="index+'_cha_fsd'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
      <el-button plain type="primary" @click="toItemForecast">分类预测</el-button>
      <el-button plain type="primary" @click="toDanFilter">胆码过滤</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data.records" stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="专家名称" width="180px">
          <template v-slot="scope">
            <span>{{ limitName(scope.row.master.name, 6) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近7期" prop="neRate.count"></el-table-column>
        <el-table-column label="最近15期" prop="meRate.count"></el-table-column>
        <el-table-column label="最近30期" prop="hiRate.count"></el-table-column>
        <el-table-column label="上期排名" prop="rank"></el-table-column>
        <el-table-column label="热门专家" prop="hot">
          <template v-slot="scope">
            <span v-if="scope.row.hot===1" style="color: orange;font-size: 14px">热门</span>
            <span v-if="scope.row.hot===0" style="color: grey;font-size: 14px">一般</span>
          </template>
        </el-table-column>
        <el-table-column label="付费专家" prop="vip">
          <template v-slot="scope">
            <span v-if="scope.row.vip===1" style="color: orange;font-size: 14px">付费</span>
            <span v-if="scope.row.vip===0" style="color: grey;font-size: 14px">免费</span>
          </template>
        </el-table-column>
        <el-table-column label="杀码数据" width="100px">
          <template v-slot="scope">
            <div v-if="scope.row.kill1">
              <span v-if="scope.row.kill1.hitData">{{ scope.row.kill1.hitData }}</span>
              <span v-else>{{ scope.row.kill1.data }}</span>
            </div>
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
  batchCalcFc3dHit,
  calcFc3dHit,
  fetchFc3dForecast,
  fetchFc3dHistory,
  fetchIncrHistory,
  getFc3dRankedDatas,
  incrCalcHit,
} from "../../../api/fc3d-service";

import {fsd_channels, limitName} from "../../../libs/lottery";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import {fc3dPeriodMixin} from "../../../mixins/period_fc3d_mixin";

export default {
  name: "Fc3dDataView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      period: null,
      history: false,
      page: 1,
      limit: 10,
      channels: fsd_channels,
      query: {
        period: null,
        mark: null,
        type: 'd3',
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
      getFc3dRankedDatas(condition).then(data => this.data = data);
    },
    fetchFc3dData() {
      if (this.period == null || this.period === '') {
        this.$message.warning('请输入同步期号');
        return;
      }
      this.$confirm('是否要手动同步预测数据？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchFc3dForecast(this.period).then(res => {
          this.period = null;
          this.$message.success('同步成功');
        })
      });
    },
    fetchHistoryData() {
      this.$confirm('是否要同步历史预测数据？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchFc3dHistory().then(res => {
          this.$message.success('同步成功');
        });
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
    calcFc3dHit() {
      if (this.period == null || this.period === '') {
        this.$message.warning('请输入计算期号');
        return;
      }
      this.$confirm('是否要手动计算预测数据命中？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        calcFc3dHit(this.period).then(res => {
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
        batchCalcFc3dHit().then(res => {
          this.$message.success('计算成功');
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
    toItemForecast() {
      this.$router.push('/fsd/data/item');
    },
    toDanFilter() {
      this.$router.push('/fsd/data/dan/filter');
    },
  },
  mounted() {
    this.queryRankedData();
  },
  watch: {
    query: {
      deep: true,
      handler(val, old) {
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
