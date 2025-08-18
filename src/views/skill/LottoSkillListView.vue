<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 32px">技巧类型</span>
      <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="请选择技巧类型">
        <el-option label="福彩3D" value="fc3d"></el-option>
        <el-option label="排列三" value="pl3"></el-option>
        <el-option label="双色球" value="ssq"></el-option>
        <el-option label="大乐透" value="dlt"></el-option>
        <el-option label="快乐8" value="kl8"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">资讯状态</span>
      <el-select size="medium" style="width: 160px;margin-right: 24px" clearable v-model="query.state"
                 placeholder="请选择技巧状态">
        <el-option label="无效技巧" :value="0"></el-option>
        <el-option label="正常技巧" :value="1"></el-option>
        <el-option label="热门技巧" :value="2"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" icon="el-icon-refresh-left" @click="fetchSkill">同步技巧</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="skills.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="seq" width="180px"></el-table-column>
        <el-table-column label="分类" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="400px"></el-table-column>
        <el-table-column label="摘要">
          <template v-slot="scope">
            <span class="skill-summary">{{ scope.row.summary.substring(0, 100) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" prop="browse" width="100px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template v-slot="scope">
            <el-link type="info" :underline="false" v-if="scope.row.state===0">无效</el-link>
            <el-link type="danger" :underline="false" v-if="scope.row.state===1">正常</el-link>
            <el-link type="success" :underline="false" v-if="scope.row.state===2">热门</el-link>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="200px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <el-link :underline="false" type="info" @click="goSkillDetail(scope.row.seq)">详情</el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
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
                   :total="skills.total"></el-pagination>
  </div>
</template>

<script>

import {lottery} from "../../libs/lottery";
import {fetchLotterySkill, skillLotteryList} from "../../api/lotto-service";

export default {
  name: "LottoSkillListView",
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        type: null,
        state: null,
      },
      skills: {
        total: 0,
        current: 1,
        records: [],
      },
    };
  },
  methods: {
    lottery(type) {
      return lottery[type];
    },
    fetchSkill() {
      fetchLotterySkill();
    },
    getSkillList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      skillLotteryList(condition).then(data => this.skills = data);
    },
    goSkillDetail(seq) {
      this.$router.push(`/info/skill/detail/${seq}`);
    }
  },
  watch: {
    page(value) {
      this.getSkillList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getSkillList();
      }
    }
  },
  mounted() {
    this.getSkillList();
  }
}
</script>

<style scoped>
.skill-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
