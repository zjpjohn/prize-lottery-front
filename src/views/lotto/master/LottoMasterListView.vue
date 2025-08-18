<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">专家类型</span>
      <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="请选择专家类型">
        <el-option label="福彩3D" value="fc3d"></el-option>
        <el-option label="排列三" value="pl3"></el-option>
        <el-option label="双色球" value="ssq"></el-option>
        <el-option label="大乐透" value="dlt"></el-option>
        <el-option label="七乐彩" value="qlc"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">来源渠道</span>
      <el-select size="medium" style="width: 160px" clearable v-model="query.source" placeholder="请选择来源渠道">
        <el-option label="平台专家" :value="1"></el-option>
        <el-option label="自有专家" :value="2"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">专家状态</span>
      <el-select size="medium" style="width: 160px;margin-right: 24px" clearable v-model="query.state"
                 placeholder="请选择专家状态">
        <el-option label="无效专家" :value="0"></el-option>
        <el-option label="审核通过" :value="2"></el-option>
        <el-option label="创建待审核" :value="1"></el-option>
      </el-select>
      <el-button size="medium" plain type="primary"
                 @click="toMasterGlad">中奖喜讯
      </el-button>
      <el-button size="medium" plain type="primary"
                 @click="toMasterFeed">预测信息流
      </el-button>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="masters.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="专家标识" prop="seq" width="240px"></el-table-column>
        <el-table-column label="专家名称" prop="name" width="300px"></el-table-column>
        <el-table-column label="头像">
          <template v-slot="scope">
            <img :src="scope.row.avatar+'?x-oss-process=image/resize,w_24'" alt="用户头像"
                 style="width: 24px;height: 24px">
          </template>
        </el-table-column>
        <el-table-column label="来源渠道">
          <template v-slot="scope">
            <el-tag size="small" type="primary" v-if="scope.row.source===1">爱彩专家</el-tag>
            <el-tag size="small" type="success" v-if="scope.row.source===2">系统专家</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="来源标识" prop="sourceId"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-link type="info" :underline="false" v-if="scope.row.state===0">无效</el-link>
            <el-link type="danger" :underline="false" v-if="scope.row.state===1">待审核</el-link>
            <el-link type="success" :underline="false" v-if="scope.row.state===2">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column label="预测渠道" width="340px">
          <template v-slot="scope">
            <el-link v-for="(lotto,index) in scope.row.lotteries"
                     type="warning"
                     :underline="false"
                     :key="index+'_l_m'"
                     style="margin-right: 12px">
              {{ lotto.label }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="gmtCreate" width="220px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false" @click="goMasterDetail(scope.row.seq)">详情</el-link>
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
    <el-pagination background
                   style="margin-top: 16px"
                   layout="total,prev,pager,next"
                   :page-size="limit"
                   :current-page.sync="page"
                   :total="masters.total"></el-pagination>
  </div>
</template>

<script>
import {queryMasterList} from "../../../api/master-service";

export default {
  name: "LottoMasterListView",
  data() {
    return {
      page: 1,
      limit: 12,
      query: {
        type: null,
        source: null,
        phone: null,
        state: null,
      },
      masters: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getMasterList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      queryMasterList(condition).then(data => this.masters = data);
    },
    goMasterDetail(masterId) {
      this.$router.push(`/master/detail/${masterId}`);
    },
    toMasterGlad() {
      this.$router.push('/master/glad');
    },
    toMasterFeed() {
      this.$router.push('/master/feeds');
    },
  },
  watch: {
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getMasterList();
      }
    },
    page(value) {
      this.getMasterList();
    }
  },
  mounted() {
    this.getMasterList();
  }

}
</script>

<style scoped>

</style>
