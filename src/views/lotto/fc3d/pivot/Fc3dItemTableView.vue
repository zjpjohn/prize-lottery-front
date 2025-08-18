<template>
  <div style="margin: 32px 32px 0 32px;">
    <div style="margin-top: 28px;display: flex;align-items: center">
      <span style="margin-right: 16px">开奖期号</span>
      <el-select size="medium" v-model="period" placeholder="请选择期号" clearable
                 style="width:160px;margin-right: 16px">
        <el-option v-for="(item,index) in periods"
                   :key="index+'_p_s_fsd'"
                   :label="'第 '+item+' 期'"
                   :value="item"></el-option>
      </el-select>
      <span style="margin: 0 16px">专家排名</span>
      <el-select size="medium" v-model="limit" placeholder="请选择专家排名"
                 style="width:160px;margin-right: 16px">
        <el-option label="前10名专家" :value="10"></el-option>
        <el-option label="前15名专家" :value="15"></el-option>
        <el-option label="前20名专家" :value="20"></el-option>
        <el-option label="前30名专家" :value="30"></el-option>
        <el-option label="前40名专家" :value="40"></el-option>
        <el-option label="前50名专家" :value="50"></el-option>
        <el-option label="前60名专家" :value="60"></el-option>
        <el-option label="前80名专家" :value="80"></el-option>
        <el-option label="前100名专家" :value="100"></el-option>
      </el-select>
      <el-button plain type="primary" @click="queryItemTable">查询统计</el-button>
    </div>
    <div style="margin-top: 24px">
      <table style="border: none;display: block;margin-left: auto;margin-right: auto;font-size: 14px">
        <tr>
          <th style="text-align: center">类型</th>
          <th style="text-align: center">杀一</th>
          <th style="text-align: center">杀二</th>
          <th style="text-align: center">双胆</th>
          <th style="text-align: center">三胆</th>
          <th style="text-align: center">七码</th>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px;">综合</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.zo,()=>table.zo.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.zo,()=>table.zo.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.zo,()=>table.zo.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.zo,()=>table.zo.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.zo,()=>table.zo.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">杀二</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.k2,()=>table.k2.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k2,()=>table.k2.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k2,()=>table.k2.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k2,()=>table.k2.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k2,()=>table.k2.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">杀一</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.k1,()=>table.k1.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k1,()=>table.k1.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k1,()=>table.k1.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k1,()=>table.k1.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.k1,()=>table.k1.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">七码</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.c7,()=>table.c7.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c7,()=>table.c7.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c7,()=>table.c7.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c7,()=>table.c7.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c7,()=>table.c7.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">六码</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.c6,()=>table.c6.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c6,()=>table.c6.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c6,()=>table.c6.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c6,()=>table.c6.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c6,()=>table.c6.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">五码</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.c5,()=>table.c5.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c5,()=>table.c5.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c5,()=>table.c5.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c5,()=>table.c5.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.c5,()=>table.c5.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">三胆</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.d3,()=>table.d3.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d3,()=>table.d3.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d3,()=>table.d3.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d3,()=>table.d3.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d3,()=>table.d3.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">双胆</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.d2,()=>table.d2.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d2,()=>table.d2.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d2,()=>table.d2.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d2,()=>table.d2.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d2,()=>table.d2.c7)"></item-table-cell>
          </td>
        </tr>
        <tr>
          <td>
            <span style="padding: 0 6px">独胆</span>
          </td>
          <td>
            <item-table-cell :cell="value(table.d1,()=>table.d1.k1)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d1,()=>table.d1.k2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d1,()=>table.d1.d2)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d1,()=>table.d1.d3)"></item-table-cell>
          </td>
          <td>
            <item-table-cell :cell="value(table.d1,()=>table.d1.c7)"></item-table-cell>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";
import {fsdItemTable} from "../../../../api/fc3d-service";
import ItemTableCell from "../../../../components/lotto/ItemTableCell.vue";

export default {
  name: "Fc3dItemTableView",
  components: {ItemTableCell},
  mixins: [fc3dPeriodMixin],
  data() {
    return {
      period: null,
      limit: 15,
      table: {
        zo: null,
        k1: null,
        k2: null,
        c7: null,
        c6: null,
        c5: null,
        d3: null,
        d2: null,
        d1: null,
      },
    };
  },
  methods: {
    value(value, callback) {
      if (value == null) {
        return {
          count: 0,
          values: [],
        };
      }
      return callback(value);
    },
    queryItemTable() {
      fsdItemTable(this.period, this.limit).then(data => {
        this.table = {
          zo: data.zo,
          k1: data.k1,
          k2: data.k2,
          c7: data.c7,
          c6: data.c6,
          c5: data.c5,
          d3: data.d3,
          d2: data.d2,
          d1: data.d1
        };
      })
    }
  },
}
</script>

<style scoped>

</style>