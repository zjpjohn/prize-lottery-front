<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 50%" v-if="voucher!=null">
      <el-form ref="editVoucherForm" :model="editDto" :rules="rules" label-width="100px">
        <el-form-item label="卡券编号">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ voucher.seqNo }}</span>
        </el-form-item>
        <el-form-item label="卡券状态">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ voucher.state.label }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ voucher.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="卡券名称" :prop="showEdit?'name':''">
          <el-input v-if="showEdit" v-model="editDto.name" placeholder="请输入卡券名称" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ voucher.name }}</span>
        </el-form-item>
        <el-form-item label="说明信息" :prop="showEdit?'remark':''">
          <el-input v-if="showEdit"
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    :show-watch-limit="true"
                    v-model="editDto.remark"
                    placeholder="请输入卡券说明信息"
                    clearable></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ voucher.remark }}
          </div>
        </el-form-item>
        <el-form-item label="卡券金额" :prop="showEdit?'voucher':''">
          <el-input v-if="showEdit" v-model="editDto.voucher" placeholder="请输入代金券金额" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ voucher.voucher }}金币</span>
        </el-form-item>
        <el-form-item label="领取类型">
          <i-check-radio-group v-if="showEdit" v-model="editDto.disposable"
                               style="height: 20px;line-height: 20px !important;">
            <i-check-radio size="small" label="一次性领取" :value="1"></i-check-radio>
            <i-check-radio size="small" label="可重复领取" :value="0"></i-check-radio>
          </i-check-radio-group>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ voucher.disposable === 0 ? '可重复领取' : '一次性领取' }}</span>
        </el-form-item>
        <el-form-item label="过期天数" :prop="showEdit?'expire':''">
          <el-input v-if="showEdit" v-model="editDto.expire" placeholder="请输入卡券过期天数"
                    clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ voucher.expire === 0 ? '不过期' : `领取${voucher.expire}天后过期` }}</span>
        </el-form-item>
        <el-form-item label="领取间隔" :prop="showEdit?'interval':''">
          <el-input v-if="showEdit" v-model="editDto.interval" placeholder="请输入领取间隔天数" clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-else>{{ voucher.interval === 0 ? '无间隔' : `每${voucher.interval}天领取` }}</span>
        </el-form-item>
        <el-form-item v-if="!showEdit&&voucher.state.value===1">
          <permission permit="super" style="margin-right: 12px">
            <el-button type="danger" @click="showEdit=true">编辑</el-button>
          </permission>
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
import {editVoucher, voucherInfo} from "../../api/voucher-service";
import ICheckRadioGroup from "../../components/icheck/ICheckRadioGroup";
import ICheckRadio from "../../components/icheck/ICheckRadio";

export default {
  name: "VoucherDetailView",
  components: {
    ICheckRadioGroup,
    ICheckRadio
  },
  data() {
    return {
      showEdit: false,
      voucher: null,
      editDto: {
        name: null,
        remark: null,
        voucher: null,
        disposable: null,
        interval: null,
        expire: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '代金券名称为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '代金券描述说明为空',
            trigger: 'blur'
          }
        ],
        voucher: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('代金券金额为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (!regPos.test(value)) {
                return callback(new Error('代金券金额为正整数'));
              }
              return callback();
            },
          }
        ],
        interval: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              let disposable = this.voucherDto.disposable;
              if (disposable === 0 && !value) {
                return callback(new Error('间隔天数为空'));
              }
              let regPos = /^[1-9]\d*$/;
              if (disposable === 0 && !regPos.test(value)) {
                return callback(new Error('间隔天数为正整数'));
              }
              return callback();
            },
          }
        ],
        expire: [
          {
            required: true,
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (!value) {
                return callback(new Error('过期天数为空'));
              }
              let regPos = /^([1-9]\d*|0)$/;
              if (!regPos.test(value)) {
                return callback(new Error('过期天数为正整数'));
              }
              return callback();
            },
          }
        ],
      },
    };
  },
  methods: {
    voucherDetail() {
      voucherInfo(this.$route.params.seqNo).then(data => {
        this.voucher = data || null;
        if (this.voucher != null) {
          Object.keys(this.editDto).forEach(key => this.editDto[key] = this.voucher[key]);
        }
      });
    },
    submitEdit() {
      this.$refs.editVoucherForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.editDto)
            .filter(key => this.editDto[key] !== this.voucher[key])
            .forEach(key => params[key] = this.editDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.error('没有数据更新');
          return;
        }
        this.$confirm('是否要提交编辑代金券？', '重要提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let editInfo = Object.assign({id: this.voucher.id}, params);
          editVoucher(editInfo).then(res => {
            this.voucherDetail();
            this.showEdit = false;
          });
        });
      });
    },
    cancelEdit() {
      this.showEdit = false;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.voucher[key]);
    },
  },
  created() {
    this.voucherDetail();
  }
}
</script>

<style scoped>
.input-info {
  padding: 0 15px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
}
</style>
