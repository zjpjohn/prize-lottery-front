<template>
  <div style="margin: 32px 32px 0 32px">
    <el-form :inline="true" :model="query" :rules="rules" ref="queryForm" label-with="90px">
      <el-form-item label="期号" prop="period">
        <el-select size="medium"
                   clearable
                   v-model="query.period"
                   placeholder="请选择预测期号"
                   style="width:160px;margin-right: 16px">
          <el-option v-for="(item,index) in periods"
                     :key="index+'_f_s_fsd'"
                     :label="'第 '+item+' 期'"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第一胆码" prop="d1">
        <el-select
            v-model="query.d1"
            style="width: 200px"
            clearable
            placeholder="请选择第一胆码">
          <el-option
              v-for="item in numList"
              :key="item.value"
              :label="item.label"
              :disabled="disableD1(item.value)"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第二胆码" prop="d2">
        <el-select
            v-model="query.d2"
            style="width: 200px"
            clearable
            placeholder="请选择第二胆码">
          <el-option
              v-for="item in numList"
              :key="item.value"
              :label="item.label"
              :disabled="disableD2(item.value)"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="pl3FilterQuery">过滤计算</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="result"
                stripe
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="专家名称" width="110px">
          <template v-slot="scope">
            <span>{{ scope.row.master.name.substring(0, 5) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="预测期号" width="100px"></el-table-column>
        <el-table-column prop="rank" label="综合排名" width="90px"></el-table-column>
        <el-table-column prop="d2Rank" label="双胆排名" width="90px"></el-table-column>
        <el-table-column prop="d3Rank" label="三胆排名" width="90px"></el-table-column>
        <el-table-column label="独胆" width="80px">
          <template v-slot="scope">
            <span v-if="scope.row.dan1.hitData">{{ scope.row.dan1.hitData }}</span>
            <span v-else>{{ scope.row.dan1.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="双胆" width="80px">
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
        <el-table-column label="杀一码" width="80px">
          <template v-slot="scope">
            <span v-if="scope.row.kill1.hitData">{{ scope.row.kill1.hitData }}</span>
            <span v-else>{{ scope.row.kill1.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="杀二码" width="80px">
          <template v-slot="scope">
            <span v-if="scope.row.kill2.hitData">{{ scope.row.kill2.hitData }}</span>
            <span v-else>{{ scope.row.kill2.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选五码" width="120px">
          <template v-slot="scope">
            <span v-if="scope.row.com5.hitData">{{ scope.row.com5.hitData }}</span>
            <span v-else>{{ scope.row.com5.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选六码" width="140px">
          <template v-slot="scope">
            <span v-if="scope.row.com6.hitData">{{ scope.row.com6.hitData }}</span>
            <span v-else>{{ scope.row.com6.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选七码" width="140px">
          <template v-slot="scope">
            <span v-if="scope.row.com7.hitData">{{ scope.row.com7.hitData }}</span>
            <span v-else>{{ scope.row.com7.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="定位码" width="230px">
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
    <el-dialog :visible.sync="showPoster" width="418px" @before-close="cancelPoster">
      <div slot="title">排列三预测海报</div>
      <div style="text-align: center">
        <div ref="pl3_forecast"
             v-if="selected">
          <div
              style="width: 378px;height:672px;font-family: xiaozhi;color: black;display: flex;flex-direction: column;justify-content: center;align-items: start">
            <div style="font-size: 22px;font-weight:500;margin:0 0 6px 32px">排列三</div>
            <div style="margin:0 0 32px 32px;font-size: 22px;font-weight:500;">
              第<span>{{ selected.period }}</span>期推荐<span v-if="selected.calcTime">结果回顾</span>
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
import {pl3D1D2Filter} from "../../../api/pl3-service";
import {d3_categories, parseForecast} from "../../../libs/lottery";
import {pl3PeriodMixin} from "../../../mixins/period_pl3_mixin";
import html2canvas from "html2canvas";

export default {
  name: "Pl3DanFilterView",
  mixins: [pl3PeriodMixin],
  computed: {
    numList() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `选号${e}`,
        };
      })
    },
  },
  data() {
    return {
      query: {
        period: null,
        d1: null,
        d2: null,
      },
      showPoster: false,
      selected: null,
      result: [],
      rules: {
        period: [
          {
            required: true,
            message: '预测数据期号为空',
            trigger: 'blur'
          }
        ],
        d1: [
          {
            required: true,
            message: '第一胆码为空',
            trigger: 'blur'
          }
        ],
        d2: [
          {
            required: true,
            message: '第二胆码为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    disableD1(value) {
      return this.query.d2 === value;
    },
    disableD2(value) {
      return this.query.d1 === value;
    },
    pl3FilterQuery() {
      this.$refs.queryForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.list = [];
        pl3D1D2Filter(this.query).then(data => this.result = data || []);
      });
    },
    forecastItems(data) {
      if (data.hitData) {
        return parseForecast(data.hitData);
      }
      return parseForecast(data.data);
    },
    showPosterView(row) {
      this.selected   = row;
      this.showPoster = true;
    },
    downloadPoster() {
      let width               = this.$refs.pl3_forecast.style.width;
      let cloneDom            = this.$refs.pl3_forecast.cloneNode(true);
      cloneDom.style.position = 'absolute';
      cloneDom.style.top      = '0px';
      cloneDom.style.zIndex   = '-1';
      cloneDom.style.width    = width;
      document.body.appendChild(cloneDom);
      let name = `pl3_forecast_${this.selected.period}`;
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
    cancelPoster() {
      this.selected   = null;
      this.showPoster = false;
    }
  }
}
</script>

<style scoped>

</style>