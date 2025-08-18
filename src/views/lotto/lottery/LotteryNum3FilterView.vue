<template>
  <div style="margin-bottom: 24px;padding-top: 16px">
    <el-form ref="filterForm" :inline="true" :model="filterDto" label-width="80px">
      <el-form-item label="查询期数">
        <el-input-number v-model="filterDto.limit" :min="50" :max="600" :step="50"></el-input-number>
      </el-form-item>
      <el-form-item label="过滤胆码">
        <el-select
            v-model="filterDto.danList"
            style="width: 200px"
            collapse-tags
            multiple
            clearable
            allow-create
            default-first-option
            placeholder="请选择胆码">
          <el-option
              v-for="item in numList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤跨度">
        <el-select
            v-model="filterDto.kuaList"
            style="width: 200px"
            multiple
            collapse-tags
            clearable
            placeholder="请选择跨度">
          <el-option
              v-for="item in kuaList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过滤和值">
        <el-select
            v-model="filterDto.sumList"
            style="width: 200px"
            multiple
            collapse-tags
            clearable
            placeholder="请选择和值">
          <el-option
              v-for="item in sumList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <permission permit="super">
          <el-button plain type="primary" style="margin-left: 12px" @click="filterLottery">查询</el-button>
        </permission>
      </el-form-item>
    </el-form>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="result"
                style="width: 100%"
                :row-style="{height:'32px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '32px'}">
        <el-table-column label="开奖日期" prop="lotDate"></el-table-column>
        <el-table-column label="开奖期号" prop="period"></el-table-column>
        <el-table-column label="前两期" prop="last2"></el-table-column>
        <el-table-column label="前一期" prop="last1"></el-table-column>
        <el-table-column label="当前期" prop="red"></el-table-column>
        <el-table-column label="后一期" prop="next1"></el-table-column>
        <el-table-column label="后两期" prop="next2"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据集</span>
          </div>
        </div>
      </el-table>
    </div>
  </div>
</template>
<script>
import {filterNum3Lottery} from "../../../api/lotto-service";
import {d3_categories} from "../../../libs/lottery";

export default {
  name: "LotteryNum3FilterView",
  data() {
    return {
      filterDto: {
        type: this.$route.query.type,
        limit: 200,
        danList: [],
        kuaList: [],
        sumList: [],
      },
      result: [],
    };
  },
  computed: {
    numList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `胆${e}`,
        };
      })
    },
    kuaList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `跨度${e}`,
        };
      })
    },
    sumList() {
      let result = [];
      for (let i = 0; i <= 27; i++) {
        result.push({
          value: `${i}`,
          label: `和值-${i}`,
        });
      }
      return result;
    }
  },
  methods: {
    filterLottery() {
      if (this.filterDto.danList.length === 0
          && this.filterDto.kuaList.length === 0
          && this.filterDto.sumList.length === 0) {
        this.$message.error('胆码、跨度及和值不允许同时为空');
        return;
      }
      filterNum3Lottery(this.filterDto).then(data => {
        this.result = data || [];
      })
    }
  },
}
</script>

<style scoped>

</style>