<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 75%" v-if="withdrawLevel!=null">
      <el-form ref="editAppForm"
               :model="levelEditDto"
               label-width="90px">
        <el-form-item label="等级标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ withdrawLevel.id }}</span>
        </el-form-item>
        <el-form-item label="提现场景">
          <span class="el-input el-input--medium el-input--suffix input-info">{{
              withdrawLevel.scene.label
            }}</span>
        </el-form-item>
        <el-form-item label="等级状态">
          <span class="el-input el-input--medium el-input--suffix input-info">{{
              withdrawLevel.state.label
            }}</span>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="levelEditDto.remark"
                    type="textarea"
                    :rows="2"
                    style="width: 60%"
                    v-if="showEdit"
                    placeholder="请输入备注描述信息"></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ withdrawLevel.remark }}
          </div>
        </el-form-item>
        <el-form-item label="提现等级">
          <div>
            <div style="display: flex;align-items: center"
                 v-for="(item,index) in levelEditDto.levels"
                 :key="'level_'+index">
              <span style="margin-right: 16px">
                <span class="el-form-item__label"
                      style="width: 60px">提现值</span>
                <span>{{ item.value }}</span>
              </span>
              <span style="margin-right: 16px">
                <span class="el-form-item__label"
                      style="width: 60px">优先级</span>
                <span>{{ priorityText(item.priority) }}</span>
              </span>
              <span style="margin-right: 16px">
                <span class="el-form-item__label"
                      style="width: 60px">标签</span>
                <span>{{ item.tag }}</span>
              </span>
              <span style="margin-right: 24px">
                <span class="el-form-item__label"
                      style="width: 60px">描述</span>
                <span>{{ item.remark }}</span>
              </span>
              <span v-if="showEdit"
                    style="color: #ff0033;cursor: pointer;font-size: 12px"
                    @click="removeLevel(index)">
                <i class="el-icon-close" style="font-size: 13px"></i>
                删除
              </span>
            </div>
            <div v-if="levelEditDto.levels.length===0">
              <span style="color: #8c8c8c;padding-left: 6px;">请添加提现等级</span>
            </div>
          </div>
          <div
              style="display:inline-block;padding:20px 16px;border: solid 1px #ebeef5;margin-top: 12px;border-radius: 4px;"
              v-if="showEdit">
            <el-form :inline="true" :model="levelValue" ref="levelValueForm" label-width="60px">
              <el-form-item label="提现值">
                <el-input-number style="width: 120px" size="small" v-model="levelValue.value"
                                 :step="1"></el-input-number>
              </el-form-item>
              <el-form-item label="优先级">
                <el-select size="small"
                           style="width: 120px"
                           clearable
                           v-model="levelValue.priority"
                           placeholder="优先级别">
                  <el-option label="低" :value="1"></el-option>
                  <el-option label="中" :value="2"></el-option>
                  <el-option label="高" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签">
                <el-input size="small" v-model="levelValue.tag" style="width: 120px" placeholder="等级标签"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input size="small" v-model="levelValue.remark" style="width: 200px"
                          placeholder="描述信息"></el-input>
              </el-form-item>
              <el-form-item>
                <el-link :underline="false" type="primary" @click="addLevel">添加</el-link>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <el-form-item v-if="!showEdit&&withdrawLevel.state.value===1">
          <el-button type="primary" size="small" @click="showEdit=true">编辑</el-button>
        </el-form-item>
        <el-form-item v-if="showEdit">
          <el-button type="primary" size="small" @click="submitLevelEdit">确定</el-button>
          <el-button type="danger" size="small" @click="cancelLevelEdit" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {editWithLevel, withdrawLevel} from "../../../../api/payment-service";

const priority = {
  1: '低',
  2: '中',
  3: '高',
};
export default {
  name: "WithdrawLevelDetail",
  data() {
    return {
      showEdit: false,
      withdrawLevel: null,
      levelEditDto: {
        remark: null,
        levels: [],
      },
      levelValue: {
        value: 1,
        priority: 1,
        tag: null,
        remark: null,
      },
    };
  },
  methods: {
    getWithdrawLevel() {
      withdrawLevel(this.$route.params.id).then(data => {
        this.withdrawLevel = data;
        if (this.withdrawLevel) {
          this.levelEditDto = {
            remark: this.withdrawLevel.remark,
            levels: JSON.parse(JSON.stringify(this.withdrawLevel.levels.levels)),
          };
        }
      });
    },
    addLevel() {
      if (this.levelValue.value == null) {
        this.$message.error('提现等级值为空');
        return;
      }
      if (this.levelEditDto.levels.some(e => e.value === this.levelValue.value)) {
        this.$message.error('提现等级值重复');
        return;
      }
      this.levelEditDto.levels.push(Object.assign({}, this.levelValue));
      this.levelValue = {
        value: 1,
        priority: 1,
        tag: null,
        remark: null,
      };
    },
    priorityText(value) {
      return priority[value] || '';
    },
    removeLevel(index) {
      this.levelEditDto.levels.splice(index, 1);
    },
    submitLevelEdit() {
      if (this.levelEditDto.levels.length === 0) {
        this.$message.error('请添加提现等级');
        return;
      }
      let params = {};
      if (this.levelEditDto.remark !== this.withdrawLevel.remark) {
        params.remark = this.levelEditDto.remark;
      }
      if (JSON.stringify(this.levelEditDto.levels) !== JSON.stringify(this.withdrawLevel.levels.levels)) {
        params.levels = this.levelEditDto.levels;
      }
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      params.id = this.withdrawLevel.id;
      editWithLevel(params).then(res => {
        this.showEdit = false;
        this.$message.success('编辑成功');
        this.getWithdrawLevel();
      });
    },
    cancelLevelEdit() {
      this.showEdit     = false;
      this.levelEditDto = {
        remark: this.withdrawLevel.remark,
        levels: JSON.parse(JSON.stringify(this.withdrawLevel.levels.levels)),
      };
    },
  },
  mounted() {
    this.getWithdrawLevel();
  }
}
</script>

<style scoped>

</style>