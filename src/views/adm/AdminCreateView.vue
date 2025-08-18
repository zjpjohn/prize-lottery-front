<template>
  <div style="margin: 32px 32px 0 32px">
    <div class="page-title">创建账户</div>
    <div style="width: 45%;margin-top: 24px">
      <el-form ref="createAdminForm"
               :model="adminDto"
               :rules="rules"
               label-width="90px">
        <el-form-item label="账户名称" prop="name">
          <el-input v-model="adminDto.name" size="large" placeholder="请输入账户名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="adminDto.phone" size="large" placeholder="请输入手机联系方式" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="adminDto.password" size="large" type="password" placeholder="请输入登录密码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="adminDto.confirm" size="large" type="password" placeholder="请输入确认密码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <i-check-radio-group v-model="adminDto.level" style="height: 28px;line-height: 28px !important;">
            <i-check-radio :value="item.value"
                           :label="item.label"
                           size="mini"
                           v-for="(item,index) in levels"
                           :key="index+'_chk_level'">
            </i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="createAdminAction">提 交</el-button>
          <el-button type="plain" @click="resetForm">清 空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {createAdminAcct} from "../../api/adm-service";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../components/icheck/ICheckRadio";

export default {
  name: "AdminCreateView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      levels: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '一般管理员',
          value: 2
        },
      ],
      creating: false,
      adminDto: {
        name: null,
        password: null,
        confirm: null,
        phone: null,
        level: 2
      },
      rules: {
        name: [
          {
            required: true,
            message: '账户名为空',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '手机号为空',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号码",
            trigger: "blur"
          },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          },
        ],
        password: [
          {
            required: true,
            message: '登录密码为空',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            required: true,
            message: '确认密码为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    createAdminAction() {
      this.$refs['createAdminForm'].validate(valid => {
            if (!valid) {
              return;
            }
            if (this.adminDto.password !== this.adminDto.confirm) {
              this.$message.error('密码不一致');
              return;
            }
            this.creating = true;
            createAdminAcct(this.adminDto).then(response => {
              this.resetForm();
              this.$message.success('创建成功');
            });
          }
      )
    },
    resetForm() {
      Object.keys(this.adminDto).forEach(key => this.adminDto[key] = null);
      this.creating       = false;
      this.adminDto.level = 2;
      this.$refs['createAdminForm'].resetFields();
    },
  },
}
</script>

<style scoped>

</style>
