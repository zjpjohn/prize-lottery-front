<template>
  <div class="login-container">
    <canvas id="canvas" class="animate_bg"></canvas>
    <div class="login-view">
      <div class="avatar">
        <img src="../assets/images/avatar.png" alt="avatar" style="width: 64px;height: 64px">
      </div>
      <el-form ref="loginForm"
               style="width: 300px;margin-top: 40px"
               :model="user"
               :rules="rules"
               @submit.native.prevent>
        <el-form-item prop="name">
          <el-input v-model="user.name" placeholder="请输入账户名" autofocus>
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" type="password" placeholder="请输入密码">
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div>
          <el-button type="primary"
                     native-type="submit"
                     style="width: 100%;margin-bottom: 16px;margin-top: 8px"
                     @click="loginAction">登&nbsp;&nbsp;&nbsp;录
          </el-button>
        </div>
        <div>
          <el-button type="plain"
                     style="width: 100%;margin-bottom: 16px;margin-top: 8px"
                     @click="resetForm">取&nbsp;&nbsp;&nbsp;消
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {initializeBg} from "../libs/bg-star";

export default {
  name: "AuthLoginView",
  data() {
    return {
      user: {
        name: null,
        password: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '账户名不允许为空',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '密码不允许为空',
            trigger: 'blur'
          }
        ]
      },
    };
  },
  methods: {
    loginAction() {
      this.$refs['loginForm'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.$store.dispatch("user/authLogin", this.user).then(_ => {
          this.$router.replace("/index");
        });
      })
    },
    resetForm() {
      this.$refs['loginForm'].resetFields();
    }
  },
  mounted() {
    initializeBg('canvas')
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.animate_bg {
  position: absolute;
  top: 0;
  left: 0;
}

.login-view {
  z-index: 999;
  position: absolute;
  width: 350px;
  height: 340px;
  top: calc(50% - 165px);
  left: calc(50% - 175px);
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
  position: absolute;
  top: -32px;
}
</style>
