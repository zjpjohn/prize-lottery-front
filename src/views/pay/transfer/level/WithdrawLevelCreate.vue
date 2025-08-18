<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 75%">
      <el-form ref="createLevelForm" :model="levelCreateDto" :rules="rules" label-width="100px">
        <el-form-item label="提现场景" prop="scene">
          <el-select size="large"
                     style="width: 50%"
                     clearable
                     v-model="levelCreateDto.scene"
                     placeholder="选择提现场景">
            <el-option label="用户收益提现" value="USER_REWARD_TRANS"></el-option>
            <el-option label="流量主收益提现" value="USER_AGENT_TRANS"></el-option>
            <el-option label="专家收益提现" value="USER_EXPERT_TRANS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明信息">
          <el-input type="textarea"
                    size="large"
                    :rows="3"
                    :maxlength="100"
                    style="width: 50%"
                    :show-word-limit="true"
                    v-model="levelCreateDto.remark"
                    placeholder="请输入提现等级说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="提现等级">
          <div>
            <div style="display: flex;align-items: center"
                 v-for="(item,index) in levelCreateDto.levels"
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
              <span style="color: #FF0033;cursor: pointer;font-size: 12px" @click="removeLevel(index)">
                <i class="el-icon-close" style="font-size: 13px"></i>删除
              </span>
            </div>
            <div v-if="levelCreateDto.levels.length===0">
              <span style="color: #9c9c9c;padding-left: 6px;">请添加提现等级</span>
            </div>
          </div>
          <div
              style="display:inline-block;padding:20px 16px;border: solid 1px #ebeef5;margin-top: 12px;border-radius: 4px;">
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
        <el-form-item>
          <el-button type="primary" size="small" @click="submitCreateLevel">确定</el-button>
          <el-button type="danger" size="small" @click="cancelCreateLevel" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import {createWithLevel} from "../../../../api/payment-service";

const priority = {
  1: '低',
  2: '中',
  3: '高',
};
export default {
  name: "WithdrawLevelCreate",
  data() {
    return {
      levelCreateDto: {
        scene: null,
        remark: null,
        levels: [],
      },
      levelValue: {
        value: 1,
        priority: 1,
        tag: null,
        remark: null,
      },
      rules: {
        scene: [
          {
            required: true,
            message: '提现场景为空',
            trigger: 'blur',
          },
        ],
      }
    };
  },
  methods: {
    addLevel() {
      if (this.levelValue.value == null) {
        this.$message.error('提现等级值为空');
        return;
      }
      if (this.levelCreateDto.levels.some(e => e.value === this.levelValue.value)) {
        this.$message.error('提现等级值重复');
        return;
      }
      this.levelCreateDto.levels.push(Object.assign({}, this.levelValue));
      this.levelValue = {
        value: 1,
        priority: 1,
        tag: null,
        remark: null,
      };
    },
    removeLevel(index) {
      this.levelCreateDto.levels.splice(index, 1);
    },
    priorityText(value) {
      return priority[value] || '';
    },
    submitCreateLevel() {
      this.$refs.createLevelForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.levelCreateDto.levels.length === 0) {
          this.$message.error('请添加提现等级');
          return;
        }
        createWithLevel(this.levelCreateDto).then(res => {
          this.cancelCreateLevel();
          this.$message.success('创建成功');
        });
      });
    },
    cancelCreateLevel() {
      this.levelCreateDto = {
        scene: null,
        remark: null,
        levels: [],
      };
      this.levelValue     = {
        value: 1,
        priority: 1,
        tag: null,
        remark: null,
      };
      this.$refs.createLevelForm.resetFields();
    }
  },
}
</script>

<style scoped>

</style>