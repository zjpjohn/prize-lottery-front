<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="margin-top: 28px;display: flex;align-items: center">
      <el-select size="medium" v-model="period" placeholder="请选择期号" clearable
                 style="width:200px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_pls'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <i-check-radio-group v-model="channel">
        <i-check-radio value="mul"
                       label="综合"
                       size="small"></i-check-radio>
        <i-check-radio :value="item.value"
                       :label="item.label"
                       :key="index+'_cha_pls'"
                       size="small"
                       v-for="(item,index) in channels"></i-check-radio>
      </i-check-radio-group>
      <el-button id="showChartBtn" plain type="primary" @click="showChart=true">查看统计
      </el-button>
      <el-button id="showCensusBtn" plain type="primary" @click="showItemCensus">预测概览
      </el-button>
      <permission permit="super">
        <el-button plain type="primary" style="margin-left: 12px" @click="toItemTable">优选表</el-button>
        <el-button plain type="primary" style="margin-left: 12px" @click="toWholeBest">优选专家</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="data" stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="专家名称" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.master.name.substring(0, 6) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="预测期号" width="120px"></el-table-column>
        <el-table-column prop="rank" label="排名" width="80px"></el-table-column>
        <el-table-column label="独胆" width="90px">
          <template v-slot="scope">
            <span v-if="scope.row.dan1.hitData">{{ scope.row.dan1.hitData }}</span>
            <span v-else>{{ scope.row.dan1.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="双胆" width="90px">
          <template v-slot="scope">
            <span v-if="scope.row.dan2.hitData">{{ scope.row.dan2.hitData }}</span>
            <span v-else>{{ scope.row.dan2.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="三胆" width="90px">
          <template v-slot="scope">
            <span v-if="scope.row.dan3.hitData">{{ scope.row.dan3.hitData }}</span>
            <span v-else>{{ scope.row.dan3.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="杀一码" width="90px">
          <template v-slot="scope">
            <span v-if="scope.row.kill1.hitData">{{ scope.row.kill1.hitData }}</span>
            <span v-else>{{ scope.row.kill1.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="杀二码" width="90px">
          <template v-slot="scope">
            <span v-if="scope.row.kill2.hitData">{{ scope.row.kill2.hitData }}</span>
            <span v-else>{{ scope.row.kill2.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选五码" width="140px">
          <template v-slot="scope">
            <span v-if="scope.row.com5.hitData">{{ scope.row.com5.hitData }}</span>
            <span v-else>{{ scope.row.com5.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选六码" width="160px">
          <template v-slot="scope">
            <span v-if="scope.row.com6.hitData">{{ scope.row.com6.hitData }}</span>
            <span v-else>{{ scope.row.com6.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选七码" width="160px">
          <template v-slot="scope">
            <span v-if="scope.row.com7.hitData">{{ scope.row.com7.hitData }}</span>
            <span v-else>{{ scope.row.com7.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="定位码" width="240px">
          <template v-slot="scope">
            <span v-if="scope.row.comb5.hitData">{{ scope.row.comb5.hitData }}</span>
            <span v-else>{{ scope.row.comb5.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link :underline="false" type="primary" @click="showPosterView(scope.row)">海报</el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
    </div>
    <slide-view :visible.sync="showChart"
                title="预测统计分析"
                :append-to-body="true"
                :no-listener-i-ds="['showChartBtn']"
                @slide-close="showChart=false" :width="750" :top="60">
      <div style="width:100%;margin-top: 32px;text-align: center">
        <div>
          <ve-histogram :data="c7.data"
                        :title="c7.title"
                        height="200px"
                        :extend="c7.extend"
                        :mark-point="c7.markPoint"
                        :settings="c7.settings"></ve-histogram>
        </div>
        <div>
          <ve-histogram :data="d3.data"
                        :title="d3.title"
                        height="200px"
                        :extend="d3.extend"
                        :mark-point="d3.markPoint"
                        :settings="d3.settings"></ve-histogram>
        </div>
        <div>
          <ve-histogram :data="d2.data"
                        :title="d2.title"
                        height="200px"
                        :extend="d2.extend"
                        :mark-point="d2.markPoint"
                        :settings="d2.settings"></ve-histogram>
        </div>
        <div>
          <ve-histogram :data="k1.data"
                        :title="k1.title"
                        height="200px"
                        :extend="k1.extend"
                        :mark-point="k1.markPoint"
                        :settings="k1.settings"></ve-histogram>
        </div>
        <div>
          <ve-histogram :data="k2.data"
                        :title="k2.title"
                        height="200px"
                        :extend="k2.extend"
                        :mark-point="k2.markPoint"
                        :settings="k2.settings"></ve-histogram>
        </div>
      </div>
    </slide-view>
    <slide-view :visible.sync="showCensus"
                title="分类预测概览"
                :append-to-body="true"
                :no-listener-i-ds="['showChartBtn','showCensusBtn']"
                @slide-close="showCensus=false" :width="850" :top="60">
      <div style="width: 100%;margin: 32px 0px;text-align: center" v-if="census!=null">
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">杀一码</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.k1" :key="key+'_k1'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">杀二码</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.k2" :key="key+'_k2'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">独 胆</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.d1" :key="key+'_d1'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">双 胆</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.d2" :key="key+'_d2'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">三 胆</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.d3" :key="key+'_d3'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex;align-items: start;justify-content: start;margin-top: 16px">
          <div style="margin-right: 12px;width: 60px;text-align: right">七 码</div>
          <div style="display: flex;flex-direction: column;align-items: start">
            <div v-for="(value,key,index) in census.c7" :key="key+'_c7'">
              <span style="margin-right: 12px">出现<span style="font-weight: 550;color: black">{{
                  key
                }}</span>次</span>
              <span v-for="(item,index) in value" :key="'sub_item_'+index" style="margin-right: 12px">
                <span style="font-weight: 550;color: black">{{ item.key }}</span>-<span
                  style="font-weight: 550;color: black">{{ item.count }}</span>项
              </span>
            </div>
          </div>
        </div>
      </div>
    </slide-view>
    <el-dialog :visible.sync="showPoster" width="418px" @befor-close="cancelPoster">
      <div slot="title">排列三预测海报</div>
      <div style="text-align: center">
        <div ref="pl3_forecast"
             v-if="selected">
          <div
              style="width: 378px;height:672px;font-family: xiaozhi;color: black;display: flex;flex-direction: column;justify-content: center;align-items: start">
            <div style="font-size: 22px;margin:0 0 6px 32px;font-weight:500;">排列三</div>
            <div style="margin:0 0 32px 32px;font-size: 22px;font-weight:500;">
              第<span>{{ selected.period.substring(2) }}</span>期推荐<span v-if="selected.calcTime">结果回顾</span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>杀一</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.kill1)"
                      :style="{color:item.value===0?'black':'red'}"
                      :key="'k1_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>杀二</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.kill2)"
                      :style="{color:item.value===0?'black':'red'}"
                      :key="'k2_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>独胆</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.dan1)" :style="{color:item.value===0?'black':'red'}"
                      :key="'dan1_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>双胆</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.dan2)" :style="{color:item.value===0?'black':'red'}"
                      :key="'dan2_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>三胆</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.dan3)" :style="{color:item.value===0?'black':'red'}"
                      :key="'dan3_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>五码</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.com5)" :style="{color:item.value===0?'black':'red'}"
                      :key="'com5_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>六码</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.com6)" :style="{color:item.value===0?'black':'red'}"
                      :key="'com6_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>七码</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.com7)" :style="{color:item.value===0?'black':'red'}"
                      :key="'com7_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div style="margin:0 0 12px 32px;font-size: 20px">
              <span>定位</span>
              <span style="font-weight: bold">
                <span v-for="(item,index) in forecastItems(selected.comb5)"
                      :style="{color:item.value===0?'black':'red'}"
                      :key="'comb5_'+index">
                  {{ item.key }}
                </span>
              </span>
            </div>
            <div
                style="width:100%;margin-top: 52px;font-size: 22px;font-weight:bold;color:#555555;text-align: center;">
              <span style="margin-right: 8px">公益分享</span>
              <span style="margin-right: 8px">仅供参考</span>
              <span style="margin-right: 8px">理性投注</span>
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" style="width: 140px" @click="downloadPoster">下载海报</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {pl3PeriodMixin} from "../../../mixins/period_pl3_mixin";
import {d3_categories, parseForecast, pls_channels} from "../../../libs/lottery";
import {itemRankList, mulRankList, plsItemCensus} from "../../../api/pl3-service";
import ICheckRadio from "../../../components/icheck/ICheckRadio.vue";
import ICheckRadioGroup from "../../../components/icheck/ICheckRadioGroup.vue";
import SlideView from "../../../components/SlideView.vue";
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import html2canvas from "html2canvas";

export default {
  name: "Pl3ItemDataView",
  components: {
    SlideView,
    ICheckRadioGroup,
    ICheckRadio
  },
  mixins: [pl3PeriodMixin],
  data() {
    return {
      showChart: false,
      channels: pls_channels.filter(e => e.vip),
      channel: 'd3',
      period: null,
      showPoster: false,
      selected: null,
      census: null,
      showCensus: false,
      data: [],
      d2: {
        title: {text: '双胆预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 20,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: [
            '号码',
            '热度'
          ],
          rows: [],
        },
      },
      d3: {
        title: {text: '三胆预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 20,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: [
            '号码',
            '热度'
          ],
          rows: [],
        },
      },
      k1: {
        title: {text: '杀一码预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 20,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: [
            '号码',
            '热度'
          ],
          rows: [],
        },
      },
      k2: {
        title: {text: '杀二码预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 20,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: [
            '号码',
            '热度'
          ],
          rows: [],
        },
      },
      c7: {
        title: {text: '组选七码预测统计'},
        settings: {},
        extend: {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            },
            padding: 10,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: {
            barWidth: 20,
          },
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: '最小值'
            },
            {
              type: 'max',
              name: '最大值'
            },
          ],
        },
        data: {
          columns: [
            '号码',
            '热度'
          ],
          rows: [],
        },
      },
    };
  },
  methods: {
    forecastItems(data) {
      if (data.hitData) {
        return parseForecast(data.hitData);
      }
      return parseForecast(data.data);
    },
    queryItemDatas() {
      itemRankList({
        channel: this.channel,
        period: this.period
      }).then(value => {
        this.data = value || [];
        if (this.data.length > 0) {
          this.d2.data.rows = this.calcDataCensus(this.data.map(e => e['dan2'].data));
          this.d3.data.rows = this.calcDataCensus(this.data.map(e => e['dan3'].data));
          this.k1.data.rows = this.calcDataCensus(this.data.map(e => e['kill1'].data));
          this.k2.data.rows = this.calcDataCensus(this.data.map(e => e['kill2'].data));
          this.c7.data.rows = this.calcDataCensus(this.data.map(e => e['com7'].data));
        }
      });
    },
    queryMulRank() {
      mulRankList(this.period).then(value => {
        this.data = value || [];
        if (this.data.length > 0) {
          this.d2.data.rows = this.calcDataCensus(this.data.map(e => e['dan2'].data));
          this.d3.data.rows = this.calcDataCensus(this.data.map(e => e['dan3'].data));
          this.k1.data.rows = this.calcDataCensus(this.data.map(e => e['kill1'].data));
          this.k2.data.rows = this.calcDataCensus(this.data.map(e => e['kill2'].data));
          this.c7.data.rows = this.calcDataCensus(this.data.map(e => e['com7'].data));
        }
      });
    },
    queryItemCensus() {
      if (this.census != null && this.census.period === this.period) {
        return;
      }
      plsItemCensus(this.period).then(data => this.census = data);
    },
    toItemTable() {
      this.$router.push('/pls/data/item/table');
    },
    toWholeBest() {
      this.$router.push('/pls/data/item/whole')
    },
    showItemCensus() {
      this.queryItemCensus();
      this.showCensus = true;
    },
    calcDataCensus(data) {
      let census = {};
      for (let i = 0; i < data.length; i++) {
        let rows = data[i].split(' ').map(e => e.trim()).filter(e => e.length > 0);
        for (let j = 0; j < rows.length; j++) {
          let key     = rows[j];
          census[key] = (census[key] || 0) + 1;
        }
      }
      let values = [];
      for (let i = 0; i < d3_categories.length; i++) {
        let key = d3_categories[i];
        values.push({
          '号码': key,
          '热度': census[key] || 0,
        });
      }
      return values;
    },
    showPosterView(row) {
      this.selected   = row;
      this.showPoster = true;
    },
    cancelPoster() {
      this.selected   = null;
      this.showPoster = false;
    },
    downloadPoster() {
      let width               = this.$refs.pl3_forecast.style.width;
      let cloneDom            = this.$refs.pl3_forecast.cloneNode(true);
      cloneDom.style.position = 'absolute';
      cloneDom.style.top      = '0px';
      cloneDom.style.zIndex   = '-1';
      cloneDom.style.width    = width;
      document.body.appendChild(cloneDom);
      let name = `pl3_${this.selected.period}`;
      html2canvas(cloneDom, {
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        let imgUri    = canvas.toDataURL('image/png');
        let link      = document.createElement('a');
        link.href     = imgUri;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      cloneDom.style.display = 'none';
    },
  },
  created() {
    this.queryItemDatas();
  },
  watch: {
    channel(value) {
      if (this.channel === 'mul') {
        this.queryMulRank();
        return;
      }
      this.queryItemDatas();
    },
    period(value) {
      if (this.channel === 'mul') {
        this.queryMulRank();
        return;
      }
      this.queryItemDatas();
    }
  }
}
</script>

<style scoped>

</style>