<template>
  <div>
    <el-scrollbar class="filter-container" style="height: 800px;" v-if="wensInfo">
      <div style="display: flex;align-items: start;justify-content: space-between;padding-bottom: 80px">
        <div style="width: 45%">
          <div style="margin-bottom: 16px">
            <fieldset>
              <legend>开奖信息</legend>
              <div style="padding: 6px 0;font-size: 13px">
                <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 16px">
                  <div style="flex: 1">
                    <span>本期期号</span>
                    <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                        lottery.period
                      }}</span>
                  </div>
                  <div style="flex: 1">
                    <span>本期奖号</span>
                    <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                        lottery.current
                      }}</span>
                  </div>
                  <div style="flex: 1">
                    <span>稳氏四段</span>
                    <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                        wensInfo.segment
                      }}</span>
                  </div>
                </div>
                <div
                    style="display: flex;align-items: center;justify-content: space-between;margin-top: 12px;padding:0 16px">
                  <div style="flex: 1">
                    <span>下期期号</span>
                    <span style="margin-left: 12px;color: red;font-weight:600;width: 120px;display: inline-block">{{
                        lottery.nextPeriod
                      }}</span>
                  </div>
                  <div style="flex: 1">
                    <span>下期奖号</span>
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
              <legend>开奖类型</legend>
              <div style="padding: 8px">
              <span style="padding: 5px 12px;margin-right: 16px"
                    :class="filterDto.pattern===3?'cell-active':'cell-inactive'"
                    @click="patternPick(3)">组六</span>
                <span style="padding: 5px 12px;margin-right: 16px"
                      :class="filterDto.pattern===2?'cell-active':'cell-inactive'"
                      @click="patternPick(2)">组三</span>
                <span style="padding: 5px 12px;margin-right: 16px"
                      :class="filterDto.pattern===1?'cell-active':'cell-inactive'"
                      @click="patternPick(1)">豹子</span>
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
              <legend>每日胆码</legend>
              <div style="padding: 4px 0 8px 0">
                <div style="padding-left: 8px">
                <span v-for="(item,index) in wensInfo.weekDan" :key="'kua_'+index"
                      :class="filterDto.weekDan.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                  <span class="cell-inactive" @click="enableWeekDan"
                        style="font-size: 12px">{{ this.filterDto.weekDan.length > 0 ? '禁用' : '启用' }}</span>
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
              <legend>两码和尾</legend>
              <div style="padding: 4px 0 8px 0">
                <div style="padding-left: 8px">
                <span v-for="(item,index) in wensInfo.twoSum" :key="'kua_'+index"
                      :class="filterDto.twoSum.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                  <span class="cell-inactive" @click="enableTwoSum"
                        style="font-size: 12px">{{ this.filterDto.twoSum.length > 0 ? '禁用' : '启用' }}</span>
                </div>
              </div>
            </fieldset>
          </div>
          <div style="margin-bottom: 16px">
            <fieldset>
              <legend>两码差</legend>
              <div style="padding: 4px 0 8px 0">
                <div style="padding-left: 8px">
                <span v-for="(item,index) in wensInfo.twoDiff" :key="'kua_'+index"
                      :class="filterDto.twoDiff.includes(item)?'cell-active':'cell-inactive'">{{ item }}</span>
                  <span class="cell-inactive" @click="enableTwoDiff"
                        style="font-size: 12px">{{ this.filterDto.twoDiff.length > 0 ? '禁用' : '启用' }}</span>
                </div>
              </div>
            </fieldset>
          </div>
          <div style="margin-bottom: 16px">
            <fieldset>
              <legend>定胆过滤</legend>
              <div style="padding: 4px 0 8px 0">
                <div style="padding-left: 8px">
                <span v-for="(item,index) in numCollections" :key="'dan_'+index">
                   <span
                       :class="filterDto.danList.includes(item)?'cell-active':'cell-inactive'"
                       @click="danPick(item)" v-if="!disableDan(item)">{{ item }}</span>
                  <span class="cell-disable" v-else>{{ item }}</span>
                </span>
                  <span class="cell-inactive" @click="clearDan" style="font-size: 12px">清空</span>
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
        </div>
        <div style="width: 50%;height: 100%">
          <el-button plain type="primary" style="margin: 8px 0 20px 0" @click="filterAction">过滤计算</el-button>
          <div v-if="result.length===0">
            <div class="table-empty" style="width: 800px">
              <img src="../../../assets/images/empty.png" alt="" style="width: 112px;margin-bottom: 8px">
              <span style="color: #8C8C8C">暂无过滤结果</span>
            </div>
          </div>
          <div style="display: flex;flex-direction: column;align-items: start;width: 100%" v-else>
            <div style="margin-bottom: 16px">
              过滤后符合条件号码
              <span style="font-weight: 600;color: #ff0033;margin: 0 4px">{{
                  result.length
                }}</span>注
            </div>
            <div style="display: flex;flex-wrap: wrap;justify-content: start">
              <span style="margin: 16px 16px 0 0"
                    v-for="(item,index) in result"
                    :key="'w_f_'+index"
                    :style="{color:lotteryHit(item,lottery.nextZu)?'white':'#5c5c5c'}">{{
                  item.replaceAll(' ', '')
                }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
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
import {lotteryPeriods, num3Lottery, num3LottoDan} from "../../../api/lotto-service";
import {lotteryFilter, wensInfo} from "../../../libs/wens_utils";

export default {
  name: "LotteryFilterView",
  data() {
    return {
      type: this.$route.query.type,
      filterDto: {
        pattern: null,
        danList: [],
        killList: [],
        kuaList: [],
        sumList: [],
        twoDiff: [],
        tenDuiList: [],
        twoMaList: [],
        twoSum: [],
        weekDan: [],
        wensDan: [],
        shiDan: [],
        sysDan: [],
        sysShiDan: [],
      },
      nm3Dan: null,
      twoMaItem: [],
      result: [],
      wensInfo: null,
      periods: [],
      period: null,
      lottery: {
        period: null,
        nextPeriod: null,
        current: null,
        next: null,
        nextZu: null,
        nextShi: null,
        lotDate: null,
      },
      showTwoMa: false,
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
  },
  methods: {
    disableDan(value) {
      return this.filterDto.killList.includes(value);
    },
    disableKill(value) {
      return this.filterDto.danList.includes(value);
    },
    resetFilter() {
      this.filterDto = {
        pattern: null,
        danList: [],
        killList: [],
        kuaList: [],
        sumList: [],
        twoDiff: [],
        twoSum: [],
        weekDan: [],
        wensDan: [],
        shiDan: [],
        sysDan: [],
        sysShiDan: [],
        twoMaList: [],
        tenDuiList: [],
      };
      this.result    = [];
    },
    queryPeriods() {
      lotteryPeriods(this.type, 100).then(data => {
        this.periods = data || [];
        if (this.periods.length > 0) {
          this.period = this.periods[0];
        }
      });
    },
    queryNum3Dan() {
      num3LottoDan(this.type, this.period,).then(data => this.nm3Dan = data);
    },
    queryLottery() {
      num3Lottery(this.type, this.period).then(data => {
        this.lottery = {
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
        let lotDate   = new Date(this.lottery.lotDate);
        this.wensInfo =
            wensInfo(this.lottery.current, this.lottery.nextShi, new Date(lotDate.setDate(lotDate.getDate() + 1)));
        this.resetFilter();
      })
    },
    patternPick(value) {
      if (this.filterDto.pattern !== value) {
        this.filterDto.pattern = value;
        return;
      }
      this.filterDto.pattern = null;
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
    clearKua() {
      if (this.filterDto.kuaList.length >= 0) {
        this.filterDto.kuaList = [];
      }
    },
    clearDan() {
      if (this.filterDto.danList.length >= 0) {
        this.filterDto.danList = [];
      }
    },
    clearKill() {
      if (this.filterDto.killList.length >= 0) {
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
    danPick(value) {
      if (this.filterDto.danList.includes(value)) {
        this.filterDto.danList = this.filterDto.danList.filter((e) => e !== value);
        return;
      }
      if (this.filterDto.danList.length >= 4) {
        this.$message.error('胆码最多选择4个');
        return;
      }
      this.filterDto.danList.push(value);
    },
    killPick(value) {
      if (this.filterDto.killList.includes(value)) {
        this.filterDto.killList = this.filterDto.killList.filter((e) => e !== value);
        return;
      }
      if (this.filterDto.killList.length >= 5) {
        this.$message.error('杀码最多选择5个');
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
      if (this.filterDto.weekDan.length > 0) {
        this.filterDto.weekDan = [];
        return;
      }
      this.filterDto.weekDan = this.wensInfo.weekDan;
    },
    enableShiDan() {
      if (this.filterDto.shiDan.length > 0) {
        this.filterDto.shiDan = [];
        return;
      }
      this.filterDto.shiDan = this.wensInfo.shiDan;
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
    enableTwoSum() {
      if (this.filterDto.twoSum.length > 0) {
        this.filterDto.twoSum = [];
        return;
      }
      this.filterDto.twoSum = this.wensInfo.twoSum;
    },
    enableTenDui() {
      if (this.filterDto.tenDuiList.length > 0) {
        this.filterDto.tenDuiList = [];
        return;
      }
      this.filterDto.tenDuiList = this.wensInfo.tenDui;
    },
    enableTwoDiff() {
      if (this.filterDto.twoDiff.length > 0) {
        this.filterDto.twoDiff = [];
        return;
      }
      this.filterDto.twoDiff = this.wensInfo.twoDiff;
    },
    filterAction() {
      this.result = lotteryFilter(this.filterDto);
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
    closeTwoMa() {
      this.showTwoMa = false;
      this.twoMaItem = [];
    },
    addTwoMa() {
      if (this.twoMaItem.length <= 1 || this.twoMaItem.length > 2) {
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
  },
}
</script>

<style scoped>
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