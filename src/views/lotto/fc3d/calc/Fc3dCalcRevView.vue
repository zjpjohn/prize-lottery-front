<template>
  <div>
    <div style="display: flex;align-items: center">
      <el-select v-model="period" clearable placeholder="选择预测期号"
                 style="width: 200px;margin-right: 24px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_o'"
                   :value="item"
                   :label="'第 '+item+' 期'"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" @click="reverseAnalyze">取反计算</el-button>
      </permission>
    </div>
    <div v-if="census" style="margin-top: 16px">
      <div style="display: flex;align-items: center;padding: 15px 0" class="forecast-item">
        <span style="margin-right: 15px">三胆取反</span>
        <span style="width: 55px;margin-right: 10px" v-for="item in census.dan3s">
            <span>{{ item.key }}</span>
            <span style="font-weight: bold">:</span>
            <span>{{ item.value }}</span>
          </span>
      </div>
      <div style="display: flex;align-items: center;padding: 15px 0" class="forecast-item">
        <span style="margin-right: 15px">五码取反</span>
        <span style="width: 55px;margin-right: 10px" v-for="item in census.com5s">
            <span>{{ item.key }}</span>
            <span style="font-weight: bold">:</span>
            <span>{{ item.value }}</span>
          </span>
      </div>
      <div style="display: flex;align-items: center;padding: 15px 0" class="forecast-item">
        <span style="margin-right: 15px">六码取反</span>
        <span style="width: 55px;margin-right: 10px" v-for="item in census.com6s">
            <span>{{ item.key }}</span>
            <span style="font-weight: bold">:</span>
            <span>{{ item.value }}</span>
          </span>
      </div>
      <div style="display: flex;align-items: center;padding: 15px 0" class="forecast-item">
        <span style="margin-right: 15px">七码取反</span>
        <span style="width: 55px;margin-right: 10px" v-for="item in census.com7s">
            <span>{{ item.key }}</span>
            <span style="font-weight: bold">:</span>
            <span>{{ item.value }}</span>
          </span>
      </div>
      <div style="display: flex;align-items: center;padding: 15px 0" class="forecast-item">
        <span style="margin-right: 15px">综合计算</span>
        <span style="width: 55px;margin-right: 10px" v-for="item in census.values">
            <span>{{ item.key }}</span>
            <span style="font-weight: bold">:</span>
            <span>{{ item.value }}</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {reverseAnalyze} from "../../../../api/fc3d-service";

export default {
  name: "Fc3dCalcRevView",
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      period: null,
      census: null,
    };
  },
  methods: {
    reverseAnalyze() {
      reverseAnalyze(this.period)
        .then(data => this.census = data);
    }
  },
}
</script>

<style scoped>
.forecast-item:not(:last-child) {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: solid 1px #efefef;
}
</style>
