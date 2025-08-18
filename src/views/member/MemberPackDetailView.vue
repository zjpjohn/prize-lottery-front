<template>
  <div style="margin:48px 32px 0 32px">
    <div style="width: 35%">
      <el-form ref="editPackForm" :model="editDto" :rules="packRules" label-width="100px">
        <el-form-item label="套餐编号">
          <span class="el-input el-input--medium el-input--suffix input-info" v-if="pack">
            {{ pack.seqNo }}</span>
        </el-form-item>
        <el-form-item label="套餐状态">
          <span class="el-input el-input--medium el-input--suffix input-info" v-if="pack">
            {{ pack.state.label }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="el-input el-input--medium el-input--suffix input-info" v-if="pack">
            {{ pack.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="有效时间">
          <span class="el-input el-input--medium el-input--suffix input-info" v-if="pack">
            {{ unitType[pack.timeUnit.value] }}</span>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input v-if="showEdit&&pack.state.value===1"
                    v-model="editDto.name"
                    placeholder="请输入套餐名称"
                    clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else-if="pack">{{ pack.name }}</span>
        </el-form-item>
        <el-form-item label="套餐价格" prop="price">
          <el-input v-if="showEdit&&pack.state.value===1"
                    v-model="editDto.price"
                    placeholder="请输入套餐价格"
                    clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else-if="pack">{{
              pack.price
            }}分</span>
        </el-form-item>
        <el-form-item label="折扣价格" prop="discount">
          <el-input v-if="showEdit&&pack.state.value===1"
                    v-model="editDto.discount"
                    placeholder="请输入套餐名称"
                    clearable></el-input>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else-if="pack">
            {{ pack.discount }}分</span>
        </el-form-item>
        <el-form-item label="优先推荐">
          <el-switch
              v-if="showEdit&&pack.state.value===2"
              v-model="editDto.priority"
              active-text="优先"
              inactive-text="普通"
              :active-value="1"
              :inactive-value="0">
          </el-switch>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else-if="pack">
            {{ pack.priority === 1 ? '优先' : '一般' }}</span>
        </el-form-item>
        <el-form-item label="试用设置">
          <el-switch
              v-if="showEdit&&pack.state.value===2"
              v-model="editDto.onTrial"
              active-text="试用"
              inactive-text="常规"
              :active-value="1"
              :inactive-value="0">
          </el-switch>
          <span class="el-input el-input--medium el-input--suffix input-info" v-else-if="pack">
            {{ pack.onTrial === 1 ? '试用' : '常规' }}</span>
        </el-form-item>
        <el-form-item label="备注描述">
          <el-input v-if="showEdit&&pack.state.value===1"
                    type="textarea"
                    :rows="6"
                    maxlength="100"
                    :show-watch-limit="true"
                    v-model="editDto.remark"
                    placeholder="请输入套餐备注信息"
                    clearable></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else-if="pack">
            {{ pack.remark }}
          </div>
        </el-form-item>
        <el-form-item v-if="pack&&pack.state.value!==0&&!showEdit">
          <el-link :underline="false"
                   type="danger"
                   style="font-size: 15px"
                   icon="el-icon-edit-outline"
                   @click="showEdit=true">编辑
          </el-link>
        </el-form-item>
        <el-form-item v-if="showEdit">
          <el-link :underline="false"
                   type="danger"
                   style="margin-right: 10px;font-size: 15px"
                   @click="submitPackEdit">提交
          </el-link>
          <el-link :underline="false"
                   type="primary"
                   style="font-size: 15px"
                   @click="cancelPackEdit">取消
          </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import IcheckRadio from "../../components/icheck/ICheckRadio.vue";
import {unitMap} from "../../libs/pack_time_unit";
import {editPack, packInfo} from "../../api/member-service";

export default {
  name: "MemberPackDetailView",
  components: {IcheckRadio},
  data() {
    return {
      unitType: unitMap,
      showEdit: false,
      pack: null,
      privileges: [],
      pickedPrivilege: null,
      editDto: {
        name: null,
        remark: null,
        priority: null,
        price: null,
        discount: null,
        onTrial: null,
      },
      packRules: {
        price: [
          {
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (value) {
                let regPos = /^[1-9]\d*$/;
                if (!regPos.test(value)) {
                  return callback(new Error('套餐价格为正整数'));
                }
              }
              return callback();
            }
          },
        ],
        discount: [
          {
            trigger: 'blur',
            validator: (rules, value, callback) => {
              if (value) {
                let regPos = /^[1-9]\d*$/;
                if (!regPos.test(value)) {
                  return callback(new Error('套餐折扣价格为正整数'));
                }
              }
              return callback();
            }
          },
        ],
      },
    };
  },
  methods: {
    queryPackDetail() {
      packInfo(this.$route.params.packNo).then(data => {
        this.pack = data;
        if (this.pack != null) {
          Object.keys(this.editDto).forEach(key => this.editDto[key] = this.pack[key]);
        }
      });
    },
    submitPackEdit() {
      this.$refs.editPackForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.editDto)
            .filter(key => this.editDto[key] !== this.pack[key])
            .forEach(key => params[key] = this.editDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.error('没有更新数据');
          return;
        }
        editPack(Object.assign({packNo: this.pack.seqNo}, params)).then(_ => {
          this.$message.success('编辑成功');
          this.cancelPackEdit();
          this.queryPackDetail();
        });
      });
    },
    cancelPackEdit() {
      this.showEdit = false;
      this.$refs.editPackForm.resetFields();
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.pack[key]);
    },
  },
  created() {
    this.queryPackDetail();
  },
}
</script>

<style scoped>

</style>