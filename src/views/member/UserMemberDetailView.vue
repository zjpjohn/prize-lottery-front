<template>
  <div style="margin:48px 32px 0 32px">
    <el-descriptions title="会员信息" :column="4">
      <el-descriptions-item label="用户编号">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.userId }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.phone }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="用户名">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.nickname }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="会员状态">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.state.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="截止过期">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.expireAt }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="上次过期">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.lastExpire }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="最新开通">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.renewTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="累计开通">
          <span style="font-weight: bold;color: #333333" v-if="member">
            {{ member.times }}次
          </span>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px">
      <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">会员开通记录</div>
      <div style="margin-top: 16px">
        <el-table stripe
                  :data="logs.records"
                  style="width: 100%"
                  :row-style="{height:'48px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
          <el-table-column label="套餐编号" prop="packNo" width="220px"></el-table-column>
          <el-table-column label="套餐名称" prop="packName"></el-table-column>
          <el-table-column label="开通方式">
            <template v-slot="scope">
              <span>{{ scope.row.type === 1 ? '在线支付' : '后台开通' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" prop="channel"></el-table-column>
          <el-table-column label="支付金额">
            <template v-slot="scope">
              <span>{{ scope.row.payed / 100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
            <template v-slot="scope">
              <span>{{ unitType[scope.row.timeUnit.value] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" prop="expireStart"></el-table-column>
          <el-table-column label="结束时间" prop="expireEnd"></el-table-column>
          <el-table-column label="开通时间" prop="gmtCreate"></el-table-column>
        </el-table>
        <el-pagination background
                       style="margin-top: 16px"
                       layout="total,prev,pager,next"
                       :page-size="limit"
                       :current-page.sync="page"
                       :total="logs.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {memberLogs, userMember} from "../../api/member-service";
import {unitMap} from "../../libs/pack_time_unit";

export default {
  name: "UserMemberDetailView",
  data() {
    return {
      unitType: unitMap,
      page: 1,
      limit: 10,
      member: null,
      logs: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryUserMember() {
      userMember(this.$route.params.userId).then(data => this.member = data);
    },
    queryMemberLogs() {
      memberLogs({
        page: this.page,
        limit: this.limit,
        userId: this.$route.params.userId
      }).then(data => this.logs = data);
    },
  },
  created() {
    this.queryUserMember();
    this.queryMemberLogs();
  },
  watch: {
    page(value) {
      this.queryMemberLogs();
    }
  },
}
</script>

<style scoped>

</style>