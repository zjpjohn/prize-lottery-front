<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 40%">
      <el-form ref="addChannelForm" :model="channelDto" :rules="rules" label-width="100px">
        <el-form-item label="渠道名称" prop="name">
          <el-input v-model="channelDto.name" size="large" placeholder="请输入支付渠道名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道标识" prop="channel">
          <el-select size="large"
                     style="width: 100%"
                     clearable
                     v-model="channelDto.channel"
                     placeholder="选择支付渠道">
            <el-option label="支付宝支付" value="ali_pay"></el-option>
            <el-option label="微信支付" value="wx_pay"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标链接" prop="cover">
          <el-input v-model="channelDto.cover" size="large" placeholder="请输入支付渠道图标链接" clearable></el-input>
        </el-form-item>
        <el-form-item label="支付图标" prop="icon">
          <el-input v-model="channelDto.icon" size="large" placeholder="请输入支付渠道图标icon值" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道说明" prop="remark">
          <el-input type="textarea"
                    size="large"
                    :rows="3"
                    :maxlength="100"
                    :show-word-limit="true"
                    v-model="channelDto.remark"
                    placeholder="请输入支付渠道说明信息"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="开通支付">
          <i-check-radio-group v-model="channelDto.pay" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="禁用支付" :value="0"></i-check-radio>
            <i-check-radio size="small" label="开通支付" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="开通提现">
          <i-check-radio-group v-model="channelDto.withdraw" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="禁用提现" :value="0"></i-check-radio>
            <i-check-radio size="small" label="开通提现" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreateChannel">确定</el-button>
          <el-button type="danger" @click="resetForm" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";
import {addPayChannel} from "../../../api/payment-service";

export default {
  name: "PayChannelCreate",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      channelDto: {
        name: null,
        channel: null,
        cover: null,
        icon: null,
        remark: null,
        pay: 0,
        withdraw: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: '渠道名称为空',
            trigger: 'blur'
          },
        ],
        channel: [
          {
            required: true,
            message: '渠道标识为空',
            trigger: 'blur'
          },
        ],
        cover: [
          {
            required: true,
            message: '渠道图片为空',
            trigger: 'blur'
          },
        ],
        icon: [
          {
            required: true,
            message: '渠道图标为空',
            trigger: 'blur'
          },
        ],
      },
    };
  },
  methods: {
    submitCreateChannel() {
      this.$refs.addChannelForm.validate(valid => {
        if (!valid) {
          return;
        }
        addPayChannel(this.channelDto).then(res => {
          this.$message.success('创建成功');
          this.resetForm();
        });
      });
    },
    resetForm() {
      Object.keys(this.channelDto).forEach(key => {
        let value = null;
        if (key === 'pay' || key === 'withdraw') {
          value = 0;
        }
        this.channelDto[key] = value;
      });
      this.$refs.addChannelForm.resetFields();
    },
  },
}
</script>

<style scoped>

</style>
