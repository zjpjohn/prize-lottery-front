<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 16px">命中情况</span>
      <el-select clearable v-model="query.hit" placeholder="推荐命中情况" style="width: 180px">
        <el-option label="未开奖" value="-1"></el-option>
        <el-option label="未命中" value="0"></el-option>
        <el-option label="组六命中" value="1"></el-option>
        <el-option label="组三命中" value="2"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 16px">二次编辑</span>
      <el-select clearable v-model="query.edit" placeholder="是否二次编辑" style="width: 180px">
        <el-option label="未编辑" value="0"></el-option>
        <el-option label="已编辑" value="1"></el-option>
      </el-select>
      <el-button plain type="primary" style="margin-left: 12px" @click="routeToCreate">分层过滤</el-button>
      <el-button plain type="primary" @click="fetchNum3Layer">同步数据</el-button>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="list.records"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="推荐期号" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.period }}期</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤层一">
          <template v-slot="scope">
            <span>{{ scope.row.layer1.name }}-{{ hit(scope.row.layer1.hit) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤层二">
          <template v-slot="scope">
            <span>{{ scope.row.layer2.name }}-{{ hit(scope.row.layer2.hit) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤层三">
          <template v-slot="scope">
            <span>{{ scope.row.layer3.name }}-{{ hit(scope.row.layer3.hit) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤层四">
          <template v-slot="scope">
            <span v-if="scope.row.layer4.condition.length>0">
              {{ scope.row.layer4.name }}-{{ hit(scope.row.layer4.hit) }}
            </span>
            <span v-else>无数据</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤层五">
          <template v-slot="scope">
            <span v-if="scope.row.layer5.condition.length>0">
              {{ scope.row.layer5.name }}-{{ hit(scope.row.layer5.hit) }}
            </span>
            <span v-else>无数据</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160px" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="primary"
                     @click="routeToDetail(scope.row.period,scope.row.id)">详情
            </el-link>
            <el-link :underline="false"
                     type="success"
                     style="margin-left: 16px"
                     v-if="!scope.row.calcTime"
                     @click="calcLayerHit(scope.row.id)">
              计算
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
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
import {calcNum3Layer, num3LayerList, syncNum3Layer} from "../../../api/lotto-service";

const hitMap = {
  0: '未命中',
  1: '组六命中',
  2: '组三命中',
};

export default {
  name: "Num3LayerListView",
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        type: this.$route.query.type,
        edit: null,
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
    hit(value) {
      return hitMap[value] || '未开奖';
    },
    routeToCreate() {
      if (this.query.type === 'fc3d') {
        this.$router.push('/fsd/layer/filter');
        return;
      }
      this.$router.push('/pls/layer/filter');
    },
    fetchNum3Layer() {
      this.$confirm('是否同步分层预警数据？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        syncNum3Layer(this.query.type).then(_ => {
          this.$message.success('同步成功');
          this.queryLayerList();
        });
      });
    },
    routeToDetail(period, id) {
      if (this.query.type === 'fc3d') {
        this.$router.push(`/fsd/layer/detail/${period}/${id}`);
        return;
      }
      this.$router.push(`/pls/layer/detail/${period}/${id}`);
    },
    calcLayerHit(id) {
      this.$confirm('是否手动计算预警命中？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcNum3Layer(id).then(res => {
          this.$message.success('计算成功');
          this.queryLayerList();
        });
      });
    },
    queryLayerList() {
      let params = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      num3LayerList(params).then(data => this.list = data);
    }
  },
  created() {
    this.queryLayerList();
  },
  watch: {
    page(_) {
      this.queryLayerList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryLayerList();
      }
    }
  },
}
</script>

<style scoped>

</style>