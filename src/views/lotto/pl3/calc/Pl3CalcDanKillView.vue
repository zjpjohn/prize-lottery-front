<template>
  <div>
    <div style="margin-bottom: 24px ;padding-top: 16px">
      <el-form :inline="true" :model="calcDto" :rules="rules" ref="calcForm" label-width="80px">
        <el-form-item label="计算期号" prop="period">
          <el-select size="medium"
                     clearable
                     v-model="calcDto.period"
                     placeholder="请选择推荐期号"
                     style="width:160px;margin-right: 16px">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_fsd'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加杀码">
          <el-select
              v-model="calcDto.kills"
              multiple
              collapse-tags
              filterable
              allow-create
              default-first-option
              style="width: 200px"
              placeholder="请选择杀码号码">
            <el-option
                v-for="item in killList"
                :key="item.value"
                :label="item.label"
                :disabled="disableKill(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排除杀码">
          <el-select
              v-model="calcDto.excludes"
              multiple
              filterable
              allow-create
              collapse-tags
              default-first-option
              style="width: 200px"
              placeholder="请选择排除杀码号码">
            <el-option
                v-for="item in excludeList"
                :key="item.value"
                :label="item.label"
                :disabled="disableExclude(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤跨度">
          <el-select
              v-model="calcDto.kuas"
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
            <el-button type="primary" @click="calcDanKill">计算</el-button>
            <el-button plain @click="cancelDanKill">取消</el-button>
          </permission>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-left: 32px" v-if="result.dans.length>0">
      <div v-if="result.dans.length > 0">
        <div style="font-size: 17px;font-weight: 600;margin-bottom: 32px">推荐胆码</div>
        <div>
          <span v-for="(item,index) in result.dans" :key="index+'_dan'"
                style="margin-right: 16px;font-size: 16px;font-weight: 600;">{{ item }}</span>
        </div>
      </div>
      <div v-if="result.kills.length>0">
        <div style="font-size: 17px;font-weight: 600;margin: 32px 0">推荐杀码</div>
        <div>
          <span v-for="(item,index) in result.kills" :key="index+'_kill'"
                style="margin-right: 16px;font-size: 16px;font-weight: 600;">{{ item }}</span>
        </div>
      </div>
      <div v-if="weights.length>0">
        <div style="font-size: 17px;font-weight: 600;margin: 32px 0">杀码分数</div>
        <div>
          <span v-for="(item,index) in weights" :key="index+'_weight'" style="margin-right: 16px;font-size: 16px">
            <span style="font-weight: bold">{{ item.label }}</span>
            <span>—</span>
            <span style="font-weight: bold">{{ item.value }}</span>
          </span>
        </div>
      </div>
      <div v-if="result.zu6!=null && result.zu6.items.length>0">
        <div style="font-size: 17px;font-weight: 600;margin: 32px 0 16px 0">组六推荐</div>
        <div style="display: flex;flex-wrap: wrap;">
          <el-tag v-for="(item,index) in result.zu6.items"
                  :key="'zu6_'+index"
                  style="margin: 16px 16px 0 0;"
                  :type="item.hit===1?'primary':'info'">{{ item.value }}
          </el-tag>
        </div>
      </div>
      <div v-if="result.zu3!=null && result.zu3.items.length>0">
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
import {pl3PeriodMixin} from "../../../../mixins/period_pl3_mixin";
import {d3_categories} from "../../../../libs/lottery";
import {dkRecommend} from "../../../../api/pl3-service";

export default {
  name: "Pl3CalcDanKillView",
  mixins: [pl3PeriodMixin],
  computed: {
    killList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `必杀${e}`
        };
      });
    },
    excludeList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `排除${e}`
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
      calcDto: {
        period: null,
        kills: [],
        excludes: [],
        kuas: [],
      },
      weights: [],
      result: {
        period: null,
        dans: [],
        kills: [],
        zu3: null,
        zu6: null,
        killWeight: null,
      },
      rules: {
        period: [
          {
            required: true,
            message: '计算开奖期号为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    disableExclude(value) {
      if (this.result.dans.length === 0) {
        return false;
      }
      return this.result.dans.includes(value) || this.calcDto.kills.includes(value);
    },
    disableKill(value) {
      if (this.result.dans.length === 0) {
        return false;
      }
      return this.result.dans.includes(value) || this.calcDto.excludes.includes(value);
    },
    killWeights() {
      if (this.result.killWeight == null) {
        return [];
      }
      let weights = [];
      Object.keys(this.result.killWeight).forEach(key => {
        weights.push({
          label: key,
          value: this.result.killWeight[key]
        })
      })
      weights.sort((o1, o2) => {
        if (o2.value > o1.value) {
          return 1;
        }
        if (o2.value === o1.weight) {
          return 0;
        }
        if (o2.value < o1.value) {
          return -1;
        }
      });
      return weights;
    },
    calcDanKill() {
      this.$refs.calcForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$confirm(`是否要计算${this.calcDto.period}期胆码杀码推荐？`, '重要提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dkRecommend(this.calcDto).then(data => {
            this.result  = data;
            this.weights = this.killWeights();
          });
        });
      });
    },
    cancelDanKill() {
      this.$refs.calcForm.resetFields();
      this.calcDto = {
        period: null,
        kills: [],
        excludes: [],
      };
      this.result  = {
        period: null,
        dans: [],
        kills: [],
        zu3: null,
        zu6: null,
        killWeight: null,
      };
    },
  },
  watch: {
    'calcDto.period'(value, old) {
      this.result           = {
        period: null,
        dans: [],
        kills: [],
        zu3: null,
        zu6: null,
        killWeight: null,
      };
      this.weights          = [];
      this.calcDto.excludes = [];
      this.calcDto.kills    = [];
    }
  }
}
</script>

<style scoped>

</style>