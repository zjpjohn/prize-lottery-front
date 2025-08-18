<template>
  <div style="margin:64px 32px 0 32px">
    <el-form ref="activityForm" :model="createDto" :rules="rules" label-width="90px">
      <el-form-item label="会员时长">
        <el-input-number v-model="createDto.duration" :min="1" :max="10"></el-input-number>
        <span style="margin-left: 8px">注：单次中奖后系统赠送该设置天数的会员时长</span>
      </el-form-item>
      <el-form-item label="最小机会">
        <el-input-number v-model="createDto.minimum" :min="1" :max="10"></el-input-number>
        <span style="margin-left: 8px">注：单次抽奖最少需要该设置数量的机会</span>
      </el-form-item>
      <el-form-item label="失败必中">
        <el-input-number v-model="createDto.throttle" :min="1" :max="50"></el-input-number>
        <span style="margin-left: 8px">注：抽奖失败达到该设置次数后，再次抽奖一定中奖</span>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="createDto.name" placeholder="请输入活动名称" clearable style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="活动描述" prop="remark">
        <div v-for="(item,index) in createDto.remark" style="margin-bottom: 3px">
          <span style="margin-right: 12px;padding: 4px 8px;background-color: #f2f2f2">
          {{ index + 1 }}.{{ item }}
          </span>
          <el-link :underline="false" type="primary" @click="removeRemark(index)">删除</el-link>
        </div>
        <div style="display: flex;align-items: end">
          <el-input v-model="value"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入活动描述信息"
                    clearable
                    style="width:400px"></el-input>
          <el-button plain size="mini" @click="addRemark" style="margin-left: 8px">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitCreateAction">提交</el-button>
        <el-button plain @click="cancelCreate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addActivity} from "../../api/user-service";

export default {
  name: "ActivityCreateView",
  data() {
    return {
      createDto: {
        name: null,
        duration: 3,
        minimum: 5,
        throttle: 15,
        remark: [],
      },
      value: null,
      rules: {
        name: [
          {
            required: true,
            message: '活动名称为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            validator: (rules, value, callback) => {
              if (this.createDto.remark.length === 0) {
                return callback(new Error('活动描述为空'));
              }
              return callback();
            },
          }
        ]
      },
    };
  },
  methods: {
    addRemark() {
      if (this.value === null || this.value === '') {
        this.$message.error('描述信息为空');
        return;
      }
      this.createDto.remark.push(this.value);
      this.value = null;
    },
    removeRemark(index) {
      this.createDto.remark.splice(index, 1);
    },
    cancelCreate() {
      this.$refs.activityForm.resetFields();
      this.value     = null;
      this.createDto = {
        name: null,
        duration: 3,
        minimum: 5,
        throttle: 15,
        remark: [],
      };
    },
    submitCreateAction() {
      this.$refs.activityForm.validate(valid => {
        if (!valid) {
          return;
        }
        addActivity(this.createDto).then(res => {
          this.$message.success('添加成功');
          this.cancelCreate();
        });
      });
    },
  },
}
</script>


<style scoped>

</style>