<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">特权管理</div>
      <permission permit="super">
        <el-button plain
                   type="primary"
                   style="margin-left: 32px"
                   @click="showAdd=true">
          创建特权
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="list"
                style="width: 100%"
                row-key="id"
                class="sortingVisible"
                :row-style="{height:'52px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="特权名称" prop="name" width="180px"></el-table-column>
        <el-table-column label="特权图标" prop="icon" width="140px">
          <template v-slot="scope">
            <img :src="scope.row.icon+'?x-oss-process=image/resize,w_24,h_24,m_fixed'" alt="">
          </template>
        </el-table-column>
        <el-table-column label="排序标识" prop="sorted" width="140px"></el-table-column>
        <el-table-column label="内容说明" prop="content"></el-table-column>
        <el-table-column label="操作时间" prop="gmtModify" width="180px"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="primary"
                     style="margin-right: 10px;font-size: 13px"
                     @click="showEditPrivilege(scope.row)">编辑
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     style="font-size: 13px"
                     @click="delPrivilege(scope.row)">删除
            </el-link>
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
    <el-dialog :visible.sync="showAdd"
               @close="cancelCreate"
               :modal-append-to-body="false" width="35%">
      <div slot="title" class="title">添加套餐特权</div>
      <el-form ref="createForm" :model="createDto" :rules="rules" label-width="100px">
        <el-form-item label="特权名称" prop="name">
          <el-input v-model="createDto.name" size="large" placeholder="请输入套餐特权名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="特权图标" prop="icon">
          <el-input v-model="createDto.icon" size="large" placeholder="请输入套餐特权图标链接"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="特权内容" prop="content">
          <el-input type="textarea"
                    size="large"
                    :rows="4"
                    :maxlength="200"
                    :show-word-limit="true"
                    v-model="createDto.content"
                    placeholder="请输入审核规则说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreate">提交</el-button>
          <el-button type="danger" @click="cancelCreate" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="cancelEdit"
               :modal-append-to-body="false" width="35%">
      <div slot="title" class="title">编辑套餐特权</div>
      <el-form ref="editForm" :model="editDto" label-width="100px">
        <el-form-item label="特权名称" prop="name">
          <el-input v-model="editDto.name" size="large" placeholder="请输入套餐特权名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="特权图标" prop="icon">
          <el-input v-model="editDto.icon" size="large" placeholder="请输入套餐特权图标链接"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="特权内容" prop="content">
          <el-input type="textarea"
                    size="large"
                    :rows="4"
                    :maxlength="200"
                    :show-word-limit="true"
                    v-model="editDto.content"
                    placeholder="请输入审核规则说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit">提交</el-button>
          <el-button type="danger" @click="cancelEdit" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import {addPrivilege, editPrivilege, packPrivileges, removePrivilege, sortPrivilege} from "../../api/member-service";

export default {
  name: "PackPrivilegeListView",
  data() {
    return {
      list: [],
      showAdd: false,
      createDto: {
        name: null,
        content: null,
        icon: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '套餐特权名称为空',
            trigger: 'blur'
          },
        ],
        content: [
          {
            required: true,
            message: '套餐特权内容为空',
            trigger: 'blur'
          },
        ],
        icon: [
          {
            required: true,
            message: '套餐特权图标为空',
            trigger: 'blur'
          },
        ],
      },
      selected: null,
      showEdit: false,
      editDto: {
        name: null,
        content: null,
        icon: null,
      },
    };
  },
  methods: {
    queryPrivileges() {
      packPrivileges().then(data => this.list = data || []);
    },
    submitCreate() {
      this.$refs.createForm.validate(valid => {
        if (!valid) {
          return;
        }
        addPrivilege(this.createDto).then(_ => {
          this.cancelCreate();
          this.queryPrivileges();
        })
      });
    },
    cancelCreate() {
      this.showAdd = false;
      this.$refs.createForm.resetFields();
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
    },
    delPrivilege(value) {
      this.$confirm('是否要删除套餐特权', '重要提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        removePrivilege({
          packNo: value.packNo,
          pId: value.id
        }).then(_ => {
          this.queryPrivileges();
        })
      })
    },
    showEditPrivilege(row) {
      this.selected = row;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.selected[key]);
      this.showEdit = true;
    },
    submitEdit() {
      let params = {};
      Object.keys(this.editDto)
          .filter(key => this.editDto[key] !== this.selected[key])
          .forEach(key => params[key] = this.editDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('暂无更新数据');
        return;
      }
      let dto = Object.assign({
        id: this.selected.id,
      }, params);
      editPrivilege(dto).then(_ => {
        this.cancelEdit();
        this.queryPrivileges();
      });
    },
    cancelEdit() {
      this.showEdit = false;
      this.selected = null;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = null);
    },
    rowSortDraggable() {
      const tbody = document.querySelector('.sortingVisible .el-table__body-wrapper tbody');
      const that  = this;
      Sortable.create(tbody, {
        onEnd({
                newIndex,
                oldIndex
              }) {
          const oldData = that.privileges[oldIndex];
          sortPrivilege({
            id: oldData.id,
            packNo: oldData.packNo,
            index: newIndex,
          }).then(_ => {
            that.queryPrivileges();
          });
        }
      });
    }
  },
  created() {
    this.queryPrivileges();
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.rowSortDraggable();
    });
  }
}
</script>

<style scoped>

</style>