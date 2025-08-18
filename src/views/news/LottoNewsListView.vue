<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 32px">资讯类型</span>
      <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="请选择资讯类型">
        <el-option label="福彩3D" value="fc3d"></el-option>
        <el-option label="排列三" value="pl3"></el-option>
        <el-option label="双色球" value="ssq"></el-option>
        <el-option label="大乐透" value="dlt"></el-option>
        <el-option label="七乐彩" value="qlc"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">资讯状态</span>
      <el-select size="medium" style="width: 160px;margin-right: 24px" clearable v-model="query.state"
                 placeholder="请选择资讯状态">
        <el-option label="无效资讯" :value="0"></el-option>
        <el-option label="正常资讯" :value="1"></el-option>
        <el-option label="热门资讯" :value="2"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" icon="el-icon-refresh-left" @click="fetchNews">同步资讯
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="news.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="资讯标识" prop="seq" width="180px"></el-table-column>
        <el-table-column label="咨询分类" width="120px">
          <template v-slot="scope">
            <span v-if="lottery(scope.row.type)">{{ lottery(scope.row.type) }}</span>
            <span v-else>综合</span>
          </template>
        </el-table-column>
        <el-table-column label="资讯标题" prop="title" width="380px"></el-table-column>
        <el-table-column label="资讯摘要">
          <template v-slot="scope">
            <span class="news-summary">{{ scope.row.summary.substring(0, 100) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" prop="browse" width="100px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template v-slot="scope">
            <el-link type="info" :underline="false" v-if="scope.row.state===0">无效</el-link>
            <el-link type="danger" :underline="false" v-if="scope.row.state===1">正常</el-link>
            <el-link type="success" :underline="false" v-if="scope.row.state===2">热门</el-link>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="160px"></el-table-column>
        <el-table-column label="操作" width="160px"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
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
                   :total="news.total">
    </el-pagination>
  </div>
</template>

<script>
import {lottery} from "../../libs/lottery";
import {fetchLotteryNews, lotteryNewsList} from "../../api/lotto-service";

export default {
  name: "LottoNewsListView",
  data() {
    return {
      page: 1,
      limit: 9,
      query: {
        type: null,
        state: null,
      },
      news: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    lottery(type) {
      return lottery[type];
    },
    getNewsList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit,
      }, this.query);
      lotteryNewsList(condition).then(data => this.news = data)
    },
    goNewsDetail(seq) {
      this.$router.push(`/news/detail/${seq}`);
    },
    fetchNews() {
      fetchLotteryNews();
    }
  },
  watch: {
    page(value) {
      this.getNewsList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getNewsList();
      }
    }
  },
  mounted() {
    this.getNewsList();
  },
}
</script>

<style scoped>
.news-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
