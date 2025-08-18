<template>
  <div style="margin: 32px 32px 0 32px;">
    <el-descriptions title="推荐信息" :column="5">
      <el-descriptions-item label="推荐期号">
          <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.period }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
          <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.gmtCreate }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="开奖类型">
            <span style="font-weight: bold;color: #333333" v-if="result">
            {{ lottoTypes[result.type] || '未开奖' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="本期命中">
            <span style="font-weight: bold;color: #333333" v-if="result">
            {{ lottoHits[result.hit] || '未知结果' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="计算时间">
            <span style="font-weight: bold;color: #333333" v-if="result&&result.calcTime">
            {{ result.calcTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="组三推荐" :span="5">
        <div v-if="result&&result.zu3.items!=null" style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.zu3.items"
                  :key="'zu3_'+index"
                  style="margin-right: 16px;"
                  :type="item.hit===1?'primary':'info'">{{ item.value }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="组六推荐" :span="5">
        <div v-if="result&&result.zu6.items!=null" style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.zu6.items"
                  :key="'zu6_'+index"
                  style="margin-right: 16px;"
                  :type="item.hit===1?'primary':'info'">{{ item.value }}
          </el-tag>
        </div>
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
import {comRecommend} from "../../../../api/pl3-service";
import {browseList} from "../../../../api/lotto-service";
import {lottoHits, lottoTypes} from "../../../../libs/lottery";

export default {
  name: "Pl3RecommendView",
  computed: {
    lottoHits() {
      return lottoHits
    },
    lottoTypes() {
      return lottoTypes
    }
  },
  data() {
    return {
      result: null,
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
    queryRecommend() {
      comRecommend(this.$route.params.period).then(data => this.result = data);
    },
    queryBrowseList() {
      browseList({
        page: this.page,
        limit: this.limit,
        source: 8,
        type: 'pl3',
        period: this.$route.params.period,
      }).then(data => this.list = data);
    }
  },
  mounted() {
    this.queryRecommend();
    this.queryBrowseList();
  },
  watch: {
    page(value) {
      this.queryBrowseList();
    }
  }
}
</script>

<style scoped>

</style>