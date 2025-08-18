<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">渠道管理</div>
      <permission permit="super">
        <el-button plain
                   size="small"
                   style="height: 32px;margin-left: 32px"
                   type="primary"
                   icon="el-icon-plus"
                   @click="gotoCreate">
          创建渠道
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px;width: 100%">
      <el-table :data="channels"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="渠道标识" prop="seq"></el-table-column>
        <el-table-column label="渠道名称" prop="name"></el-table-column>
        <el-table-column label="渠道值">
          <template v-slot="scope">
            <span>{{ scope.row.channel.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道图片">
          <template v-slot="scope">
            <img :src="scope.row.cover+'?x-oss-process=image/resize,w_26'" alt="" style="width: 26px;height: 26px">
          </template>
        </el-table-column>
        <el-table-column label="本地图标" prop="icon"></el-table-column>
        <el-table-column label="渠道描述" prop="remark"></el-table-column>
        <el-table-column label="优先级">
          <template v-slot="scope">
            <span>{{ scope.row.priority === 1 ? '优先渠道' : '普通渠道' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付(是/否)">
          <template v-slot="scope">
            <span>{{ scope.row.pay === 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现(是/否)">
          <template v-slot="scope">
            <span>{{ scope.row.withdraw === 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     style="margin-right: 10px"
                     @click="gotoChannelDetail(scope.row.id)">详情
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
    </div>
  </div>
</template>

<script>
import {payChannelList} from "../../../api/payment-service";

export default {
  name: "PayChannelList",
  data() {
    return {
      channels: [],
    };
  },
  methods: {
    gotoCreate() {
      this.$router.push('/pay/channel/create')
    },
    getChannelList() {
      payChannelList().then(data => this.channels = data || []);
    },
    gotoChannelDetail(id) {
      this.$router.push(`/pay/channel/detail/${id}`);
    },
  },
  created() {
    this.getChannelList();
  }
}
</script>

<style scoped>

</style>
