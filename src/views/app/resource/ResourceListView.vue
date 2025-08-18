<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">应用资源</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 20px">资源类型</span>
        <el-select size="medium" style="width: 160px" clearable v-model="query.type" placeholder="选择类型">
          <el-option label="应用图标" :value="1"></el-option>
          <el-option label="背景图片" :value="2"></el-option>
          <el-option label="其他资源" :value="3"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 20px">资源状态</span>
        <el-select size="medium" style="width: 180px" clearable v-model="query.state" placeholder="选择状态">
          <el-option label="不可用资源" :value="0"></el-option>
          <el-option label="待发布资源" :value="1"></el-option>
          <el-option label="已使用资源" :value="2"></el-option>
        </el-select>
        <permission permit="super">
          <el-button type="primary"
                     plain
                     icon="el-icon-plus"
                     style="height: 36px;margin-left: 24px"
                     @click="toCreateResource">
            创建资源
          </el-button>
          <el-button type="info"
                     icon="el-icon-top"
                     plain
                     style="height: 36px;margin-left: 24px"
                     @click="loadResource">
            加载缓存
          </el-button>
          <el-button type="success"
                     plain
                     icon="el-icon-download"
                     style="height: 36px;margin-left: 24px"
                     @click="exportResource">
            导出资源
          </el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="feNo" width="220px"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="分类">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用中">
          <template v-slot="scope">
            <el-image :src="scope.row.uri+'?x-oss-process=image/resize,h_32'"
                      :preview-src-list="[scope.row.uri]"
                      style="width: 32px;height: 32px"
                      fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="上次使用">
          <template v-slot="scope">
            <el-image v-if="scope.row.lastUri"
                      :src="scope.row.lastUri+'?x-oss-process=image/resize,h_32'"
                      :preview-src-list="[scope.row.lastUri]"
                      style="width: 32px;height: 32px"
                      fit="contain"></el-image>
            <span style="color: #9c9c9c" v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="默认资源">
          <template v-slot="scope">
            <el-image :src="scope.row.defUri+'?x-oss-process=image/resize,h_32'"
                      :preview-src-list="[scope.row.defUri]"
                      style="width: 32px;height: 32px"
                      fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link type="primary"
                     style="margin-right: 10px"
                     :underline="false"
                     @click="toEditResource(scope.row.id)">详情
            </el-link>
            <permission permit="super">
              <el-link type="success"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       :underline="false"
                       @click="resourceState(scope.row.id,1)">上线
              </el-link>
              <el-link type="warning"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===2"
                       :underline="false"
                       @click="resourceState(scope.row.id,2)">下线
              </el-link>
              <el-link type="danger"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       :underline="false"
                       @click="resourceState(scope.row.id,3)">删除
              </el-link>
              <el-link type="text"
                       style="margin-right: 10px"
                       v-if="scope.row.lastUri
                       &&scope.row.lastUri.trim().length>0
                       &&scope.row.lastUri!==scope.row.uri"
                       :underline="false"
                       @click="rollbackResource(scope.row.id)">回滚
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
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="data.total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {exportAppResource, loadResources, resourceList, resourceState} from "../../../api/app-service";

export default {
  name: "ResourceListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        appNo: this.$route.params.appNo,
        state: null,
        type: null,
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getAppResources() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      resourceList(condition).then(data => this.data = data);
    },
    toCreateResource() {
      this.$router.push(`/app/${this.query.appNo}/resource/add`);
    },
    toEditResource(resId) {
      this.$router.push(`/app/${this.query.appNo}/resource/edit/${resId}`);
    },
    resourceState(id, action) {
      resourceState({
        id: id,
        action: action
      }).then(res => {
        this.$message.success('操作成功');
        this.getAppResources();
      })
    },
    loadResource() {
      this.$confirm('是否要加载全部资源到缓存', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loadResources(this.query.appNo)
            .then(res => this.$message.success('加载成功'));
      });
    },
    rollbackResource(id) {
      this.$confirm('是否要回滚正在使用的资源', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resourceState({
          id: id,
          state: 4
        }).then(res => {
          this.$message.success('回滚成功');
          this.getAppResources();
        });
      });
    },
    exportResource() {
      this.$confirm('是否要导出应用资源', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        exportAppResource(this.$route.params.appNo).then(data => {
          const jsonStr     = JSON.stringify(data);
          const url         = window.URL || window.webkitURL || window;
          const blob        = new Blob([jsonStr]);
          const saveLink    = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          saveLink.href     = url.createObjectURL(blob);
          saveLink.download = `${this.$route.params.appNo}_app_resource.json`;
          saveLink.click();
        });
      })
    }
  },
  watch: {
    page(value) {
      this.getAppResources();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getAppResources();
      }
    }
  },
  mounted() {
    this.getAppResources();
  },
}
</script>

<style scoped>

</style>
