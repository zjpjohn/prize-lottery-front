<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">渠道类型</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.type"
                 placeholder="请选择渠道类型">
        <el-option label="公告消息" :value="0"></el-option>
        <el-option label="提醒消息" :value="1"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">提醒范围</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.scope"
                 placeholder="请选择提醒范围">
        <el-option label="全部用户" :value="0"></el-option>
        <el-option label="普通用户" :value="1"></el-option>
        <el-option label="专家用户" :value="2"></el-option>
        <el-option label="代理商用户" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">提醒状态</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.remind"
                 placeholder="请选择红点提醒">
        <el-option label="静默提醒" :value="0"></el-option>
        <el-option label="红点提醒" :value="1"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">渠道状态</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.state"
                 placeholder="请选择渠道状态">
        <el-option label="已取消" :value="0"></el-option>
        <el-option label="已创建" :value="1"></el-option>
        <el-option label="使用中" :value="2"></el-option>
      </el-select>
      <span style="margin-left: 24px"></span>
      <permission permit="super">
        <el-button type="primary"
                   size="medium"
                   style="margin-right: 16px"
                   icon="el-icon-plus"
                   @click="goChannelCreate">
          创建渠道
        </el-button>
      </permission>
      <el-button type="success"
                 size="medium"
                 style="margin-right: 8px"
                 @click="goAnnounceList">
        公告管理
      </el-button>
      <el-button type="success" size="medium" @click="goRemindList">提醒管理</el-button>
    </div>
    <div style="margin-top: 32px;">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="名称" prop="name" width="100px"></el-table-column>
        <el-table-column label="渠道码" prop="channel" width="140px"></el-table-column>
        <el-table-column label="渠道图片" width="100px">
          <template v-slot="scope">
            <div
                :style="{backgroundColor:scope.row.type===0?'#2a2c3b':'#00c2c2'}"
                style="width: 36px;height: 36px;border-radius: 20px;display: flex;align-items: center;justify-content: center">
              <img :src="scope.row.cover" style="width: 20px;height: 20px" alt="渠道图标">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.type===0">公告</span>
            <span v-else>提醒</span>
          </template>
        </el-table-column>
        <el-table-column label="提醒范围" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.scope.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提醒(是/否)" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.remind===0">静默</span>
            <span v-else>提醒</span>
          </template>
        </el-table-column>
        <el-table-column label="描述说明" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     style="margin-right: 10px"
                     @click="goChannelDetail(scope.row.channel)">详情
            </el-link>
            <el-link :underline="false"
                     type="primary"
                     style="margin-right: 10px"
                     v-if="scope.row.state.value===1"
                     @click="stateAction({id:scope.row.id,
                     state:2,
                     message:'是否要开启使用消息通道'})">使用
            </el-link>
            <el-link :underline="false"
                     type="warning"
                     style="margin-right: 10px"
                     v-if="scope.row.state.value===2"
                     @click="stateAction({id:scope.row.id,
                     state:1,
                     type:'danger',
                     message:'是否要下线正在使用的消息通道'})">下线
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     v-if="scope.row.state.value===1"
                     @click="stateAction({id:scope.row.id,
                     state:0,
                     type:'warning',
                     message:'是否要取消已创建的消息通道'})">取消
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     v-if="scope.row.state.value===0"
                     @click="stateAction({id:scope.row.id,
                     state:1,
                     message:'是否要恢复已取消的消息通道'})">恢复
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无消息渠道</span>
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
import {channelList, editChannel} from "../../api/message-service";

export default {
  name: "ChannelManagerView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        type: null,
        scope: null,
        remind: null,
        state: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    goChannelCreate() {
      this.$router.push('/push/message/channel/create');
    },
    goAnnounceList() {
      this.$router.push('/push/message/announce');
    },
    goRemindList() {
      this.$router.push('/push/message/remind');
    },
    goChannelDetail(channel) {
      this.$router.push(`/push/message/channel/detail/${channel}`)
    },
    stateAction({
                  id,
                  state,
                  message,
                  type = 'success'
                }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type,
      }).then(() => {
        editChannel({
          id: id,
          state: state
        }).then(res => {
          this.queryChannels();
        });
      });
    },
    queryChannels() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      channelList(condition).then(data => this.list = data);
    },
  },
  created() {
    this.queryChannels();
  },
  watch: {
    page(value) {
      this.queryChannels();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryChannels();
      }
    },
  },
}
</script>

<style scoped>

</style>
