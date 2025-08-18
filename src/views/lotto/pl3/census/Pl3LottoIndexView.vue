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
      <permission permit="super">
        <el-button plain type="primary" @click="showCalc=true">计算指数</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data.records"
                stripe
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '50px'}">
        <el-table-column label="指数期号" prop="period" width="200"></el-table-column>
        <el-table-column label="号码指数">
          <template v-slot="scope">
            <div style="display: flex;align-items: center">
              <span v-for="(item,index) in scope.row.redBall.values" :key="index+'_pl3_index'"
                    style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-right: 20px">
                <Ball :value="item.ball" :size="28"></Ball>
                <span>{{ (item.index * 100).toFixed(0) }}%</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="计算时间" prop="gmtModify" width="200"></el-table-column>
        <el-table-column label="操作" width="240">
          <template v-slot="scope">
            <el-link :underline="false" @click="reCalcLotteryIndex(scope.row)">重新计算</el-link>
            <el-link :underline="false" type="primary" style="margin-left: 12px" @click="showPosterView(scope.row)">
              生成海报
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
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
    <el-dialog :visible.sync="showCalc" width="400px">
      <div slot="title" class="title">付费计算</div>
      <el-input v-model="indexPeriod" placeholder="请输入指数计算期号" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="calcLotteryIndex">提交</el-button>
        <el-button size="small" type="danger" @click="cancelCalcIndex">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {pl3PeriodMixin} from "../../../../mixins/period_pl3_mixin";
import {lotteryIndexes} from "../../../../api/lotto-service";
import {calcPl3Index} from "../../../../api/pl3-service";
import Ball from "../../../../components/lotto/Ball.vue";

export default {
  name: "Pl3LottoIndexView",
  components: {Ball},
  mixins: [pl3PeriodMixin],
  data() {
    return {
      page: 1,
      limit: 8,
      showCalc: false,
      period: null,
      indexPeriod: null,
      showPoster: false,
      selected: null,
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getPl3LottoIndex() {
      lotteryIndexes({
        page: this.page,
        limit: this.limit,
        lottery: 'pl3',
        period: this.period
      }).then(data => this.data = data);
    },
    reCalcLotteryIndex(row) {
      this.$confirm('是否要重新计算选彩指数？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        calcPl3Index(row.period).then(res => {
          this.getPl3LottoIndex();
          this.$message.success('计算成功');
        });
      })
    },
    showPosterView(row) {
      this.selected   = row;
      this.showPoster = true;
    },
    downloadPoster() {
    },
    calcLotteryIndex() {
      calcPl3Index(this.indexPeriod).then(res => {
        this.cancelCalcIndex();
        this.getPl3LottoIndex();
        this.$message.success('计算成功');
      })
    },
    cancelCalcIndex() {
      this.indexPeriod = null;
      this.showCalc    = false;
    },
  },
  mounted() {
    this.getPl3LottoIndex();
  },
  watch: {
    period(value) {
      this.getPl3LottoIndex();
    },
    page(value) {
      this.getPl3LottoIndex();
    }
  }
}
</script>

<style scoped>

</style>