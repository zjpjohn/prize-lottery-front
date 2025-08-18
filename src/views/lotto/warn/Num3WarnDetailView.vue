<template>
  <div style="margin: 32px 32px 0 32px;">
    <el-descriptions title="预警推荐" :column="5">
      <el-descriptions-item label="推荐期号">
          <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.period }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="开奖命中">
            <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.hit.description }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="最新更新">
            <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.editTime || '' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
          <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.gmtCreate }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="计算时间">
            <span style="font-weight: bold;color: #333333" v-if="result">
            {{ result.calcTime || '' }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="胆码推荐">
        <div v-if="result">
        <span v-if="result.dan.hit!==-1">
              <span v-for="(item,index) in result.dan.items" :key="'d_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
          <span v-else>
              <span v-for="(item,index) in result.dan.items" :key="'d_'+index"
                    style="margin-right: 6px">{{ item.value }}</span>
            </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="杀码推荐">
        <div v-if="result">
              <span v-for="(item,index) in result.kill.values" :key="'k_'+index"
                    style="margin-right: 6px">{{ item }}</span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="双飞推荐">
        <div v-if="result">
        <span v-if="result.twoMa.hit!==-1">
              <span v-for="(item,index) in result.twoMa.items" :key="'d_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
          <span v-else>
              <span v-for="(item,index) in result.twoMa.items" :key="'d_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="跨度推荐">
        <div v-if="result">
              <span v-for="(item,index) in result.kuaList.values" :key="'k_'+index"
                    style="margin-right: 6px">{{ item }}</span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="和值推荐">
        <div v-if="result">
              <span v-for="(item,index) in result.sumList.values" :key="'k_'+index"
                    style="margin-right: 6px">{{ item }}</span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="组三推荐" :span="2">
        <div v-if="result">
        <span v-if="result.zu6.hit!==-1">
              <span v-for="(item,index) in result.zu3.items" :key="'z3_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
          <span v-else>
              <span v-for="(item,index) in result.zu3.items" :key="'z3_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="组六推荐" :span="3">
        <div v-if="result">
           <span v-if="result.zu6.hit!==-1">
              <span v-for="(item,index) in result.zu6.items" :key="'z6_'+index"
                    style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
          <span v-else>
              <span v-for="(item,index) in result.zu6.items" :key="'z6_'+index"
                    style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
          </span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px">
      <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">浏览记录</div>
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '48px'}">
        <el-table-column label="浏览编号" prop="seqNo"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="彩种类型">
          <template v-slot="scope">
            <span>{{ scope.row.type.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览类型">
          <template v-slot="scope">
            <span>{{ scope.row.source.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无浏览记录</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="list.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {browseList, num3WarnInfo} from "../../../api/lotto-service";
import {hitReplace} from "../../../libs/lottery";

export default {
  name: "Num3WarnDetailView",
  data() {
    return {
      id: this.$route.params.id,
      period: this.$route.params.period,
      type: this.$route.query.type,
      result: null,
      page: 1,
      limit: 10,
      list: {
        current: 1,
        total: 1,
        records: [],
      },
    };
  },
  methods: {
    hitReplace,
    queryWarnDetail() {
      num3WarnInfo(this.id).then(data => this.result = data);
    },
    queryBrowseList() {
      browseList({
        page: this.page,
        limit: this.limit,
        source: 11,
        type: this.type,
        period: this.period,
      }).then(data => this.list = data);
    }
  },
  mounted() {
    this.queryWarnDetail();
    this.queryBrowseList();
  },
  watch: {
    page(value) {
      this.queryBrowseList();
    }
  },
}
</script>

<style scoped>

</style>