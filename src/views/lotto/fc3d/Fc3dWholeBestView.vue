<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="margin-top: 28px;display: flex;align-items: center">
      <span style="margin-right: 16px">开奖期号</span>
      <el-select size="medium" v-model="query.period" placeholder="请选择期号" clearable
                 style="width:160px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_fsd'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <span style="margin: 0 16px">数据类型</span>
      <el-select size="medium" v-model="query.type" placeholder="请选择数据类型"
                 style="width:160px;margin-right: 16px">
        <el-option label="定双胆" value="d2"></el-option>
        <el-option label="定三胆" value="d3"></el-option>
        <el-option label="选五码" value="c5"></el-option>
        <el-option label="选六码" value="c6"></el-option>
        <el-option label="杀一码" value="k1"></el-option>
      </el-select>
      <span style="margin: 0 16px">专家排名</span>
      <el-select size="medium" v-model="query.limit" placeholder="请选择专家排名"
                 style="width:160px;margin-right: 16px">
        <el-option label="前10名专家" :value="10"></el-option>
        <el-option label="前15名专家" :value="15"></el-option>
        <el-option label="前20名专家" :value="20"></el-option>
        <el-option label="前25名专家" :value="25"></el-option>
        <el-option label="前30名专家" :value="30"></el-option>
      </el-select>
      <el-button plain type="primary" @click="queryWholeBest">查询统计</el-button>
    </div>
    <div style="margin-top: 24px">
      <el-table :data="result" stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="预测期号" prop="period" width="160px"></el-table-column>
        <el-table-column label="专家名称" prop="name" width="240px"></el-table-column>
        <el-table-column label="命中次数" prop="counts" width="160px"></el-table-column>
        <el-table-column label="预测数据">
          <template v-slot="scope">
            <span v-if="scope.row.data">
             <span v-if="scope.row.data.hitData">{{ scope.row.data.hitData }}</span>
             <span v-else>{{ scope.row.data.data }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="杀码数据">
          <template v-slot="scope">
            <span v-if="scope.row.k1">
              <span v-if="scope.row.k1.hitData">{{ scope.row.k1.hitData }}</span>
              <span v-else>{{ scope.row.k1.data }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="七码数据">
          <template v-slot="scope">
            <span v-if="scope.row.c7">
             <span v-if="scope.row.c7.hitData">{{ scope.row.c7.hitData }}</span>
             <span v-else>{{ scope.row.c7.data }}</span>
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
import {fc3dPeriodMixin} from "../../../mixins/period_fc3d_mixin";
import {fc3dWholeBest} from "../../../api/fc3d-service";

export default {
  name: "Fc3dWholeBestView",
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      query: {
        period: null,
        type: 'd3',
        limit: 10,
      },
      result: [],
    };
  },
  methods: {
    queryWholeBest() {
      fc3dWholeBest(this.query).then(data => this.result = data || []);
    }
  },
  created() {
    this.queryWholeBest();
  }
}
</script>

<style scoped>

</style>