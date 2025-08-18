<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">卡券状态</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.state"
                 placeholder="请选择代金券状态">
        <el-option label="已创建" :value="1"></el-option>
        <el-option label="投放中" :value="2"></el-option>
        <el-option label="已下线" :value="0"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">领取频率</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.disposable"
                 placeholder="是否为一次性领取">
        <el-option label="一次性领取" :value="1"></el-option>
        <el-option label="可重复领取" :value="0"></el-option>
      </el-select>
      <span style="margin-left: 24px"></span>
      <permission permit="super">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="gotoCreateVoucher">创建卡券</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="编号" prop="seqNo" width="180px"></el-table-column>
        <el-table-column label="名称" prop="name" width="160px"></el-table-column>
        <el-table-column label="金额" prop="voucher" width="100px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template v-slot="scope">
            <span>{{ scope.row.state.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重复领取" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.disposable===0">可重复</span>
            <span v-else>一次性</span>
          </template>
        </el-table-column>
        <el-table-column label="过期时间" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.expire>0">{{ scope.row.expire }}天</span>
            <span v-else>无过期</span>
          </template>
        </el-table-column>
        <el-table-column label="领取间隔" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.interval>0">{{ scope.row.interval }}天</span>
            <span v-else>无限制</span>
          </template>
        </el-table-column>
        <el-table-column label="备注描述" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     style="margin-right: 10px"
                     @click="gotoVoucherDetail(scope.row.seqNo)">详情
            </el-link>
            <permission permit="super">
              <el-link :underline="false"
                       type="primary"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       @click="onlineVoucher(scope.row.id)">上架
              </el-link>
              <el-link :underline="false"
                       type="warning"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===2"
                       @click="offlineVoucher(scope.row.id)">下线
              </el-link>
              <el-link :underline="false"
                       type="danger"
                       style="margin-right: 10px"
                       v-if="scope.row.state.value===1"
                       @click="cancelVoucher(scope.row.id)">取消
              </el-link>
            </permission>
            <el-link :underline="false"
                     type="plain"
                     @click="gotoVoucherLog(scope.row.seqNo)">领取记录
            </el-link>
          </template>
        </el-table-column>
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
import {editVoucher, voucherList} from "../../api/voucher-service";

export default {
  name: "VoucherListView",
  data() {
    return {
      page: 1,
      limit: 10,
      query: {
        state: null,
        disposable: null,
      },
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    gotoCreateVoucher() {
      this.$router.push('/pay/voucher/create');
    },
    gotoVoucherDetail(seqNo) {
      this.$router.push(`/pay/voucher/detail/${seqNo}`)
    },
    gotoVoucherLog(seqNo) {
      this.$router.push(`/pay/voucher/log/${seqNo}`);
    },
    queryVoucherList() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      voucherList(condition).then(data => this.list = data);
    },
    onlineVoucher(id) {
      this.$confirm('上线后代金券将在APP端投放显示，是否要上线当前代金券？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        editVoucher({
          id: id,
          state: 2
        }).then(res => {
          this.queryVoucherList();
        });
      });
    },
    offlineVoucher(id) {
      this.$confirm('下架后代金券将不会在APP端投放，是否要下架当前代金券？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editVoucher({
          id: id,
          state: 3
        }).then(res => {
          this.queryVoucherList();
        });
      });
    },
    cancelVoucher(id) {
      this.$confirm('删除代金券将不可用，是否要删除当前代金券？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editVoucher({
          id: id,
          state: 0
        }).then(res => {
          this.queryVoucherList();
        });
      });
    },
  },
  created() {
    this.queryVoucherList();
  },
  watch: {
    page(value) {
      this.queryVoucherList();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryVoucherList();
      }
    },
  }
}
</script>

<style scoped>

</style>
