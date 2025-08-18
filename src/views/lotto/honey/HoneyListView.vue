<template>
  <div style="margin:32px 32px 0 32px">
    <permission permit="super">
      <el-button plain type="primary" @click="toCreateHoney">新增数据</el-button>
    </permission>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="期号" prop="period" width="120px"></el-table-column>
        <el-table-column label="配胆图">
          <template v-slot="scope">
            <div style="display: flex;align-items: center;justify-content: start;height: 30px">
              <span v-for="(row,index) in scope.row.honey.values"
                    :key="index+'_honey_row'"
                    style="margin-right: 16px">
                <span v-for="cell in row"
                      :key="index+'_honey_column'"
                      style="margin-right: 4px">
                <span
                    style="display:inline-block;color:white;width: 26px;height: 26px;line-height: 26px;text-align: center;background-color: #1E90FF">
                {{ cell }}
                </span>
                </span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开奖日期" prop="lottoDate" width="120px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="160px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       type="danger"
                       @click="delHoney(scope.row)">删除
              </el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据集</span>
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
import {honeyList, removeHoney} from "../../../api/lotto-service";

export default {
  name: "HoneyListView",
  data() {
    return {
      type: this.$route.query.type,
      page: 1,
      limit: 12,
      show: false,
      selected: null,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    toCreateHoney() {
      let typePath = this.type === 'fc3d' ? 'fsd' : 'pls';
      this.$router.push(`/${typePath}/honey/add`);
    },
    queryHoneyList() {
      honeyList({
        page: this.page,
        limit: this.limit,
        type: this.type
      }).then(data => this.list = data);
    },
    delHoney(row) {
      this.$confirm(`是否要删除${row.period}期配胆？`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeHoney(row.id).then(res => {
          this.$message.success('删除成功');
          this.queryHoneyList();
        });
      });
    },
  },
  mounted() {
    this.queryHoneyList();
  },
  watch: {
    page(value) {
      this.queryHoneyList();
    }
  }
}
</script>

<style scoped>

</style>