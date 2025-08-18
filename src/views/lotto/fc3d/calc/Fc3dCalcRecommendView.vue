<template>
  <div>
    <div style="margin-bottom: 24px;padding-top: 16px;">
      <el-form :inline="true" :model="recomDto" :rules="rules" ref="recomForm" label-width="80px">
        <el-form-item label="计算期号" prop="period">
          <el-select size="medium"
                     clearable
                     v-model="recomDto.period"
                     placeholder="请选择推荐期号"
                     style="width:160px;margin-right: 16px">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_fsd'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定胆过滤" prop="dans">
          <el-select
              v-model="recomDto.dans"
              multiple
              filterable
              allow-create
              collapse-tags
              default-first-option
              style="width: 200px"
              placeholder="请选择定胆号码">
            <el-option
                v-for="item in danOptions"
                :key="item.value"
                :label="item.label"
                :disabled="disableDan(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="杀码过滤" prop="kills">
          <el-select
              v-model="recomDto.kills"
              multiple
              collapse-tags
              filterable
              allow-create
              default-first-option
              style="width: 200px"
              placeholder="请选择杀码号码">
            <el-option
                v-for="item in killOptions"
                :key="item.value"
                :label="item.label"
                :disabled="disableKill(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跨度过滤" prop="kuas">
          <el-select
              v-model="recomDto.kuas"
              style="width: 200px"
              multiple
              collapse-tags
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="请选择跨度">
            <el-option
                v-for="item in kuaList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <permission permit="super">
            <el-button type="primary" @click="calcRecommend">计算</el-button>
            <el-button plain @click="cancelRecommend">取消</el-button>
          </permission>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="result" style="margin-left: 32px">
      <div v-if="result.zu6.items!=null && result.zu6.items.length>0">
        <div style="font-size: 17px;font-weight: 600;margin-bottom: 32px">组六推荐</div>
        <div style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.zu6.items"
                  :key="'zu6_'+index"
                  style="margin-right: 16px;"
                  :type="item.hit===1?'primary':'info'">{{ item.value }}
          </el-tag>
        </div>
      </div>
      <div v-if="result.zu3.items!=null && result.zu3.items.length>0">
        <div style="font-size: 17px;font-weight: 600;margin: 32px 0">组三推荐</div>
        <div style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.zu3.items"
                  :key="'zu3_'+index"
                  style="margin-right: 16px;"
                  :type="item.hit===1?'primary':'info'">{{ item.value }}
          </el-tag>
        </div>
      </div>
    </div>
    <div style="margin-left: 32px" v-else>
      <div class="table-empty" style="width: 800px">
        <img src="../../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
        <span style="color: #8C8C8C">请选择期号计算</span>
      </div>
    </div>
  </div>
</template>

<script>
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {d3_categories} from "../../../../libs/lottery";
import {comRecommendAna} from "../../../../api/fc3d-service";

export default {
  name: "Fc3dCalcRecommendView",
  mixins: [fc3dPeriodMixin],
  computed: {
    danOptions() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `胆码${e}`
        };
      });
    },
    killOptions() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `必杀${e}`
        };
      });
    },
    kuaList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `跨度${e}`,
        };
      })
    },
  },
  data() {
    return {
      result: null,
      recomDto: {
        period: null,
        dans: [],
        kills: [],
        kuas: [],
      },
      rules: {
        period: [
          {
            required: true,
            message: '计算开奖期号为空',
            trigger: 'blur'
          }
        ],
        dans: [
          {
            required: true,
            message: '未选择推荐胆码',
            trigger: 'blur'
          }
        ],
        kills: [
          {
            required: true,
            message: '未选择推荐杀码',
            trigger: 'blur'
          }
        ],
        kuas: [
          {
            required: true,
            message: '过滤跨度为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    disableDan(value) {
      if (this.recomDto.kills.length === 0) {
        return false;
      }
      return this.recomDto.kills.includes(value);
    },
    disableKill(value) {
      if (this.recomDto.dans.length === 0) {
        return false;
      }
      return this.recomDto.dans.includes(value);
    },
    calcRecommend() {
      this.$refs.recomForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.$confirm(`是否要计算${this.recomDto.period}期推荐？`, '重要提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          comRecommendAna(Object.assign({save: false}, this.recomDto)).then(data => {
            this.result = data;
          });
        });
      });
    },
    cancelRecommend() {
      this.$refs.recomForm.resetFields();
      this.result   = null;
      this.recomDto = {
        period: null,
        dans: [],
        kills: [],
      };
    }
  },
  watch: {
    'recomDto.period'(value, old) {
      this.result         = null;
      this.recomDto.dans  = [];
      this.recomDto.kills = [];
    }
  }
}
</script>

<style scoped>

</style>