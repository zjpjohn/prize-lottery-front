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
                  style="width: 160px;margin-right: 16px"></el-input>
        <el-button size="medium" icon="el-icon-refresh-left" @click="fetchKl8dData">同步数据</el-button>
        <el-button size="medium" icon="el-icon-s-operation" @click="calcKl8Hit">命中计算</el-button>
        <el-button type="text" :icon="history?'el-icon-minus':'el-icon-plus'" @click="history=!history">
          历史计算
        </el-button>
        <el-button size="medium" icon="el-icon-refresh-right" v-if="history" @click="showLast=true">历史数据
        </el-button>
        <el-button size="medium" icon="el-icon-aim" v-if="history" @click="calcHistoryHit">历史命中</el-button>
      </div>
    </permission>
    <div class="page-title">预测数据</div>
    <div style="margin-top: 24px;display: flex;align-items: start;width: 90%">
      <el-select size="medium" v-model="query.period" placeholder="请选择期号" clearable
                 style="width:240px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_kl8'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <i-check-radio-group v-model="query.type">
        <i-check-radio :value="item.value"
                       :key="index+'_cha_kl8'"
                       :label="item.label"
                       size="small"
                       style="margin-bottom: 12px"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="data.records"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="专家名称" prop="master.name" width="240px"></el-table-column>
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
    <el-dialog :visible.sync="showLast" width="520px">
      <div slot="title" class="title">同步历史预测数据</div>
      <el-form :model="lastDto" ref="lastFetchForm" :rules="rules" label-width="80px">
        <el-form-item label="最大期号" prop="before">
          <el-input v-model="lastDto.before" placeholder="请输入最大期号"></el-input>
        </el-form-item>
        <el-form-item label="同步期数" prop="size">
          <el-input v-model.number="lastDto.size" placeholder="请输入同步期数"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="fetchHistoryData">提交</el-button>
        <el-button size="small" type="danger" @click="clearLastFetch">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {kl8PeriodMixin} from "../../../mixins/period_kl8_mixin";
import {kl8_channels} from "../../../libs/lottery";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import {calcHit, fetchForecast, fetchLast, initCalcHit, rankDataList} from "../../../api/kl8-service";

export default {
  name: "kl8DataView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  mixins: [kl8PeriodMixin],
  data() {
    return {
      channels: kl8_channels,
      period: null,
      history: false,
      showLast: false,
      page: 1,
      limit: 10,
      query: {
        period: null,
        type: 'd3',
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
      lastDto: {
        before: null,
        size: null,
      },
      rules: {
        before: [
          {
            required: true,
            message: '最大期号为空',
            trigger: 'blur'
          }
        ],
        size: [
          {
            required: true,
            message: '抓取期数为空',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '输入必须为数字',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    queryRankedData() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      rankDataList(condition).then(data => this.data = data);
    },
    fetchKl8dData() {
      if (this.period == null) {
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
    calcKl8Hit() {
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
        initCalcHit().then(res => {
          this.$message.success('计算成功');
        });
      });
    },
    fetchHistoryData() {
      this.$refs.lastFetchForm.validate(valid => {
        if (!valid) {
          return;
        }
        fetchLast(this.lastDto).then(res => {
          this.$message.success('同步成功');
          this.clearLastFetch();
        })
      });
    },
    clearLastFetch() {
      this.$refs.lastFetchForm.resetFields();
      Object.keys(this.lastDto).forEach(key => this.lastDto[key] = null);
      this.showLast = false;
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
