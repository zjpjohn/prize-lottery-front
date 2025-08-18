<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 50%" v-if="channel!=null">
      <el-form ref="editChannelDto" :model="channelDto" label-width="100px">
        <el-form-item label="渠道编号">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ channel.seq }}</span>
        </el-form-item>
        <el-form-item label="渠道标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ channel.channel.value }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ channel.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input v-if="showEdit" v-model="channelDto.name" placeholder="请输入渠道名称" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ channel.name }}</span>
        </el-form-item>
        <el-form-item label="图标链接">
          <el-input v-if="showEdit" v-model="channelDto.cover" placeholder="请输入渠道图标链接" clearable></el-input>
          <img v-else :src="channel.cover+'?x-oss-process=image/resize,w_32,h_32,m_fixed'" alt="">
        </el-form-item>
        <el-form-item label="渠道图标">
          <el-input v-if="showEdit" v-model="channelDto.icon" placeholder="请输入渠道图标" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ channel.icon }}</span>
        </el-form-item>
        <el-form-item label="渠道备注">
          <el-input v-if="showEdit"
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    :show-watch-limit="true"
                    v-model="channelDto.remark"
                    placeholder="请输入渠道备注信息"
                    clearable></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ channel.remark }}
          </div>
        </el-form-item>
        <el-form-item label="推荐支付">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.priority"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="普通渠道" :value="0"></i-check-radio>
            <i-check-radio size="small" label="推荐渠道" :value="1"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.priority === 0 ? '普通渠道' : '推荐渠道' }}</span>
        </el-form-item>
        <el-form-item label="支付通道">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.pay"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="禁止支付" :value="0"></i-check-radio>
            <i-check-radio size="small" label="开启支付" :value="1"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.pay === 0 ? '禁止支付' : '开启支付' }}</span>
        </el-form-item>
        <el-form-item label="提现通道">
          <i-check-radio-group v-if="showEdit" v-model="channelDto.withdraw"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="禁止提现" :value="0"></i-check-radio>
            <i-check-radio size="small" label="开启提现" :value="1"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ channel.withdraw === 0 ? '禁止提现' : '开启提现' }}</span>
        </el-form-item>
        <el-form-item v-if="!showEdit">
          <permission permit="super">
            <el-button type="danger" @click="showEdit=true">编辑</el-button>
          </permission>
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
import {editPayChannel, payChannel} from "../../../api/payment-service";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../../components/icheck/ICheckRadio";

export default {
  name: "PayChannelDetail",
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
        icon: null,
        remark: null,
        priority: null,
        pay: null,
        withdraw: null,
      },
    };
  },
  methods: {
    getPayChannel() {
      payChannel(this.$route.params.id).then(data => {
        this.channel = data || null;
        if (this.channel != null) {
          Object.keys(this.channelDto).forEach(key => this.channelDto[key] = this.channel[key]);
        }
      });
    },
    submitEdit() {
      let params = {};
      Object.keys(this.channelDto)
          .filter(key => this.channelDto[key] !== this.channel[key])
          .forEach(key => params[key] = this.channelDto[key]);
      console.log(params);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据');
        return;
      }
      this.$confirm('是否要提交编辑支付渠道？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let editDto = Object.assign({id: this.channel.id}, params);
        editPayChannel(editDto).then(res => {
          this.getPayChannel();
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
    this.getPayChannel();
  }
}
</script>

<style scoped>

</style>
