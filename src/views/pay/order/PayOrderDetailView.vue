<template>
  <div style="margin:32px 24px 0 24px">
    <el-descriptions title="订单信息" :column="4">
      <el-descriptions-item label="订单编号">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.bizNo }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="订单类型">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.type.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="订单状态">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.state.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="附加信息">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.attach }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="购买数量">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.quantity }}件
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="支付金额">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ parseInt(order.amount) / 100 }}元
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="标准价格">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ parseInt(order.stdPrice) / 100 }}元
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="支付渠道">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.channel.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.gmtCreate }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="到期时间">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.expireTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="支付时间">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.payTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="关闭时间">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.closeTime }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="用户编号">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.user.userId }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="联系方式">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.user.phone }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="用户昵称">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.user.nickname }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="账户状态">
          <span style="font-weight: bold;color: #333333" v-if="order">
            {{ order.user.state.label }}
          </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {orderDetail} from "../../../api/payment-service";

export default {
  name: "PayOrderDetailView",
  data() {
    return {
      order: null,
    };
  },
  methods: {
    getOrderDetail() {
      orderDetail(this.$route.params.orderNo).then(data => this.order = data);
    }
  },
  mounted() {
    this.getOrderDetail();
  }
}
</script>

<style scoped>

</style>
