<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right:16px">代理等级</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.agent"
                 placeholder="请选择代理类型">
        <el-option label="普通用户" :value="0"></el-option>
        <el-option label="一级代理" :value="1"></el-option>
        <el-option label="二级代理" :value="2"></el-option>
        <el-option label="三级代理" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 32px">规则状态</span>
      <el-select size="medium"
                 style="width: 160px;margin-right: 24px"
                 clearable
                 v-model="query.state"
                 placeholder="请选择规则状态">
        <el-option label="无效规则" :value="0"></el-option>
        <el-option label="创建完成" :value="1"></el-option>
        <el-option label="已预启用" :value="2"></el-option>
        <el-option label="正在使用" :value="3"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain
                   type="primary"
                   size="medium"
                   style="margin-right: 16px"
                   icon="el-icon-plus"
                   @click="showCreate=true">创建规则
        </el-button>
      </permission>
      <permission permit="super">
        <el-button plain type="warning" size="medium" icon="el-icon-delete" @click="clearAgentRules">清除规则
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="rules.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="规则标识" prop="id" width="120px"></el-table-column>
        <el-table-column label="代理等级" width="160px">
          <template v-slot="scope">
            <span>{{ scope.row.agent.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分润(是/否)" width="160px">
          <template v-slot="scope">
            <span v-if="scope.row.profited===0">否</span>
            <span v-if="scope.row.profited===1">是</span>
          </template>
        </el-table-column>
        <el-table-column label="分润比例" prop="ratio" width="160px"></el-table-column>
        <el-table-column label="金币奖励" prop="reward" width="160px"></el-table-column>
        <el-table-column label="规则状态" width="160px">
          <template v-slot="scope">
            <el-tag effect="plain" :type="state[scope.row.state.value]">{{ scope.row.state.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="启用时间" prop="startTime" width="160px">
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 12px"
                       v-if="scope.row.state.value===1"
                       @click="showPreStartRule(scope.row)">预发
              </el-link>
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 12px"
                       v-if="scope.row.state.value===1||scope.row.state.value===2"
                       @click="issueAgentRule(scope.row.id)">发布
              </el-link>
              <el-link :underline="false"
                       type="warning"
                       style="margin-right: 12px"
                       v-if="scope.row.state.value===1"
                       @click="showRuleEdit(scope.row)">编辑
              </el-link>
              <el-link :underline="false"
                       type="danger"
                       style="margin-right: 12px"
                       v-if="scope.row.state.value===1"
                       @click="cancelRule(scope.row.id)">取消
              </el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无规则</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-pagination background
                   style="margin-top: 16px"
                   layout="total,prev,pager,next"
                   :page-size="limit"
                   :current-page.sync="page"
                   :total="rules.total">
    </el-pagination>
    <el-dialog :visible.sync="showCreate"
               width="550px"
               :before-close="createDialogClose">
      <div slot="title">新建代理规则</div>
      <div style="margin-right: 32px">
        <el-form ref="createRuleForm"
                 label-width="100px"
                 :model="createRuleDto"
                 :rules="createRules">
          <el-form-item label="代理类型" prop="agent">
            <el-select size="medium"
                       style="width: 300px"
                       clearable
                       v-model="createRuleDto.agent"
                       @change="agentChange"
                       placeholder="请选择代理类型">
              <el-option label="普通用户" :value="0"></el-option>
              <el-option label="一级代理" :value="1"></el-option>
              <el-option label="二级代理" :value="2"></el-option>
              <el-option label="三级代理" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分润" prop="profited">
            <i-check-radio-group v-model="createRuleDto.profited" style="height: 24px;line-height: 24px !important;">
              <i-check-radio size="mini" label="不分润" :value="0"></i-check-radio>
              <i-check-radio
                  size="mini"
                  label="参与分润"
                  :disabled="createRuleDto.agent===0"
                  :value="1"></i-check-radio>
            </i-check-radio-group>
          </el-form-item>
          <el-form-item label="分润比例">
            <el-input-number v-model="createRuleDto.ratio"
                             style="width: 250px;"
                             :disabled="createRuleDto.profited===0"
                             :max="1"
                             :min="0"
                             :step="0.05"
                             :precision="2"
                             placeholder="请输入分润比例"></el-input-number>
          </el-form-item>
          <el-form-item label="金币奖励">
            <el-input-number v-model="createRuleDto.reward"
                             :disabled="createRuleDto.profited===1"
                             style="width: 250px;"
                             :max="5000"
                             :step="50"
                             :min="0"
                             placeholder="请输入金币奖励"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" :loading="creating" @click="createAgentRule">添 加</el-button>
            <el-button size="small" type="plain" @click="createDialogClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               width="550px"
               :before-close="editDialogClose">
      <div slot="title">编辑代理规则</div>
      <div style="margin-right: 32px">
        <el-form label-width="100px"
                 :model="editRuleDto">
          <el-form-item label="是否分润" prop="profited">
            <i-check-radio-group v-model="editRuleDto.profited" style="height: 24px;line-height: 24px !important;">
              <i-check-radio size="mini" label="不分润" :value="0"></i-check-radio>
              <i-check-radio size="mini" label="参与分润" :value="1"></i-check-radio>
            </i-check-radio-group>
          </el-form-item>
          <el-form-item label="分润比例">
            <el-input-number v-model="editRuleDto.ratio"
                             style="width: 250px;"
                             :disabled="editRuleDto.profited===0"
                             :max="1"
                             :min="0"
                             :step="0.05"
                             :precision="2"
                             placeholder="请输入分润比例"></el-input-number>
          </el-form-item>
          <el-form-item label="金币奖励">
            <el-input-number v-model="editRuleDto.reward"
                             style="width: 250px;"
                             :disabled="editRuleDto.profited===1"
                             :max="5000"
                             :step="50"
                             :min="0"
                             placeholder="请输入金币奖励"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitEditRule">编 辑</el-button>
            <el-button size="small" type="plain" @click="editDialogClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showPreStart"
               width="600px"
               :before-close="preStartDialogClose">
      <div slot="title">预发布规则</div>
      <div style="margin-right: 32px">
        <el-form ref="preStartForm"
                 label-width="100px"
                 :model="preStartDto"
                 :rules="preStartRules">
          <el-form-item label="启用时间" prop="startTime">
            <el-date-picker type="datetime"
                            clearable
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="preStartDto.startTime"
                            placeholder="请选择启用时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitPreStart">预发布</el-button>
            <el-button size="small" type="plain" @click="preStartDialogClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addAgentRule, agentRuleList, clearRules, editAgentRule,} from "../../../api/agent-service";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";

const stateTag = {
  0: 'info',
  1: '',
  2: 'warning',
  3: 'success',
};
export default {
  name: "AgentRuleListView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  computed: {
    state() {
      return stateTag;
    }
  },
  data() {
    return {
      page: 1,
      limit: 8,
      query: {
        agent: null,
        state: null,
      },
      rules: {
        current: 1,
        total: 0,
        records: [],
      },
      showCreate: false,
      creating: false,
      createRuleDto: {
        agent: null,
        profited: null,
        ratio: null,
        reward: null,
      },
      createRules: {
        agent: [
          {
            required: true,
            message: '请选择代理类型'
          }
        ],
        profited: [
          {
            required: true,
            message: '请选择是否分润'
          }
        ],
      },
      showEdit: false,
      selectRule: null,
      editRuleDto: {
        profited: null,
        ratio: null,
        reward: null,
      },
      showPreStart: false,
      preStartDto: {
        id: null,
        startTime: null,
      },
      preStartRules: {
        startTime: [
          {
            required: true,
            message: '请选择使用时间',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    getRuleList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      agentRuleList(condition).then(data => this.rules = data);
    },
    createDialogClose() {
      this.showCreate = false;
      this.creating   = false;
      Object.keys(this.createRuleDto)
          .forEach(key => this.createRuleDto[key] = null);
      this.$refs.createRuleForm.resetFields();
    },
    agentChange(value) {
      if (value == null || value !== 0) {
        this.createRuleDto.profited = null;
        return;
      }
      if (value === 0) {
        this.createRuleDto.profited = 0;
      }
    },
    createAgentRule() {
      this.$refs.createRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        addAgentRule(this.createRuleDto).then(res => {
          this.page = 1;
          this.getRuleList();
          this.createDialogClose();
        });
      })
    },
    showRuleEdit(rule) {
      this.selectRule = rule;
      Object.keys(this.editRuleDto).forEach(key => this.editRuleDto[key] = rule[key]);
      this.showEdit = true;
    },
    submitEditRule() {
      let params = {};
      Object.keys(this.editRuleDto)
          .filter(key => this.editRuleDto[key] !== this.selectRule[key])
          .forEach(key => params[key] = this.editRuleDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      editAgentRule(Object.assign({
        id: this.selectRule.id,
        profited: this.editRuleDto.profited,
      }, params))
          .then(res => {
            this.getRuleList();
            this.editDialogClose();
          })
    },
    editDialogClose() {
      this.showEdit   = false;
      this.selectRule = null;
      Object.keys(this.editRuleDto).forEach(key => this.editRuleDto[key] = null);
    },
    preStartDialogClose() {
      this.showPreStart = false;
      Object.keys(this.preStartDto).forEach(key => this.preStartDto[key] = null);
      this.$refs.preStartForm.resetFields();
    },
    showPreStartRule(rule) {
      this.preStartDto.id = rule.id;
      this.showPreStart   = true;
    },
    submitPreStart() {
      this.$refs.preStartForm.validate(valid => {
        if (!valid) {
          return;
        }
        let data = Object.assign({state: 2}, this.preStartDto);
        editAgentRule(data).then(res => {
          this.getRuleList();
          this.preStartDialogClose();
        });
      })
    },
    issueAgentRule(id) {
      this.$confirm('规则启用后将立即生效请谨慎操作，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => editAgentRule({
        id: id,
        state: 3,
      })).then(res => {
        this.$message.success('发布成功');
        this.getRuleList();
      })
    },
    cancelRule(id) {
      this.$confirm('规则取消后将不能使用请谨慎操作，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => editAgentRule({
        id: id,
        state: 0,
      })).then(res => {
        this.$message.success('取消成功');
        this.getRuleList();
      })
    },
    clearAgentRules() {
      this.$confirm('清除规则后将彻底删除无效规则，是否继续？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => clearRules())
          .then(res => {
            this.$message.success('清除成功');
            this.page = 1;
            this.getRuleList();
          })
    }
  }
  ,
  mounted() {
    this.getRuleList();
  }
  ,
  watch: {
    page(value) {
      this.getRuleList();
    }
    ,
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getRuleList();
      }
    }
  }
}
</script>

<style scoped>

</style>
