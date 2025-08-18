<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">代理审核</div>
      <div style="margin-left: 48px;display: flex;align-items: center">
        <span style="margin: 0 16px 0 32px">账户类型</span>
        <el-select size="medium"
                   style="width: 180px"
                   clearable
                   v-model="query.agent"
                   placeholder="请选择账户类型">
          <el-option label="普通用户" :value="0"></el-option>
          <el-option label="一级代理" :value="1"></el-option>
          <el-option label="二级代理" :value="2"></el-option>
          <el-option label="三级代理" :value="3"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">账户状态</span>
        <el-select size="medium"
                   style="width: 180px;margin-right: 24px"
                   clearable
                   v-model="query.state"
                   placeholder="请选择申请状态">
          <el-option label="已取消" :value="0"></el-option>
          <el-option label="申请中" :value="1"></el-option>
          <el-option label="已通过" :value="2"></el-option>
          <el-option label="未通过" :value="3"></el-option>
        </el-select>
        <span style="margin: 0 16px 0 32px">联系电话</span>
        <el-input clearable v-model="query.phone" style="width: 200px" placeholder="请输入联系手机号"></el-input>
      </div>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="applies.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="编号" prop="id" width="100px"></el-table-column>
        <el-table-column label="用户名" prop="nickname" width="160px"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="160px"></el-table-column>
        <el-table-column label="账户等级" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.agent.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邀请码" prop="code" width="140px"></el-table-column>
        <el-table-column label="账户状态" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.userState.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请状态" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注描述" prop="remark" width="320px"></el-table-column>
        <el-table-column label="申请时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       type="primary"
                       v-if="scope.row.state.value===1"
                       @click="showApplyConfirm(scope.row)">审核
              </el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无流量主申请</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="applies.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showConfirm"
               width="600px"
               :before-close="confirmDialogClose">
      <div slot="title">流量主审核</div>
      <div style="margin-right: 16px" v-if="selected">
        <el-form ref="confirmForm"
                 label-width="100px"
                 :model="confirmApplyDto"
                 :rules="confirmRules">
          <el-form-item label="账户名称">
            <span class="el-input el-input--medium el-input--suffix input-info">{{ selected.nickname }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span class="el-input el-input--medium el-input--suffix input-info">{{ selected.phone }}</span>
          </el-form-item>
          <el-form-item label="当前等级">
            <span class="el-input el-input--medium el-input--suffix input-info">{{ selected.agent.description }}</span>
          </el-form-item>
          <el-form-item label="账户状态">
            <span class="el-input el-input--medium el-input--suffix input-info">{{
                selected.userState.description
              }}</span>
          </el-form-item>
          <el-form-item label="审核操作" prop="state">
            <i-check-radio-group v-model="confirmApplyDto.state" style="height: 24px;line-height: 24px !important;">
              <i-check-radio size="mini" label="驳回申请" :value="3"></i-check-radio>
              <i-check-radio size="mini" label="审核通过" :value="2"
                             v-if="selected.agent.value<=2"></i-check-radio>
            </i-check-radio-group>
          </el-form-item>
          <el-form-item label="审核等级" v-if="confirmApplyDto.state===null||confirmApplyDto.state===2">
            <el-select size="medium"
                       style="width: 180px"
                       clearable
                       v-model="confirmApplyDto.agent"
                       placeholder="请选择账户类型">
              <el-option label="一级代理" :value="1" v-if="selected.agent.value<=0"></el-option>
              <el-option label="二级代理" :value="2" v-if="selected.agent.value<=1"></el-option>
              <el-option label="三级代理" :value="3" v-if="selected.agent.value<=2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核备注">
            <el-input type="textarea"
                      v-model="confirmApplyDto.remark"
                      :rows="3"
                      placeholder="请输入审核备注信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="confirmAgentApply">确 定</el-button>
            <el-button size="small" type="plain" @click="confirmDialogClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {agentApplyList, confirmApply} from "../../../api/agent-service";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";

export default {
  name: "AgentApplyListView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        state: 1,
        agent: null,
        phone: null,
      },
      applies: {
        current: 1,
        total: 0,
        records: [],
      },
      showConfirm: false,
      selected: null,
      confirmApplyDto: {
        state: null,
        agent: null,
        remark: null,
      },
      confirmRules: {
        state: [
          {
            required: true,
            message: '请选择是否分润'
          }
        ],
      },
    };
  },
  methods: {
    getAgentApplyList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      agentApplyList(condition).then(data => this.applies = data);
    },
    showApplyConfirm(apply) {
      this.selected    = apply;
      this.showConfirm = true;
    },
    confirmAgentApply() {
      this.$refs.confirmForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = Object.assign({id: this.selected.id}, this.confirmApplyDto);
        confirmApply(params).then(res => {
          this.getAgentApplyList();
          this.confirmDialogClose();
        });
      })
    },
    confirmDialogClose() {
      this.showConfirm = false;
      this.selected    = null;
      Object.keys(this.confirmApplyDto).forEach(key => this.confirmApplyDto[key] = null);
      this.$refs.confirmForm.resetFields();
    }
  },
  mounted() {
    this.getAgentApplyList();
  },
  watch: {
    page(value) {
      this.getAgentApplyList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.getAgentApplyList();
      }
    }
  },
}
</script>

<style scoped>

</style>
