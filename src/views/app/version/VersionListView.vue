<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">应用版本</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <span style="margin: 0 15px 0 20px">版本状态</span>
        <el-select size="medium" style="width: 160px" clearable v-model="state" placeholder="选择状态">
          <el-option label="下线版本" :value="0"></el-option>
          <el-option label="预发版本" :value="1"></el-option>
          <el-option label="上线版本" :value="2"></el-option>
          <el-option label="主推版本" :value="3"></el-option>
        </el-select>
        <permission permit="super">
          <el-button type="primary"
                     icon="el-icon-plus"
                     style="height: 36px;margin-left: 32px"
                     @click="goAddVersion()">
            创建版本
          </el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="version.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="应用名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="应用标识" prop="logo" width="120px">
          <template v-slot="scope">
            <img :src="scope.row.logo+'?x-oss-process=image/resize,w_28'" alt="" style="width: 28px;height: 28px;">
          </template>
        </el-table-column>
        <el-table-column label="版本标识" prop="appVer" width="120px"></el-table-column>
        <el-table-column label="升级方式" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.force === 0 ? '静默升级' : '强制升级' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state.label" width="100px"></el-table-column>
        <el-table-column label="下载链接">
          <template v-slot="scope">
            <div style="font-size: 12px">{{ scope.row.appDir + scope.row.appUnity }}</div>
            <div style="font-size: 12px">{{ scope.row.appDir + scope.row.appV7a }}</div>
            <div style="font-size: 12px">{{ scope.row.appDir + scope.row.appV8a }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上线时间" prop="online" width="180px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template v-slot="scope">
            <permission permit="super">
              <el-link style="margin-right: 6px"
                       :underline="false"
                       @click="goEditVersion(scope.row.id)">详情
              </el-link>
            </permission>
            <permission permit="super" v-if="scope.row.state.label==='预发'">
              <el-link style="margin-right: 6px"
                       type="primary"
                       :underline="false"
                       @click="onlineVersion(scope.row.id,scope.row.appVer)">上线
              </el-link>
            </permission>
            <permission permit="super" v-if="scope.row.state.label==='上线'">
              <el-link style="margin-right: 6px"
                       type="success"
                       :underline="false"
                       @click="mainVersion(scope.row.id,scope.row.appVer)">主推
              </el-link>
              <el-link type="danger"
                       :underline="false"
                       @click="offlineVersion(scope.row.id,scope.row.appVer)">下线
              </el-link>
            </permission>
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
                   :total="version.total"></el-pagination>
  </div>
</template>

<script>
import {getAppVersionList, issueMainVersion, offlineAppVersion, onlineAppVersion} from "../../../api/app-service";

export default {
  name: "VersionListView",
  data() {
    return {
      appNo: this.$route.params.appNo,
      state: null,
      page: 1,
      limit: 6,
      version: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryVersionList() {
      getAppVersionList({
        appNo: this.appNo,
        page: this.page,
        limit: this.limit
      }).then(data => this.version = data)
    },
    goEditVersion(versionId) {
      this.$router.push({path: `/app/${this.appNo}/version/edit/${versionId}`});
    },
    goAddVersion() {
      this.$router.push({path: `/app/${this.appNo}/version/add`});
    },
    onlineVersion(id, version) {
      this.$confirm(`是否要上线${version}版本?`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        onlineAppVersion(id).then(res => this.queryVersionList());
      })
    },
    mainVersion(id, version) {
      this.$confirm(`是否要将${version}版本设置为主推版本?`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        issueMainVersion(id).then(res => this.queryVersionList());
      })
    },
    offlineVersion(id, version) {
      this.$confirm(`是否要下线${version}版本?`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        offlineAppVersion(id).then(res => this.queryVersionList());
      })
    }
  },
  watch: {
    state(value) {
      this.page = 1;
      this.queryVersionList();
    },
    page(value) {
      this.queryVersionList();
    }
  },
  mounted() {
    this.queryVersionList();
  }
}
</script>

<style scoped>

</style>
