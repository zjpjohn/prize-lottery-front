<template>
  <div style="margin: 32px 32px 0 32px;">
    <el-descriptions title="要点信息" :column="6">
      <el-descriptions-item label="预测期号">
          <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.period }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="第一胆码">
          <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.best.dataHit != null ? pivot.best.hitData : pivot.best.data }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="第二胆码">
          <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.second.dataHit != null ? pivot.second.hitData : pivot.second.data }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="优质选号">
            <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.quality.dataHit != null ? pivot.quality.hitData : pivot.quality.data }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="最新修改">
            <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.gmtModify }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="命中计算">
            <span style="font-weight: bold;color: #333333" v-if="pivot">
            {{ pivot.calcTime }}
          </span>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px">
      <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">浏览记录</div>
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '48px'}">
        <el-table-column label="浏览编号" prop="seqNo"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="彩种类型">
          <template v-slot="scope">
            <span>{{ scope.row.type.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览类型">
          <template v-slot="scope">
            <span>{{ scope.row.source.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无使用记录</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="list.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {browseList} from "../../../../api/lotto-service";
import {fsdPivot} from "../../../../api/fc3d-service";

export default {
  name: "Fc3dPivotDetailView",
  data() {
    return {
      pivot: null,
      page: 1,
      limit: 10,
      list: {
        current: 1,
        total: 1,
        records: [],
      },
    };
  },
  methods: {
    queryPivotDetail() {
      fsdPivot(this.$route.params.id).then(data => this.pivot = data);
    },
    queryBrowseRecords() {
      browseList({
        page: this.page,
        limit: this.limit,
        source: 10,
        type: 'fc3d',
        sourceId: this.$route.params.id,
        period: this.$route.params.period,
      }).then(data => this.list = data);
    }
  },
  mounted() {
    this.queryPivotDetail();
    this.queryBrowseRecords();
  },
  watch: {
    page(value) {
      this.queryBrowseRecords();
    }
  }
}
</script>

<style scoped>

</style>