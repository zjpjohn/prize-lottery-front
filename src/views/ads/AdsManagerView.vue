<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">聚合应用</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <div style="margin: 0 16px 0 32px">平台类型</div>
        <el-select style="width: 180px" size="medium" clearable
                   v-model="query.type" placeholder="选择平台类型">
          <el-option value="android" label="android平台"></el-option>
          <el-option value="ios" label="ios平台"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">应用状态</span>
        <el-select style="width: 180px" size="medium" clearable
                   v-model="query.status" placeholder="请选择应用状态">
          <el-option :value="item.value" :label="item.label" v-for="item in states"
                     :key="item.value+'_ads_state'"></el-option>
        </el-select>
        <permission permit="super">
          <el-button style="margin-left: 24px" size="medium" type="primary" icon="el-icon-refresh"
                     @click="doSyncAdApp">同步应用
          </el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe :data="data.records" style="width:100%" :row-style="{height:'50px'}"
                :header-cell-style="{background:'#f4f4f4',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="appId" width="220px"></el-table-column>
        <el-table-column label="应用名称" prop="appName" width="260px"></el-table-column>
        <el-table-column label="系统类型" prop="osType" width="240px"></el-table-column>
        <el-table-column label="应用状态" width="240px">
          <template v-slot="scope">
            <span>{{ appStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="240px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link style="margin-right: 16px"
                     :underline="false"
                     type="primary"
                     @click="toAppView(scope.row.appId)">应用详情
            </el-link>
            <permission permit="super">
              <el-link style="margin-right: 16px"
                       :underline="false"
                       type="primary"
                       v-if="adAcct!=null && adAcct.state===1"
                       @click="doSyncAppConf(scope.row.appId)">同步配置
              </el-link>
              <el-link :underline="false"
                       type="primary"
                       v-if="adAcct!=null && adAcct.state===1"
                       @click="doSyncAppUnit(scope.row.appId)">同步广告位
              </el-link>
            </permission>
          </template>
        </el-table-column>
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
import {app_status} from '../../libs/advert'
import {adAccount, adAppList, syncAdApp, syncAdUnit, syncAppConf} from "../../api/ads-service";

export default {
  name: "AdsManagerView",
  data() {
    return {
      acctId: this.$route.params.acctId,
      states: app_status,
      adAcct: null,
      page: 1,
      limit: 10,
      query: {
        type: null,
        status: null,
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getAdAcct() {
      adAccount(this.acctId).then(data => this.adAcct = data);
    },
    queryAdAppList() {
      let condition = Object.assign({
        acctId: this.acctId,
        page: this.page,
        limit: this.limit
      }, this.query);
      adAppList(condition).then(data => this.data = data);
    },
    appStatus(status) {
      let state = this.states.filter(e => e.value === status);
      if (state) {
        return state[0].label;
      }
      return '';
    },
    doSyncAdApp() {
      this.$confirm('是否要同步全部聚合应用', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        syncAdApp(this.acctId).then(res => {
          this.$message.success('同步成功');
          this.queryAdAppList();
        });
      })
    },
    toAppView(appId) {
      this.$router.push(`/ads/mgr/${this.acctId}/${appId}/unit`);
    },
    doSyncAppUnit(appId) {
      this.$confirm('温馨提示，是否同步应用全部广告位', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        syncAdUnit(appId).then(res => {
          this.$message.success('操作成功!');
        });
      });
    },
    doSyncAppConf(appId) {
      this.$confirm('温馨提示，是否同步应用网络配置', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        syncAppConf(appId).then(res => {
          this.$message.success('操作成功!');
        });
      });
    }
  },
  mounted() {
    this.getAdAcct();
    this.queryAdAppList();
  },
  watch: {
    query: {
      deep: true,
      handler(value, old) {
        this.page = 1;
        this.queryAdAppList();
      }
    },
    page(value) {
      this.queryAdAppList();
    }
  }
}
</script>

<style scoped>

</style>
