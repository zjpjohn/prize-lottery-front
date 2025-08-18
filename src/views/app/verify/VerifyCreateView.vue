<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="width: 50%">
      <el-form ref="addVerifyForm" :model="createDto" :rules="rules" label-width="100px">
        <el-form-item label="应用包名" prop="appPack">
          <el-input v-model="createDto.appPack" placeholder="请输入授权应用包名"></el-input>
        </el-form-item>
        <el-form-item label="应用签名" prop="signature">
          <el-input v-model="createDto.signature" placeholder="请输入授权应用签名"></el-input>
        </el-form-item>
        <el-form-item label="授权密钥" prop="authKey">
          <el-input type="textarea"
                    :rows="3"
                    v-model="createDto.authKey"
                    placeholder="请输入授权应用密钥"></el-input>
        </el-form-item>
        <el-form-item label="授权成功" prop="success">
          <el-input v-model="createDto.success" placeholder="请输入授权成功响应码"></el-input>
        </el-form-item>
        <el-form-item label="授权取消" prop="cancel">
          <el-input v-model="createDto.cancel" placeholder="请输入授权取消响应码"></el-input>
        </el-form-item>
        <el-form-item label="授权降级">
          <el-input type="textarea"
                    :rows="2"
                    v-model="createDto.downgrades"
                    placeholder="请输入授权降级响应码，请用','分隔各个降级码"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea"
                    :rows="3"
                    v-model="createDto.remark"
                    placeholder="请输入授权相关备注说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreate">确 定</el-button>
          <el-button type="plain" @click="cancelCreate">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {createVerify} from "../../../api/app-service";

export default {
  name: "VerifyCreateView",
  data() {
    return {
      appNo: this.$route.params.appNo,
      createDto: {
        appPack: null,
        signature: null,
        authKey: null,
        success: null,
        cancel: null,
        downgrades: null,
        remark: null,
      },
      rules: {
        appPack: [
          {
            required: true,
            message: '授权应用包名为空',
            trigger: 'blur'
          }
        ],
        signature: [
          {
            required: true,
            message: '应用授权签名为空',
            trigger: 'blur'
          }
        ],
        authKey: [
          {
            required: true,
            message: '应用授权密钥为空',
            trigger: 'blur'
          }
        ],
        success: [
          {
            required: true,
            message: '授权成功响应码为空',
            trigger: 'blur'
          }
        ],
        cancel: [
          {
            required: true,
            message: '授权取消响应码为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    submitCreate() {
      this.$refs.addVerifyForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = Object.assign({appNo: this.appNo}, this.createDto);
        createVerify(params).then(res => {
          this.cancelCreate();
          this.$message.success('创建成功');
        })
      });
    },
    cancelCreate() {
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
      this.$refs['addVerifyForm'].resetFields();
      this.$router.back();
    },
  },
}
</script>

<style scoped>

</style>
