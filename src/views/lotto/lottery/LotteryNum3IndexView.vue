<template>
  <div>
    <div>
      <el-select v-model="period" clearable placeholder="选择预测期号"
                 style="width: 200px;margin-right: 12px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_o'"
                   :value="item"
                   :label="'第'+item+'期'"></el-option>
      </el-select>
      <el-button plain type="primary" @click="calcNewIndex">计算指数</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data.records"
                stripe
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="指数期号" prop="period" width="140px"></el-table-column>
        <el-table-column label="胆码指数">
          <template v-slot="scope">
            <div style="display: flex;align-items: center">
              <span v-for="(item,index) in scope.row.danIndex.values" :key="index+'_fsd_index'"
                    style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-right: 4px">
                <Ball :value="item.ball" :size="24" :font-size="14"></Ball>
                <span>{{ (item.index * 100).toFixed(0) }}%</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="杀码指数">
          <template v-slot="scope">
            <div style="display: flex;align-items: center">
              <span v-for="(item,index) in scope.row.killIndex.values" :key="index+'_fsd_index'"
                    style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-right: 4px">
                <Ball :value="item.ball" :size="24" :font-size="14"></Ball>
                <span>{{ (item.index * 100).toFixed(0) }}%</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="组选指数">
          <template v-slot="scope">
            <div style="display: flex;align-items: center">
              <span v-for="(item,index) in scope.row.comIndex.values" :key="index+'_fsd_index'"
                    style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-right: 4px">
                <Ball :value="item.ball" :size="24" :font-size="14"></Ball>
                <span>{{ (item.index * 100).toFixed(0) }}%</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <el-link :underline="false" @click="calcIndex(scope.row.period)">重新计算</el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无选彩指数</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="data.total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {calcNum3Index, lotteryPeriods, num3LottoIndex} from "../../../api/lotto-service";
import Ball from "../../../components/lotto/Ball.vue";

export default {
  name: "LotteryNum3IndexView",
  components: {Ball},
  data() {
    return {
      page: 1,
      limit: 8,
      type: this.$route.query.type,
      period: null,
      periods: [],
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryPeriod() {
      lotteryPeriods(this.type, 100).then(data => this.periods = data || []);
    },
    getNum3Index() {
      num3LottoIndex({
        type: this.type,
        page: this.page,
        limit: this.limit
      }).then(data => this.data = data);
    },
    calcNewIndex() {
      if (this.period == null) {
        this.$message.error('请选择计算期号');
        return;
      }
      this.calcIndex(this.period);
    },
    calcIndex(period) {
      this.$confirm('是否要计算选彩指数？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        calcNum3Index(this.type, period).then(res => {
          this.getNum3Index();
          this.$message.success('计算成功');
        });
      });
    }
  },
  mounted() {
    this.getNum3Index();
    this.queryPeriod();
  },
  watch: {
    page(_) {
      this.getNum3Index();
    }
  },
}
</script>

<style scoped>

</style>