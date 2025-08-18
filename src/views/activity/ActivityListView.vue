<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">活动状态</span>
      <el-select size="medium" style="width: 160px" clearable v-model="state" placeholder="选择状态">
        <el-option label="已创建" :value="1"></el-option>
        <el-option label="投放中" :value="2"></el-option>
        <el-option label="已删除" :value="0"></el-option>
      </el-select>
      <permission permit="super">
        <el-button size="small" type="primary" icon="el-icon-plus"
                   style="height: 36px;margin-left: 36px"
                   @click="toCreateView">创建活动
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="活动标识" prop="id" width="200px"></el-table-column>
        <el-table-column label="活动名称" prop="name" width="140px"></el-table-column>
        <el-table-column label="会员时长" width="140px">
          <template v-slot="scope">
            <span style="color: red">{{ scope.row.duration }}</span>天
          </template>
        </el-table-column>
        <el-table-column label="活动状态" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抽奖限制" width="280px">
          <template v-slot="scope">
            单次抽奖至少需
            <span style="color: red">
              {{ scope.row.throttle }}
            </span>
            次机会
          </template>
        </el-table-column>
        <el-table-column label="失败必中">
          <template v-slot="scope">
            抽奖失败
            <span style="color: red">
              {{ scope.row.throttle }}
            </span>
            次后必中奖
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template v-slot="scope">
            <el-link :underline="false" type="primary"
                     style="margin-right: 4px"
                     @click="toDetailView(scope.row.id)">详情
            </el-link>
            <el-link :underline="false" type="primary"
                     style="margin-right: 4px"
                     @click="toDrawView(scope.row.id)">记录
            </el-link>
            <el-link :underline="false" type="primary"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 4px"
                     @click="issueActivity(scope.row.id)">投放
            </el-link>
            <el-link :underline="false" type="primary"
                     v-if="scope.row.state.value===2"
                     style="margin-right: 4px"
                     @click="cancelActivity(scope.row.id)">取消
            </el-link>
            <el-link :underline="false" type="primary"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 4px"
                     @click="deleteActivity(scope.row.id)">删除
            </el-link>
            <el-link :underline="false" type="primary"
                     v-if="scope.row.state.value===0"
                     @click="revokeActivity(scope.row.id)">撤销
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无活动信息</span>
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
import {activityList, editActivity} from "../../api/user-service";

export default {
  name: "ActivityListView",
  data() {
    return {
      page: 1,
      limit: 8,
      state: null,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryActivities() {
      let condition = {
        page: this.page,
        limit: this.limit,
        state: this.state
      };
      activityList(condition).then(data => this.list = data);
    },
    toCreateView() {
      this.$router.push('/pay/activity/create');
    },
    toDetailView(id) {
      this.$router.push(`/pay/activity/detail/${id}`);
    },
    toDrawView(id) {
      this.$router.push(`/pay/activity/draw/${id}`);
    },
    cancelActivity(id) {
      this.$confirm('是否取消投放中活动？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        editActivity({
          id: id,
          state: 1
        }).then(res => {
          this.$message.success('取消成功');
          this.queryActivities();
        });
      });
    },
    deleteActivity(id) {
      this.$confirm('是否删除已创建活动？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        editActivity({
          id: id,
          state: 0
        }).then(res => {
          this.$message.success('删除成功');
          this.queryActivities();
        });
      });
    },
    revokeActivity(id) {
      this.$confirm('是否撤销已删除活动？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        editActivity({
          id: id,
          state: 1
        }).then(res => {
          this.$message.success('撤销成功');
          this.queryActivities();
        });
      });
    },
    issueActivity(id) {
      this.$confirm('是否投放已创建活动？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        editActivity({
          id: id,
          state: 2
        }).then(res => {
          this.$message.success('投放成功');
          this.queryActivities();
        });
      });
    },
  },
  watch: {
    state(value) {
      this.page = 1;
      this.queryActivities();
    },
    page(value) {
      this.queryActivities();
    },
  },
  created() {
    this.queryActivities();
  }
}
</script>

<style scoped>

</style>