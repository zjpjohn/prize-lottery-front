<template>
  <div style="margin:32px 32px 0 32px">
    <div>
      <el-descriptions title="活动信息" :column="5">
        <el-descriptions-item label="活动名称">
          <span style="font-weight: bold;color: #333333" v-if="activity">
            {{ activity.name }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="会员时长">
          <span style="font-weight: bold;color: #333333" v-if="activity">
            {{ activity.duration }}天
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="最小机会">
          <span v-if="activity" style="font-weight: bold;color: #333333">
            单次抽奖机会不少于
            <span style="color: red">
              {{ activity.minimum }}
            </span>
            次
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="失败必中">
          <span v-if="activity" style="font-weight: bold;color: #333333">
            活动抽奖失败
            <span style="color: red">
              {{ activity.throttle }}
            </span>
            次后必中
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          <span style="font-weight: bold;color: #333333" v-if="activity">
            {{ activity.gmtCreate }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 24px">
        <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">活动抽奖记录</div>
        <el-table stripe
                  :data="list.records"
                  style="width: 100%"
                  :row-style="{height:'48px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
          <el-table-column label="抽奖标识" prop="id"></el-table-column>
          <el-table-column label="用户手机" prop="phone"></el-table-column>
          <el-table-column label="用户昵称" prop="nickname"></el-table-column>
          <el-table-column label="抽奖日期" prop="day"></el-table-column>
          <el-table-column label="机会次数" prop="times"></el-table-column>
          <el-table-column label="抽奖状态">
            <template v-slot="scope">
              <span>{{ scope.row.state.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开奖码">
            <template v-slot="scope">
              <div v-if="scope.row.code">
                <span v-for="(item,index) in scope.row.code.codes"
                      :key="index+'_'+scope.row.id"
                      style="margin-right: 4px">{{ item }}</span>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无抽奖记录</span>
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
  </div>
</template>

<script>
import {activityDetail, activityDrawList} from "../../api/user-service";

export default {
  name: "ActivityDrawView",
  data() {
    return {
      activity: null,
      page: 1,
      limit: 10,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryActivity() {
      activityDetail(this.$route.params.activityId).then(data => this.activity = data);
    },
    queryDrawList() {
      let params = {
        page: this.page,
        limit: this.limit,
        activityId: this.$route.params.activityId
      };
      activityDrawList(params).then(data => this.list = data);
    }
  },
  created() {
    this.queryActivity();
    this.queryDrawList();
  },
  watch: {
    page(_) {
      this.queryDrawList();
    }
  },
}
</script>

<style scoped>

</style>