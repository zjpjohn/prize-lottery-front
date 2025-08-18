<template>
  <div style="margin: 32px 32px 0 32px">
    <div class="page-title">专家详情</div>
    <div style="margin-top: 24px;display: flex;align-items: center">
      <img :src="master.avatar" alt="" style="width: 52px;height: 52px;border-radius:50%">
      <div style="height:60px;margin-left: 24px;display: flex;flex-direction: column;justify-content: space-around">
        <div style="display: flex;align-items: center">
          <div style="width: 280px">
            <span>专家标识：</span>
            <span>{{ master.masterId }}</span>
          </div>
          <div style="width: 220px">
            <span>名称：</span>
            <span>{{ master.name }}</span>
          </div>
        </div>
        <div style="display: flex;align-items: center">
          <div style="width: 280px">
            <span>专家类型：</span>
            <span style="margin-right: 32px">
             <el-link :underline="false" type="primary" v-if="master.source===1">系统专家</el-link>
             <el-link :underline="false" type="success" v-if="master.source===2">自有专家</el-link>
            </span>
          </div>
          <div style="width: 220px">
            <i class="icon icon-view" style="font-size: 16px;"></i>
            <span>浏览量</span>
            (<span style="font-size: 14px;color: orangered">{{ master.browse }}人</span>)
          </div>
          <div style="width: 160px">
            <i class="icon icon-subscribe" style="font-size: 16px"></i>
            <span>订阅数</span>
            (<span style="font-size: 14px;color: orangered">{{ master.subscribe }}人</span>)
          </div>

        </div>
      </div>
    </div>
    <div style="min-height: 48px;margin-top:12px;display: flex;align-items: start">
      <div>专家简介：</div>
      <div style="width: 620px;min-height: 60px">{{ master.description || '暂无介绍' }}</div>
    </div>
    <div style="margin-top: 16px;display: flex;align-items: center">
      <el-card class="master-lotto" v-for="(lotto,index) in master.lotteries" :key="index+'_ma_lotto'">
        <div style="margin-right: 6px;font-weight: 600;font-size: 18px">{{ lotto.lottery.label }}</div>
        <div style="margin-top: 6px">
          <span v-if="lotto.latest">
            <span>最新预测</span>
            <span style="color: orangered">{{ lotto.latest }}期</span>
          </span>
          <span v-else style="color: #999999">暂无预测信息</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {masterDetail} from "../../../api/master-service";

export default {
  name: "LottoMasterView",
  data() {
    return {
      master: {}
    };
  },
  methods: {
    queryMasterDetail() {
      masterDetail(this.$route.params.masterId)
          .then(data => this.master = data || {});
    }
  },
  mounted() {
    this.queryMasterDetail();
  }
}
</script>

<style scoped>
.master-lotto {
  margin-right: 24px;
}

.master-lotto >>> .el-card__body {
  padding: 12px 24px;
}
</style>
