<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="margin-top: 28px;display: flex;align-items: center">
      <span style="margin-right: 16px">开奖期号</span>
      <el-select size="medium" v-model="query.period" placeholder="请选择期号" clearable
                 style="width:160px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_qlc'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <span style="margin: 0 16px">数据类型</span>
      <el-select size="medium" v-model="query.type" placeholder="请选择数据类型"
                 style="width:160px;margin-right: 16px">
        <el-option label="大底22码" value="r22"></el-option>
        <el-option label="定三胆" value="r3"></el-option>
        <el-option label="杀三码" value="k3"></el-option>
      </el-select>
      <span style="margin: 0 16px">专家排名</span>
      <el-select size="medium" v-model="query.limit" placeholder="请选择专家排名"
                 style="width:160px;margin-right: 16px">
        <el-option label="前10名专家" :value="10"></el-option>
        <el-option label="前15名专家" :value="15"></el-option>
        <el-option label="前20名专家" :value="20"></el-option>
        <el-option label="前25名专家" :value="25"></el-option>
      </el-select>
      <el-button plain type="primary" @click="queryWholeBest">查询统计</el-button>
    </div>
    <div style="margin-top: 24px">
      <el-table :data="result" stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '544px'}">
        <el-table-column label="预测期号" prop="period" width="160px"></el-table-column>
        <el-table-column label="专家名称" prop="name" width="240px"></el-table-column>
        <el-table-column label="命中次数" prop="counts" width="160px"></el-table-column>
        <el-table-column label="杀三码" width="180px">
          <template v-slot="scope">
            <span v-if="scope.row.kill3">
              <span v-if="scope.row.kill3.hitData">{{ scope.row.kill3.hitData }}</span>
              <span v-else>{{ scope.row.kill3.data }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="杀六码" width="220px">
          <template v-slot="scope">
            <span v-if="scope.row.kill6">
             <span v-if="scope.row.kill6.hitData">{{ scope.row.kill6.hitData }}</span>
             <span v-else>{{ scope.row.kill6.data }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="预测数据">
          <template v-slot="scope">
            <span v-if="scope.row.data">
             <span v-if="scope.row.data.hitData">{{ scope.row.data.hitData }}</span>
             <span v-else>{{ scope.row.data.data }}</span>
            </span>
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
import {qlcPeriodMixin} from "../../../mixins/period_qlc_mixin";
import {qlcWholeBest} from "../../../api/qlc-service";

export default {
  name: "QlcWholeBestView",
  mixins: [qlcPeriodMixin],
  data() {
    return {
      query: {
        period: null,
        type: 'r22',
        limit: 10,
      },
      result: [],
    };
  },
  methods: {
    queryWholeBest() {
      qlcWholeBest(this.query).then(data => this.result = data || []);
    }
  },
  created() {
    this.queryWholeBest();
  }
}
</script>

<style scoped>

</style>