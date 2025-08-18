<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">一键登录认证</div>
      <div v-if="loaded&&verify==null" style="margin-left: 32px">
        <permission permit="super">
          <el-button plain type="primary" icon="el-icon-plus" @click="toCreateVerify()">创建配置</el-button>
        </permission>
      </div>
    </div>
    <div style="margin-top: 32px;width: 60%" v-if="loaded&&verify!=null">
      <el-form ref="editVerifyForm" :model="modifyDto" label-width="100px">
        <el-form-item label="应用包名">
          <el-input v-if="modify" v-model="modifyDto.appPack" placeholder="请输入应用包名"></el-input>
          <div v-else>{{ verify.appPack }}</div>
        </el-form-item>
        <el-form-item label="应用签名">
          <el-input v-if="modify" v-model="modifyDto.signature" placeholder="请输入应用签名"></el-input>
          <div v-else>{{ verify.signature }}</div>
        </el-form-item>
        <el-form-item label="应用密钥">
          <el-input type="textarea"
                    :rows="3"
                    v-if="modify"
                    v-model="modifyDto.authKey"
                    placeholder="请输入应用授权密钥"></el-input>
          <div style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ verify.authKey }}
          </div>
        </el-form-item>
        <el-form-item label="授权成功">
          <el-input v-if="modify" v-model="modifyDto.success" placeholder="请输入授权成功响应码"></el-input>
          <div v-else>{{ verify.success }}</div>
        </el-form-item>
        <el-form-item label="授权取消">
          <el-input v-if="modify" v-model="modifyDto.cancel" placeholder="请输入授权取消响应码"></el-input>
          <div v-else>{{ verify.cancel }}</div>
        </el-form-item>
        <el-form-item label="授权降级">
          <el-input type="textarea"
                    :rows="2"
                    v-if="modify" v-model="modifyDto.downgrades" placeholder="请输入授权降级响应码"></el-input>
          <div style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ verify.downgrades }}
          </div>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea"
                    :rows="3"
                    v-if="modify" v-model="modifyDto.remark" placeholder="请输入授权备注描述信息"></el-input>
          <div style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ verify.remark }}
          </div>
        </el-form-item>
        <el-form-item v-if="!modify&&verify.state.value===1">
          <permission permit="super">
            <el-button type="primary" @click="publishVerify">发布</el-button>
            <el-button type="warning" @click="modify=true">编辑</el-button>
          </permission>
        </el-form-item>
        <el-form-item v-if="!modify&&verify.state.value===2">
          <permission permit="super">
            <el-button type="danger" @click="disableVerify">下架</el-button>
          </permission>
        </el-form-item>
        <el-form-item v-if="modify">
          <el-button type="danger" @click="submitModify">提交</el-button>
          <el-button type="primary" @click="cancelModify">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 32px;margin-left:32px;width: 50%" v-else>
      <div style="display: flex;flex-direction:column;justify-content: center;align-items:center;min-height: 200px;">
        <img src="../../../assets/images/empty.png" alt="" style="width: 192px">
        <span style="margin-top: 16px;color: #8C8C8C">暂无授权认证配置</span>
      </div>
    </div>
  </div>
</template>

<script>
import {appVerify, editVerify} from "../../../api/app-service";

export default {
  name: "VerifyManagerView",
  data() {
    return {
      appNo: this.$route.params.appNo,
      loaded: false,
      verify: null,
      modify: false,
      modifyDto: {
        appPack: null,
        signature: null,
        authKey: null,
        success: null,
        cancel: null,
        downgrades: null,
        remark: null,
      },
    };
  },
  methods: {
    queryVerify() {
      return appVerify(this.appNo).then(data => {
        this.verify = data || null;
        if (this.verify != null) {
          Object.keys(this.modifyDto).forEach(key => this.modifyDto[key] = this.verify[key]);
        }
      });
    },
    publishVerify() {
      this.$confirm('是否要发布一键登录配置', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editVerify({
          id: this.verify.id,
          state: 2
        })
            .then(res => this.queryVerify());
      });
    },
    disableVerify() {
      this.$confirm('是否要取消一键登录配置', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editVerify({
          id: this.verify.id,
          state: 1
        })
            .then(res => this.queryVerify());
      });
    },
    submitModify() {
      let params = {};
      Object.keys(this.modifyDto)
          .filter(key => this.modifyDto[key] !== this.verify[key])
          .forEach(key => params[key] = this.modifyDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据');
        return;
      }
      let modified = Object.assign({id: this.verify.id}, params);
      editVerify(modified)
          .then(res => {
            this.cancelModify();
            this.$message.success('更新成功');
            this.queryVerify();
          });
    },
    cancelModify() {
      this.modify = false;
      Object.keys(this.modifyDto).forEach(key => this.modifyDto[key] = this.verify[key]);
    },
    toCreateVerify() {
      this.$router.push(`/app/${this.appNo}/verify/create`);
    },
  },
  mounted() {
    this.loaded = false;
    this.queryVerify().finally(() => {
      this.loaded = true;
    });
  },
}
</script>

<style scoped>

</style>
