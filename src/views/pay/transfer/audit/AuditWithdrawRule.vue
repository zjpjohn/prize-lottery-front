<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">审核规则管理</div>
      <permission permit="super">
        <el-button size="small"
                   style="height: 32px;margin-left: 32px"
                   type="primary"
                   icon="el-icon-plus"
                   @click="showCreate=true">
          创建规则
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="rules"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="唯一标识" prop="id"></el-table-column>
        <el-table-column label="提现场景" prop="scene"></el-table-column>
        <el-table-column label="审核门槛" prop="throttle"></el-table-column>
        <el-table-column label="强制审核">
          <template v-slot="scope">
            <span>{{ scope.row.force === 1 ? '强制审核' : '依规审核' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规则状态">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注描述" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="warning"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="showEditDialog(scope.row)">编辑
            </el-link>
            <el-link :underline="false"
                     type="primary"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="switchRuleState({
                     id:scope.row.id,
                     state:2,
                     btn:'启用',
                     message:'是否要启用已创建的审核规则'
                     })">启用
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     v-if="scope.row.state.value===2"
                     style="margin-right: 10px"
                     @click="switchRuleState({
                     id:scope.row.id,
                     state:1,
                     btn:'下线',
                     message:'是否要下线已启用的审核规则'
                     })">下线
            </el-link>
            <el-link :underline="false"
                     type="warning"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="switchRuleState({
                     id:scope.row.id,
                     state:0,
                     btn:'删除',
                     message:'是否要删除已创建的审核规则'
                     })">删除
            </el-link>
            <el-link :underline="false"
                     type="plain"
                     v-if="scope.row.state.value===0"
                     style="margin-right: 10px"
                     @click="switchRuleState({
                     id:scope.row.id,
                     state:1,
                     btn:'撤销',
                     message:'是否要撤销已删除的审核规则'
                     })">撤销
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无审核信息</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-dialog :visible.sync="showCreate"
               @close="cancelCreateRule"
               :modal-append-to-body="false" width="40%">
      <div slot="title" class="title">创建提现审核规则</div>
      <el-form ref="createRuleForm" :model="createRuleDto" :rules="createRules" label-width="100px">
        <el-form-item label="场景标识" prop="scene">
          <el-select size="large"
                     style="width: 100%"
                     clearable
                     v-model="createRuleDto.scene"
                     placeholder="选择提现场景">
            <el-option label="用户收益提现" value="USER_REWARD_TRANS"></el-option>
            <el-option label="流量主收益提现" value="USER_AGENT_TRANS"></el-option>
            <el-option label="专家收益提现" value="USER_EXPERT_TRANS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核门槛" prop="throttle" v-if="createRuleDto.force===0">
          <el-input v-model="createRuleDto.throttle" size="large" placeholder="请输入审核门槛，且为正整数"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="强制(是/否)">
          <i-check-radio-group v-model="createRuleDto.force" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="依规审核" :value="0"></i-check-radio>
            <i-check-radio size="small" label="强制审核" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="规则说明">
          <el-input type="textarea"
                    size="large"
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    v-model="createRuleDto.remark"
                    placeholder="请输入审核规则说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreateRule">确定</el-button>
          <el-button type="danger" @click="cancelCreateRule" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="cancelEditRule"
               :modal-append-to-body="false" width="40%">
      <div slot="title" class="title">编辑提现审核规则</div>
      <el-form ref="editRuleForm" :model="editRuleDto" :rules="editRules" label-width="100px">
        <el-form-item label="审核门槛" prop="throttle" v-if="editRuleDto.force===0">
          <el-input v-model="editRuleDto.throttle" size="large" placeholder="请输入审核门槛，且为正整数"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="强制(是/否)">
          <i-check-radio-group v-model="editRuleDto.force" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="依规审核" :value="0"></i-check-radio>
            <i-check-radio size="small" label="强制审核" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="规则说明">
          <el-input type="textarea"
                    size="large"
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    v-model="editRuleDto.remark"
                    placeholder="请输入审核规则说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditRule">确定</el-button>
          <el-button type="danger" @click="cancelEditRule" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addAuditRule, auditRuleList, editAuditRule} from "../../../../api/payment-service";
import ICheckRadioGroup from "../../../../components/icheck/ICheckRadioGroup.vue";
import ICheckRadio from "../../../../components/icheck/ICheckRadio.vue";

export default {
  name: "AuditWithdrawRule",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      rules: [],
      showCreate: false,
      showEdit: false,
      createRuleDto: {
        scene: null,
        throttle: null,
        force: 0,
        remark: null,
      },
      pickedRule: null,
      editRuleDto: {
        throttle: null,
        force: null,
        remark: null,
      },
      createRules: {
        scene: [
          {
            required: true,
            message: '提现场景为空',
            trigger: 'blur'
          }
        ],
        throttle: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('提现门槛为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('提现门槛为正整数'));
              }
              return callback();
            }
          },
        ],
      },
      editRules: {
        throttle: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('提现门槛为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('提现门槛为正整数'));
              }
              return callback();
            }
          },
        ],
      },
    };
  },
  methods: {
    getAuditRuleList() {
      auditRuleList().then(data => this.rules = data || []);
    },
    submitCreateRule() {
      this.$refs.createRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        addAuditRule(this.createRuleDto).then(res => {
          this.$message.success('创建成功');
          this.getAuditRuleList();
          this.cancelCreateRule();
        });
      });
    },
    cancelCreateRule() {
      this.showCreate = false;
      Object.keys(this.createRuleDto).forEach(key => {
        this.createRuleDto[key] = key === 'force' ? 0 : null;
      });
      this.$refs.createRuleForm.resetFields();
    },
    switchRuleState({
                      id,
                      state,
                      btn,
                      message
                    }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: btn,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editAuditRule({
          id: id,
          state: state
        }).then(res => {
          this.$message.success(`${btn}成功`);
          this.getAuditRuleList();
        });
      });
    },
    showEditDialog(data) {
      this.pickedRule = data;
      this.showEdit   = true;
      Object.keys(this.editRuleDto)
          .forEach(key => this.editRuleDto[key] = this.pickedRule[key]);
    },
    submitEditRule() {
      this.$refs.editRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.editRuleDto)
            .filter(key => this.editRuleDto[key] !== this.pickedRule[key])
            .forEach(key => params[key] = this.editRuleDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.success('没有更新数据');
          return;
        }
        editAuditRule(Object.assign({id: this.pickedRule.id}, params))
            .then(res => {
              this.$message.success('更新成功');
              this.getAuditRuleList();
              this.cancelEditRule();
            });
      });
    },
    cancelEditRule() {
      this.showEdit   = false;
      this.pickedRule = null;
      Object.keys(this.editRuleDto).forEach(key => this.editRuleDto[key] = null);
      this.$refs.editRuleForm.resetFields();
    },
  },
  created() {
    this.getAuditRuleList();
  }
}
</script>

<style scoped>

</style>
