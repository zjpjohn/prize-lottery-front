<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 50%" v-if="assistant">
      <el-form ref="assistForm" :model="assistantDto" label-width="100px">
        <el-form-item label="所属应用">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ assistant.appNo }}</span>
        </el-form-item>
        <el-form-item label="助手类型">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ types[assistant.type] }}</span>
        </el-form-item>
        <el-form-item label="助手状态">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ assistant.state.description }}</span>
        </el-form-item>
        <el-form-item label="适用版本">
          <el-select v-if="showEdit" v-model="assistantDto.suitVer" clearable placeholder="请选择适用版本">
            <el-option :value="version"
                       :label="version"
                       v-for="version in versions"
                       :key="'a_v_'+version">
            </el-option>
          </el-select>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>
            {{ assistant.suitVer && assistant.suitVer !== '' ? assistant.suitVer : '全部版本' }}
          </span>
        </el-form-item>
        <el-form-item label="助手标题">
          <el-input v-if="showEdit" v-model="assistantDto.title" clearable placeholder="请输入应用助手标题"></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ assistant.title }}</span>
        </el-form-item>
        <el-form-item label="信息内容" prop="content">
          <el-input v-if="showEdit" type="textarea"
                    :rows="6"
                    v-model="assistantDto.content"
                    placeholder="请输入助手详细内容"></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ assistant.content }}
          </div>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-if="showEdit" type="textarea" :rows="2" v-model="assistantDto.remark"
                    placeholder="请输入助手备注描述"></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ assistant.remark }}
          </div>
        </el-form-item>
        <permission permit="super">
          <el-form-item v-if="!showEdit&&assistant.state.value===1">
            <permission permit="super">
              <el-button type="danger" @click="showEdit=true">编辑</el-button>
            </permission>
            <el-button @click="$router.back()">返回</el-button>
          </el-form-item>
        </permission>
        <el-form-item v-if="showEdit">
          <el-button type="primary" @click="submitAction">确定</el-button>
          <el-button type="plain" style="margin-right:8px" @click="cancelAction">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {assistantTypes} from "../../../libs/lottery";
import {assistantApp, assistantDetail, editAssistant} from "../../../api/app-service";

export default {
  name: 'AssistantDetailView',
  data() {
    return {
      types: assistantTypes,
      versions: [],
      showEdit: false,
      assistant: null,
      assistantDto: {
        suitVer: null,
        title: null,
        content: null,
        remark: null,
      },
    };
  },
  methods: {
    submitAction() {
      let params = {};
      Object.keys(this.assistantDto)
          .filter(key => this.assistantDto[key] !== this.assistant[key])
          .forEach(key => params[key] = this.assistantDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      editAssistant(Object.assign({id: this.assistant.id}, params))
          .then(res => {
            Object.keys(params).forEach(key => this.assistant[key] = params[key]);
            this.showEdit = false;
            this.$message.success('更新成功');
          })
    },
    cancelAction() {
      this.showEdit = false;
      Object.assign(this.assistantDto, this.assistant);
    },
    queryAssistant() {
      assistantDetail(this.$route.params['id'])
          .then(data => {
            this.assistant = data;
            Object.keys(this.assistant).forEach(key => this.assistantDto[key] = this.assistant[key]);
          });
    },
    queryAppVersions() {
      assistantApp(this.$route.params['appNo'])
          .then(data => {
            if (data) {
              this.versions = data.versions || [];
              if (this.versions.length > 0) {
                this.versions.sort();
              }
            }
          });
    }
  },
  mounted() {
    this.queryAssistant();
    this.queryAppVersions();
  }
}
</script>

<style scoped>

</style>