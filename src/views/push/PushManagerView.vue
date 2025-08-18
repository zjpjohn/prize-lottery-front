<template>
  <div style="margin:32px 24px 0 24px">
    <permission permit="super">
      <el-button size="medium" type="primary" icon="el-icon-plus">创建应用
      </el-button>
    </permission>
    <div style="margin-top: 32px">
      <el-table stripe :data="appList" style="width:100%" :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="应用编号" prop="appNo" width="240px"></el-table-column>
        <el-table-column label="应用名称" prop="appName" width="240px"></el-table-column>
        <el-table-column label="推送标识" prop="appKey" width="240px"></el-table-column>
        <el-table-column label="应用平台" prop="platform" width="200px"></el-table-column>
        <el-table-column label="描述信息" prop="remark" width="280px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="220px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link style="margin-right: 16px"
                       :underline="false"
                       type="primary">编辑
              </el-link>
              <el-link style="margin-right: 16px"
                       :underline="false"
                       type="primary">设备管理
              </el-link>
              <el-link style="margin-right: 16px"
                       :underline="false"
                       type="primary">标签管理
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
    </div>
  </div>
</template>

<script>
import {appList} from "../../api/push-service";

export default {
  name: "PushManagerView",
  data() {
    return {
      appList: [],
      appDto: {
        appNo: null,
        appName: null,
        appKey: null,
        platform: null,
        remark: null,
      },
    };
  },
  methods: {
    queryAppList() {
      appList().then(data => this.appList = data || []);
    },
  },
  mounted() {
    this.queryAppList();
  },
}
</script>

<style scoped>

</style>
