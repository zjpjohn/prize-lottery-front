<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 16px">第一胆码</span>
      <el-select clearable v-model="query.best" placeholder="第一胆码命中过滤" style="width: 180px">
        <el-option label="命中" value="1"></el-option>
        <el-option label="未命中" value="0"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">第二胆码</span>
      <el-select clearable v-model="query.second" placeholder="第二胆码命中过滤" style="width: 180px">
        <el-option label="命中" value="1"></el-option>
        <el-option label="未命中" value="0"></el-option>
      </el-select>
      <el-button plain type="primary" style="margin-left: 12px" @click="routeToFilter">要点计算</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe :data="data.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="期号" prop="period"></el-table-column>
        <el-table-column label="首要关注">
          <template v-slot="scope">
            <span v-if="scope.row.best.hitData">{{ scope.row.best.hitData }}</span>
            <span v-else>{{ scope.row.best.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重点关注">
          <template v-slot="scope">
            <span v-if="scope.row.second.hitData">{{ scope.row.second.hitData }}</span>
            <span v-else>{{ scope.row.second.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优质号码">
          <template v-slot="scope">
            <span v-if="scope.row.quality.hitData">{{ scope.row.quality.hitData }}</span>
            <span v-else>{{ scope.row.quality.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改次数" prop="edits" width="120px"></el-table-column>
        <el-table-column label="计算时间" prop="calcTime"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="最新修改" prop="gmtModify"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false" type="primary" @click="routeToDetail(scope.row)">详情</el-link>
            <el-link :underline="false"
                     type="success"
                     style="margin-left: 8px"
                     v-if="!scope.row.calcTime"
                     @click="calcPivotHit(scope.row.period)">
              计算
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无要点数据</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="data.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {calcPl3PivotHit, pl3PivotList} from "../../../../api/pl3-service";

export default {
  name: "Pl3PivotListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        best: null,
        second: null,
      },
      data: {
        current: 1,
        total: 1,
        records: [],
      },
    };
  },
  methods: {
    queryPivotList() {
      let params = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      pl3PivotList(params).then(data => this.data = data);
    },
    routeToDetail(data) {
      this.$router.push(`/pls/data/pivot/detail/${data.id}/${data.period}`);
    },
    routeToFilter() {
      this.$router.push('/pls/data/pivot/filter');
    },
    calcPivotHit(period) {
      this.$confirm('是否手动计算命中信息？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcPl3PivotHit(period).then(res => {
          this.queryPivotList();
          this.$message.success('计算成功');
        });
      });
    }
  },
  mounted() {
    this.queryPivotList();
  },
  watch: {
    page(value) {
      this.queryPivotList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryPivotList();
      }
    }
  }
}
</script>

<style scoped>

</style>