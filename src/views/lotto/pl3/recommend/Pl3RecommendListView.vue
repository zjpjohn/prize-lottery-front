<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 16px">命中情况</span>
      <el-select clearable v-model="query.hit" placeholder="推荐命中情况" style="width: 180px">
        <el-option label="命中" value="1"></el-option>
        <el-option label="未命中" value="0"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">开奖类型</span>
      <el-select clearable v-model="query.type" placeholder="推荐中奖类型" style="width: 180px">
        <el-option label="豹子" :value="1"></el-option>
        <el-option label="对子" :value="2"></el-option>
        <el-option label="组六" :value="3"></el-option>
      </el-select>
      <el-button plain type="primary" style="margin-left: 12px" @click="routeToFilter">推荐计算</el-button>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="list.records"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="推荐期号" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.period }}期</span>
          </template>
        </el-table-column>
        <el-table-column label="组六推荐">
          <template v-slot="scope">
            <div style="display: flex;flex-wrap: wrap;align-items: start;margin-bottom: 10px">
              <span v-for="(item,index) in scope.row.zu6.items"
                    :key="'zu6_'+index">
                <span style="margin-right: 8px" v-if="scope.row.calcTime">
                <span v-html="hitReplace(item.hitValue)">
                </span>
                </span>
                <span v-else style="margin-right: 8px" v-html="hitReplace(item.value)"></span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="组三推荐" width="240px">
          <template v-slot="scope">
            <div style="display: flex;flex-wrap: wrap;margin-bottom: 10px">
              <span v-for="(item,index) in scope.row.zu3.items"
                    :key="'zu3_'+index">
                <span style="margin-right: 8px" v-if="scope.row.calcTime">
                <span v-html="hitReplace(item.hitValue)">
                </span>
                </span>
                <span v-else style="margin-right: 8px" v-html="hitReplace(item.value)"></span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80px">
          <template v-slot="scope">
            <span v-if="scope.row.type">
               {{ type[scope.row.type] }}
            </span>
            <span v-else>未开奖</span>
          </template>
        </el-table-column>
        <el-table-column label="结果" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.type">
               {{ lottoHits[scope.row.hit] || '未知结果' }}
            </span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
        <el-table-column prop="calcTime" label="计算时间" width="160px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <el-link :underline="false" type="primary" @click="routeToDetail(scope.row)">详情</el-link>
            <el-link :underline="false"
                     type="success"
                     style="margin-left: 8px"
                     v-if="!scope.row.calcTime"
                     @click="comRecommendHit(scope.row.period)">计算
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
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
import {comRecommendCalc, comRecommendList} from "../../../../api/pl3-service";
import {hitReplace, lottoHits, n3_type} from "../../../../libs/lottery";

export default {
  name: "Pl3RecommendListView",
  computed: {
    lottoHits() {
      return lottoHits
    }
  },
  data() {
    return {
      page: 1,
      limit: 8,
      type: n3_type,
      query: {
        type: null,
        hit: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    hitReplace,
    routeToFilter() {
      this.$router.push('/pls/recommend/filter');
    },
    queryRecommends() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      comRecommendList(condition).then(data => this.list = data);
    },
    routeToDetail(row) {
      this.$router.push(`/pls/recommend/detail/${row.period}`);
    },
    comRecommendHit(period) {
      this.$confirm('是否手动计算命中信息？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        comRecommendCalc(period).then(_ => {
          this.$message.success('计算成功');
          this.queryRecommends();
        });
      });
    }
  },
  mounted() {
    this.queryRecommends();
  },
  watch: {
    page(value) {
      this.queryRecommends();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryRecommends();
      }
    },
  },
}
</script>

<style scoped>

</style>