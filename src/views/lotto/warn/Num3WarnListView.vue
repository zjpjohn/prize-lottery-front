<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 16px">命中情况</span>
      <el-select clearable v-model="hit" placeholder="推荐命中情况" style="width: 180px">
        <el-option label="未开奖" value="0"></el-option>
        <el-option label="豹子命中" value="1"></el-option>
        <el-option label="组三命中" value="2"></el-option>
        <el-option label="组六命中" value="3"></el-option>
        <el-option label="未命中" value="4"></el-option>
      </el-select>
      <el-button plain type="primary" style="margin-left: 12px" @click="routeToCreate">预警计算</el-button>
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
        <el-table-column label="胆码" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.dan.hit!==-1">
              <span v-for="(item,index) in scope.row.dan.items" :key="'dan_'+index"
                    style="margin-right: 4px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else>
              <span v-for="(item,index) in scope.row.dan.items" :key="'dan_'+index"
                    style="margin-right: 4px">{{ item.value }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="双飞组合" width="160px">
          <template v-slot="scope">
            <span v-if="scope.row.twoMa.hit!==-1">
              <span v-for="(item,index) in scope.row.twoMa.items" :key="'tw_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else>
              <span v-for="(item,index) in scope.row.twoMa.items" :key="'tw_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="杀码" width="80px">
          <template v-slot="scope">
            <span v-for="(item,index) in scope.row.kill.values" :key="'k_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组六">
          <template v-slot="scope">
            <span v-if="scope.row.zu6.hit!==-1">
              <span v-for="(item,index) in scope.row.zu6.items" :key="'z6_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else>
              <span v-for="(item,index) in scope.row.zu6.items" :key="'z6_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="组三" width="260px">
          <template v-slot="scope">
            <span v-if="scope.row.zu3.hit!==-1">
              <span v-for="(item,index) in scope.row.zu3.items" :key="'z3_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else>
              <span v-for="(item,index) in scope.row.zu3.items" :key="'z3_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80px">
          <template v-slot="scope">
            <span>{{ scope.row.hit.description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="primary"
                     @click="routeToDetail(scope.row.period,scope.row.id)">详情
            </el-link>
            <el-link :underline="false"
                     type="success"
                     style="margin-left: 16px"
                     v-if="!scope.row.calcTime"
                     @click="calcHitWarn(scope.row.id)">
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
import {calcWarnHit, num3WarnList} from "../../../api/lotto-service";
import {hitReplace} from "../../../libs/lottery";

export default {
  name: "Num3WarnListView",
  data() {
    return {
      page: 1,
      limit: 8,
      type: this.$route.query.type,
      hit: null,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    hitReplace,
    routeToCreate() {
      if (this.type === 'fc3d') {
        this.$router.push('/fsd/warn/filter');
        return;
      }
      this.$router.push('/pls/warn/filter');
    },
    routeToDetail(period, id) {
      if (this.type === 'fc3d') {
        this.$router.push(`/fsd/warn/detail/${period}/${id}`);
        return;
      }
      this.$router.push(`/pls/warn/detail/${period}/${id}`);
    },
    calcHitWarn(id) {
      this.$confirm('是否手动计算预警命中？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        calcWarnHit(id).then(res => {
          this.$message.success('计算成功');
          this.queryWarnList();
        });
      });
    },
    queryWarnList() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: this.type,
        hit: this.hit
      }
      num3WarnList(params).then(data => this.list = data);
    },
  },
  mounted() {
    this.queryWarnList();
  },
  watch: {
    page(_) {
      this.queryWarnList();
    },
    hit(_) {
      this.queryWarnList();
    }
  }
}
</script>

<style scoped>

</style>