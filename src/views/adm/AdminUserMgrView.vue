<template>
  <div style="margin: 32px 32px 0 32px">
    <permission permit="super">
      <el-button plain
                 size="small"
                 type="primary"
                 icon="el-icon-plus"
                 style="height: 34px;"
                 @click="toCreate">
        创建账号
      </el-button>
    </permission>
    <div style="margin-top: 32px;">
      <el-table :data="admins"
                style="width: 100%"
                stripe
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="账户名称">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
            <el-tag size="mini" v-if="user.name===scope.row.name">当前账户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="账户类型" prop="level.label"></el-table-column>
        <el-table-column label="账户状态">
          <template v-slot="scope">
            <el-tag type="primary" size="small" v-if="scope.row.state.value===1">正常</el-tag>
            <el-tag type="warning" size="small" v-if="scope.row.state.value===2">锁定</el-tag>
            <el-tag type="danger" size="small" v-if="scope.row.state.value===0">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="gmtModify"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link type="text" :underline="false" @click="toDetail(scope.row)">详情</el-link>
            <permission permit="super">
              <el-link type="danger"
                       style="margin-left: 16px"
                       :underline="false"
                       @click="removeAdminUser(scope.row.id)"
                       v-if="scope.row.state.value!==0&&user.name!==scope.row.name">删除
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
import {deleteAdmin, queryAdminList,} from "../../api/adm-service";
import {mapGetters} from "vuex";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../components/icheck/ICheckRadio";

export default {
  name: "AdminUserMgrView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      levels: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '一般管理员',
          value: 2
        },
      ],
      admins: [],
    };
  },
  computed: {
    ...mapGetters({user: 'user/user'}),
  },
  methods: {
    toCreate() {
      this.$router.push('/system/admin/create');
    },
    toDetail(row) {
      if (row.name === this.user.name) {
        this.$router.push('/system/mine');
        return;
      }
      this.$router.push(`/system/admin/detail/${row.id}`);
    },
    queryAdmins() {
      queryAdminList().then(data => {
        let filters  = data.filter(e => e.name === this.user.name);
        let excludes = data.filter(e => e.name !== this.user.name);
        this.admins  = [
          ...filters,
          ...excludes
        ];
      })
    },
    removeAdminUser(id) {
      this.$confirm('删除账户后将将无法使用，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdmin(id).then(response => this.queryAdmins());
      });
    }
  },
  mounted() {
    this.queryAdmins();
  }
}
</script>

<style scoped>

</style>
