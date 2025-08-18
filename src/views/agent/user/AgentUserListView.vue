<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right:  16px">代理类型</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.agent"
                 placeholder="请选择代理类型">
        <el-option label="一级代理" :value="1"></el-option>
        <el-option label="二级代理" :value="2"></el-option>
        <el-option label="三级代理" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">账户状态</span>
      <el-select size="medium"
                 style="width: 160px;"
                 clearable
                 v-model="query.state"
                 placeholder="请选择规则状态">
        <el-option label="无效账户" :value="0"></el-option>
        <el-option label="正常账户" :value="1"></el-option>
        <el-option label="已冻结账户" :value="2"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">联系电话</span>
      <el-input clearable
                v-model="query.phone"
                style="width: 200px"
                placeholder="请输入查询手机号"></el-input>
      <permission permit="super">
        <el-button style="margin-left: 24px" type="primary" @click="goAgentApply">审核管理</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="users.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="编号" prop="userId"></el-table-column>
        <el-table-column label="用户名" prop="nickname"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="代理级别">
          <template v-slot="scope">
            <span>{{ scope.row.agent.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邀请码" prop="code"></el-table-column>
        <el-table-column label="邀请人数" prop="invites"></el-table-column>
        <el-table-column label="账户状态">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false" type="primary" @click="goAgentDetail(scope.row.userId)">详情</el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无流量主</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="users.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {agentUserList} from "../../../api/agent-service";

export default {
  name: "AgentUserListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        agent: null,
        state: null,
        phone: null,
      },
      users: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getAgentUserList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      agentUserList(condition).then(data => this.users = data);
    },
    goAgentDetail(userId) {
      this.$router.push(`/agent/user/detail/${userId}`);
    },
    goAgentApply() {
      this.$router.push('/agent/user/apply');
    }
  },
  mounted() {
    this.getAgentUserList();
  },
  watch: {
    page(value) {
      this.getAgentUserList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getAgentUserList();
      }
    }
  },
}
</script>

<style scoped>

</style>
