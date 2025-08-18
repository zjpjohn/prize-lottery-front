<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 50%">
      <el-form ref="addChannelForm" :model="channelDto" :rules="rules" label-width="100px">
        <el-form-item label="渠道名称" prop="name">
          <el-input v-model="channelDto.name" size="large" placeholder="请输入渠道名称名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道编码" prop="channel">
          <el-input v-model="channelDto.channel" size="large" placeholder="请输入渠道编码名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道图标" prop="cover">
          <el-input v-model="channelDto.cover" size="large" placeholder="请输入渠道图标名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述说明" prop="remark">
          <el-input type="textarea"
                    size="large"
                    :rows="4"
                    maxlength="50"
                    show-word-limit
                    v-model="channelDto.remark"
                    placeholder="请输入渠道描述说明"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道类型" prop="type">
          <i-check-radio-group v-model="channelDto.type" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="公告" :value="0"></i-check-radio>
            <i-check-radio size="small" label="提醒" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="可见范围" prop="scope">
          <i-check-radio-group v-model="channelDto.scope" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="全部" :value="0"></i-check-radio>
            <i-check-radio size="small" label="用户" :value="1"></i-check-radio>
            <i-check-radio size="small" label="专家" :value="2"></i-check-radio>
            <i-check-radio size="small" label="代理商" :value="3"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item label="开启提醒" prop="remind">
          <i-check-radio-group v-model="channelDto.remind" style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="提醒静默" :value="0"></i-check-radio>
            <i-check-radio size="small" label="提醒开启" :value="1"></i-check-radio>
          </i-check-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCreate">确定</el-button>
          <el-button type="danger" @click="resetForm" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../components/icheck/ICheckRadio";
import {createChannel} from "../../api/message-service";

const defaultFields = {
  'type': 0,
  'scope': 0,
  'remind': 1,
};
export default {
  name: "ChannelCreateView",
  components: {
    ICheckRadio,
    ICheckRadioGroup
  },
  data() {
    return {
      channelDto: {
        name: null,
        channel: null,
        cover: null,
        remark: null,
        type: 0,
        scope: 0,
        remind: 1,
      },
      rules: {
        name: [
          {
            required: true,
            message: '渠道名称为空',
            trigger: 'blur'
          }
        ],
        channel: [
          {
            required: true,
            message: '渠道码称为空',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            message: '渠道图片为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '渠道说明为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '渠道类型为空',
            trigger: 'blur'
          }
        ],
        scope: [
          {
            required: true,
            message: '渠道可见范围为空',
            trigger: 'blur'
          }
        ],
        remind: [
          {
            required: true,
            message: '渠道是否提醒为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    submitCreate() {
      this.$refs.addChannelForm.validate(valid => {
        if (!valid) {
          return;
        }
        createChannel(this.channelDto).then(res => {
          this.$message.success('创建成功');
          this.resetForm();
        });
      });
    },
    resetForm() {
      Object.keys(this.channelDto).forEach(key => {
        this.channelDto[key] = defaultFields[key] | null;
      });
      this.$refs.addChannelForm.resetFields();
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
