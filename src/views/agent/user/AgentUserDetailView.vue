<template>
  <div style="margin: 32px 32px 0 32px;">
    <el-descriptions title="流量主基本信息" :column="4">
      <el-descriptions-item label="账户标识">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.userId }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户名称">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.nickname }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="联系方式">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.phone }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户状态">
         <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.state.description }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户级别">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.agent.description }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请编号">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.code }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="分享链接">
        <span v-if="agent" style="font-weight: bold;color: #333333;font-size: 13px">
          {{ agent.invUri }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请人数">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.invites }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请收益">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.income }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="奖励提现">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.withdraw }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="累计提现">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.withRmb }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="最新提现">
        <span v-if="agent" style="font-weight: bold;color: #333333">
          {{ agent.withLatest }}
        </span>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin:8px 0 24px 0;font-size: 15px;font-weight: bold">流量主邀请记录</div>
    <div style="width: 90%">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="用户标识" prop="userId"></el-table-column>
        <el-table-column label="用户名称" prop="name"></el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="邀请级别">
          <template v-slot="scope">
            <span>{{ scope.row.agent.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邀请奖励" prop="reward"></el-table-column>
        <el-table-column label="邀请时间" prop="inviteTime"></el-table-column>
        <el-table-column label="应用启动" prop="launches"></el-table-column>
        <el-table-column label="最新启动" prop="latestLaunch"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无邀请记录</span>
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
import {agentDetail, agentInvitedList} from "../../../api/agent-service";

export default {
  name: "AgentUserDetailView",
  data() {
    return {
      page: 1,
      limit: 10,
      agent: null,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryAgentDetail() {
      agentDetail(this.$route.params.userId)
          .then(data => this.agent = data);
    },
    queryInvitedList() {
      let condition = {
        page: this.page,
        limit: this.limit,
        userId: this.$route.params.userId,
      };
      agentInvitedList(condition).then(data => this.list = data);
    }
  },
  created() {
    this.queryAgentDetail();
    this.queryInvitedList();
  },
  watch: {
    page(value) {
      this.queryInvitedList();
    }
  }
}
</script>

<style scoped>

</style>
