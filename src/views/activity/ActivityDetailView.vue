<template>
  <div style="margin:32px 32px 0 32px">
    <div style="width: 50%" v-if="activity">
      <el-form ref="activityForm"
               :model="activityDto"
               label-width="100px">
        <el-form-item label="活动标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ activity.id }}</span>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="activity.name" placeholder="请输入活动名称" style="width:200px" v-if="showEdit"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ activity.name }}</span>
        </el-form-item>
        <el-form-item label="会员时长">
          <el-input-number v-model="activityDto.duration" :min="1" :max="7" v-if="showEdit"></el-input-number>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>有效期{{
              activity.duration
            }}天</span>
        </el-form-item>
        <el-form-item label="最小机会">
          <el-input-number v-model="activityDto.minimum" :min="1" :max="10" v-if="showEdit"></el-input-number>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>单次抽奖最少{{
              activity.minimum
            }}次机会</span>
        </el-form-item>
        <el-form-item label="失败必中">
          <el-input-number v-model="activityDto.throttle" :min="1" :max="50" v-if="showEdit"></el-input-number>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>抽奖连续失败{{
              activity.throttle
            }}次必中</span>
        </el-form-item>
        <el-form-item label="活动描述">
          <div v-for="(item,index) in activityDto.remark" style="margin-bottom: 3px">
            <span style="margin-right: 12px;padding: 4px 8px;background-color: #f2f2f2">
            {{ index + 1 }}.{{ item }}
            </span>
            <el-link :underline="false" type="primary" @click="removeRemark(index)" v-if="showEdit">删除</el-link>
          </div>
          <div v-if="showEdit">
            <el-input v-model="value"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入活动描述信息"
                      clearable
                      style="width: 350px"></el-input>
            <el-button plain size="mini" @click="addRemark">添加</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="!showEdit">
          <el-button type="primary" @click="showEdit=true">编辑</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item v-if="showEdit&&activityDto">
          <el-button type="primary" @click="submitEditAction">提交</el-button>
          <el-button type="primary" @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {activityDetail, editActivity} from "../../api/user-service";

export default {
  name: "ActivityDetailView",
  data() {
    return {
      value: null,
      activity: null,
      showEdit: false,
      activityDto: {
        name: null,
        duration: null,
        minimum: null,
        throttle: null,
        remark: [],
      },
    };
  },
  methods: {
    queryActivity() {
      activityDetail(this.$route.params.id).then(data => {
        this.activity = data;
        if (this.activity != null) {
          this.activityDto = {
            name: data.name,
            duration: data.duration,
            minimum: data.minimum,
            throttle: data.throttle,
            remark: data.remark.values,
          };
        }
      });
    },
    addRemark() {
      this.activityDto.remark = [...this.activityDto.remark];
      this.activityDto.remark.push(this.value);
      this.value = null;
    },
    removeRemark(index) {
      this.activityDto.remark = [...this.activityDto.remark];
      this.activityDto.remark.splice(index, 1);
    },
    submitEditAction() {
      if (this.activityDto.remark.length <= 0) {
        this.$message.error('请输入活动描述说明');
        return;
      }
      let params = {};
      Object.keys(this.activityDto).filter(key => {
        if (key !== 'remark') {
          return this.activity[key] !== this.activityDto[key];
        }
        return this.activity['remark'].values !== this.activityDto.remark;
      }).forEach(key => params[key] = this.activityDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据');
        return;
      }
      editActivity(Object.assign({id: this.activity.id}, params)).then(_ => {
        this.queryActivity();
        this.showEdit = false;
      });
    },
    cancelEdit() {
      this.showEdit    = false;
      this.value       = null;
      this.activityDto = {
        name: this.activity.name,
        duration: this.activity.duration,
        minimum: this.activity.minimum,
        throttle: this.activity.throttle,
        remark: this.activity.remark.values,
      };
    },
  },
  created() {
    this.queryActivity();
  }
}
</script>

<style scoped>

</style>