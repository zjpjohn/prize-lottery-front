<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">助手列表</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 32px">助手类型</span>
        <el-select v-model="query.type" clearable placeholder="请选择助手类型" style="margin-right: 24px">
          <el-option :value="type"
                     :label="types[type]"
                     v-for="type in Object.keys(types)"
                     :key="'a_t_'+type">
          </el-option>
        </el-select>
        <span style="margin-right: 16px">助手状态</span>
        <el-select v-model="query.state" clearable placeholder="请选择助手状态" style="margin-right: 24px">
          <el-option :value="0" label="无效"></el-option>
          <el-option :value="1" label="已创建"></el-option>
          <el-option :value="2" label="已发布"></el-option>
        </el-select>
        <permission permit="super">
          <el-button size="medium" type="primary" icon="el-icon-plus" @click="createAssistant">创建助手</el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                row-key="id"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id" width="120px"></el-table-column>
        <el-table-column label="类型" width="140px">
          <template v-slot="scope">
            <span>{{ type(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="适用版本" width="140px">
          <template v-slot="scope">
            <span v-if="scope.row.suitVer===null||scope.row.suitVer===''">全部版本</span>
            <span v-else>{{ scope.row.suitVer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" width="120px"></el-table-column>
        <el-table-column label="备注描述" prop="remark" width="200px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="200px"></el-table-column>
        <el-table-column label="操作" width="260px">
          <template v-slot="scope">
            <el-link type="success"
                     :underline="false"
                     style="margin-right: 16px"
                     @click="detailAssistant(scope.row.id)">详情
            </el-link>
            <permission permit="super">
              <el-link type="primary"
                       :underline="false"
                       style="margin-right: 16px"
                       @click="switchAssistant(scope.row.id,2,'是否要发布助手信息')"
                       v-if="scope.row.state.value===1">发布
              </el-link>
              <el-link type="text"
                       :underline="false"
                       style="margin-right: 16px"
                       @click="switchAssistant(scope.row.id,1,'是否要取消已发布的助手')"
                       v-if="scope.row.state.value===2">取消
              </el-link>
              <el-link type="text"
                       :underline="false"
                       @click="switchAssistant(scope.row.id,0,'是否要删除助手信息')"
                       v-if="scope.row.state.value===1">删除
              </el-link>
              <el-link type="text"
                       :underline="false"
                       @click="switchAssistant(scope.row.id,1,'是否要撤销已删除助手')"
                       v-if="scope.row.state.value===0">撤销
              </el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-pagination background
                   style="margin-top: 16px"
                   layout="total,prev,pager,next"
                   :page-size="limit"
                   :current-page.sync="page"
                   :total="list.total"></el-pagination>
  </div>
</template>

<script>
import {assistantTypes} from "../../../libs/lottery";
import Sortable from "sortablejs";
import {assistantList, editAssistant, sortAssistant} from "../../../api/app-service";

export default {
  name: "AssistantListView",
  data() {
    return {
      types: assistantTypes,
      page: 1,
      limit: 10,
      query: {
        appNo: this.$route.params['appNo'],
        type: null,
        state: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    type(type) {
      return assistantTypes[type];
    },
    createAssistant() {
      this.$router.push(`/app/${this.query.appNo}/assist/add`)
    },
    detailAssistant(id) {
      this.$router.push(`/app/${this.query.appNo}/assist/detail/${id}`);
    },
    queryAssistants() {
      let condition = Object.assign(this.query, {
        page: this.page,
        limit: this.limit
      });
      assistantList(condition).then(data => this.list = data);
    },
    switchAssistant(id, state, message) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editAssistant({
          id: id,
          state: state
        }).then(data => {
          this.$message.success('操作成功');
          this.queryAssistants();
        });
      });
    },
    tableRowDrop() {
      const tbody = document.querySelector(".el-table__body tbody");
      Sortable.create(tbody, {
        onEnd: (e) => {
          let row = this.list.records[e.oldIndex];
          sortAssistant({
            id: row.id,
            position: this.list.records[e.newIndex].sort
          })
              .then(data => this.queryAssistants());
        }
      });
    }
  },
  mounted() {
    this.tableRowDrop();
    this.queryAssistants();
  },
  watch: {
    page(value) {
      this.queryAssistants();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryAssistants();
      }
    }
  },
}
</script>

<style scoped>

</style>
