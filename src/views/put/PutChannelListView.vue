<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">渠道管理</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 32px">所属应用</span>
        <el-select size="medium"
                   style="width: 180px"
                   clearable
                   v-model="query.appNo"
                   placeholder="请选择所属应用">
          <el-option v-for="(item,index) in appList" :label="item.name" :value="item.seqNo"
                     :key="item.seqNo"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">渠道类型</span>
        <el-select size="medium"
                   style="width: 160px"
                   clearable
                   v-model="query.type"
                   placeholder="请选择渠道类型">
          <el-option label="微信群" :value="1"></el-option>
          <el-option label="QQ群" :value="2"></el-option>
          <el-option label="百家号" :value="3"></el-option>
          <el-option label="抖音" :value="4"></el-option>
          <el-option label="快手" :value="5"></el-option>
          <el-option label="小红书" :value="6"></el-option>
          <el-option label="彩票站" :value="7"></el-option>
          <el-option label="其他" :value="8"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">渠道状态</span>
        <el-select size="medium"
                   style="width: 160px"
                   clearable
                   v-model="query.state"
                   placeholder="请选择渠道状态">
          <el-option label="无效" :value="0"></el-option>
          <el-option label="已创建" :value="1"></el-option>
          <el-option label="使用中" :value="2"></el-option>
        </el-select>
        <permission permit="super">
          <el-button size="small" type="primary" icon="el-icon-plus"
                     style="height: 36px;margin-left: 36px"
                     @click="showCreate=true">创建渠道
          </el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="channels.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="渠道编号" width="180px" prop="bizNo"></el-table-column>
        <el-table-column label="所属应用" width="140px" prop="appNo"></el-table-column>
        <el-table-column label="渠道类型" width="90px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道状态" width="90px">
          <template v-slot="scope">
            <el-tag type="info" size="mini" v-if="scope.row.state.value===0">{{ scope.row.state.label }}
            </el-tag>
            <el-tag type="primary" size="mini" v-if="scope.row.state.value===1">{{ scope.row.state.label }}
            </el-tag>
            <el-tag type="success" size="mini" v-if="scope.row.state.value===2">{{ scope.row.state.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="渠道人数" width="90px" prop="targetCnt"></el-table-column>
        <el-table-column label="投放批次" width="90px" prop="batches"></el-table-column>
        <el-table-column label="累计获客" width="90px" prop="userCnt"></el-table-column>
        <el-table-column label="累计投入" width="90px">
          <template v-slot="scope">
            {{ scope.row.expectAmt / 100 }}元
          </template>
        </el-table-column>
        <el-table-column label="三方标识" width="140px" prop="thirdId"></el-table-column>
        <el-table-column label="备注说明" prop="remark"></el-table-column>
        <el-table-column label="创建时间" width="160px" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 8px"
                       v-if="scope.row.state.value===1"
                       @click="showChannelEdit(scope)">编辑
              </el-link>
              <el-link :underline="false"
                       type="success"
                       style="margin-right: 8px"
                       v-if="scope.row.state.value===1"
                       @click="channelStateAction({id:scope.row.id,state:2,message:'是否要投放已创建的渠道',success:'投放成功'})">
                投放
              </el-link>
              <el-link :underline="false"
                       type="danger"
                       v-if="scope.row.state.value===1"
                       @click="channelStateAction({id:scope.row.id,state:0,message:'是否要取消已创建的渠道',success:'取消成功'})">
                取消
              </el-link>
            </permission>
            <el-link :underline="false"
                     type="text"
                     v-if="scope.row.state.value===2"
                     @click="gotoPutPage(scope)">详情
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无投放渠道</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="channels.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showCreate"
               width="550px"
               :close-on-click-modal="false"
               :befor-close="cancelCreateCloe">
      <div slot="title">创建渠道</div>
      <el-form ref="createChannelForm"
               label-width="80px"
               :model="createDto"
               :rules="rules">
        <el-form-item label="所属应用" prop="appNo">
          <el-select size="medium"
                     clearable
                     style="width: 100%"
                     v-model="createDto.appNo"
                     placeholder="请选择渠道所属应用">
            <el-option v-for="(item,index) in appList" :label="item.name" :value="item.seqNo"
                       :key="item.seqNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道类型" prop="type">
          <el-select size="medium"
                     clearable
                     style="width: 100%"
                     v-model="createDto.type"
                     placeholder="请选择渠道类型">
            <el-option label="微信群" :value="1"></el-option>
            <el-option label="QQ群" :value="2"></el-option>
            <el-option label="百家号" :value="3"></el-option>
            <el-option label="抖音" :value="4"></el-option>
            <el-option label="快手" :value="5"></el-option>
            <el-option label="小红书" :value="6"></el-option>
            <el-option label="彩票站" :value="7"></el-option>
            <el-option label="其他" :value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标人数" prop="targetCnt">
          <el-input v-model="createDto.targetCnt" placeholder="请输入目标人数"></el-input>
        </el-form-item>
        <el-form-item label="三方标识">
          <el-input v-model="createDto.thirdId" placeholder="请输入渠道标识(如QQ号,微信群号等)"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="createDto.remark"
                    type="textarea"
                    clearable
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    placeholder="请输入备注描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="submitCreateAction">提 交</el-button>
          <el-button plain @click="cancelCreateCloe">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               width="550px"
               :close-on-click-modal="false"
               :befor-close="cancelCreateCloe">
      <div slot="title">编辑渠道</div>
      <el-form ref="editChannelForm"
               label-width="80px"
               :rules="editRules"
               :model="editDto">
        <el-form-item label="目标人数" prop="targetCnt">
          <el-input v-model="editDto.targetCnt" placeholder="请输入目标人数"></el-input>
        </el-form-item>
        <el-form-item label="三方标识">
          <el-input v-model="editDto.thirdId" placeholder="请输入渠道标识(如QQ号,微信群号等)"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="editDto.remark"
                    type="textarea"
                    clearable
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    placeholder="请输入备注描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditAction">提 交</el-button>
          <el-button type="plain" @click="cancelEditClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getAppList} from "../../api/app-service";
import {createPutChannel, editPutChannel, putChannelList} from "../../api/user-service";

export default {
  name: "PutChannelListView",
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        appNo: null,
        type: null,
        state: null,
      },
      appList: [],
      channels: {
        current: 1,
        total: 0,
        records: [],
      },
      showCreate: false,
      creating: false,
      createDto: {
        appNo: null,
        type: null,
        targetCnt: null,
        remark: null,
        thirdId: null,
      },
      showEdit: false,
      selected: null,
      editDto: {
        targetCnt: null,
        thirdId: null,
        remark: null,
      },
      rules: {
        appNo: [
          {
            required: true,
            message: '请选选择所属应用'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择渠道类型'
          }
        ],
        targetCnt: [
          {
            required: true,
            message: '请输入渠道目标人群数',
            trigger: 'blur',
          },
          {
            pattern: /^[1-9]\d*|0$/,
            message: '目标人数大于等于0',
            trigger: 'blur',
          },
        ],
      },
      editRules: {
        targetCnt: [
          {
            pattern: /^[1-9]\d*|0$/,
            message: '目标人数大于等于0',
            trigger: 'blur',
          },
        ],
      }
    };
  },
  methods: {
    queryAppList() {
      getAppList().then(data => this.appList = data || []);
    },
    queryChannelList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      putChannelList(condition).then(data => this.channels = data);
    },
    gotoPutPage(scope) {
      this.$router.push(`/agent/put/${scope.row.bizNo}/${scope.row.appNo}/record`);
    },
    submitCreateAction() {
      this.$refs.createChannelForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        createPutChannel(this.createDto).then(res => {
          this.queryChannelList();
          this.cancelCreateCloe();
          this.$message.success('创建成功');
        });
      });
    },
    cancelCreateCloe() {
      this.showCreate = false;
      this.creating   = false;
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
      this.$refs.createChannelForm.resetFields();
    },
    showChannelEdit(scope) {
      this.selected = scope.row;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.selected[key]);
      this.showEdit = true;
    },
    submitEditAction() {
      this.$refs.editChannelForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.editDto).filter(key => this.editDto[key] !== this.selected[key])
            .forEach(key => params[key] = this.editDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.success('没有更新数据');
          return;
        }
        editPutChannel(Object.assign({id: this.selected.id}, params)).then(res => {
          this.cancelEditClose();
          this.queryChannelList();
        });
      });
    },
    channelStateAction({
                         id,
                         state,
                         message,
                         success
                       }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editPutChannel({
          id: id,
          state: state,
        }).then(res => {
          this.$message.success(success);
          this.queryChannelList();
        })
      });
    },
    cancelEditClose() {
      this.showEdit = false;
      this.selected = null;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = null);
      this.$refs.editChannelForm.resetFields();
    },
  },
  created() {
    this.queryAppList();
    this.queryChannelList();
  },
  watch: {
    query: {
      deep: true,
      handler(newVal, oldVal) {
        this.page = 1;
        this.queryChannelList();
      }
    },
    page(value) {
      this.queryChannelList();
    }
  }
}
</script>

<style scoped>

</style>