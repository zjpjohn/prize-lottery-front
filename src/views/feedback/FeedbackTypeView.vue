<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin: 0 16px 0 24px">适用版本</span>
      <el-select v-model="version" clearable placeholder="请选择版本">
        <el-option
            v-for="item in versionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <permission permit="super">
        <el-button type="primary" style="margin-left: 16px" @click="showAdd=true">添加类型</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                row-key="id"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '50px'}">
        <el-table-column label="标识" prop="id" width="100px"></el-table-column>
        <el-table-column label="应用标识" prop="appNo" width="160px"></el-table-column>
        <el-table-column label="应用名称" prop="appName" width="160px"></el-table-column>
        <el-table-column label="排序" prop="sort" width="100px"></el-table-column>
        <el-table-column label="反馈类型" prop="type" width="160px"></el-table-column>
        <el-table-column label="适用版本" prop="suitVer" width="220px"></el-table-column>
        <el-table-column label="类型描述" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="200px"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="primary"
                     style="margin-right: 10px"
                     @click="showEditType(scope.row)">编辑
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     style="margin-right: 10px"
                     @click="removeFeedType(scope.row)">删除
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无反馈类型</span>
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
               @close="cancelCreateType"
               :modal-append-to-body="false" width="30%">
      <div slot="title" class="title">创建反馈类型</div>
      <div>
        <el-form ref="createTypeForm" :model="addTypeDto" :rules="rules" label-width="100px">
          <el-form-item label="适用版本" prop="suitVer">
            <el-select v-model="addTypeDto.suitVer" clearable placeholder="请选择版本">
              <el-option
                  v-for="item in versionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈类型" prop="type">
            <el-input v-model="addTypeDto.type" placeholder="请输入反馈类型"></el-input>
          </el-form-item>
          <el-form-item label="类型说明">
            <el-input type="textarea"
                      size="large"
                      :rows="4"
                      :maxlength="100"
                      :show-word-limit="true"
                      v-model="addTypeDto.remark"
                      placeholder="请输入反馈类型说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitCreateType">确定</el-button>
            <el-button type="danger" @click="cancelCreateType" style="margin-left: 16px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="cancelEditType"
               :modal-append-to-body="false" width="30%">
      <div slot="title" class="title">编辑反馈类型</div>
      <div>
        <el-form ref="editTypeForm" :model="editTypeDto" label-width="100px">
          <el-form-item label="适用版本">
            <el-select v-model="editTypeDto.suitVer" clearable placeholder="请选择版本">
              <el-option
                  v-for="item in versionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈类型">
            <el-input v-model="editTypeDto.type" placeholder="请输入反馈类型"></el-input>
          </el-form-item>
          <el-form-item label="类型说明">
            <el-input type="textarea"
                      size="large"
                      :rows="4"
                      :maxlength="100"
                      :show-word-limit="true"
                      v-model="editTypeDto.remark"
                      placeholder="请输入反馈类型说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEditType">确定</el-button>
            <el-button type="danger" @click="cancelEditType" style="margin-left: 16px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {createFeedType, delFeedType, editFeedType, feedTypeList, sortFeedType} from "../../api/feedback-service";
import {getAppVersionList} from "../../api/app-service";
import Sortable from "sortablejs";

export default {
  name: "FeedbackTypeView",
  data() {
    return {
      page: 1,
      limit: 10,
      versionList: [],
      appNo: this.$route.params.appNo,
      version: null,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
      showAdd: false,
      addTypeDto: {
        type: null,
        suitVer: null,
        remark: null,
      },
      rules: {
        suitVer: [
          {
            required: true,
            message: '适用版本为空',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '反馈类型为空',
            trigger: 'blur',
          },
        ]
      },
      showEdit: false,
      selected: null,
      editTypeDto: {
        type: null,
        remark: null,
        suitVer: null,
      }
    };
  },
  methods: {
    getFeedTypeList() {
      feedTypeList({
        page: this.page,
        limit: this.limit,
        appNo: this.appNo,
        version: this.version
      }).then(data => this.list = data)
    },
    getAppVersions() {
      getAppVersionList({
        appNo: this.appNo,
        page: 1,
        limit: 200
      }).then(data => {
        let versions     = data.records.map(e => {
          return {
            label: e.appVer,
            value: e.appVer
          };
        }) || [];
        this.versionList = [
          {
            label: '全部版本',
            value: '*',
          },
          ...versions
        ];
      })
    },
    submitCreateType() {
      this.$refs.createTypeForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = Object.assign({appNo: this.appNo}, this.addTypeDto);
        createFeedType(params).then(res => {
          this.getFeedTypeList();
          this.cancelCreateType();
        })
      });
    },
    cancelCreateType() {
      this.showAdd = false;
      Object.keys(this.addTypeDto).forEach(key => this.addTypeDto[key] = null);
      this.$refs.createTypeForm.resetFields();
    },
    showEditType(scope) {
      this.showEdit = true;
      this.selected = scope;
      Object.keys(this.editTypeDto).forEach(key => this.editTypeDto[key] = this.selected[key]);
    },
    submitEditType() {
      let params = Object.assign({id: this.selected.id}, this.editTypeDto);
      editFeedType(params).then(res => {
        this.getFeedTypeList();
        this.cancelEditType();
      })
    },
    cancelEditType() {
      this.showEdit = false;
      this.selected = null;
      Object.keys(this.editTypeDto).forEach(key => this.editTypeDto[key] = null);
    },
    removeFeedType(scope) {
      this.$confirm('是否要删除反馈类型', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        delFeedType(scope.id).then(res => {
          this.getFeedTypeList();
        });
      });
    },
    tableRowSort() {
      const tbody = document.querySelector(".el-table__body tbody");
      Sortable.create(tbody, {
        onEnd: (e) => {
          let row  = this.list.records[e.oldIndex];
          let sort = this.list.records[e.newIndex].sort;
          sortFeedType({
            id: row.id,
            position: sort
          }).then(data => this.getFeedTypeList());
        }
      });
    }
  },
  mounted() {
    this.tableRowSort();
    this.getAppVersions();
    this.getFeedTypeList();
  },
  watch: {
    page(value) {
      this.getFeedTypeList();
    },
    version(value) {
      this.page = 1;
      this.getFeedTypeList();
    }
  }
}
</script>

<style scoped>

</style>