<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: end">
      <div class="page-title">应用管理</div>
      <permission permit="super">
        <el-button plain
                   size="small"
                   type="primary"
                   icon="el-icon-plus"
                   style="height: 36px;margin-left: 36px"
                   @click="goCreateApp">创建应用
        </el-button>
      </permission>
    </div>
    <div style="margin: 32px 0 0 0 ;width: 100%">
      <el-table ref="app-table" :data="appList"
                style="width: 100%"
                stripe
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="应用标识" prop="seqNo" width="140px"></el-table-column>
        <el-table-column label="应用名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="应用图标" prop="logo" width="100px">
          <template v-slot="scope">
            <img :src="scope.row.logo+'?x-oss-process=image/resize,w_24'" style="width: 24px;height: 24px" alt="">
          </template>
        </el-table-column>
        <el-table-column label="联系方式" prop="telephone" width="120px"></el-table-column>
        <el-table-column label="版权信息" prop="copyright" width="180px"></el-table-column>
        <el-table-column label="备案信息" prop="record" width="220px"></el-table-column>
        <el-table-column label="公司名称" prop="corp" width="260px"></el-table-column>
        <el-table-column label="公司地址" prop="address" width="260px"></el-table-column>
        <el-table-column label="操作" :key="Math.random()">
          <template v-slot="scope">
            <permission permit="super" :key="Math.random()">
              <el-link type="primary"
                       :underline="false"
                       style="margin-right: 4px"
                       @click="goAppDetail(scope.row.id)">
                详情
              </el-link>
            </permission>
            <el-link style="margin-right: 4px"
                     type="primary"
                     :underline="false"
                     @click="goAppVersion(scope.row.seqNo)">
              版本
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     style="margin-right: 4px"
                     @click="goAppResource(scope.row.seqNo)">
              资源
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     style="margin-right: 4px"
                     @click="getAppFeedType(scope.row.seqNo)">
              反馈
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     style="margin-right: 4px"
                     @click="goAppAssist(scope.row.seqNo)">
              助手
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     style="margin-right: 4px"
                     @click="goAppVerify(scope.row.seqNo)">
              授权
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     @click="goAppComment(scope.row.seqNo)">
              评价
            </el-link>
            <el-link type="primary"
                     :underline="false"
                     @click="goAppContact(scope.row.seqNo)">
              联系人
            </el-link>
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
  </div>
</template>

<script>
import {getAppList} from "../../api/app-service";

export default {
  name: "AppListView",
  data() {
    return {
      appList: [],
    };
  },
  methods: {
    goCreateApp() {
      this.$router.push({path: '/app/add'})
    },
    goAppDetail(appId) {
      this.$router.push({path: `/app/detail/${appId}`});
    },
    goAppVersion(appNo) {
      this.$router.push({path: `/app/${appNo}/version`});
    },
    goAppResource(appNo) {
      this.$router.push(`/app/${appNo}/resource`);
    },
    getAppFeedType(appNo) {
      this.$router.push(`/app/${appNo}/feed`);
    },
    goAppAssist(appNo) {
      this.$router.push(`/app/${appNo}/assist`);
    },
    goAppVerify(appNo) {
      this.$router.push(`/app/${appNo}/verify/`);
    },
    goAppComment(appNo) {
      this.$router.push(`/app/${appNo}/comment`);
    },
    goAppContact(appNo) {
      this.$router.push(`/app/${appNo}/contact`);
    },
    queryAppList() {
      getAppList().then(data => this.appList = data || []);
    },
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs["app-table"].doLayout();
    });
  },
  mounted() {
    this.queryAppList();
  }
}
</script>

<style scoped>

</style>
