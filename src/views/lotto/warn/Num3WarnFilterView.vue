<template>
  <div class="filter-container">
    <div style="display: flex;align-items: start;justify-content: space-between;padding-bottom: 80px" v-if="wensInfo">
      <div style="width: 45%">
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>开奖信息</legend>
            <div style="padding: 6px 0;font-size: 13px">
              <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 16px">
                <div style="flex: 1">
                  <span>上期期号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.period
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>上期奖号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.current
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>开奖日期</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.lotDate
                    }}</span>
                </div>
              </div>
              <div
                  style="display: flex;align-items: center;justify-content: space-between;margin-top: 12px;padding:0 16px">
                <div style="flex: 1">
                  <span>本期期号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.nextPeriod
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>本期奖号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.next || '未开奖'
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>选择期号</span>
                  <span style="margin-left: 12px;color: red;display: inline-block">
                      <el-select size="mini"
                                 v-model="period"
                                 placeholder="开奖期号"
                                 style="width: 120px;">
                      <el-option v-for="(item,index) in periods"
                                 :key="index+'_p_s_o'"
                                 :value="item"
                                 :label="item+' 期'"></el-option>
                    </el-select>
                    </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>胆组一</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                   <span
                       :class="filterDto.danList.includes(item)?'cell-active':'cell-inactive'"
                       @click="danPick(item,filterDto.danList)" v-if="!disableDan(item)">{{ item }}</span>
                  <span class="cell-disable" v-else>{{ item }}</span>
                </span>
                <span class="cell-inactive" @click="filterDto.danList=[]" style="font-size: 12px">清空</span>
                <span class="cell-inactive" @click="enableWeekDan" style="font-size: 12px">今日胆码</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>胆组二</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                   <span
                       :class="filterDto.danList2.includes(item)?'cell-active':'cell-inactive'"
                       @click="danPick(item,filterDto.danList2)" v-if="!disableDan(item)">{{ item }}</span>
                  <span class="cell-disable" v-else>{{ item }}</span>
                </span>
                <span class="cell-inactive" @click="filterDto.danList2=[]" style="font-size: 12px">清空</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>胆组三</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                   <span
                       :class="filterDto.danList3.includes(item)?'cell-active':'cell-inactive'"
                       @click="danPick(item,filterDto.danList3)" v-if="!disableDan(item)">{{ item }}</span>
                  <span class="cell-disable" v-else>{{ item }}</span>
                </span>
                <span class="cell-inactive" @click="filterDto.danList3=[]" style="font-size: 12px">清空</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>杀码过滤</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in numCollections" :key="'kill_'+index">
                     <span
                         :class="filterDto.killList.includes(item)?'cell-active':'cell-inactive'"
                         @click="killPick(item)" v-if="!disableKill(item)">{{ item }}</span>
                    <span class="cell-disable" v-else>{{ item }}</span>
                  </span>
                <span class="cell-inactive" @click="clearKill" style="font-size: 12px">清空</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>本期奖号断组：{{ lottery.current || '' }}</legend>
            <div style="padding: 4px 0 8px 0;">
              <div style="display: flex;align-items: center;justify-content: start" v-if="currentDuan">
                <span v-for="(value,key) in currentDuan" :key="'current_duan_'+key"
                      :class="value.excludes.length>0?'cell-active':'cell-inactive'"
                      @click="enableLottoDuan(value)">
                  <span style="margin-right: 4px">第{{ parseInt(key) + 1 }}位</span>{{ value.txt }}
                </span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>上期奖号断组：{{ lottery.last || '' }}</legend>
            <div style="padding: 4px 0 8px 0;">
              <div style="display: flex;align-items: center;justify-content: start" v-if="lastDuan">
              <span v-for="(value,key) in lastDuan" :key="'last_duan_'+key"
                    :class="value.excludes.length>0?'cell-active':'cell-inactive'"
                    @click="enableLottoDuan(value)">
                  <span style="margin-right: 4px">第{{ parseInt(key) + 1 }}位</span>{{ value.txt }}
                </span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>自配两码</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-if="filterDto.twoMaList.length > 0">
                    <el-tooltip v-for="(item,index) in filterDto.twoMaList"
                                content="点击删除"
                                effect="light"
                                :key="'t_m_'+index">
                      <span class="cell-inactive" @click="removeTwoMa(index)">{{ item.join('') }}</span>
                    </el-tooltip>
                  </span>
                <span class="cell-inactive" @click="showTwoMa=true">配置</span>
                <span class="cell-inactive" @click="enableTwoMa">{{
                    this.filterDto.twoMaList.length === 0 ?
                        '启用' :
                        '清空'
                  }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px" v-if="nm3Dan&&nm3Dan.danList.length>0">
          <fieldset>
            <legend>系统荐胆：往期开奖号计算胆码</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in nm3Dan.danList" :key="'w_dan_'+index"
                        :class="filterDto.sysDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableSysDan"
                      style="font-size: 12px">{{ this.filterDto.sysDan.length > 0 ? '禁用' : '启用' }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px" v-if="nm3Dan&&nm3Dan.shiList.length>0">
          <fieldset>
            <legend>试机荐胆：往期试机号计算胆码</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in nm3Dan.shiList" :key="'w_dan_'+index"
                        :class="filterDto.sysShiDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableSysShiDan"
                      style="font-size: 12px">{{ this.filterDto.sysShiDan.length > 0 ? '禁用' : '启用' }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>十位对码</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                <span v-for="(item,index) in wensInfo.tenDui" :key="'ten_'+index"
                      :class="filterDto.tenDuiList.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableTenDui"
                      style="font-size: 12px">{{ this.filterDto.tenDuiList.length > 0 ? '禁用' : '启用' }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>稳氏四胆：{{ wensInfo.segment }}</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in wensInfo.wensDan" :key="'w_dan_'+index"
                        :class="filterDto.wensDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableWensDan"
                      style="font-size: 12px">{{ this.filterDto.wensDan.length > 0 ? '禁用' : '启用' }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px" v-if="lottery.nextShi">
          <fieldset>
            <legend>试机四胆：{{ wensInfo.shiSegment }}</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in wensInfo.shiDan" :key="'s_dan_'+index"
                        :class="filterDto.shiDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableShiDan"
                      style="font-size: 12px">{{ this.filterDto.shiDan.length > 0 ? '禁用' : '启用' }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>跨度过滤</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                <span v-for="(item,index) in kuaCollections" :key="'kua_'+index"
                      :class="filterDto.kuaList.includes(item)?'cell-active':'cell-inactive'"
                      @click="kuaPick(item)">{{ item }}</span>
                <span class="cell-inactive" @click="clearKua" style="font-size: 12px">清空</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>和值过滤</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in sumCollections" :key="'sum_'+index"
                        :class="filterDto.sumList.includes(item)?'cell-active':'cell-inactive'"
                        @click="sumPick(item)">{{ item }}</span>
                <span class="cell-inactive" @click="clearSum" style="font-size: 12px">清空</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>进位和差</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in numCollections" :key="'jin_wei_'+index"
                        :class="jinWei.diff.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableJinWei" style="font-size: 12px">{{
                    jinWei.enable > 0 ? '禁用' : '启用'
                  }}</span>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>两码偶合</legend>
            <div style="padding: 4px 0 8px 0">
              <div style="padding-left: 8px">
                  <span v-for="(item,index) in evenCollections" :key="'even_sum_'+index"
                        :class="evenSum.even.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                <span class="cell-inactive" @click="enableEvenSum" style="font-size: 12px">{{
                    evenSum.enable > 0 ? '禁用' : '启用'
                  }}</span>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div style="width: 50%;height: 100%">
        <div style="margin: 8px 0 20px 0">
          <el-button plain type="primary" @click="warnFilterAction">过滤计算</el-button>
          <el-button plain type="primary" @click="saveWarnFilter"
                     v-if="result.zu6.length>0||result.zu3.length>0">保存结果
          </el-button>
        </div>
        <div v-if="result.zu6.length===0&&result.zu3.length===0">
          <div class="table-empty" style="width: 800px">
            <img src="../../../assets/images/empty.png" alt="" style="width: 112px;margin-bottom: 8px">
            <span style="color: #8C8C8C">暂无过滤结果</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;align-items: start;width: 100%"
             v-if="result.zu6.length>0">
          <div style="margin-bottom: 16px">
            过滤后组六号码
            <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                result.zu6.length
              }}</span>注
          </div>
          <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in result.zu6"
                    style="font-size: 15px; margin:16px 20px 0 0"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;align-items: start;width: 100%"
             v-if="result.zu3.length>0">
          <div style="margin: 16px 0">
            过滤后组三号码
            <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                result.zu3.length
              }}</span>注
          </div>
          <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in result.zu3"
                    style="font-size: 16px; margin:16px 20px 0 0"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showTwoMa" width="500px" :before-close="closeTwoMa">
      <div slot="title" class="title">自选两码组合</div>
      <div style="text-align: center">
        <span v-for="(item,index) in numCollections"
              :key="'t_w_m'+index"
              :class="twoMaItem.includes(item)?'cell-active':'cell-inactive'"
              @click="pickTwoMa(item)">{{ item }}</span>
      </div>
      <div slot="footer">
        <el-button plain size="mini" type="primary" @click="addTwoMa">添 加</el-button>
        <el-button plain size="mini" type="plain" @click="closeTwoMa">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createNum3Warn, num3LastLottery, num3LottoDan} from "../../../api/lotto-service";
import {lotteryFilterSplitResult, twoDiff, twoSum, wensInfo} from "../../../libs/wens_utils";
import {lastPeriods} from "../../../api/dlt-service";
import {duanZuInfo, duanZuTable} from "../../../libs/duan_zu_utils";
import {jinWeiDiff, jinWeiLottery} from "../../../libs/jin_wei_utils";
import {calcEvenSum, evenSumLottery} from "../../../libs/even_sum_utils";
import {lottoDanZu} from "../../../libs/lottery_zuhe";

export default {
  name: "Num3WarnFilterView",
  data() {
    return {
      type: this.$route.query.type,
      periods: [],
      wensInfo: null,
      period: null,
      result: {
        zu6: [],
        zu3: [],
      },
      lottery: {
        lastPeriod: null,
        last: null,
        period: null,
        nextPeriod: null,
        current: null,
        next: null,
        nextZu: null,
        nextShi: null,
        lotDate: null,
      },
      nm3Dan: null,
      showTwoMa: false,
      twoMaItem: [],
      currentDuan: null,
      lastDuan: null,
      jinWei: {
        enable: true,
        diff: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      },
      evenSum: {
        enable: true,
        even: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      },
      filterDto: {
        killList: [],
        danList: [],
        danList2: [],
        danList3: [],
        kuaList: [],
        sumList: [],
        tenDuiList: [],
        weekDan: [],
        wensDan: [],
        shiDan: [],
        twoMaList: [],
        sysDan: [],
        sysShiDan: [],
        twoSum: [],
        twoDiff: [],
        lottery: [],
        currentDuan: {},
        lastDuan: {},
        jinWei: {},
        evenSum: {},
        isMaHe: false,
      },
    };
  },
  computed: {
    sumCollections() {
      let sumList = [];
      for (let i = 0; i <= 27; i++) {
        sumList.push(i);
      }
      return sumList;
    },
    kuaCollections() {
      let sumList = [];
      for (let i = 0; i <= 9; i++) {
        sumList.push(i);
      }
      return sumList;
    },
    numCollections() {
      let sumList = [];
      for (let i = 0; i <= 9; i++) {
        sumList.push(i);
      }
      return sumList;
    },
    evenCollections() {
      return [
        0,
        2,
        4,
        6,
        8
      ];
    },
  },
  methods: {
    disableDan(value) {
      return this.filterDto.killList.includes(value);
    },
    disableKill(value) {
      return this.filterDto.danList.includes(value)
          || this.filterDto.danList2.includes(value)
          || this.filterDto.danList3.includes(value);
    },
    resetFilter() {
      this.filterDto = {
        kuaList: [],
        danList: [],
        danList2: [],
        danList3: [],
        sumList: [],
        weekDan: [],
        wensDan: [],
        shiDan: [],
        tenDuiList: [],
        twoMaList: [],
        killList: [],
        sysDan: [],
        sysShiDan: [],
        lottery: this.lottery.current.split(' '),
        currentDuan: {},
        lastDuan: {},
        evenSum: {},
        jinWei: {},
        isMaHe: false,
      };
      this.result    = {
        zu6: [],
        zu3: [],
      };
    },
    queryPeriods() {
      lastPeriods({
        type: this.type === 'fc3d' ? 'fsd' : 'pls',
        size: 90
      }).then(data => {
        this.periods = data || [];
        this.period  = this.periods[0];
      })
    },
    queryNum3Dan() {
      num3LottoDan(this.type, this.period).then(data => this.nm3Dan = data);
    },
    queryLottery() {
      num3LastLottery(this.type, this.period).then(data => {
        this.lottery = {
          last: data.last || null,
          lastPeriod: data.lastPeriod || null,
          period: data.period,
          nextPeriod: data.nextPeriod,
          current: data.current,
          next: data.next || null,
          nextShi: data.nextShi || null,
          lotDate: data.lotDate,
          nextZu: null,
        };
        if (data.next != null) {
          this.lottery.nextZu = data.next.split(' ').sort().join('');
        }
        //断组计算
        this.currentDuan    = duanZuInfo(this.lottery.current);
        this.lastDuan       = duanZuInfo(this.lottery.last);
        //进位差计算
        this.jinWei.enable  = true;
        this.jinWei.diff    = jinWeiDiff(this.lottery.current, {shi: true});
        this.jinWei.filter  = jinWeiLottery(this.lottery.current, {shi: true});
        let lotDate         = new Date(this.lottery.lotDate);
        //计算偶合
        this.evenSum.enable = true;
        this.evenSum.even   = calcEvenSum(this.lottery.current);
        this.evenSum.filter = evenSumLottery(this.lottery.current);
        this.wensInfo       =
            wensInfo(this.lottery.current, this.lottery.nextShi, new Date(lotDate.setDate(lotDate.getDate() + 1)));
        this.resetFilter();
      })
    },
    enableLottoDuan(duan) {
      if (duan.excludes.length > 0) {
        duan.excludes = [];
        return;
      }
      duan.excludes =
          duanZuTable(duan.table);
    },
    sumPick(value) {
      if (this.filterDto.sumList.includes(value)) {
        this.filterDto.sumList = this.filterDto.sumList.filter((e) => e !== value);
        return;
      }
      this.filterDto.sumList.push(value);
    },
    clearSum() {
      if (this.filterDto.sumList.length >= 0) {
        this.filterDto.sumList = [];
      }
    },
    enableTwoSum() {
      if (this.filterDto.twoSum.length > 0) {
        this.filterDto.twoSum = [];
        return;
      }
      this.filterDto.twoSum = twoSum(this.lottery.current);
    },
    enableTwoDiff() {
      if (this.filterDto.twoDiff.length > 0) {
        this.filterDto.twoDiff = [];
        return;
      }
      this.filterDto.twoDiff = twoDiff(this.lottery.current);
    },
    clearKua() {
      if (this.filterDto.kuaList.length > 0) {
        this.filterDto.kuaList = [];
      }
    },
    clearDan(danList) {
      if (danList.length > 0) {
        danList = [];
      }
    },
    clearKill() {
      if (this.filterDto.killList.length > 0) {
        this.filterDto.killList = [];
      }
    },
    kuaPick(value) {
      if (this.filterDto.kuaList.includes(value)) {
        this.filterDto.kuaList = this.filterDto.kuaList.filter((e) => e !== value);
        return;
      }
      this.filterDto.kuaList.push(value);
    },
    danPick(value, danList) {
      if (danList.includes(value)) {
        danList = danList.filter((e) => e !== value);
        return;
      }
      if (danList.length >= 4) {
        this.$message.error('胆码最多选择4个');
        return;
      }
      danList.push(value);
    },
    killPick(value) {
      if (this.filterDto.killList.includes(value)) {
        this.filterDto.killList = this.filterDto.killList.filter((e) => e !== value);
        return;
      }
      if (this.filterDto.killList.length >= 5) {
        this.$message.error('胆码最多选择5个');
        return;
      }
      this.filterDto.killList.push(value);
    },
    enableWensDan() {
      if (this.filterDto.wensDan.length > 0) {
        this.filterDto.wensDan = [];
        return;
      }
      this.filterDto.wensDan = this.wensInfo.wensDan;
    },
    enableWeekDan() {
      let dan = this.wensInfo.weekDan.filter(e => !this.filterDto.killList.includes(e)) || [];
      if (this.filterDto.danList.length > 0) {
        let from = Array.from(this.filterDto.danList);
        from.push(...dan);
        this.filterDto.danList = Array.from(new Set(from)).sort();
        return;
      }
      this.filterDto.danList = dan;
    },
    enableShiDan() {
      if (this.filterDto.shiDan.length > 0) {
        this.filterDto.shiDan = [];
        return;
      }
      this.filterDto.shiDan = this.wensInfo.shiDan;
    },
    enableTenDui() {
      if (this.filterDto.tenDuiList.length > 0) {
        this.filterDto.tenDuiList = [];
        return;
      }
      this.filterDto.tenDuiList = this.wensInfo.tenDui;
    },
    enableSysDan() {
      if (this.nm3Dan == null) {
        this.$message.error('暂无系统荐胆');
        return;
      }
      if (this.filterDto.sysDan.length > 0) {
        this.filterDto.sysDan = [];
        return;
      }
      this.filterDto.sysDan = this.nm3Dan.danList;
    },
    enableSysShiDan() {
      if (this.nm3Dan == null) {
        this.$message.error('暂无系统荐胆');
        return;
      }
      if (this.filterDto.sysShiDan.length > 0) {
        this.filterDto.sysShiDan = [];
        return;
      }
      this.filterDto.sysShiDan = this.nm3Dan.shiList;
    },
    enableJinWei() {
      this.jinWei.enable = !this.jinWei.enable;
    },
    enableEvenSum() {
      this.evenSum.enable = !this.evenSum.enable;
    },
    lotteryHit(value, lottery) {
      if (lottery == null) {
        return false;
      }
      return value === lottery;
    },
    removeTwoMa(index) {
      if (this.filterDto.twoMaList.length > 0) {
        this.filterDto.twoMaList.splice(index, 1);
      }
    },
    pickTwoMa(value) {
      if (this.twoMaItem.includes(value)) {
        this.twoMaItem = this.twoMaItem.filter(e => e !== value);
        return;
      }
      if (this.twoMaItem.length >= 2) {
        this.twoMaItem.splice(0, 1);
        this.twoMaItem.push(value);
        return;
      }
      this.twoMaItem.push(value);
    },
    enableTwoMa() {
      if (this.filterDto.twoMaList.length === 0) {
        this.filterDto.twoMaList = lottoDanZu(this.lottery.current).zuHe;
        return;
      }
      this.filterDto.twoMaList = [];
    },
    closeTwoMa() {
      this.showTwoMa = false;
      this.twoMaItem = [];
    },
    addTwoMa() {
      if (this.twoMaItem.length !== 2) {
        this.$message.error('请正确选择两码组合');
        return;
      }
      if (this.filterDto.twoMaList.filter(e => this.isSameTwoMa(e, this.twoMaItem)).length > 0) {
        this.$message.error('存在相同两码组合');
        return;
      }
      this.filterDto.twoMaList.push([...this.twoMaItem]);
      this.closeTwoMa();
    },
    isSameTwoMa(target, source) {
      return target.sort().join('') === source.sort().join('')
    },
    warnFilterAction() {
      this.filterDto.currentDuan = {};
      this.filterDto.lastDuan    = {};
      Object.keys(this.currentDuan).forEach(key => this.filterDto.currentDuan[key] = this.currentDuan[key].excludes);
      Object.keys(this.lastDuan).forEach(key => this.filterDto.lastDuan[key] = this.lastDuan[key].excludes);
      this.filterDto.jinWei =
          {
            zu3: [],
            zu6: []
          };
      if (this.jinWei.enable) {
        this.filterDto.jinWei = this.jinWei.filter;
      }
      this.filterDto.evenSum = {
        zu3: [],
        zu6: []
      };
      if (this.evenSum.enable) {
        this.filterDto.evenSum = this.evenSum.filter;
      }
      this.result = lotteryFilterSplitResult(this.filterDto);
    },
    saveWarnFilter() {
      this.$confirm('是否要保存预警过滤信息？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        if (this.result.zu6.length === 0 && this.result.zu3.length === 0) {
          this.$message.error('没有过滤结果');
          return;
        }
        if (this.filterDto.danList.length === 0) {
          this.$message.error('请选择胆码集合');
          return;
        }
        let params = {
          type: this.type,
          period: this.period,
          zu6List: this.result.zu6,
          zu3List: this.result.zu3,
          killList: this.filterDto.killList.sort(),
          danList: this.filterDto.danList.sort(),
          kuaList: this.filterDto.kuaList.sort(),
          sumList: this.filterDto.sumList.sort(),
          twoMaList: this.filterDto.twoMaList.map(e => e.join(' ')),
        };
        createNum3Warn(params).then(res => {
          this.$message.success('保存成功');
        });
      });
    }
  },
  mounted() {
    this.queryPeriods();
    this.queryLottery();
    this.queryNum3Dan();
  },
  watch: {
    period(_) {
      this.queryLottery();
      this.queryNum3Dan();
    }
  }
}
</script>

<style scoped>
.filter-container {
  margin: 32px 32px 0 32px;
}

fieldset {
  border: #d3d3d3 1px solid;
  border-radius: 4px;
}

legend {
  font-size: 13px;
}

.cell-inactive {
  margin-top: 12px;
  padding: 6px;
  display: inline-block;
  margin-right: 10px;
  border: #cccccc 1px solid;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  min-width: 20px;
  text-align: center;
}

.cell-disable {
  margin-top: 12px;
  padding: 6px;
  display: inline-block;
  margin-right: 10px;
  border: #dcdcdc 1px solid;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 20px;
  color: #9c9c9c;
  line-height: 20px;
  min-width: 20px;
  text-align: center;
}

.cell-active {
  display: inline-block;
  margin-top: 12px;
  padding: 6px;
  color: white;
  margin-right: 10px;
  border: #1E90FF 1px solid;
  background-color: #1E90FF;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  min-width: 20px;
  text-align: center;
}

.filter-container >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>