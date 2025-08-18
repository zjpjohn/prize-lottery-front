<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="width: 50%;margin-top: 24px">
      <el-form ref="assistForm" :model="assistantDto" :rules="rules" label-width="100px">
        <el-form-item label="助手类型" prop="type">
          <el-select v-model="assistantDto.type" clearable placeholder="请选择助手类型">
            <el-option :value="type"
                       :label="types[type]"
                       v-for="type in Object.keys(types)"
                       :key="'a_t_'+type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用版本">
          <el-select v-model="assistantDto.suitVer" clearable placeholder="请选择适用版本">
            <el-option :value="version"
                       :label="version"
                       v-for="version in versions"
                       :key="'a_v_'+version">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="助手标题" prop="title">
          <el-input v-model="assistantDto.title" placeholder="请输入助手标题"></el-input>
        </el-form-item>
        <el-form-item label="信息内容" prop="content">
          <el-input type="textarea" :rows="6" v-model="assistantDto.content" placeholder="请输入详细内容"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" :rows="2" v-model="assistantDto.remark" placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="createAssistant">确 定</el-button>
          <el-button type="plain" @click="resetForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {assistantTypes} from "../../../libs/lottery";
import {assistantApp, createAssistant} from "../../../api/app-service";

export default {
  name: "AssistantAddView",
  data() {
    return {
      types: assistantTypes,
      appNo: this.$route.params['appNo'],
      versions: [],
      creating: false,
      assistantDto: {
        suitVer: null,
        type: null,
        title: null,
        content: null,
        remark: null,
      },
      rules: {
        type: [
          {
            required: true,
            message: '助手类型为空',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '助手标题为空',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '助手内容为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    createAssistant() {
      this.$refs.assistForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        let createDto = Object.assign(this.assistantDto, {appNo: this.appNo});
        createAssistant(createDto).then(res => {
          this.resetForm();
          this.$message.success('创建成功');
        })
      });
    },
    resetForm() {
      Object.keys(this.assistantDto).forEach(key => this.assistantDto[key] = null);
      this.creating = false;
      this.$refs.assistForm.resetFields();
    },
    queryAppVersions() {
      assistantApp(this.appNo).then(data => {
        if (data) {
          this.versions = data.versions || [];
          if (this.versions.length > 0) {
            this.versions.sort();
          }
        }
      })
    }
  },
  mounted() {
    this.queryAppVersions();
  }
}
</script>

<style scoped>

</style>
