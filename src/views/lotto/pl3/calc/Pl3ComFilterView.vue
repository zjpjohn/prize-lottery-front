<template>
  <div>
    <div style="margin-bottom: 24px;padding-top: 16px">
      <el-form ref="filterForm" :inline="true" :model="query" :rules="rules" label-width="80px">
        <el-form-item label="计算期号" prop="period">
          <el-select size="medium"
                     clearable
                     v-model="query.period"
                     placeholder="请选择推荐期号"
                     style="width:160px;">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_fsd'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤胆码" prop="dans">
          <el-select
              v-model="query.dans"
              style="width: 180px"
              multiple
              collapse-tags
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="请选择胆码">
            <el-option
                v-for="item in numList"
                :key="item.value"
                :label="item.label"
                :disabled="disableDan(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤杀码">
          <el-select
              v-model="query.kills"
              style="width: 200px"
              multiple
              collapse-tags
              clearable
              placeholder="请选择杀码">
            <el-option
                v-for="item in killList"
                :key="item.value"
                :label="item.label"
                :disabled="disableKill(item.value)"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤跨度">
          <el-select
              v-model="query.kuas"
              style="width: 200px"
              multiple
              collapse-tags
              placeholder="请选择杀码">
            <el-option
                v-for="item in kuaList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过滤和值">
          <el-slider
              v-model="query.sum"
              range
              style="width: 220px"
              :min="0"
              :max="27">
          </el-slider>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="fc3dFilter">三胆过滤</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px">
        <div v-if="result.length===0">
          <div class="table-empty" style="width: 800px">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px;margin-bottom: 8px">
            <span style="color: #8C8C8C">暂无组选号码</span>
          </div>
        </div>
        <div style="margin-left: 32px" v-else>
          <div style="margin-bottom: 16px">
            过滤后符合条件号码
            <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                result.length
              }}</span>注
          </div>
          <div style="display: flex;flex-wrap: wrap;">
            <el-tag v-for="(item,index) in result"
                    :key="'zu6_'+index"
                    style="margin: 16px 16px 0 0;"
                    :type="item.dataHit===3?'primary':'info'">{{ item.data }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {d3_categories} from "../../../../libs/lottery";
import {pl3PeriodMixin} from "../../../../mixins/period_pl3_mixin";
import {pl3ComFilter} from "../../../../api/pl3-service";

export default {
  name: "Pl3ComFilterView",
  mixins: [pl3PeriodMixin],
  data() {
    return {
      query: {
        period: null,
        dans: [],
        kills: [],
        kuas: [],
        sum: [
          9,
          18
        ],
      },
      result: [],
      rules: {
        period: [
          {
            required: true,
            message: '预测数据期号为空',
            trigger: 'blur'
          }
        ],
        dans: [
          {
            required: true,
            message: '胆码不允许为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  computed: {
    numList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `胆${e}`,
        };
      })
    },
    killList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `杀${e}`,
        };
      })
    },
    kuaList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `${e}跨`,
        };
      })
    },
  },
  methods: {
    disableDan(value) {
      return this.query.kills.includes(value);
    },
    disableKill(value) {
      return this.query.dans.includes(value);
    },
    fc3dFilter() {
      this.$refs.filterForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {
          period: this.query.period,
          dans: this.query.dans,
          kills: this.query.kills,
          kuas: this.query.kuas,
          sumMin: this.query.sum[0],
          sumMax: this.query.sum[1],
        };
        pl3ComFilter(params).then(data => this.result = data || []);
      });
    }
  }
}
</script>

<style scoped>

</style>