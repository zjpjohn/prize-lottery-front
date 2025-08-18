<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">提现规则</div>
      <permission permit="super">
        <el-button size="small"
                   style="height: 32px;margin-left: 32px"
                   type="primary"
                   icon="el-icon-plus"
                   @click="showCreate=true">
          新增规则
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="withdrawRules"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="提现场景" prop="scene" width="220px"></el-table-column>
        <el-table-column label="提现门槛" prop="throttle" width="120px"></el-table-column>
        <el-table-column label="最大金额" prop="maximum" width="120px"></el-table-column>
        <el-table-column label="间隔天数" prop="interval" width="120px"></el-table-column>
        <el-table-column label="规则状态" prop="state.label" width="120px"></el-table-column>
        <el-table-column label="备注描述" prop="remark"></el-table-column>
        <el-table-column label="启用时间" prop="startTime" width="170px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="170px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="showEditRule(scope.row)">编辑
            </el-link>
            <el-link :underline="false"
                     type="primary"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="showPreIssue(scope.row.id)">预发布
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     v-if="scope.row.state.value===1||scope.row.state.value===2"
                     style="margin-right: 10px"
                     @click="issueRule(scope.row.id)">发布
            </el-link>
            <el-link :underline="false"
                     type="warning"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="cancelRule(scope.row.id)">取消
            </el-link>
            <el-link :underline="false"
                     type="plain"
                     v-if="scope.row.state.value===0"
                     style="margin-right: 10px"
                     @click="revokeRule(scope.row.id)">撤销
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无提现规则</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-dialog :visible.sync="showCreate"
               @close="closeCreateRule"
               :modal-append-to-body="false" width="40%">
      <div slot="title" class="title">创建提现规则</div>
      <div>
        <el-form ref="createRuleForm" :model="ruleCreateDto" :rules="createRules" label-width="100px">
          <el-form-item label="场景标识" prop="scene">
            <el-select size="large"
                       style="width: 100%"
                       clearable
                       v-model="ruleCreateDto.scene"
                       placeholder="选择提现场景">
              <el-option label="用户收益提现" value="USER_REWARD_TRANS"></el-option>
              <el-option label="流量主收益提现" value="USER_AGENT_TRANS"></el-option>
              <el-option label="专家收益提现" value="USER_EXPERT_TRANS"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提现门槛" prop="throttle">
            <el-input v-model="ruleCreateDto.throttle" size="large" placeholder="请输入提现门槛，且为正整数"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="提现上限" prop="maximum">
            <el-input v-model="ruleCreateDto.maximum" size="large" placeholder="请输入提现上线，且为正整数"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="提现间隔">
            <el-input-number v-model="ruleCreateDto.interval"
                             size="large" :min="1" :max="30" label="提现间隔"></el-input-number>
          </el-form-item>
          <el-form-item label="说明信息" prop="remark">
            <el-input type="textarea"
                      size="large"
                      :rows="4"
                      :maxlength="100"
                      :show-word-limit="true"
                      v-model="ruleCreateDto.remark"
                      placeholder="请输入提现规则说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitCreateRule">确定</el-button>
            <el-button type="danger" @click="closeCreateRule" style="margin-left: 16px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="cancelEditRule"
               :modal-append-to-body="false" width="40%">
      <div slot="title" class="title">编辑提现规则</div>
      <div>
        <el-form ref="editRuleForm" :model="ruleEditDto" :rules="editRules" label-width="100px">
          <el-form-item label="提现门槛" prop="throttle">
            <el-input v-model="ruleEditDto.throttle" size="large" placeholder="请输入提现门槛" clearable></el-input>
          </el-form-item>
          <el-form-item label="提现上限" prop="maximum">
            <el-input v-model="ruleEditDto.maximum" size="large" placeholder="请输入提现上限" clearable></el-input>
          </el-form-item>
          <el-form-item label="提现间隔">
            <el-input-number v-model="ruleEditDto.interval"
                             size="large" :min="1" :max="30"
                             label="提现间隔"></el-input-number>
          </el-form-item>
          <el-form-item label="规则备注">
            <el-input type="textarea"
                      :rows="4"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="ruleEditDto.remark"
                      placeholder="请输入规则备注信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitEditRule">提交</el-button>
            <el-button type="primary" @click="cancelEditRule">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showPre"
               @close="cancelPreIssue"
               :modal-append-to-body="false" width="30%">
      <div slot="title" class="title">预发布提现规则</div>
      <div>
        <el-form ref="preRuleForm" :model="preDto" :rules="preIssueRules" label-width="100px">
          <el-form-item label="启用时间" prop="startTime">
            <el-date-picker type="datetime"
                            size="large"
                            clearable
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="preDto.startTime"
                            placeholder="请选择启用时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPreIssue">预发布</el-button>
            <el-button type="danger" @click="cancelPreIssue">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addWithdrawRule, editWithdrawRule, withdrawRuleList} from "../../../../api/payment-service";

export default {
  name: "WithdrawRuleList",
  data() {
    return {
      withdrawRules: [],
      showCreate: false,
      ruleCreateDto: {
        scene: null,
        throttle: null,
        maximum: null,
        interval: 7,
        remark: null,
      },
      createRules: {
        scene: [
          {
            required: true,
            message: '提现场景为空',
            trigger: 'blur',
          },
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
              if (this.ruleCreateDto.maximum != null && parseInt(value) >= parseInt(this.ruleCreateDto.maximum)) {
                return callback(new Error('提现门槛需小于提现上限'));
              }
              return callback();
            }
          },
        ],
        maximum: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('提现上限为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('提现上限为正整数'));
              }
              if (this.ruleCreateDto.throttle != null && parseInt(value) <= parseInt(this.ruleCreateDto.throttle)) {
                return callback(new Error('提现上限需大于提现门槛'));
              }
              return callback();
            }
          }
        ],
      },
      showEdit: false,
      pickedRule: null,
      ruleEditDto: {
        throttle: null,
        maximum: null,
        interval: null,
        remark: null,
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
              if (this.ruleEditDto.maximum != null
                  && parseInt(value) >= parseInt(this.ruleEditDto.maximum)) {
                return callback(new Error('提现门槛需小于提现上限'));
              }
              return callback();
            }
          },
        ],
        maximum: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('提现上限为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('提现上限为正整数'));
              }
              if (this.ruleEditDto.throttle != null
                  && parseInt(value) <= parseInt(this.ruleEditDto.throttle)) {
                return callback(new Error('提现上限需大于提现门槛'));
              }
              return callback();
            }
          }
        ],
      },
      showPre: false,
      preDto: {
        id: null,
        startTime: null,
      },
      preIssueRules: {
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
    gotoCreate() {
      this.$router.push('/pay/withdraw/rule/create')
    },
    gotoDetail(id) {
      this.$router.push(`/pay/withdraw/rule/${id}`);
    },
    getWithdrawRuleList() {
      withdrawRuleList().then(data => this.withdrawRules = data || []);
    },
    showEditRule(data) {
      this.pickedRule = data;
      Object.keys(this.ruleEditDto)
          .forEach(key => this.ruleEditDto[key] = this.pickedRule[key]);
      this.showEdit = true;
    },
    showPreIssue(id) {
      this.showPre   = true;
      this.preDto.id = id;
    },
    submitPreIssue() {
      this.$refs.preRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        let dto = Object.assign({state: 2}, this.preDto);
        editWithdrawRule(dto).then(res => {
          this.getWithdrawRuleList();
          this.cancelPreIssue();
        });
      });
    },
    cancelPreIssue() {
      this.showPre = false;
      Object.keys(this.preDto).forEach(key => this.preDto[key] = null);
      this.$refs.preRuleForm.resetFields();
    },
    issueRule(id) {
      this.$confirm('是否要发布提现规则？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWithdrawRule({
          id: id,
          state: 3
        }).then(res => {
          this.$message.success('发布规则成功');
          this.getWithdrawRuleList();
        });
      });
    },
    cancelRule(id) {
      this.$confirm('是否要取消提现规则？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWithdrawRule({
          id: id,
          state: 0
        }).then(res => {
          this.$message.success('取消规则成功');
          this.getWithdrawRuleList();
        });
      });
    },
    revokeRule(id) {
      this.$confirm('是否要撤销已取消规则？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWithdrawRule({
          id: id,
          state: 1
        }).then(res => {
          this.$message.success('撤销规则成功');
          this.getWithdrawRuleList();
        });
      });
    },
    submitCreateRule() {
      this.$refs.createRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        addWithdrawRule(this.ruleCreateDto).then(res => {
          this.getWithdrawRuleList();
          this.$message.success('创建成功');
          this.closeCreateRule();
        });
      });
    },
    closeCreateRule() {
      this.showCreate = false;
      Object.keys(this.createRuleDto).forEach(key => {
        this.createRuleDto[key] = key === 'interval' ? 7 : null;
      });
      this.$refs.createRuleForm.resetFields();
    },
    submitEditRule() {
      this.$refs.editRuleForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.ruleEditDto)
            .filter(key => this.ruleEditDto[key] !== this.pickedRule[key])
            .forEach(key => params[key] = this.ruleEditDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.success('没有更新数据');
          return;
        }
        let dto = Object.assign({id: this.pickedRule.id}, params);
        editWithdrawRule(dto).then(res => {
          this.getWithdrawRuleList();
          this.cancelEditRule();
        });
      });
    },
    cancelEditRule() {
      this.showEdit   = false;
      this.pickedRule = null;
      this.$refs.editRuleForm.resetFields();
      Object.keys(this.editRuleDto).forEach(key => {
        this.ruleEditDto[key] = this.pickedRule[key];
      });
    },
  },
  created() {
    this.getWithdrawRuleList();
  }
}
</script>

<style scoped>

</style>
