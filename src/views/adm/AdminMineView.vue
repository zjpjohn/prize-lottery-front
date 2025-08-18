<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="width: 85%">
      <el-descriptions title="我的账户" :column="4">
        <el-descriptions-item label="账户名称">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.name }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="联系方式">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.phone }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="账户密码">
          <div style="display: flex;align-items: center">
            <permission permit="super">
              <span v-if="password" style="font-weight: bold;color: #333333;margin-right: 12px">
                {{ password }}
              </span>
              <el-link type="primary"
                       v-else
                       style="margin-right: 12px"
                       :underline="false"
                       @click="queryPassword">查看密码
              </el-link>
              <el-link type="danger"
                       :underline="false"
                       v-if="admin&&admin.state.value!==0"
                       @click="this.showReset=true">修改密码
              </el-link>
            </permission>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="账户状态">
          <div style="display: flex;align-items: center" v-if="admin">
            <span style="font-weight: bold;color: #333333">
              {{ admin.state.label }}
            </span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="账户类型">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.level.label }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="最新登录">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.loginIp }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="登录时间">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.loginTime }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="过期截止">
          <span v-if="admin" style="font-weight: bold;color: #333333">
            {{ admin.expireAt }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin:8px 0 24px 0;font-size: 15px;font-weight: bold">登录日志</div>
      <el-table stripe
                :data="loginLogs.records"
                style="width: 100%"
                :row-style="{height:'44px'}"
                :header-cell-style="{background:'#f9f9f9',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id"></el-table-column>
        <el-table-column label="登录IP" prop="loginIp"></el-table-column>
        <el-table-column label="登录地区">
          <template v-slot="scope">
            <span>{{ scope.row.ipRegion || '未知地区' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="登录时间" prop="loginTime"></el-table-column>
        <el-table-column label="过期截止" prop="expireAt"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无登录日志记录</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="loginLogs.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showReset"
               @close="closeReset"
               :modal-append-to-body="false"
               width="26%">
      <div slot="title" class="title">修改账户密码</div>
      <div>
        <el-form ref="resetPwdForm"
                 :model="resetPwdDto"
                 :rules="rules"
                 label-width="90px">
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="resetPwdDto.password" type="password" placeholder="请输入登录密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="resetPwdDto.confirm" type="password" placeholder="请输入确认密码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPwdAction">提交</el-button>
            <el-button type="danger" @click="closeReset">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {adminLoginLogs, adminPassword, queryMine, resetAdminPwd} from "../../api/adm-service";

export default {
  name: "AdminMineView",
  data() {
    return {
      page: 1,
      limit: 10,
      admin: null,
      password: null,
      showReset: false,
      loginLogs: {
        current: 1,
        total: 0,
        records: [],
      },
      resetPwdDto: {
        password: null,
        confirm: null
      },
      rules: {
        password: [
          {
            required: true,
            message: '登录密码为空',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            required: true,
            message: '确认密码为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    queryDetail() {
      queryMine().then(data => this.admin = data);
    },
    queryLoginLogs() {
      adminLoginLogs({
        page: this.page,
        limit: this.limit
      }).then(data => this.loginLogs = data);
    },
    queryPassword() {
      adminPassword().then(data => this.password = data || null);
    },
    resetPwdAction() {
      this.$refs['resetPwdForm'].validate(valid => {
        if (!valid) {
          return;
        }
        if (this.resetPwdDto.password !== this.resetPwdDto.confirm) {
          this.$message.error('密码不一致');
          return;
        }
        resetAdminPwd(this.resetPwdDto).then(response => {
          this.closeReset();
          //修改密码重新登录
          this.$store.dispatch('loginOut').then(() => {
            setTimeout(() => {
              this.$router.replace({path: '/login'})
            }, 250);
          });
        });
      })
    },
    closeReset() {
      this.showReset = false;
      Object.keys(this.resetPwdDto)
          .filter(key => key !== 'id')
          .forEach(key => this.resetPwdDto[key] = null);
      this.$refs['resetPwdForm'].resetFields();
    },
  },
  created() {
    this.queryDetail();
    this.queryLoginLogs();
  },
  watch: {
    page(value) {
      this.queryLoginLogs();
    }
  }
}
</script>

<style scoped>

</style>