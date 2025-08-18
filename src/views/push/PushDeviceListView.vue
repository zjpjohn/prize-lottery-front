<template>
  <div style="margin:32px 24px 0 24px">
    <div style="padding:16px 32px 48px 32px;text-align: center;">
      <el-row :gutter="64">
        <el-col :span="6">
          <div class="metrics-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 17px;font-weight:600;">昨日新增设备</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom:16px ">
              <span style="font-size: 30px;font-weight: 600;">{{ metrics.yesterdayIncr }}</span>
              <span style="font-size: 18px;font-weight: 600">台</span>
            </div>
            <div
                style="width:100%; color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">昨日设备总数</div>
              <div style="font-size: 16px;">{{ metrics.yesterdayCnt }}台</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metrics-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 17px;font-weight:600;">本周新增设备</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 30px;font-weight: bold;">{{ metrics.weekIncr }}</span>
              <span style="font-size: 18px;font-weight: 600">台</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本周设备总数</div>
              <div style="font-size: 16px;">{{ metrics.yesterdayCnt }}台</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metrics-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 17px;font-weight:600;">本月新增设备</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 30px;font-weight: bold;">{{ metrics.monthIncr }}</span>
              <span style="font-size: 18px;font-weight: 600">台</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">本月设备总数</div>
              <div style="font-size: 16px;">{{ metrics.yesterdayCnt }}台</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metrics-panel">
            <div style="width:100%;display: flex;justify-content: space-between;align-items: center;">
              <div style="font-size: 17px;font-weight:600;">上月新增设备</div>
            </div>
            <el-divider></el-divider>
            <div style="width:100%;display: flex;justify-content: start;align-items: center;margin-bottom: 16px">
              <span style="font-size: 28px;font-weight: bold;">{{ metrics.lastIncr }}</span>
              <span style="font-size: 18px;font-weight: 600">台</span>
            </div>
            <div
                style="width:100%;color:#6c6c6c;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 16px;">上月设备总数</div>
              <div style="font-size: 16px;">{{ metrics.lastCnt }}台</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 0 32px">
      <div style="display: flex;align-items: center">
        <div class="page-title" style="font-size: 20px">推送设备</div>
        <div style="margin-left: 32px;display: flex;align-items: center">
          <span style="margin: 0 16px 0 32px">设备类型</span>
          <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="请选设备类型">
            <el-option label="安卓平台" value="ANDROID"></el-option>
            <el-option label="IOS平台" value="IOS"></el-option>
          </el-select>
          <span style="margin: 0 16px 0 32px">时间范围</span>
          <el-select size="medium" style="width: 160px" clearable v-model="query.days" placeholder="请选择查询时间范围">
            <el-option label="一周内" value="7"></el-option>
            <el-option label="两周内" value="14"></el-option>
            <el-option label="三周内" value="21"></el-option>
            <el-option label="四周内" value="28"></el-option>
          </el-select>
        </div>
      </div>
      <el-table stripe :data="data.records" style="width:100%;margin-top: 20px"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="设备编号" prop="deviceId"></el-table-column>
        <el-table-column label="设备类型" prop="deviceType"></el-table-column>
        <el-table-column label="用户标识">
          <template v-slot="scope">
            <el-link :underline="false" @click="">{{ scope.row.userId }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="允许推送">
          <template v-slot="scope">
            <span style="color: #409EFF;font-size: 12px" v-if="scope.row.enable===1">是</span>
            <span style="color: #909399;font-size: 12px" v-if="scope.row.enable===0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="在线时间" prop="onlineTime"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="data.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {appDeviceList, deviceMetrics} from "../../api/push-service";

export default {
  name: "PushDeviceListView",
  data() {
    return {
      appKey: this.$route.params.appKey,
      metrics: {
        yesterdayCnt: 0,
        yesterdayIncr: 0,
        weekIncr: 0,
        monthIncr: 0,
        lastCnt: 0,
        lastIncr: 0,
      },
      page: 1,
      limit: 10,
      query: {
        type: null,
        enable: null,
        days: 7,
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    appDeviceMetrics() {
      deviceMetrics(this.appKey).then(data => this.metrics = data);
    },
    queryDeviceList() {
      let condition = Object.assign({
        appKey: this.appKey,
        page: this.page,
        limit: this.limit,
      }, this.query);
      appDeviceList(condition).then(data => this.data = data);
    },
  },
  mounted() {
    this.appDeviceMetrics();
    this.queryDeviceList();
  },
  watch: {
    page(value) {
      this.queryDeviceList();
    },
    query: {
      deep: true,
      handler(value, old) {
        this.page = 1;
        this.queryDeviceList();
      }
    },
  },
}
</script>

<style scoped>
.metrics-panel {
  padding: 16px 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: #f1f1f1 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.metrics-panel >>> .el-divider--horizontal {
  margin: 16px 0;
  background-color: #ececec;
}
</style>
