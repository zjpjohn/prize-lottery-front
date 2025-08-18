<template>
  <div style="margin:48px 32px 0 32px">
    <div style="width: 40%">
      <el-form ref="addPackForm" :model="packDto" :rules="rules" label-width="100px">
        <el-form-item label="套餐名称" prop="name">
          <el-input v-model="packDto.name" size="large" placeholder="请输入套餐名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="套餐价格" prop="price">
          <el-input v-model="packDto.price" size="large" placeholder="请输入套餐价格,注意金额单位为(分)"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" prop="discount">
          <el-input v-model="packDto.discount" size="large" placeholder="请输入套餐折扣价格,注意金额单位为(分)"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="时间单位" prop="unit">
          <el-select size="large"
                     style="width: 100%"
                     clearable
                     v-model="packDto.unit"
                     @change="timeUnitChange"
                     placeholder="请选择套餐有效期时间单位">
            <el-option label="一周" :value="0"></el-option>
            <el-option label="月度" :value="1"></el-option>
            <el-option label="季度" :value="2"></el-option>
            <el-option label="半年" :value="3"></el-option>
            <el-option label="年度" :value="4"></el-option>
            <el-option label="永久" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间">
          <span v-if="packDto.unit===null||packDto.unit===''">请选择时间单位</span>
          <span v-else>{{ unitType[packDto.unit] }}</span>
        </el-form-item>
        <el-form-item label="套餐说明" prop="remark">
          <el-input type="textarea"
                    size="large"
                    :rows="5"
                    :maxlength="100"
                    :show-word-limit="true"
                    v-model="packDto.remark"
                    placeholder="请输入套餐备注说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreatePack">确定</el-button>
          <el-button type="danger" @click="resetForm" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {unitMap} from "../../libs/pack_time_unit";
import {createPack} from "../../api/member-service";

export default {
  name: "MemberPackCreateView",
  data() {
    return {
      unitType: unitMap,
      packDto: {
        name: null,
        remark: null,
        price: null,
        discount: null,
        duration: null,
        unit: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '套餐名称为空',
            trigger: 'blur'
          },
        ],
        price: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('套餐价格为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('套餐价格为正整数'));
              }
              return callback();
            }
          },
        ],
        discount: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('套餐折扣价格为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('套餐折扣价格为正整数'));
              }
              return callback();
            }
          },
        ],
        unit: [
          {
            required: true,
            message: '套餐时间单位为空',
            trigger: 'blur'
          },
        ],
      }
    };
  },
  methods: {
    submitCreatePack() {
      this.$refs.addPackForm.validate(valid => {
        if (!valid) {
          return;
        }
        createPack(this.packDto).then(res => {
          this.$message.success('创建成功');
          this.resetForm();
        });
      });
    },
    resetForm() {
      Object.keys(this.packDto).forEach(key => this.packDto[key] = null);
      this.$refs.addPackForm.resetFields();
    },
    timeUnitChange(value) {
      this.packDto.unit     = value;
      this.packDto.duration = value != null && value !== '' ? 1 : null;
    },

  },
}
</script>

<style scoped>

</style>