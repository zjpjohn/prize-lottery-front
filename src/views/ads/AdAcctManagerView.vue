<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">GroMore广告账户</div>
      <permission permit="super">
        <el-button style="margin-left: 24px" type="primary" icon="el-icon-plus"
                   @click="showAdd=true">创建账户
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe :data="list" style="width:100%" :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id" width="200px"></el-table-column>
        <el-table-column label="广告账户" prop="userId" width="120px"></el-table-column>
        <el-table-column label="账户角色" prop="roleId" width="120px"></el-table-column>
        <el-table-column label="账户状态" width="120px">
          <template v-slot="scope">
            <el-tag type="primary" v-if="scope.row.state===1">正常</el-tag>
            <el-tag type="text" v-if="scope.row.state===0">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账户密钥" width="120px">
          <template v-slot="scope">
            <el-link :underline="false" type="success" @click="showSecurity(scope.row)">查看密钥</el-link>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" prop="corp" width="240px"></el-table-column>
        <el-table-column label="备注说明" prop="remark" width="260px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link style="margin-right: 16px"
                       v-if="scope.row.state===1"
                       :underline="false" type="warning"
                       @click="showEditAcct(scope.row)">
                编辑
              </el-link>
              <el-link style="margin-right: 16px"
                       v-if="scope.row.state===1"
                       :underline="false" type="danger"
                       @click="stateSwitcher({id:scope.row.id,
                     state:0,
                     message:'是否要禁用广告账户',
                     btn:'禁用'})">
                禁用
              </el-link>
              <el-link style="margin-right: 16px"
                       v-if="scope.row.state===0"
                       :underline="false" type="danger"
                       @click="stateSwitcher({id:scope.row.id,
                     state:1,
                     message:'是否要撤销已禁用的广告账户',
                     btn:'撤销'})">
                撤销
              </el-link>
            </permission>
            <el-link style="margin-right: 16px" :underline="false" type="primary" @click="gotoAcctAdApp(scope.row)">
              广告应用
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无广告账户</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-dialog :visible.sync="showAdd"
               @close="cancelAddAcct"
               :modal-append-to-body="false" width="35%">
      <div slot="title" class="title">创建广告账户</div>
      <div style="padding-right: 16px">
        <el-form ref="addAcctForm" :model="addAcctDto" :rules="rules" label-width="90px">
          <el-form-item label="账户标识" prop="userId">
            <el-input v-model.number="addAcctDto.userId"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入广告账户标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="角色标识" prop="roleId">
            <el-input v-model.number="addAcctDto.roleId"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入账户角色标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="接口密钥" prop="securityKey">
            <el-input type="textarea"
                      :rows="2"
                      v-model="addAcctDto.securityKey"
                      placeholder="请输入广告接口密钥"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="账户公司" prop="corp">
            <el-input v-model="addAcctDto.corp" placeholder="请输入账户公司名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="2"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="addAcctDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitAddAcct">提交</el-button>
            <el-button type="primary" @click="cancelAddAcct">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="cancelEditAcct"
               :modal-append-to-body="false" width="35%">
      <div slot="title" class="title">编辑广告账户</div>
      <div style="padding-right: 16px">
        <el-form ref="editAcctForm" :model="editAcctDto" label-width="90px">
          <el-form-item label="账户标识">
            <el-input v-model.number="editAcctDto.userId"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入广告账户标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="角色标识">
            <el-input v-model.number="editAcctDto.roleId"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入账户角色标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="接口密钥">
            <el-input type="textarea"
                      :rows="2"
                      v-model="editAcctDto.securityKey"
                      placeholder="请输入广告接口密钥" clearable></el-input>
          </el-form-item>
          <el-form-item label="账户公司">
            <el-input v-model="editAcctDto.corp" placeholder="请输入账户公司名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="2"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="editAcctDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitEditAcct">提交</el-button>
            <el-button type="primary" @click="cancelEditAcct">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showKey"
               @close="cancelShowSecurity"
               :modal-append-to-body="false" width="30%">
      <div slot="title" class="title">账户密钥</div>
      <div style="padding: 16px 20px 32px 20px">
        <span v-if="selected">{{ selected.securityKey }}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {adAccountList, createAdAccount, editAdAccount} from "../../api/ads-service";

export default {
  name: "AdAcctManagerView",
  data() {
    return {
      list: [],
      showKey: false,
      showAdd: false,
      showEdit: false,
      selected: null,
      addAcctDto: {
        userId: null,
        roleId: null,
        securityKey: null,
        corp: null,
        remark: null,
      },
      editAcctDto: {
        userId: null,
        roleId: null,
        securityKey: null,
        corp: null,
        remark: null,
      },
      rules: {
        userId: [
          {
            required: true,
            message: '广告账户标识为空',
            trigger: 'blur',
          },
        ],
        roleId: [
          {
            required: true,
            message: '账户角色标识为空',
            trigger: 'blur',
          },
        ],
        securityKey: [
          {
            required: true,
            message: '广告接口密钥为空',
            trigger: 'blur',
          },
        ],
        corp: [
          {
            required: true,
            message: '账户公司名称为空',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    getAdAcctList() {
      adAccountList().then(data => this.list = data || []);
    },
    submitAddAcct() {
      this.$refs.addAcctForm.validate(valid => {
        if (!valid) {
          return;
        }
        createAdAccount(this.addAcctDto).then(res => {
          this.getAdAcctList();
          this.$message.success('创建成功！');
          this.cancelAddAcct();
        });
      });
    },
    cancelAddAcct() {
      this.showAdd = false;
      Object.keys(this.addAcctDto).forEach(key => this.addAcctDto[key] = null);
      this.$refs.addAcctForm.resetFields();
    },
    showSecurity(value) {
      this.selected = value;
      this.showKey  = true;
    },
    cancelShowSecurity() {
      this.showKey  = false;
      this.selected = null;
    },
    showEditAcct(value) {
      this.showEdit = true;
      this.selected = value;
      Object.keys(this.editAcctDto).forEach(key => this.editAcctDto[key] = this.selected[key]);
    },
    submitEditAcct() {
      let params = {};
      Object.keys(this.editAcctDto)
          .filter(key => this.editAcctDto[key] !== this.selected[key])
          .forEach(key => params[key] = this.editAcctDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据！');
        return;
      }
      let dto = Object.assign({id: this.selected.id}, params);
      editAdAccount(dto).then(res => {
        this.getAdAcctList();
        this.$message.success('编辑成功！');
        this.cancelEditAcct();
      });
    },
    cancelEditAcct() {
      this.showEdit = false;
      this.selected = null;
      Object.keys(this.editAcctDto).forEach(key => this.editAcctDto[key] = null);
    },
    gotoAcctAdApp(value) {
      this.$router.push(`/ads/mgr/${value.id}`);
    },
    stateSwitcher({
                    id,
                    state,
                    message,
                    btn
                  }) {
      this.$confirm(message, '操作提示', {
        confirmButtonText: btn,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editAdAccount({
          id,
          state
        }).then(res => {
          this.$message.success('操作成功!');
          this.getAdAcctList();
        });
      })
    }
  },
  mounted() {
    this.getAdAcctList();
  }
}
</script>

<style scoped>

</style>