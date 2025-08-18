<template>
  <div style="padding: 32px">
    <div style="display: flex;align-items: start;justify-content: space-between;padding:16px 0 64px 16px">
      <div style="width: 45%">
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>开奖信息</legend>
            <div style="padding: 6px 0;font-size: 13px">
              <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 16px">
                <div style="flex: 1">
                  <span>上期期号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.period || ''
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>上期奖号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.current || ''
                    }}</span>
                </div>
                <div style="flex: 1">
                  <span>开奖日期</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.lotDate || ''
                    }}</span>
                </div>
              </div>
              <div
                  style="display: flex;align-items: center;justify-content: space-between;margin-top: 12px;padding:0 16px">
                <div style="flex: 1">
                  <span>本期期号</span>
                  <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                      lottery.nextPeriod || ''
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
            <legend>胆码条件</legend>
            <div style="padding-left: 12px">
              <div>
                <div class="dan-header">胆组一</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                    <span
                        :class="dan.dan1.includes(item)?'cell-active':'cell-inactive'"
                        @click="danPick(item,dan.dan1)">{{ item }}</span>
                  </span>
                  <span class="cell-inactive" @click="dan.dan1=[]" style="font-size: 12px">清空</span>
                  <span class="cell-inactive" @click="enableFourDan(dan.dan1)" style="font-size: 12px">断组四胆</span>
                </div>
              </div>
              <div>
                <div class="dan-header">胆组二</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                    <span
                        :class="dan.dan2.includes(item)?'cell-active':'cell-inactive'"
                        @click="danPick(item,dan.dan2)">{{ item }}</span>
                  </span>
                  <span class="cell-inactive" @click="dan.dan2=[]" style="font-size: 12px">清空</span>
                  <span class="cell-inactive" @click="enableWeekDan(dan.dan2)" style="font-size: 12px">今日四胆</span>
                </div>
              </div>
              <div>
                <div class="dan-header">胆组三</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                    <span
                        :class="dan.dan3.includes(item)?'cell-active':'cell-inactive'"
                        @click="danPick(item,dan.dan3)">{{ item }}</span>
                  </span>
                  <span class="cell-inactive" @click="dan.dan3=[]" style="font-size: 12px">清空</span>
                  <span class="cell-inactive" @click="enableFourDan(dan.dan3)" style="font-size: 12px">断组四胆</span>
                </div>
              </div>
              <div>
                <div class="dan-header">胆组四</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                    <span
                        :class="dan.dan4.includes(item)?'cell-active':'cell-inactive'"
                        @click="danPick(item,dan.dan4)">{{ item }}</span>
                  </span>
                  <span class="cell-inactive" @click="dan.dan4=[]" style="font-size: 12px">清空</span>
                </div>
              </div>
              <div>
                <div class="dan-header">两码组合</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-if="dan.twoMa.length>0">
                    <span v-for="(item,index) in twoMa.twoMa" :key="'t_m_'+index" class="cell-inactive">
                      {{ item.join('') }}
                    </span>
                  </span>
                  <span class="cell-inactive" @click="enableTwoMa">{{
                      this.dan.twoMa.length === 0 ?
                          '启用' :
                          '清空'
                    }}
                  </span>
                </div>
              </div>
              <div>
                <div class="dan-header">往期奖号六胆</div>
                <div style="padding: 8px 0 8px 0">
                  <span v-if="num3Dan">
                    <span v-for="(item,index) in num3Dan.danList" :key="'w_dan_'+index"
                          :class="dan.sysDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                  </span>
                  <span class="cell-inactive" @click="enableSysDan"
                        style="font-size: 12px">{{ this.dan.sysDan.length > 0 ? '禁用' : '启用' }}</span>
                </div>
              </div>
              <div>
                <div class="dan-header">十位对码六胆</div>
                <div style="padding: 8px 0 8px 0">
                   <span v-for="(item,index) in tenDui" :key="'w_dan_'+index"
                         :class="dan.tenDui.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                  <span class="cell-inactive" @click="enableTenDui"
                        style="font-size: 12px">{{ this.dan.tenDui.length > 0 ? '禁用' : '启用' }}</span>
                </div>
              </div>
              <div v-if="currDuan">
                <div class="dan-header">本期奖号断组</div>
                <div style="padding: 8px 0 8px 0;display: flex;align-items: center;justify-content: start">
                   <span v-for="(value,key) in currDuan" :key="'current_duan_'+key"
                         :class="value.excludes.length>0?'cell-active':'cell-inactive'"
                         @click="enableLottoDuan(value)">
                     <span style="margin-right: 4px">第{{ parseInt(key) + 1 }}位</span>{{ value.txt }}
                  </span>
                </div>
              </div>
              <div v-if="lastDuan">
                <div class="dan-header">上期奖号断组</div>
                <div style="padding: 8px 0 8px 0;display: flex;align-items: center;justify-content: start">
                   <span v-for="(value,key) in lastDuan" :key="'last_duan_'+key"
                         :class="value.excludes.length>0?'cell-active':'cell-inactive'"
                         @click="enableLottoDuan(value)">
                     <span style="margin-right: 4px">第{{ parseInt(key) + 1 }}位</span>{{ value.txt }}
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>和差条件</legend>
            <div style="padding: 0 0 8px 12px">
              <span v-for="(item,index) in numCollections" :key="'jin_wei_'+index"
                    :class="jinWei.diff.includes(item)?'cell-active':'cell-inactive'" @click="pickJinWei(item)">{{
                  item
                }}</span>
              <span class="cell-inactive" @click="enableJinWei" style="font-size: 12px">推荐</span>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>跨度条件</legend>
            <div style="padding: 0 0 8px 12px">
              <span v-for="(item,index) in kuaCollections" :key="'s_dan_'+index"
                    :class="kuaList.includes(item)?'cell-active':'cell-inactive'"
                    @click="kuaPick(item)">
                {{ item }}
              </span>
              <span class="cell-inactive" @click="clearKua" style="font-size: 12px">清空</span>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>和值条件</legend>
            <div style="padding: 0 0 8px 12px">
              <span v-for="(item,index) in sumCollections" :key="'sum_'+index"
                    :class="sumList.includes(item)?'cell-active':'cell-inactive'"
                    @click="sumPick(item)">{{ item }}</span>
              <span class="cell-inactive" @click="clearSum" style="font-size: 12px">清空</span>
            </div>
          </fieldset>
        </div>
        <div style="margin-bottom: 16px">
          <fieldset>
            <legend>偶合条件</legend>
            <div style="padding: 0 0 8px 12px">
              <span v-for="(item,index) in evenCollections" :key="'even_sum_'+index"
                    :class="evenSum.even.includes(item)?'cell-active':'cell-inactive'"
                    @click="pickEvenSum(item)">{{ item }}</span>
              <span class="cell-inactive" @click="enableEvenSum" style="font-size: 12px">推荐</span>
            </div>
          </fieldset>
        </div>
      </div>
      <div style="width: 50%;height: 100%">
        <div style="margin: 8px 0 24px 0">
          <el-button plain type="primary" @click="layerFilterAction">过滤计算</el-button>
          <el-button plain type="primary" @click="saveWarnFilter"
                     v-if="layer1.zu6.length>0||layer1.zu3.length>0">保存结果
          </el-button>
        </div>
        <div class="table-empty" style="width: 800px" v-if="layer1.zu6.length===0&&layer1.zu3.length===0">
          <img src="../../../assets/images/empty.png" alt="" style="width: 112px;margin-bottom: 8px">
          <span style="color: #8C8C8C">暂无过滤结果</span>
        </div>
        <div v-if="layer1.condition.length>0&&(layer1.zu6.length>0||layer1.zu3.length>0)"
             style="display: flex;flex-direction: column;align-items: start;width: 100%">
          <div style="margin: 24px 0 8px 0;font-weight: 600">胆码过滤结果</div>
          <div v-if="layer1.zu6.length>0">
            <div style="margin-bottom: 12px">
              组六号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer1.zu6.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer1.zu6"
                    style="font-size: 15px;  margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
          <div v-if="layer1.zu3.length>0">
            <div style="margin: 12px 0">
              组三号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer1.zu3.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer1.zu3"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
        </div>
        <div v-if="layer2.condition.length>0&&(layer2.zu6.length>0||layer2.zu3.length>0)"
             style="display: flex;flex-direction: column;align-items: start;width: 100%">
          <div style="margin: 24px 0 8px 0;font-weight: 600 ">和差过滤结果</div>
          <div v-if="layer2.zu6.length>0">
            <div style="margin-bottom: 12px">
              组六号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer2.zu6.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer2.zu6"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
          <div v-if="layer2.zu3.length>0">
            <div style="margin: 12px 0">
              组三号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer2.zu3.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer2.zu3"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
        </div>
        <div v-if="layer3.condition.length>0&&(layer3.zu6.length>0||layer3.zu3.length>0)"
             style="display: flex;flex-direction: column;align-items: start;width: 100%">
          <div style="margin: 24px 0 8px 0;font-weight: 600 ">跨度过滤结果</div>
          <div v-if="layer3.zu6.length>0">
            <div style="margin: 12px 0 ">
              组六号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer3.zu6.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer3.zu6"
                    style="font-size: 15px;  margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
          <div v-if="layer3.zu3.length>0">
            <div style="margin: 12px 0">
              组三号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer3.zu3.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer3.zu3"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
        </div>
        <div v-if="layer4.condition.length>0&&(layer4.zu6.length>0||layer4.zu3.length>0)"
             style="display: flex;flex-direction: column;align-items: start;width: 100%">
          <div style="margin: 24px 0 8px 0;font-weight: 600 ">和值过滤结果</div>
          <div v-if="layer4.zu6.length>0">
            <div style="margin-bottom: 12px">
              组六号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer4.zu6.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer4.zu6"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
          <div v-if="layer4.zu3.length>0">
            <div style="margin: 12px 0">
              组三号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer4.zu3.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer4.zu3"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
        </div>
        <div v-if="layer5.condition.length>0&&(layer5.zu6.length>0||layer5.zu3.length>0)"
             style="display: flex;flex-direction: column;align-items: start;width: 100%">
          <div style="margin: 24px 0 8px 0;font-weight: 600 ">偶合过滤结果</div>
          <div v-if="layer5.zu6.length>0">
            <div style="margin-bottom: 12px">
              组六号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer5.zu6.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer5.zu6"
                    style="font-size: 15px;  margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
          <div v-if="layer5.zu3.length>0">
            <div style="margin: 12px 0">
              组三号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  layer5.zu3.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span v-for="(item,index) in layer5.zu3"
                    style="font-size: 15px; margin-right:12px"
                    :key="index+'_pls_com_item'">{{ item.replaceAll(' ', '') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {lastPeriods} from "../../../api/dlt-service";
import {num3LastLottery, num3LottoDan, saveNum3Layer} from "../../../api/lotto-service";
import {duanZuInfo, duanZuTable} from "../../../libs/duan_zu_utils";
import {jinWeiDiff, jinWeiZuHe} from "../../../libs/jin_wei_utils";
import {calcEvenSum, evenSumZuHe} from "../../../libs/even_sum_utils";
import {lottoDanZu} from "../../../libs/lottery_zuhe";
import {shiDuiMa, weekDan} from "../../../libs/wens_utils";
import {danFilter, evenSumFilter, jinWeiFilter, kuaFilter, sumFilter} from "../../../libs/layer_filter";

export default {
  name: "Num3LayerFilterView",
  data() {
    return {
      type: this.$route.query.type,
      periods: [],
      period: null,
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
      twoMa: {
        danMa: [],
        twoMa: [],
      },
      dan: {
        dan1: [],
        dan2: [],
        dan3: [],
        dan4: [],
        twoMa: [],
        sysDan: [],
        tenDui: [],
        currDuan: {},
        lastDuan: {},
      },
      kuaList: [],
      sumList: [],
      dateDan: [],
      tenDui: [],
      num3Dan: null,
      currDuan: {},
      lastDuan: {},
      jinWei: {
        diff: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      },
      evenSum: {
        even: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      },
      layer1: {
        name: '胆码',
        condition: [],
        zu3: [],
        zu6: [],
      },
      layer2: {
        name: '和差',
        condition: [],
        zu3: [],
        zu6: [],
      },
      layer3: {
        name: '跨度',
        condition: [],
        zu3: [],
        zu6: [],
      },
      layer4: {
        name: '和值',
        condition: [],
        zu3: [],
        zu6: [],
      },
      layer5: {
        name: '偶合',
        condition: [],
        zu3: [],
        zu6: [],
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
      let kuaList = [];
      for (let i = 0; i <= 9; i++) {
        kuaList.push(i);
      }
      return kuaList;
    },
    numCollections() {
      let numList = [];
      for (let i = 0; i <= 9; i++) {
        numList.push(i);
      }
      return numList;
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
      num3LottoDan(this.type, this.period).then(data => this.num3Dan = data);
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
        this.currDuan    = duanZuInfo(this.lottery.current);
        this.lastDuan    = duanZuInfo(this.lottery.last);
        //两码组合计算
        let danZu        = lottoDanZu(this.lottery.current);
        this.twoMa.twoMa = danZu.zuHe;
        this.twoMa.danMa = danZu.dan;
        //日期胆码计算
        let lotDate      = new Date(this.lottery.lotDate);
        let nextDate     = new Date(lotDate.setDate(lotDate.getDate() + 1));
        this.dateDan     = weekDan(nextDate);
        //十位对码六胆
        let codes        = this.lottery.current.split(' ').map(e => parseInt(e));
        this.tenDui      = shiDuiMa(codes);
        //清空往期计算数据
        this.resetLayer();
      });
    },
    resetLayer() {
      this.dan     = {
        dan1: [],
        dan2: [],
        dan3: [],
        dan4: [],
        twoMa: [],
        sysDan: [],
        tenDui: [],
        currDuan: {},
        lastDuan: {},
      };
      this.kuaList = [];
      this.sumList = [];
      this.jinWei  = {
        diff: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      };
      this.evenSum = {
        even: [],
        filter: {
          zu3: [],
          zu6: [],
        },
      };
      this.layer1  = {
        name: '胆码',
        condition: [],
        zu3: [],
        zu6: [],
      };
      this.layer2  = {
        name: '和差',
        condition: [],
        zu3: [],
        zu6: [],
      };
      this.layer3  = {
        name: '跨度',
        condition: [],
        zu3: [],
        zu6: [],
      };
      this.layer4  = {
        name: '和值',
        condition: [],
        zu3: [],
        zu6: [],
      };
      this.layer5  = {
        name: '偶合',
        condition: [],
        zu3: [],
        zu6: [],
      };
    },
    danPick(value, danList) {
      if (danList.includes(value)) {
        let index = danList.indexOf(value);
        if (index >= 0) {
          danList.splice(index, 1);
        }
        return;
      }
      if (danList.length >= 4) {
        this.$message.error('胆码最多选择4个');
        return;
      }
      danList.push(value);
    },
    enableWeekDan(danList) {
      if (danList.length > 0) {
        this.dateDan.forEach(e => {
          if (!danList.includes(e)) {
            danList.push(e);
          }
        });
        return;
      }
      danList.push(...this.dateDan);
    },
    enableFourDan(danList) {
      if (danList.length > 0) {
        this.twoMa.danMa.forEach(e => {
          if (!danList.includes(e)) {
            danList.push(e);
          }
        });
        return;
      }
      danList.push(...this.twoMa.danMa);
    },
    enableTwoMa() {
      if (this.dan.twoMa.length === 0) {
        this.dan.twoMa = this.twoMa.twoMa;
        return;
      }
      this.dan.twoMa = [];
    },
    enableTenDui() {
      if (this.dan.tenDui.length > 0) {
        this.dan.tenDui = [];
        return;
      }
      this.dan.tenDui = this.tenDui;
    },
    enableSysDan() {
      if (this.num3Dan == null) {
        this.$message.error('暂无系统荐胆');
        return;
      }
      if (this.dan.sysDan.length > 0) {
        this.dan.sysDan = [];
        return;
      }
      this.dan.sysDan = this.num3Dan.danList;
    },
    enableLottoDuan(duan) {
      if (duan.excludes.length > 0) {
        duan.excludes = [];
        return;
      }
      duan.excludes =
          duanZuTable(duan.table);
    },
    enableJinWei() {
      this.jinWei.diff   = [...jinWeiDiff(this.lottery.current, {shi: true})];
      this.jinWei.filter = jinWeiZuHe(this.jinWei.diff);
    },
    pickJinWei(value) {
      if (this.jinWei.diff.includes(value)) {
        this.jinWei.diff = this.jinWei.diff.filter(e => e !== value);
      } else {
        this.jinWei.diff.push(value);
      }
      this.jinWei.filter = jinWeiZuHe(this.jinWei.diff);
    },
    enableEvenSum() {
      this.evenSum.even   = [...calcEvenSum(this.lottery.current)];
      this.evenSum.filter = evenSumZuHe(this.evenSum.even);
    },
    pickEvenSum(value) {
      if (this.evenSum.even.includes(value)) {
        this.evenSum.even = this.evenSum.even.filter(e => e !== value);
      } else {
        this.evenSum.even.push(value);
      }
      this.evenSum.filter = evenSumZuHe(this.evenSum.even);
    },
    kuaPick(value) {
      if (this.kuaList.includes(value)) {
        this.kuaList = this.kuaList.filter((e) => e !== value);
        return;
      }
      this.kuaList.push(value);
    },
    clearKua() {
      this.kuaList = [];
    },
    sumPick(value) {
      if (this.sumList.includes(value)) {
        this.sumList = this.sumList.filter((e) => e !== value);
        return;
      }
      this.sumList.push(value);
    },
    clearSum() {
      this.sumList = [];
    },
    layerFilterAction() {
      Object.keys(this.currDuan).forEach(key => this.dan.currDuan[key] = this.currDuan[key].excludes);
      Object.keys(this.lastDuan).forEach(key => this.dan.lastDuan[key] = this.lastDuan[key].excludes);
      this.layer1 = danFilter(this.dan);
      if (this.layer1.zu3.length === 0 && this.layer1.zu6.length === 0) {
        return;
      }
      this.layer2 = jinWeiFilter(this.layer1.zu3, this.layer1.zu6, this.jinWei);
      if (this.layer2.zu3.length === 0 && this.layer2.zu6.length === 0) {
        return;
      }
      this.layer3 = kuaFilter(this.layer2.zu3, this.layer2.zu6, this.kuaList);
      if (this.layer3.zu3.length === 0 && this.layer3.zu6.length === 0) {
        return;
      }
      this.layer4 = sumFilter(this.layer3.zu3, this.layer3.zu6, this.sumList);
      if (this.layer4.zu3.length === 0 && this.layer4.zu6.length === 0) {
        return;
      }
      this.layer5 = evenSumFilter(this.layer4.zu3, this.layer4.zu6, this.evenSum);
    },
    saveWarnFilter() {
      this.$confirm('是否要保存预警过滤信息？', '重要提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        let params = {
          type: this.type,
          period: this.period,
        };
        if (this.layer1.condition.length === 0 || (this.layer1.zu3.length === 0 && this.layer1.zu6.length === 0)) {
          this.$message.error('无过滤结果');
          return;
        }
        let layers = [this.layer1];
        if (this.layer2.condition.length > 0 && (this.layer2.zu3.length > 0 || this.layer2.zu6.length > 0)) {
          layers.push(this.layer2);
        }
        if (this.layer3.condition.length > 0 && (this.layer3.zu3.length > 0 || this.layer3.zu6.length > 0)) {
          layers.push(this.layer3);
        }
        if (this.layer4.condition.length > 0 && (this.layer4.zu3.length > 0 || this.layer4.zu6.length > 0)) {
          layers.push(this.layer4);
        }
        if (this.layer5.condition.length > 0 && (this.layer5.zu3.length > 0 || this.layer5.zu6.length > 0)) {
          layers.push(this.layer5);
        }
        for (let i = 0; i < layers.length; i++) {
          params[`layer${i + 1}`] = layers[i];
        }
        console.log(JSON.stringify(params));
        saveNum3Layer(params).then(res => {
          this.$message.success('保存成功');
        });
      });
    },
  },
  created() {
    this.queryPeriods();
    this.queryLottery();
    this.queryNum3Dan();
  },
  watch: {
    period(_) {
      this.queryLottery();
      this.queryNum3Dan();
    },
  }
}
</script>

<style scoped>
fieldset {
  border: #d9d9d9 1px solid;
  border-radius: 6px;
}

legend {
  font-size: 13px;
}

.dan-header {
  font-size: 13px;
  padding-top: 8px;
}

.cell-inactive {
  margin-top: 8px;
  padding: 6px;
  display: inline-block;
  margin-right: 8px;
  border: #cccccc 1px solid;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 18px;
  line-height: 18px;
  min-width: 18px;
  text-align: center;
}

.cell-disable {
  margin-top: 8px;
  padding: 6px;
  display: inline-block;
  margin-right: 8px;
  border: #dcdcdc 1px solid;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 18px;
  color: #9c9c9c;
  line-height: 18px;
  min-width: 18px;
  text-align: center;
}

.cell-active {
  display: inline-block;
  margin-top: 8px;
  padding: 6px;
  color: white;
  margin-right: 8px;
  border: #1E90FF 1px solid;
  background-color: #1E90FF;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 18px;
  line-height: 18px;
  min-width: 18px;
  text-align: center;
}

</style>