<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center;justify-content: start">
      <span style="margin-right:16px">人员名称</span>
      <el-input v-model="query.name" placeholder="请输入查询联系人名称" style="width: 200px" clearable></el-input>
      <span style="margin:0 16px 0 32px">人员状态</span>
      <el-select clearable v-model="query.state" placeholder="请选择联系人状态" style="width: 200px">
        <el-option label="无效" value="0"></el-option>
        <el-option label="已创建" value="1"></el-option>
        <el-option label="使用中" value="2"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" style="margin-left: 16px" @click="showAdd=true">新增联系人</el-button>
        <el-button plain type="danger" @click="clearAppContacts">清理无效</el-button>
      </permission>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe :data="list.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id" width="100px"></el-table-column>
        <el-table-column label="应用标识" prop="appNo" width="160px"></el-table-column>
        <el-table-column label="联系人" prop="name" width="140px"></el-table-column>
        <el-table-column label="状态" prop="state.label" width="140px"></el-table-column>
        <el-table-column label="二维码" width="140px">
          <template v-slot="scope">
            <el-image :src="scope.row.qrImg+'?x-oss-process=image/resize,w_24'" alt="二维码"
                      style="width: 24px;height: 24px"
                      :preview-src-list="[scope.row.qrImg]"/>
          </template>
        </el-table-column>
        <el-table-column label="描述说明" prop="remark"></el-table-column>
        <el-table-column label="最近更新" prop="gmtModify" width="180px"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <el-link :underline="false"
                     v-if="scope.row.state.value===1"
                     type="primary" style="margin-right: 8px"
                     @click="editSelect(scope.row)">编辑
            </el-link>
            <el-link :underline="false"
                     v-if="scope.row.state.value===1"
                     type="primary" style="margin-right: 8px"
                     @click="switchContact(scope.row.id,2,'是否要使用已创建的联系人')">使用
            </el-link>
            <el-link :underline="false"
                     v-if="scope.row.state.value===2"
                     type="primary" style="margin-right: 8px"
                     @click="switchContact(scope.row.id,1,'是否要取消正在使用的联系人')">取消
            </el-link>
            <el-link :underline="false"
                     v-if="scope.row.state.value===1"
                     type="danger" style="margin-right: 8px"
                     @click="switchContact(scope.row.id,0,'是否要删除联系人')">
              删除
            </el-link>
            <el-link :underline="false"
                     type="info"
                     v-if="scope.row.state.value===0"
                     @click="switchContact(scope.row.id,1,'是否要撤销已删除联系人')">撤销
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无联系人</span>
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
    <el-dialog :visible.sync="showAdd"
               @close="closeAdd"
               :modal-append-to-body="false" width="45%">
      <div slot="title" class="title">新增联系人</div>
      <div style="margin-right: 24px">
        <el-form ref="createForm"
                 label-width="90px"
                 :model="createDto"
                 :rules="rules">
          <el-form-item label="人员名称" prop="name">
            <el-input v-model="createDto.name" placeholder="请输入联系人名称"></el-input>
          </el-form-item>
          <el-form-item label="应用图标" prop="qrImg">
            <div style="display: flex;align-items: center">
              <el-input v-model="createDto.qrImg" disabled style="margin-right: 16px"
                        placeholder="请上传联系人二维码"></el-input>
              <el-upload :action="uploadUri"
                         :show-file-list="false"
                         :before-upload="imageFilter"
                         :http-request="addQrImg">
                <el-button size="small" type="primary" style="height: 36px">上传图片</el-button>
              </el-upload>
            </div>
            <div style="line-height: 32px;height: 32px;color: #7c7c7c">注：图片格式为png,jpg，建议尺寸256*256</div>
          </el-form-item>
          <el-form-item label="描述说明">
            <el-input v-model="createDto.remark" type="textarea" :rows="3" placeholder="请输入描述说明信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAddAction">确 定</el-button>
            <el-button type="info" @click="closeAdd">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="closeEdit"
               :modal-append-to-body="false" width="45%">
      <div slot="title" class="title">编辑联系人</div>
      <div style="margin-right: 24px">
        <el-form ref="editForm"
                 label-width="90px"
                 :model="editDto">
          <el-form-item label="人员名称">
            <el-input v-model="editDto.name" placeholder="请输入联系人名称"></el-input>
          </el-form-item>
          <el-form-item label="应用图标">
            <div style="display: flex;align-items: center">
              <el-input v-model="editDto.qrImg" disabled style="margin-right: 16px"
                        placeholder="请上传联系人二维码"></el-input>
              <el-upload :action="uploadUri"
                         :show-file-list="false"
                         :before-upload="imageFilter"
                         :http-request="editQrImg">
                <el-button size="small" type="primary" style="height: 36px">上传图片</el-button>
              </el-upload>
            </div>
            <div style="line-height: 32px;height: 32px;color: #7c7c7c">注：图片格式为png,jpg，建议尺寸256*256</div>
          </el-form-item>
          <el-form-item label="描述说明">
            <el-input v-model="editDto.remark" type="textarea" :rows="3" placeholder="请输入描述说明信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEditAction">确 定</el-button>
            <el-button type="info" @click="closeEdit">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {clearContact, contactList, createContact, editContact} from "../../../api/app-service";
import oss_upload from "../../../mixins/oss_upload";

export default {
  name: "ContactListView",
  mixins: [oss_upload],
  data() {
    return {
      appNo: this.$route.params.appNo,
      uploadUri: '',
      page: 1,
      limit: 8,
      query: {
        name: null,
        state: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
      showEdit: false,
      showAdd: false,
      selected: null,
      createDto: {
        name: null,
        qrImg: null,
        remark: null,
      },
      editDto: {
        name: null,
        qrImg: null,
        remark: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '联系人名称为空'
          }
        ],
        qrImg: [
          {
            required: true,
            message: '联系人二维码为空'
          }
        ],
      },
    };
  },
  methods: {
    queryContactList() {
      let condition = Object.assign({
        appNo: this.appNo,
        page: this.page,
        limit: this.limit
      }, this.query);
      contactList(condition).then(data => this.list = data);
    },
    clearAppContacts() {
      this.$confirm('是否要清理全部无效联系人', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearContact(this.appNo).then(data => {
          this.$message.success('清理成功');
          this.queryContactList();
        });
      });
    },
    switchContact(id, state, message) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editContact({
          id: id,
          state: state
        }).then(data => {
          this.$message.success('操作成功');
          this.queryContactList();
        });
      });
    },
    editSelect(contact) {
      this.selected = contact;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.selected[key]);
      this.showEdit = true;
    },
    submitAddAction() {
      this.$refs.createForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = Object.assign({appNo: this.appNo}, this.createDto);
        createContact(params).then(res => {
          this.closeAdd();
          this.$message.success('添加成功');
          this.queryContactList();
        });
      });
    },
    closeAdd() {
      this.showAdd = false;
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
      this.$refs.createForm.resetFields();
    },
    closeEdit() {
      this.showEdit = false;
      this.selected = null;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = null);
    },
    submitEditAction() {
      let params = {};
      Object.keys(this.editDto).filter(key => this.editDto[key] !== this.selected[key])
          .forEach(key => params[key] = this.editDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      let editParams = Object.assign({id: this.selected.id}, params);
      editContact(editParams).then(res => {
        this.closeEdit();
        this.$message.success('更新成功');
        this.queryContactList();
      });
    },
    imageFilter() {
    },
    addQrImg(params) {
      this.ossUpload({
        file: params.file,
        prefix: `/app/${this.appNo}/contact/`,
        success: url => {
          this.createDto.qrImg = url;
        }
      });
    },
    editQrImg(params) {
      this.ossUpload({
        file: params.file,
        prefix: `/app/${this.appNo}/contact/`,
        success: url => {
          this.editDto.qrImg = url;
        }
      });
    },
  },
  created() {
    this.queryContactList();
  },
  watch: {
    page(value) {
      this.queryContactList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryContactList();
      }
    }
  }
}
</script>

<style scoped>

</style>