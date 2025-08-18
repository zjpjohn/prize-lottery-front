<template>
  <div style="margin:32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">提现场景</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.scene"
                 placeholder="提现场景">
        <el-option label="用户收益提现" value="USER_REWARD_TRANS"></el-option>
        <el-option label="流量主收益提现" value="USER_AGENT_TRANS"></el-option>
        <el-option label="专家收益提现" value="USER_EXPERT_TRANS"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">等级状态</span>
      <el-select size="medium"
                 style="width: 160px"
                 clearable
                 v-model="query.state"
                 placeholder="审核状态">
        <el-option label="无效等级" :value="0"></el-option>
        <el-option label="已创建" :value="1"></el-option>
        <el-option label="使用中" :value="2"></el-option>
      </el-select>
      <span style="margin-left: 24px"></span>
      <permission permit="super">
        <el-button size="medium" type="primary" @click="gotoCreate">新增等级</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="标识" prop="id" width="100px"></el-table-column>
        <el-table-column label="提现场景" width="200px">
          <template v-slot="scope">
            <span>{{ scope.row.scene.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="等级状态" width="200px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="等级内容">
          <template v-slot="scope">
            <span>{{ joinLevel(scope.row.levels.levels || []) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述说明" prop="remark" width="300px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="primary"
                     style="margin-right: 10px"
                     @click="showLevelDetail(scope.row.id)">详情
            </el-link>
            <el-link :underline="false"
                     type="primary"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="switchLevelState({
                     id:scope.row.id,
                     state:2,
                     btn:'启用',
                     message:'是否要启用提现等级'
                     })">启用
            </el-link>
            <el-link :underline="false"
                     type="danger"
                     v-if="scope.row.state.value===2"
                     style="margin-right: 10px"
                     @click="switchLevelState({
                     id:scope.row.id,
                     state:1,
                     btn:'下线',
                     message:'是否要下线提现等级'
                     })">下线
            </el-link>
            <el-link :underline="false"
                     type="warning"
                     v-if="scope.row.state.value===1"
                     style="margin-right: 10px"
                     @click="switchLevelState({
                     id:scope.row.id,
                     state:0,
                     btn:'删除',
                     message:'是否要删除提现等级'
                     })">删除
            </el-link>
            <el-link :underline="false"
                     type="plain"
                     v-if="scope.row.state.value===0"
                     style="margin-right: 10px"
                     @click="switchLevelState({
                     id:scope.row.id,
                     state:1,
                     btn:'撤销',
                     message:'是否要撤销提现等级'
                     })">撤销
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无提现等级</span>
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
import {editWithLevel, withdrawLevelList} from "../../../../api/payment-service";

export default {
  name: 'WithdrawLevelList',
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        scene: null,
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
    joinLevel(levels) {
      let values = levels.map(e => e.value);
      return values.join(',');
    },
    gotoCreate() {
      this.$router.push('/pay/withdraw/level/add');
    },
    showLevelDetail(id) {
      this.$router.push(`/pay/withdraw/level/detail/${id}`);
    },
    switchLevelState({
                       id,
                       state,
                       btn,
                       message
                     }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: btn,
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editWithLevel({
          id: id,
          state: state
        }).then(_ => {
          this.$message.success(`${btn}提现等级成功`);
          this.queryWithdrawLevels();
        });
      });
    },
    queryWithdrawLevels() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      withdrawLevelList(condition).then(value => this.list = value);
    }
  },
  watch: {
    page(value) {
      this.queryWithdrawLevels();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryWithdrawLevels();
      }
    },
  },
  mounted() {
    this.queryWithdrawLevels();
  }
}
</script>

<style scoped>

</style>
