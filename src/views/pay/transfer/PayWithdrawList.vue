<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">提现场景</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.scene"
                 placeholder="提现场景">
        <el-option label="用户收益提现" value="USER_REWARD_TRANS"></el-option>
        <el-option label="流量主收益提现" value="USER_AGENT_TRANS"></el-option>
        <el-option label="专家收益提现" value="USER_EXPERT_TRANS"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">支付渠道</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.channel"
                 placeholder="支付渠道">
        <el-option label="支付宝" value="ali_pay"></el-option>
        <el-option label="微信支付" value="wx_pay"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">审核状态</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.audit"
                 placeholder="审核状态">
        <el-option label="无需审核" :value="0"></el-option>
        <el-option label="审核中" :value="1"></el-option>
        <el-option label="审核通过" :value="2"></el-option>
        <el-option label="拒绝转账" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">联系电话</span>
      <el-input clearable
                v-model="query.phone"
                style="width: 160px"
                placeholder="用户手机号"></el-input>
      <span style="margin-left: 24px"></span>
      <el-button size="medium" icon="el-icon-search" @click="queryWithdraws">查询</el-button>
      <span style="margin-left: 24px"></span>
      <el-button size="medium" type="primary" @click="gotoAudit">审核规则</el-button>
      <span style="margin-left: 24px"></span>
      <el-button size="medium" type="primary" @click="gotoRule">提现规则</el-button>
      <span style="margin-left: 24px"></span>
      <el-button size="medium" type="primary" @click="gotoLevel">提现等级</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="提现流水" prop="transNo" width="180px"></el-table-column>
        <el-table-column label="业务单号" prop="bizNo" width="180px"></el-table-column>
        <el-table-column label="手机号" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.user.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付渠道" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.channel.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现状态" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.audit.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" prop="amount" width="120px"></el-table-column>
        <el-table-column label="失败原因" prop="failReason"></el-table-column>
        <el-table-column label="最新时间" prop="latestTime" width="160px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无提现记录</span>
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
import {transferList} from "../../../api/payment-service";

export default {
  name: "PayWithdrawList",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        scene: null,
        phone: null,
        channel: null,
        audit: null,
        start: null,
        end: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    gotoAudit() {
      this.$router.push('/pay/withdraw/audit/rule');
    },
    gotoRule() {
      this.$router.push('/pay/withdraw/rule/list');
    },
    gotoLevel() {
      this.$router.push('/pay/withdraw/level/list');
    },
    queryWithdraws() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      transferList(condition).then(data => this.list = data);
    }
  },
  created() {
    this.queryWithdraws();
  },
  watch: {
    page(value) {
      this.queryWithdraws();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryWithdraws();
      }
    },
  }
}
</script>

<style scoped>

</style>
