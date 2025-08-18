<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">应用版本</span>
      <el-select v-model="query.appVersion" clearable placeholder="请选择应用版本">
        <el-option
            v-for="item in versionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span style="margin: 0 16px">反馈状态</span>
      <el-select v-model="query.state" clearable placeholder="请选择反馈状态" style="margin-right: 24px">
        <el-option :value="state"
                   :label="states[state]"
                   v-for="state in Object.keys(states)"
                   :key="'f_t_'+state">
        </el-option>
      </el-select>
      <el-button type="primary" @click="gotoFeedType">反馈类型</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id" width="80px"></el-table-column>
        <el-table-column label="应用" prop="appName" width="100px"></el-table-column>
        <el-table-column label="版本" prop="appVersion" width="80px"></el-table-column>
        <el-table-column label="反馈类型" prop="type" width="120px"></el-table-column>
        <el-table-column label="反馈设备" prop="device"></el-table-column>
        <el-table-column label="反馈内容" prop="content"></el-table-column>
        <el-table-column label="处理状态" width="120px">
          <template v-slot="scope">
            <span :style="{color: stateColor(scope.row.state.value)}">{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <el-link type="success"
                     :underline="false"
                     v-if="scope.row.state.value===1"
                     @click="toHandle(scope.row.id)">
              处理
            </el-link>
          </template>
        </el-table-column>
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
                   :total="list.total"></el-pagination>
  </div>
</template>

<script>
import {feedbackList} from "../../api/feedback-service";
import {getAppVersionList} from "../../api/app-service";

const states = {
  0: '已关闭',
  1: '待处理',
  2: '已处理',
  3: '增强改进',
};
export default {
  name: "FeedbackListView",
  data() {
    return {
      appList: [],
      states: states,
      page: 1,
      limit: 10,
      versionList: [],
      appNo: this.$route.params.appNo,
      query: {
        appVersion: null,
        state: null,
      },
      list: {
        total: 0,
        current: 1,
        records: [],
      },
    };
  },
  methods: {
    getAppVersions() {
      getAppVersionList({
        appNo: this.appNo,
        page: 1,
        limit: 200
      }).then(data => {
        this.versionList = data.records.map(e => {
          return {
            label: e.appVer,
            value: e.appVer
          };
        }) || [];

      })
    },
    queryFeedList() {
      let condition = Object.assign({
        appNo: this.appNo,
        page: this.page,
        limit: this.limit
      }, this.query);
      feedbackList(condition).then(value => this.list = value);
    },
    stateColor(state) {
      switch (state) {
        case 0:
          return 'gray';
        case 1:
          return 'blue';
        case 2:
          return 'green';
        case 3:
          return 'red';
      }
    },
    toHandle(id) {
      this.$router.push(`/app/${this.appNo}/feed/handle/${id}`);
    },
    gotoFeedType() {
      this.$router.push(`/app/${this.appNo}/feed/type`);
    }
  },
  mounted() {
    this.getAppVersions();
    this.queryFeedList();
  },
  watch: {
    page(value) {
      this.queryFeedList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryFeedList();
      }
    }
  }
}
</script>

<style scoped>

</style>
