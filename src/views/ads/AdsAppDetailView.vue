<template>
  <div style="margin:32px 32px 0 32px">
    <div style="padding: 16px 0">
      <el-row :gutter="64">
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="预估收益">
              <template v-slot:formatter>
                {{ appMetrics.todayRev.toFixed(2) }} / {{ appMetrics.lastRev.toFixed(2) }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">今日</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">昨日</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="请求次数">
              <template v-slot:formatter>
                {{ appMetrics.todayReq }} / {{ appMetrics.lastReq }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">今日</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">昨日</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="展现次数">
              <template v-slot:formatter>
                {{ appMetrics.todayImp }} / {{ appMetrics.lastImp }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">今日</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">昨日</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="广告填充率">
              <template v-slot:formatter>
                {{ (appMetrics.todayFill * 100).toFixed(0) }}% / {{
                  (appMetrics.lastFill * 100).toFixed(0)
                }}%
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">今日</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">昨日</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 24px">
      <div class="page-title" style="font-size: 20px">广告位列表</div>
      <el-table stripe :data="unitRecords.records"
                style="width:100%;margin-top: 20px"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="广告位标识" prop="unitId"></el-table-column>
        <el-table-column label="广告位名称" prop="unitName"></el-table-column>
        <el-table-column label="广告类型">
          <template v-slot="scope">
            <span>{{ unitType(scope.row.adType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="广告位状态">
          <template v-slot="scope">
            <span>{{ unitStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="广告尺寸">
          <template v-slot="scope">
            <div v-if="scope.row.adType===1||scope.row.adType===2">
              <permission permit="super">
                <el-link :underline="false"
                         type="primary"
                         v-if="scope.row.aspectRatio==null"
                         @click="adAspectRatio(scope.row)">
                  设置尺寸
                </el-link>
                <el-link :underline="false"
                         type="primary"
                         v-if="scope.row.aspectRatio"
                         @click="adAspectRatio(scope.row)">
                  <i class="icon icon-edit1"></i>
                  <span style="font-size: 15px">
                {{ scope.row.aspectRatio }}
                </span>
                </el-link>
              </permission>
            </div>
            <span v-else style="color: #999999">无</span>
          </template>
        </el-table-column>
        <el-table-column label="广告配置">
          <template v-slot="scope">
            <div v-if="scope.row.adType===5">
              <permission permit="super">
                <el-link :underline="false" type="primary"
                         @click="rewardConfig(scope.row.unitId)">回调配置
                </el-link>
              </permission>
            </div>
            <span v-if="scope.row.adType!==5" style="color: #999999">无</span>
          </template>
        </el-table-column>
        <el-table-column label="请求次数" prop="reqCnt"></el-table-column>
        <el-table-column label="展现次数" prop="impCnt"></el-table-column>
        <el-table-column label="预估收益" prop="revenue"></el-table-column>
        <el-table-column label="填充率" prop="fillRate">
          <template v-slot="scope">
            <span v-if="scope.row.fillRate">
              {{ (scope.row.fillRate * 100).toFixed(0) }}%
            </span>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="unitRecords.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showDialog"
               width="750px"
               :before-close="closeRewardConfig">
      <div slot="title" class="title" style="padding-top: 16px">激励视频配置</div>
      <el-form-item label="奖励名称" prop="name">
        <el-input v-model="rewardConfDto.name" clearable
                  placeholder="请输入奖励名称"></el-input>
      </el-form-item>
      <el-form ref="rewardConfForm"
               :model="rewardConfDto"
               :rules="rules"
               label-width="90px"
               style="padding:0 16px 0">
        <el-form-item label="奖励名称" prop="name">
          <el-input v-model="rewardConfDto.name" clearable
                    placeholder="请输入奖励名称"></el-input>
        </el-form-item>
        <el-form-item label="有偿奖励" prop="bounty">
          <el-input v-model="rewardConfDto.bounty"
                    onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                    placeholder="请输入有偿奖励数量"></el-input>
        </el-form-item>
        <el-form-item label="赠送奖励" prop="amount">
          <el-input v-model="rewardConfDto.amount"
                    onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                    placeholder="请输入系统赠送数量"></el-input>
        </el-form-item>
        <el-form-item label="回调地址" prop="callback">
          <el-input v-model="rewardConfDto.callback" clearable
                    placeholder="请输入回调处理地址"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" prop="secretKey">
          <el-input v-model="rewardConfDto.secretKey" clearable
                    placeholder="请输入校验安全密钥"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitRewardConf">提交</el-button>
          <el-button size="small" type="plain" @click="closeRewardConfig">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showRatio"
               width="500px"
               :before-close="closeAspectRatio">
      <div slot="title" class="title" style="padding-top: 16px">设置广告尺寸</div>
      <el-form ref="aspectRatioForm"
               :model="aspectRatioDto"
               :rules="ratioRules"
               label-width="90px"
               style="padding:0 16px 0">
        <el-form-item label="广告标识">
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-if="pickedSlot">
            {{ pickedSlot.unitId }}
          </span>
        </el-form-item>
        <el-form-item label="广告名称">
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-if="pickedSlot">
            {{ pickedSlot.unitName }}
          </span>
        </el-form-item>
        <el-form-item label="广告类型">
          <span class="el-input el-input--medium el-input--suffix input-info"
                v-if="pickedSlot">
            {{ unitType(pickedSlot.adType) }}
          </span>
        </el-form-item>
        <el-form-item label="尺寸比例" prop="ratio">
          <el-input v-model="aspectRatioDto.ratio"
                    @input="ratioInput"
                    clearable
                    placeholder="请输广告尺寸宽高比例"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitAspectRatio">提交</el-button>
          <el-button size="small" type="plain" @click="closeAspectRatio">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import {unit_status, unit_type} from "../../libs/advert";
import {adUnitRatio, appMetric, appUnitList, rewardConf, saveConf} from "../../api/ads-service";

export default {
  name: "AdsAppDetailView",
  data() {
    return {
      unitStates: unit_status,
      unitTypes: unit_type,
      appId: this.$route.params.appId,
      page: 1,
      limit: 8,
      appMetrics: {
        todayReq: 0,
        lastReq: 0,
        todayImp: 0,
        lastImp: 0,
        todayRev: 0,
        lastRev: 0,
        todayFill: 0,
        lastFill: 0,
      },
      unitRecords: {
        current: 1,
        total: 0,
        records: [],
      },
      rewardConf: null,
      showDialog: false,
      showRatio: false,
      rewardConfDto: {
        unitId: null,
        amount: null,
        bounty: null,
        name: null,
        callback: null,
        secretKey: null,
      },
      pickedSlot: null,
      aspectRatioDto: {
        unitId: null,
        ratio: null,
      },
      rules: {
        amount: [
          {
            required: true,
            message: '奖励金数量为空',
            trigger: 'blur'
          }
        ],
        bounty: [
          {
            required: true,
            message: '金币数量为空',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '奖励名称为空',
            trigger: 'blur'
          }
        ],
        callback: [
          {
            required: true,
            message: '回调地址为空',
            trigger: 'blur'
          }
        ],
        secretKey: [
          {
            required: true,
            message: '安全密钥为空',
            trigger: 'blur'
          }
        ],
      },
      ratioRules: {
        ratio: [
          {
            required: true,
            message: '广告尺寸为空',
            trigger: 'blur'
          }
        ],
      },

    };
  },
  methods: {
    unitType(type) {
      let filters = this.unitTypes.filter(e => e.value === type);
      if (filters) {
        return filters[0].label;
      }
      return '';
    },
    unitStatus(status) {
      let filters = this.unitStates.filter(e => e.value === status);
      if (filters) {
        return filters[0].label;
      }
      return '';
    },
    queryAppMetric() {
      appMetric(this.appId).then(data => {
        if (!data) {
          return;
        }
        let {
              todayReq,
              lastReq,
              todayImp,
              lastImp,
              todayRev,
              lastRev,
              todayFill,
              lastFill
            }                     = data;
        this.appMetrics.todayReq  = todayReq || 0;
        this.appMetrics.lastReq   = lastReq || 0;
        this.appMetrics.todayImp  = todayImp || 0;
        this.appMetrics.lastImp   = lastImp || 0;
        this.appMetrics.todayRev  = todayRev || 0;
        this.appMetrics.lastRev   = lastRev || 0;
        this.appMetrics.todayFill = todayFill || 0;
        this.appMetrics.lastFill  = lastFill || 0;
      });
    },
    queryAppUnits() {
      let condition = {
        appId: this.appId,
        page: this.page,
        limit: this.limit
      };
      appUnitList(condition).then(data => this.unitRecords = data);
    },
    rewardConfig(unitId) {
      this.rewardConfDto.unitId = unitId;
      rewardConf(unitId).then(data => {
        if (data) {
          this.rewardConfDto.name      = data.name;
          this.rewardConfDto.amount    = data.amount;
          this.rewardConfDto.bounty    = data.bounty;
          this.rewardConfDto.callback  = data.callback;
          this.rewardConfDto.secretKey = data.secretKey;
        }
        this.rewardConf = data;
        this.showDialog = true;
      });
    },
    closeRewardConfig() {
      this.showDialog = false;
      this.rewardConf = null;
      Object.keys(this.rewardConfDto).forEach(key => this.rewardConfDto[key] = null);
      this.$refs.rewardConfForm.resetFields();
    },
    submitRewardConf() {
      this.$refs.rewardConfForm.validate(valid => {
        if (!valid) {
          return false;
        }
        saveConf(this.rewardConfDto).then(res => {
          this.$message.success('保存成功');
          this.closeRewardConfig();
        });
      });
    },
    adAspectRatio(data) {
      this.pickedSlot            = data;
      this.aspectRatioDto.unitId = data.unitId;
      this.aspectRatioDto.ratio  = data.aspectRatio;
      this.showRatio             = true;
    },
    submitAspectRatio() {
      this.$refs.aspectRatioForm.validate(valid => {
        if (!valid) {
          return false;
        }
        if (this.pickedSlot.aspectRatio === this.aspectRatioDto.ratio) {
          this.$message.error('没有更新数据');
          return;
        }
        adUnitRatio({
          unitId: this.aspectRatioDto.unitId,
          ratio: this.aspectRatioDto.ratio,
        }).then(res => {
          this.$message.success('设置成功');
          this.queryAppUnits();
          this.closeAspectRatio();
        });
      });
    },
    closeAspectRatio() {
      this.$refs.aspectRatioForm.resetFields();
      this.showRatio      = false;
      this.aspectRatioDto = {
        unitId: null,
        ratio: null
      }
      this.pickedSlot     = null;
    },
    ratioInput(val) {
      val                       = val.replace(/。/g, '.');
      val                       = val.replace(/[^\d.]/g, ''); //清除"数字"和"."以外的字符
      val                       = val.replace(/^\./g, ''); //验证第一个字符是数字
      val                       = val.replace(/\.{2,}/g, ''); //只保留第一个, 清除多余的
      val                       = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      val                       = val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
      this.aspectRatioDto.ratio = val; // 在进行赋值

    }
  },
  mounted() {
    this.queryAppMetric();
    this.queryAppUnits();
  },
  watch: {
    page(value) {
      this.queryAppUnits();
    }
  },
}
</script>

<style scoped>
.metric-panel {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f7;
}

.metric-panel >>> .prefix {
  padding-top: 1px;
}

.metric-panel >>> .suffix {
  padding-top: 1px;
}
</style>
