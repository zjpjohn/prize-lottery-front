<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <i-check-radio-group v-model="days">
        <i-check-radio label="今天" :value="0" size="small"/>
        <i-check-radio label="昨天" :value="1" size="small"/>
        <i-check-radio label="一周内" :value="7" size="small"/>
        <i-check-radio label="两周内" :value="14" size="small"/>
        <i-check-radio label="三周内" :value="21" size="small"/>
        <i-check-radio label="近一月" :value="30" size="small"/>
      </i-check-radio-group>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe :data="users.records" style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="用户标识" prop="userId"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="用户昵称" prop="nickname"></el-table-column>
        <el-table-column label="用户头像" width="100px">
          <template v-slot="scope">
            <img :src="scope.row.avatar+'?x-oss-process=image/resize,w_24'" alt="用户头像"
                 style="width: 24px;height: 24px">
          </template>
        </el-table-column>
        <el-table-column label="设备标识" prop="deviceId"></el-table-column>
        <el-table-column label="启动次数" prop="launches" width="100px"></el-table-column>
        <el-table-column label="最新登录" prop="launchIp"></el-table-column>
        <el-table-column label="最新版本" prop="appVersion" width="100px"></el-table-column>
        <el-table-column label="最新启动" prop="launchTime"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false" type="primary" @click="userDetail(scope.row.userId)">详情</el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无用户数据</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="users.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {activeUserList} from "../../api/user-service";
import ICheckRadio from "../../components/icheck/ICheckRadio.vue";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup.vue";

export default {
  name: "ActiveUserView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      days: 1,
      page: 1,
      limit: 8,
      users: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryActiveUsers() {
      activeUserList({
        days: this.days,
        page: this.page,
        limit: this.limit
      }).then(data => this.users = data);
    },
    userDetail(userId) {
      this.$router.push(`/user/detail/${userId}`);
    },
  },
  mounted() {
    this.queryActiveUsers();
  },
  watch: {
    days(values) {
      this.page = 1;
      this.queryActiveUsers();
    },
    page(values) {
      this.queryActiveUsers();
    },
  }
}
</script>

<style scoped>

</style>