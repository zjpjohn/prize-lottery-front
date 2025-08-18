<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 50%" v-if="channel!=null">
      <el-form ref="editChannelForm" :model="channelDto" label-width="100px">
        <el-form-item label="渠道编码">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ channel.channel }}</span>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input v-if="showEdit" v-model="channelDto.name" placeholder="请输入渠道名称" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ channel.name }}</span>
        </el-form-item>
        <el-form-item label="渠道图标">
          <el-input v-if="showEdit" v-model="channelDto.cover" placeholder="请输入渠道图标" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ channel.cover }}</span>
        </el-form-item>
        <el-form-item label="描述说明">
          <el-input v-if="showEdit"
                    type="textarea"
                    :row="4"
                    :maxlength="100"
                    :show-watch-limit="true"
                    v-model="channelDto.remark"
                    placeholder="请输入渠道说明描述"
                    clearable></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ channel.remark }}
          </div>
        </el-form-item>
        <el-form-item label="渠道类型" prop="type">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.type"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="公告" :value="0"></i-check-radio>
            <i-check-radio size="small" label="提醒" :value="1"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.type === 0 ? '公告信息' : '提醒信息' }}</span>
        </el-form-item>
        <el-form-item label="可见范围" prop="scope">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.scope"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="全部" :value="0"></i-check-radio>
            <i-check-radio size="small" label="用户" :value="1"></i-check-radio>
            <i-check-radio size="small" label="专家" :value="2"></i-check-radio>
            <i-check-radio size="small" label="代理商" :value="3"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.scope.description }}</span>
        </el-form-item>
        <el-form-item label="开启提醒" prop="remind">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.remind"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="静默" :value="0"></i-check-radio>
            <i-check-radio size="small" label="提醒" :value="1"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.remind === 0 ? '静默不提醒' : '提醒已开启' }}</span>
        </el-form-item>
        <el-form-item v-if="!showEdit&&channel.state.value===1">
          <el-button type="danger" @click="showEdit=true">编辑</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item v-if="showEdit">
          <el-button type="danger" @click="submitEdit">提交</el-button>
          <el-button type="primary" @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ICheckRadio from "../../components/icheck/ICheckRadio";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import {channelInfo, editChannel} from "../../api/message-service";

export default {
  name: "ChannelDetailView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      showEdit: false,
      channel: null,
      channelDto: {
        name: null,
        cover: null,
        remark: null,
        type: null,
        remind: null,
        scope: null,
      },
    };
  },
  methods: {
    queryChannel() {
      channelInfo(this.$route.params.channel).then(data => {
        this.channel = data;
        Object.keys(this.channelDto)
            .forEach(key => {
              this.channelDto[key] = key === 'scope' ? this.channel[key].value : this.channel[key];
            });
      });
    },
    submitEdit() {
      let params = {};
      Object.keys(this.channelDto)
          .filter(key => {
            if (key === 'scope') {
              return this.channelDto[key] !== this.channel[key].value;
            }
            return this.channelDto[key] !== this.channel[key];
          })
          .forEach(key => params[key] = this.channelDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      this.$confirm('是否要提交编辑消息渠道？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let editDto = Object.assign({id: this.channel.id}, params);
        editChannel(editDto).then(res => {
          this.queryChannel();
          this.showEdit = false;
        });
      });
    },
    cancelEdit() {
      this.showEdit = false;
      Object.keys(this.channelDto).forEach(key => this.channelDto[key] = this.channel[key]);
    },
  },
  created() {
    this.queryChannel();
  }
}
</script>

<style scoped>

</style>
