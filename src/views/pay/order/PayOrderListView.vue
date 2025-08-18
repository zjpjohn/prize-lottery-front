<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">提现场景</span>
      <el-select size="large"
                 clearable
                 style="width: 150px"
                 v-model="query.channel"
                 placeholder="选择支付渠道">
        <el-option label="支付宝支付" value="ali_pay"></el-option>
        <el-option label="微信支付" value="wx_pay"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">对账状态</span>
      <el-select size="medium"
                 style="width: 150px"
                 clearable
                 v-model="query.settled"
                 placeholder="审核状态">
        <el-option label="未对账" :value="0"></el-option>
        <el-option label="已对账" :value="1"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">订单状态</span>
      <el-select size="medium"
                 style="width: 150px"
                 clearable
                 v-model="query.state"
                 placeholder="订单状态">
        <el-option label="支付失败" :value="0"></el-option>
        <el-option label="待支付订单" :value="1"></el-option>
        <el-option label="支付完成" :value="2"></el-option>
        <el-option label="订单关闭" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">联系电话</span>
      <el-input clearable
                v-model="query.phone"
                style="width: 180px"
                placeholder="用户手机号"></el-input>
      <span style="margin: 0 16px 0 24px">订单时间</span>
      <el-select size="medium"
                 style="width: 150px"
                 clearable
                 v-model="query.day"
                 placeholder="查询天数">
        <el-option label="一个周内" :value="7"></el-option>
        <el-option label="两个周内" :value="14"></el-option>
        <el-option label="三个周内" :value="21"></el-option>
        <el-option label="一个月内" :value="30"></el-option>
        <el-option label="两个月内" :value="60"></el-option>
        <el-option label="三个月内" :value="90"></el-option>
        <el-option label="半年内" :value="180"></el-option>
      </el-select>
      <span style="margin-left: 24px"></span>
      <el-button type="primary" icon="el-icon-search" @click="queryOrderList">查询</el-button>
      <span style="margin-left: 16px"></span>
      <el-button @click="goSettleView">对账管理</el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="订单编号" prop="bizNo" width="180px"></el-table-column>
        <el-table-column label="订单类型" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.user.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.user.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" width="100px">
          <template v-slot="scope">
            {{ scope.row.amount / 100 }}元
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.channel.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单内容" prop="attach"></el-table-column>
        <el-table-column label="支付时间" prop="payTime" width="170px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="170px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     style="margin-right: 10px"
                     @click="goOrderDetail(scope.row.bizNo)">详情
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无订单记录</span>
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
import {orderList} from "../../../api/payment-service";

export default {
  name: "PayOrderListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        settled: null,
        channel: null,
        state: null,
        phone: null,
        day: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    goOrderDetail(orderNo) {
      this.$router.push(`/pay/order/manager/detail/${orderNo}`);
    },
    goSettleView() {
      this.$router.push('/pay/order/manager/settle');
    },
    queryOrderList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      orderList(condition).then(data => this.list = data);
    },
  },
  created() {
    this.queryOrderList();
  },
  watch: {
    page(value) {
      this.queryOrderList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryOrderList();
      }
    }
  },
}
</script>

<style scoped>

</style>
