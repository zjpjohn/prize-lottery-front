<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">专家信息流</div>
      <div style="margin-left: 32px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 32px">彩种类型</span>
        <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="请选择彩种类型">
          <el-option label="福彩3D" value="fc3d"></el-option>
          <el-option label="排列三" value="pl3"></el-option>
          <el-option label="双色球" value="ssq"></el-option>
          <el-option label="大乐透" value="dlt"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">查询天数</span>
        <el-select size="medium" style="width: 160px;margin-right: 16px" clearable v-model="query.day"
                   placeholder="请选择查询时间天数">
          <el-option label="一天内" value="1"></el-option>
          <el-option label="一周内" value="7"></el-option>
          <el-option label="两周内" value="14"></el-option>
          <el-option label="三周内" value="21"></el-option>
        </el-select>
        <el-button plain type='primary' @click="extractFeeds">提取信息流</el-button>
        <el-button plain type='primary' @click="clearFeeds">过期清理</el-button>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="feeds.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="专家标识" width="200px">
          <template v-slot="scope">
            <span>{{ scope.row.master.masterId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="彩种类型" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.feedType.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="120px">
          <template v-slot="scope">
            <img :src="scope.row.master.avatar" alt="" style="width: 32px;height: 32px">
          </template>
        </el-table-column>
        <el-table-column label="字段名称" prop="field" width="120px"></el-table-column>
        <el-table-column label="期号" prop="period" width="140px"></el-table-column>
        <el-table-column label="成绩文本" prop="rateText"></el-table-column>
        <el-table-column label="命中文本" prop="hitText"></el-table-column>
        <el-table-column label="是否更新" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.renew === 0 ? '未更新' : '已更新' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最新时间" prop="timestamp" width="180px"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-pagination background
                   style="margin-top: 16px"
                   layout="total,prev,pager,next"
                   :page-size="limit"
                   :current-page.sync="page"
                   :total="feeds.total"></el-pagination>
  </div>
</template>

<script>
import {extractMasterFeeds, masterFeedList} from "../../../api/master-service";

export default {
  name: "MasterFeedsListView",
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        type: null,
        day: null,
      },
      feeds: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getMasterFeeds() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit,
      }, this.query);
      masterFeedList(condition).then(data => this.feeds = data);
    },
    extractFeeds() {
      this.$confirm('是否要手动提取中奖专家信息流？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        extractMasterFeeds().then(res => {
          this.$message.success('提取成功');
          this.getMasterFeeds();
        })
      });
    },
    clearFeeds() {
    },
  },
  mounted() {
    this.getMasterFeeds();
  },
  watch: {
    page(value) {
      this.getMasterFeeds();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getMasterFeeds();
      }
    }
  },
}
</script>

<style scoped>

</style>
