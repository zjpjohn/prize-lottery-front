<template>
  <div style="margin: 64px 32px 0 32px">
    <div style="width: 40%">
      <el-form ref="addVoucherForm" :model="voucherDto" :rules="rules" label-width="100px">
        <el-form-item label="领取类型">
          <i-check-radio-group v-model="voucherDto.disposable" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="一次性领取" :value="1"></i-check-radio>
            <i-check-radio size="small" label="可重复领取" :value="0"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="卡券名称" prop="name">
          <el-input v-model="voucherDto.name" size="large" placeholder="请输入代金券名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="卡券金额" prop="voucher">
          <el-input v-model="voucherDto.voucher" size="large" placeholder="请输入代金券金额，且为正整数"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="过期天数" prop="expire">
          <el-input v-model="voucherDto.expire" size="large" placeholder="过期天数0标识不过期，大于0表示过期天数"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="间隔天数" prop="interval" v-if="voucherDto.disposable===0">
          <el-input v-model="voucherDto.interval" size="large" placeholder="请输入领取间隔天数,且为正整数"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="说明信息" prop="remark">
          <el-input type="textarea"
                    size="large"
                    :rows="3"
                    :maxlength="100"
                    :show-word-limit="true"
                    v-model="voucherDto.remark"
                    placeholder="请输入代金券说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="submitCreateVoucher">确定</el-button>
          <el-button type="danger" @click="resetForm" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {createVoucher} from "../../api/voucher-service";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../components/icheck/ICheckRadio";

export default {
  name: "VoucherCreateView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      creating: false,
      voucherDto: {
        name: null,
        remark: null,
        voucher: null,
        disposable: 1,
        interval: null,
        expire: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '代金券名称为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '代金券描述说明为空',
            trigger: 'blur'
          }
        ],
        voucher: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('代金券金额为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('代金券金额为正整数'));
              }
              return callback();
            },
          }
        ],
        interval: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              let disposable = this.voucherDto.disposable;
              if (disposable === 0 && !value) {
                return callback(new Error('间隔天数为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (disposable === 0 && !regPos.test(value)) {
                return callback(new Error('间隔天数为正整数'));
              }
              return callback();
            },
          }
        ],
        expire: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('过期天数为空'));
              }
              let regPos = /^([1-9]\d*|0)$/;
              if (!regPos.test(value)) {
                return callback(new Error('过期天数为正整数'));
              }
              return callback();
            },
          }
        ],
      },
    };
  },
  methods: {
    submitCreateVoucher() {
      this.$refs.addVoucherForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        createVoucher(this.voucherDto).then(res => {
          this.$message.success('创建成功');
          this.resetForm();
        });
      });
    },
    resetForm() {
      Object.keys(this.voucherDto).forEach(key => {
        this.voucherDto[key] = key === 'disposable' ? 1 : null;
      });
      this.creating = false;
      this.$refs.addVoucherForm.resetFields();
    }
  },
}
</script>

<style scoped>

</style>
