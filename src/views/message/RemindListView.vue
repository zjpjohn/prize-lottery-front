<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right:16px">提醒渠道</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.channel"
                 placeholder="请选择公告渠道">
        <el-option v-for="(item,index) in channels"
                   :key="index+'_channel'"
                   :label="item.name"
                   :value="item.channel"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">提醒类型</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.type"
                 placeholder="请选择提醒类型">
        <el-option label="文本提醒" :value="1"></el-option>
        <el-option label="链接提醒" :value="2"></el-option>
        <el-option label="卡片提醒" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">创建时间</span>
      <el-select size="medium"
                 style="width: 180px"
                 v-model="query.days"
                 placeholder="请选择提醒创建时间">
        <el-option label="一周内" :value="7"></el-option>
        <el-option label="两周内" :value="14"></el-option>
        <el-option label="一个月内" :value="30"></el-option>
        <el-option label="两个月内" :value="60"></el-option>
        <el-option label="三个月内" :value="90"></el-option>
      </el-select>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="提醒标识" prop="id" width="100px"></el-table-column>
        <el-table-column label="提醒来源" prop="fomName" width="100px"></el-table-column>
        <el-table-column label="提醒类型" width="100px"></el-table-column>
        <el-table-column label="消息渠道" prop="channel" width="100px"></el-table-column>
        <el-table-column label="提醒标题" prop="title" width="300px"></el-table-column>
        <el-table-column label="提醒内容"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="160px"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无代金券</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="list.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {remindList, typedChannels} from "../../api/message-service";

export default {
  name: "RemindListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        channel: null,
        type: null,
        days: 7,
      },
      channels: [],
      list: {
        current: 1,
        total: 0,
        records: [],
      }
    };
  },
  methods: {
    remindChannels() {
      typedChannels(1)
          .then(data => this.channels = data || []);
    },
    queryReminds() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      remindList(condition).then(data => this.list = data);
    },
  },
  created() {
    this.remindChannels();
    this.queryReminds();
  },
  watch: {
    page(value) {
      this.queryReminds();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryReminds();
      }
    },
  },
}
</script>

<style scoped>

</style>
