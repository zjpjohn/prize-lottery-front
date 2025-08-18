<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">专家中奖喜讯</div>
      <div style="margin-left: 32px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 32px">彩种类型</span>
        <el-select size="medium" style="width: 160px" clearable v-model="query.lottery" placeholder="请选择彩种类型">
          <el-option label="福彩3D" value="fc3d"></el-option>
          <el-option label="排列三" value="pl3"></el-option>
          <el-option label="双色球" value="ssq"></el-option>
          <el-option label="大乐透" value="dlt"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">喜讯类型</span>
        <el-select size="medium" style="width: 160px;margin-right: 16px" clearable v-model="query.type"
                   placeholder="请选择喜讯类型">
          <el-option label="中奖喜讯" :value="1"></el-option>
          <el-option label="高命中喜讯" :value="2"></el-option>
        </el-select>
        <el-button size="medium" @click="extractGlads">提取喜讯</el-button>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="glads.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="期号" prop="period"></el-table-column>
        <el-table-column label="彩种">
          <template v-slot="scope">
            <span>{{ scope.row.lottery.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="喜讯类型">
          <template v-slot="scope">
            <span v-if="scope.row.type===1">中奖喜讯</span>
            <span v-if="scope.row.type===2">高命中喜讯</span>
          </template>
        </el-table-column>
        <el-table-column label="专家名称">
          <template v-slot="scope">
            <span>{{ scope.row.master.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专家头像">
          <template v-slot="scope">
            <img :src="scope.row.master.avatar" alt="" style="width:32px;height: 32px">
          </template>
        </el-table-column>
        <el-table-column label="喜讯内容" prop="content"></el-table-column>
        <el-table-column label="生成时间" prop="gmtCreate"></el-table-column>
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
                   :total="glads.total"></el-pagination>
  </div>
</template>

<script>
import {extractGlads, masterGladList} from "../../../api/master-service";

export default {
  name: "MasterGladListView",
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        period: null,
        lottery: null,
        type: null,
      },
      glads: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getMasterGlads() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      masterGladList(condition).then(data => this.glads = data);
    },
    extractGlads() {
      this.$confirm('是否要手动提取中奖专家喜讯？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        extractGlads().then(res => {
          this.$message.success('提取成功');
          this.getMasterGlads();
        })
      });
    }
  },
  mounted() {
    this.getMasterGlads();
  },
  watch: {
    page(value) {
      this.getMasterGlads();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getMasterGlads();
      }
    }
  },
}
</script>

<style scoped>

</style>
