<template>
  <div>
    <div style="display: flex;align-items: center">
      <el-select v-model="period" clearable placeholder="选择预测期号"
                 style="width: 200px;margin-right: 24px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_o'"
                   :value="item"
                   :label="'第 '+item+' 期'"></el-option>
      </el-select>
      <permission permit="super">
        <el-button plain type="primary" @click="differAnalyze">增量计算</el-button>
      </permission>
    </div>
    <div v-if="census" style="margin-top: 16px;height: 770px">
      <el-scrollbar style="height: 100%">
        <div style="display: flex;align-items: center;padding: 10px 0" class="forecast-item">
          <div style="width: 120px;margin-right: 10px">前200增量分析</div>
          <div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ73">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ75">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-6</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ76">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ62">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ63">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ65">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">3-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.differ32">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 8px">综合200</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ200.values">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding: 10px 0" class="forecast-item">
          <div style="width: 120px;margin-right: 10px">前500增量分析</div>
          <div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ73">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ75">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-6</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ76">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ62">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ63">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ65">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">3-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.differ32">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 8px">综合500</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ500.values">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding: 10px 0" class="forecast-item">
          <div style="width: 120px;margin-right: 10px">前1000增量分析</div>
          <div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ73">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ75">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">7-6</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ76">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ62">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-3</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ63">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">6-5</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ65">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 15px">3-2</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.differ32">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
            <div style="padding: 8px 0">
              <span style="margin-right: 8px;">综合1000</span>
              <span style="display:inline-block;width: 55px;margin-right: 10px"
                    v-for="item in census.differ1000.values">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding-bottom: 24px" class="forecast-item">
          <div style="width: 120px;margin-right: 10px">综合分析结果</div>
          <div style="padding: 8px 0">
          <span style="display:inline-block;width: 55px;margin-right: 10px"
                v-for="item in census.values">
                <span>{{ item.key }}</span>
                <span>:</span>
                <strong>{{ item.value }}</strong>
              </span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {differAnalyze} from "../../../../api/fc3d-service";
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";

export default {
  name: "Fc3dCalcAugView",
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      period: null,
      census: null,
    };
  },
  methods: {
    differAnalyze() {
      differAnalyze(this.period).then(data => {
        this.census = data;
      });
    },
  },
}
</script>

<style scoped>
.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.forecast-item:not(:last-child) {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: solid 1px #efefef;
}
</style>
