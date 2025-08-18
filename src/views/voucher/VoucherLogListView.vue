<template>
  <div style="margin: 32px 32px 0 32px;width: 85%">
    <el-descriptions title="代金券基础信息" :column="3">
      <el-descriptions-item label="卡券编号">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.seqNo }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="卡券名称">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.name }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="卡券金额">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.voucher }}金币
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="领取方式">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.disposable === 0 ? '可重复领取' : '一次性领取' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="过期时间">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.expire === 0 ? '领取后永久有效' : `领取${voucher.expire}天后过期` }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="领取间隔">
          <span v-if="voucher" style="font-weight: bold;color: #333333">
            {{ voucher.interval === 0 ? '仅一次领取' : `每隔${voucher.interval}天可领取` }}
          </span>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px">
      <div style="margin-bottom:24px;font-size: 16px;font-weight: 700">代金券领取记录</div>
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="用户标识">
          <template v-slot="scope">
            <el-link :underline="false" type="success" @click="gotoUser(scope.row.userId)">
              {{ scope.row.userId }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="领取金额">
          <template v-slot="scope">
            <span>{{ scope.row.voucher }}金币</span>
          </template>
        </el-table-column>
        <el-table-column label="使用金额">
          <template v-slot="scope">
            <span>{{ scope.row.used }}金币</span>
          </template>
        </el-table-column>
        <el-table-column label="使用状态">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过期状态">
          <template v-slot="scope">
            <span>{{ scope.row.expired.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过期时间" prop="expireAt"></el-table-column>
        <el-table-column label="领取时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="最新操作" prop="gmtModify"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无领取记录</span>
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
import {voucherInfo, voucherLogList} from "../../api/voucher-service";

export default {
  name: "VoucherLogListView",
  data() {
    return {
      page: 1,
      limit: 10,
      seqNo: this.$route.params.seqNo,
      voucher: null,
      query: {
        state: null,
        expired: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryVoucher() {
      voucherInfo(this.seqNo).then(data => this.voucher = data);
    },
    queryVoucherLogs() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit,
        bizNo: this.seqNo,
      }, this.query);
      voucherLogList(condition).then(data => this.list = data);
    },
    gotoUser(userId) {
      this.$router.push(`/user/detail/${userId}`);
    }
  },
  created() {
    this.queryVoucher();
    this.queryVoucherLogs();
  },
  watch: {
    page(value) {
      this.queryVoucherLogs();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryVoucherLogs();
      }
    },
  }
}
</script>

<style scoped>

</style>
