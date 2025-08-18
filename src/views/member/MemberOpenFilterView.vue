<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center;justify-content:  start">
      <span style="margin-right:16px">手机号</span>
      <el-input v-model="phone" placeholder="请输入手机号查询" style="width: 200px" clearable></el-input>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="用户标识" prop="id" width="240px"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="用户昵称" prop="nickname"></el-table-column>
        <el-table-column label="用户头像">
          <template v-slot="scope">
            <img :src="scope.row.avatar+'?x-oss-process=image/resize,w_24'" alt="用户头像"
                 style="width: 24px;height: 24px">
          </template>
        </el-table-column>
        <el-table-column label="用户类型">
          <template v-slot="scope">
            <span v-if="scope.row.expert===1">预测专家</span>
            <span v-else>普通用户</span>
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
              <el-link :underline="false" type="primary" @click="pickUser(scope.row)">开通</el-link>
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
                     :total="list.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showDialog"
               @close="closeDialog"
               :modal-append-to-body="false" width="60%">
      <div slot="title" class="title">选择会员套餐-开通会员</div>
      <div style="padding-bottom: 32px">
        <el-table :data="packList"
                  style="width:100%;margin-top: 4px"
                  :row-style="{height:'50px',color:'black'}"
                  :header-cell-style="{color:'#333333',height: '48px'}">
          <el-table-column label="套餐标识" prop="seqNo" width="200px"></el-table-column>
          <el-table-column label="套餐名称" prop="name"></el-table-column>
          <el-table-column label="套餐价格" width="100px">
            <template v-slot="scope">
              <span>{{ scope.row.price / 100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="折扣价格" width="100px">
            <template v-slot="scope">
              <span>{{ scope.row.discount / 100 }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
            <template v-slot="scope">
              <span>{{ unitType[scope.row.timeUnit.value] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优先级">
            <template v-slot="scope">
              <span>{{ scope.row.priority === 1 ? '推荐套餐' : '一般套餐' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付备注" width="200px">
            <template v-slot="scope">
              <el-select clearable
                         v-model="scope.row.channel"
                         placeholder="备注支付方式"
                         style="width: 160px">
                <el-option label="支付宝支付" value="支付宝支付"></el-option>
                <el-option label="微信支付" value="微信支付"></el-option>
                <el-option label="其他方式" value="其他方式"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template v-slot="scope">
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 10px"
                       @click="openMemberPack(scope.row)">开通
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {openMember, usingPackList} from "../../api/member-service";
import {userList} from "../../api/user-service";
import {unitMap} from "../../libs/pack_time_unit";

export default {
  name: "MemberOpenFilterView",
  data() {
    return {
      page: 1,
      limit: 10,
      phone: null,
      packList: [],
      selected: null,
      showDialog: false,
      unitType: unitMap,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryUserList() {
      userList({
        page: this.page,
        limit: this.limit,
        phone: this.phone
      }).then(data => this.list = data);
    },
    queryPackList() {
      usingPackList().then(data => {
        let value = data || [];
        value.forEach(e => e.channel = null);
        this.packList = value;
      });
    },
    pickUser(user) {
      this.selected   = user;
      this.showDialog = true;
    },
    closeDialog() {
      this.selected   = null;
      this.showDialog = false;
      this.packList.forEach(e => e.channel = null);
    },
    openMemberPack(pack) {
      let params = {
        userId: this.selected.id,
        packNo: pack.seqNo,
        channel: pack.channel || ''
      };
      openMember(params).then(_ => {
        this.$message.success('开通成功');
        this.closeDialog();
        this.packList.forEach(e => e.channel = null);
      });
    },
  },
  created() {
    this.queryPackList();
    this.queryUserList();
  },
  watch: {
    page(value) {
      this.queryUserList();
    },
    phone(value) {
      this.page = 1;
      this.queryUserList();
    }
  }
}
</script>

<style scoped>

</style>