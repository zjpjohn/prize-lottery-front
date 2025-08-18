<template>
  <div style="margin:48px 32px 0 32px">
    <el-descriptions title="用户信息" :column="4">
      <el-descriptions-item label="唯一编号">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
            {{ userInfo.userId }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.phone }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="用户名">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.nickname }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="注册渠道">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.channel.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户状态">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.state.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户类型">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.expert === 1 ? '预测专家' : '普通用户' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="注册时间" :span="2">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.createTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="登录状态">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.loginState ? (userInfo.loginState === 1 ? '登录' : '退出') : '未登录' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="登录地点">
          <span style="font-weight: bold;color: #333333"
                v-if="userInfo&&userInfo.loginState&&userInfo.loginState === 1">
          {{ userInfo.loginIp }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="登录时间">
          <span style="font-weight: bold;color: #333333"
                v-if="userInfo&&userInfo.loginState&&userInfo.loginState === 1">
          {{ userInfo.loginTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="到期时间">
          <span style="font-weight: bold;color: #333333"
                v-if="userInfo&&userInfo.loginState&&userInfo.loginState === 1">
          {{ userInfo.expireAt }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请主">
            <span style="font-weight: bold;color: #333333" v-if="master">
            {{ master.userId }}
            </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请主手机">
            <span style="font-weight: bold;color: #333333" v-if="master">
            {{ master.phone }}
            </span>
      </el-descriptions-item>
      <el-descriptions-item label="受邀请码">
            <span style="font-weight: bold;color: #333333" v-if="master">
            {{ master.code }}
            </span>
      </el-descriptions-item>
      <el-descriptions-item label="邀请级别">
            <span style="font-weight: bold;color: #333333" v-if="master">
            {{ master.invLevel.label }}
            </span>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px;">
      <el-descriptions title="流量主信息" :column="4">
        <el-descriptions-item label="流量主">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.level.label }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="邀请码">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.invCode }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="邀请人数">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.invites }}人
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="累计奖励">
          <span style="font-weight: bold;color: #333333" v-if="userInfo">
          {{ userInfo.rewards }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="margin-top: 24px">
      <el-descriptions title="余额账户" :column="4">
        <el-descriptions-item label="奖励金">
          <div>
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.balance }}金币
            </span>
            <permission permit="super">
              <el-link type="primary"
                       :underline="false"
                       style="margin-left: 12px"
                       @click="showChargeDialog">余额充值
              </el-link>
            </permission>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="金币余额">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.surplus }}金币
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="账户积分">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.coupon }}
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="邀请奖励">
            <span style="font-weight: bold;color: #333333" v-if="balance">
              {{ balance.invite }}
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="代金券">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.voucher }}
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="提现金币">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.withdraw }}金币
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="提现金额">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.withRmb }}元
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="最近提现">
            <span style="font-weight: bold;color: #333333" v-if="balance">
            {{ balance.withLatest }}
            </span>
        </el-descriptions-item>
        <el-descriptions-item label="提现开关">
          <permission permit="super">
            <el-switch :value="balance.canWith"
                       :width="32"
                       :active-value="1"
                       :inactive-value="0"
                       v-if="balance"
                       @change="(value)=>switchBalanceWithdraw(value)">
            </el-switch>
          </permission>
        </el-descriptions-item>
        <el-descriptions-item label="分润开关">
          <permission permit="super">
            <el-switch :value="balance.canProfit"
                       :width="32"
                       :active-value="1"
                       :inactive-value="0"
                       v-if="balance"
                       @change="(value)=>switchBalanceProfit(value)">
            </el-switch>
          </permission>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="margin-top: 24px">
      <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">APP使用记录</div>
      <div style="margin-bottom: 16px">
        <el-table stripe
                  :data="launch.records"
                  style="width: 100%"
                  :row-style="{height:'48px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
          <el-table-column label="使用日期" prop="launchDate"></el-table-column>
          <el-table-column label="启动次数">
            <template v-slot="scope">
              <span>
                <span style="font-weight: 600">{{ scope.row.launches }}</span>
                <span>次</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="最新启动" prop="gmtModify"></el-table-column>
          <el-table-column label="首次启动" prop="gmtCreate"></el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无使用记录</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="showCharge"
               @close="cancelManualCharge"
               :modal-append-to-body="false"
               width="25%">
      <div slot="title" class="title">账户余额充值</div>
      <el-input v-model="amount" placeholder="请输入余额充值金额" clearable></el-input>
      <div slot="footer">
        <el-button size="small" type="primary" @click="manualCharge">提交</el-button>
        <el-button size="small" type="danger" @click="cancelManualCharge">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  balanceCharge,
  balanceProfit,
  balanceWithdraw,
  inviteMaster,
  launchList,
  userBalance,
  userInfo
} from "../../api/user-service";

export default {
  name: "UserDetailView",
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: null,
      balance: null,
      showCharge: false,
      amount: null,
      master: null,
      launch: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryUserInfo() {
      userInfo(this.userId).then(data => this.userInfo = data);
    },
    queryBalance() {
      userBalance(this.userId).then(data => this.balance = data);
    },
    queryInvMaster() {
      if (this.$route.query.channel == null || this.$route.query.channel !== '2') {
        return;
      }
      inviteMaster(this.userId).then(data => this.master = data);
    },
    queryUserLaunch() {
      launchList({
        userId: this.userId,
        day: 7,
        page: 1,
        limit: 10,
      }).then(data => {
        this.launch = data;
      });
    },
    switchBalanceWithdraw(value) {
      this.$confirm(`是否要${value === 0 ? '禁用' : '开启'}余额提现？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        balanceWithdraw(this.balance.userId).then(res => {
          this.queryBalance();
        });
      });
    },
    switchBalanceProfit(value) {
      this.$confirm(`是否要${value === 0 ? '禁用' : '开启'}消费分润？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        balanceProfit(this.balance.userId).then(res => {
          this.queryBalance();
        });
      });
    },
    cancelManualCharge() {
      this.amount     = null;
      this.showCharge = false;
    },
    showChargeDialog() {
      if (this.balance.canWith === 1 || this.balance.canProfit === 1) {
        this.$message.error('请先禁用账户提现和分润功能！');
        return;
      }
      this.$confirm(`是否要要对该账户手动充值？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showCharge = true;
      });
    },
    manualCharge() {
      balanceCharge(this.balance.userId, this.amount).then(res => {
        this.cancelManualCharge();
        this.$message.success('充值成功');
        this.queryBalance();
      });
    }
  },
  mounted() {
    this.queryUserInfo();
    this.queryBalance();
    this.queryInvMaster();
    this.queryUserLaunch();
  }
}
</script>

<style scoped>
</style>
