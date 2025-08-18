<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right:16px">手机号</span>
      <el-input v-model="userQuery.phone" placeholder="请输入查询手机号" style="width: 180px" clearable></el-input>
      <span style="margin: 0 16px 0 32px">用户渠道</span>
      <el-select clearable v-model="userQuery.channel" placeholder="用户渠道过滤" style="width: 180px">
        <el-option label="彩票站点" value="1"></el-option>
        <el-option label="用户邀请" value="2"></el-option>
        <el-option label="直接下载" value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">预测专家</span>
      <el-select clearable v-model="userQuery.expert" placeholder="预测专家过滤" style="width: 180px">
        <el-option label="普通用户" value="0"></el-option>
        <el-option label="预测专家" value="1"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">注册时间</span>
      <el-select clearable v-model="userQuery.day" placeholder="注册时间过滤" style="width: 180px">
        <el-option label="最近一周" value="7"></el-option>
        <el-option label="最近两周" value="14"></el-option>
        <el-option label="最近三周" value="21"></el-option>
        <el-option label="最近四周" value="28"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" style="margin-left: 16px" @click="goActiveUser">活跃用户</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px" class="user-table">
      <el-table stripe :data="data.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="用户标识" prop="id"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="用户昵称" prop="nickname"></el-table-column>
        <el-table-column label="用户头像">
          <template v-slot="scope">
            <img :src="scope.row.avatar+'?x-oss-process=image/resize,w_24'" alt="用户头像"
                 style="width: 24px;height: 24px">
          </template>
        </el-table-column>
        <el-table-column label="预测专家">
          <template v-slot="scope">
            <span v-if="scope.row.expert===1">预测专家</span>
            <span v-else>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column label="注册渠道">
          <template v-slot="scope">
            <span>{{ scope.row.channel.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false" type="primary" @click="userDetail(scope.row.id,scope.row.channel.value)">
                详情
              </el-link>
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
                     :total="data.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {userList} from "../../api/user-service";

export default {
  name: "UserManagerView",
  data() {
    return {
      page: 1,
      limit: 10,
      userQuery: {
        phone: null,
        expert: null,
        channel: null,
        state: null,
        day: null,
      },
      data: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryUserList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.userQuery);
      userList(condition).then(data => this.data = data);
    },
    userDetail(uid, channel) {
      this.$router.push(`/user/detail/${uid}?channel=${channel}`);
    },
    goActiveUser() {
      this.$router.push('/user/active');
    }
  },
  mounted() {
    this.queryUserList();
  },
  watch: {
    page(value) {
      this.queryUserList();
    },
    userQuery: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryUserList();
      }
    },
  }
}
</script>

<style scoped>

.user-table >>> .el-table::before {
  height: 0 !important;
}

</style>
