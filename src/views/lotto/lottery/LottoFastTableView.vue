<template>
  <div class="view-container">
    <div style="margin: 0 24px">
      <div style="display: flex;align-items: start;padding-bottom: 16px">
        <div style="margin:8px 32px 0 0">
          <el-select v-model="query.period" placeholder="请输入开奖期号" clearable
                     style="margin-top: 8px;width: 180px">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_lotto'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
          <div style="display: flex;align-items: center;margin-top: 24px">
            <span style="font-size: 13px">本期开奖号</span>
            <div style="margin-left: 8px" v-if="current.lottery">
              <span class="c-l-ball" v-for="(item,index) in current.lottery" :key="index+'_l_b'">{{ item }}</span>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-top: 16px">
            <span style="font-size: 13px">本期试机号</span>
            <div style="margin-left: 8px" v-if="current.shi">
              <span class="c-s-ball" v-for="(item,index) in current.shi" :key="index+'_l_b'">{{ item }}</span>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-top: 16px">
            <span style="font-size: 13px">上期开奖号</span>
            <div style="margin-left: 8px" v-if="last.lottery">
              <span class="l-l-ball" v-for="(item,index) in last.lottery" :key="index+'_l_b'">{{ item }}</span>
            </div>
          </div>
          <div style="display: flex;align-items: center;margin-top: 16px">
            <span style="font-size: 13px">上上期奖号</span>
            <div style="margin-left: 8px" v-if="before.lottery">
              <span class="b-l-ball" v-for="(item,index) in before.lottery" :key="index+'_l_b'">{{ item }}</span>
            </div>
          </div>
        </div>
        <table class="lot-quick-check" style="margin-top: 16px" v-if="fastTable">
          <tr>
            <td colspan="13" class="fast-title">{{ current.period }}期-速查表</td>
          </tr>
          <tr v-for="(row,index) in fastTable"
              :key="index+'_row'"
              class="fast-table-row table-cell">
            <td v-for="(column,key) in row"
                :key="key+'_col'"
                :class="[{
                'current':column.value===4,
                'last':column.value===3,
                'before':column.value===2,
                'shi':column.value===1
                }]">
              {{ column.key }}
            </td>
          </tr>
        </table>
        <div style="margin: 16px 0 0 34px">
          <div style="display: flex;flex-direction: column;justify-content: start">
            <table class="treasure-table" v-if="fiveTable">
              <tr>
                <td colspan="11" class="fast-title" style="height: 36px">{{ current.period }}期-五行图</td>
              </tr>
              <tr v-for="(row,index) in fiveTable"
                  :key="index+'_row'"
                  class="fast-table-row table-cell">
                <td v-for="(column,key) in row"
                    :key="key+'_col'"
                    :class="[{
                'current':column.value===4,
                'last':column.value===3,
                'before':column.value===2,
                'shi':column.value===1
                }]">
                  {{ column.key }}
                </td>
              </tr>
            </table>
            <table class="treasure-table" style="margin-top: 20px" v-if="treasureTable">
              <tr>
                <td colspan="11" class="fast-title" style="height: 36px">{{ current.period }}期-寻宝图</td>
              </tr>
              <tr v-for="(row,index) in treasureTable"
                  :key="index+'_row'"
                  class="fast-table-row table-cell">
                <td v-for="(column,key) in row"
                    :key="key+'_col'"
                    :class="[{
                'current':column.value===4,
                'last':column.value===3,
                'before':column.value===2,
                'shi':column.value===1
                }]">
                  {{ column.key }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="margin: 16px 0 0 34px">
          <table class="diagrams-table" v-if="diagramTable">
            <tr>
              <td colspan="9" class="fast-title" style="height: 36px">{{ current.period }}期-八卦图</td>
            </tr>
            <tr v-for="(row,index) in diagramTable"
                :key="index+'_row'"
                class="fast-table-row table-cell">
              <td v-for="(column,key) in row"
                  :key="key+'_col'"
                  :class="[{
                'current':column.value===4,
                'last':column.value===3,
                'before':column.value===2,
                'shi':column.value===1
                }]">
                {{ column.key }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {lotteryPeriods, lottoFastTable} from "../../../api/lotto-service";
import {splitter} from "../../../libs/lottery";
import {fastTable,} from "../../../libs/fast_table";
import Ball from "../../../components/lotto/Ball";
import {huntTable} from "../../../libs/hunt_table";
import {diagramTable} from "../../../libs/diagrams_table";
import {wuXing} from "../../../libs/wu_xing";

export default {
  name: "LottoFastTableView",
  components: {Ball},
  data() {
    return {
      periods: [],
      query: {
        period: null,
        type: this.$route.query.type,
      },
      current: {
        period: null,
        lottery: [],
        shi: [],
      },
      last: {
        period: null,
        lottery: [],
        shi: [],
      },
      before: {
        period: null,
        lottery: [],
        shi: [],
      },
      fastTable: null,
      treasureTable: null,
      diagramTable: null,
      fiveTable: null,
    };
  },
  methods: {
    queryPeriods() {
      lotteryPeriods(this.query.type, 100).then(data => {
        this.periods = data || [];
      });
    },
    queryFastTable() {
      lottoFastTable(this.query).then(data => {
        if (!data) {
          return;
        }
        let {
              current,
              last,
              before
            }              = data;
        this.current       = {
          period: current.period,
          lottery: splitter(current.red),
          shi: splitter(current.shi)
        };
        this.last          = {
          period: last.period,
          lottery: splitter(last.red),
          shi: splitter(last.shi)
        };
        this.before        = {
          period: before.period,
          lottery: splitter(before.red),
          shi: splitter(before.shi)
        };
        this.fastTable     = fastTable(this.last.lottery, this.before.lottery, this.current.lottery, this.current.shi);
        this.treasureTable = huntTable(this.last.lottery, this.before.lottery, this.current.lottery, this.current.shi);
        this.diagramTable  =
            diagramTable(this.last.lottery, this.before.lottery, this.current.lottery, this.current.shi);
        this.fiveTable     = wuXing(this.last.lottery, this.before.lottery, this.current.lottery, this.current.shi);
        this.selected      = [];
      })
    },
  },
  mounted() {
    this.queryPeriods();
    this.queryFastTable();
  },
  watch: {
    '$route'(to, from) {
      this.query.type = to.query.type;
      this.queryFastTable();
    },
    'query.period'(value) {
      this.queryFastTable();
    }
  }
}
</script>

<style scoped>

.lot-quick-check, .treasure-table, .diagrams-table {
  font-size: 14px;
  font-weight: 500;
  font-family: Verdana, Arial, Consolas, sans-serif;
  border-collapse: collapse;
}

.lot-quick-check td, .diagrams-table td {
  width: 36px;
  height: 36px;
  text-align: center;
  border: 1px solid #cacaca;
  border-collapse: collapse;
}

.treasure-table td {
  width: 31px;
  height: 31px;
  text-align: center;
  border: 1px solid #cacaca;
  border-collapse: collapse;
}

.fast-table-row {
  flex-direction: column;
  align-items: center;
}

.table-cell {
  width: 750px;
  border-collapse: collapse;
}

.content {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.current {
  background-color: #ff4081;
  color: white;
}

.last {
  background-color: #168c8c;
  color: white;
}

.before {
  background-color: #68ac7a;
  color: white;
}

.shi {
  background-color: #c7edcc;
  color: #168c8c;
}

.l-l-ball {
  display: inline-block;
  color: #FFFFFF;
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: #168c8c;
  margin-right: 4px;
}

.c-s-ball {
  display: inline-block;
  color: brown;
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: #c7edcc;
  margin-right: 4px;
}

.c-l-ball {
  display: inline-block;
  color: #FFFFFF;
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: #ff4081;
  margin-right: 4px;
}

.b-l-ball {
  display: inline-block;
  color: #FFFFFF;
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: #68ac7a;
  margin-right: 4px;
}

.fast-title {
  font-size: 16px;
  font-weight: 600;
}

</style>
