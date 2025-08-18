<template>
  <div style="margin:32px 32px 0 32px">
    <permission permit="super">
      <el-button plain type="primary" @click="toCreateAround">新增数据</el-button>
      <el-button plain type="primary" @click="fetchLatest" v-if="this.lotto==='fc3d'">抓取最新</el-button>
      <el-button plain type="primary" @click="showDialog=true" v-if="this.lotto==='fc3d'">批量抓取</el-button>
    </permission>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="期号" prop="period" width="120px"></el-table-column>
        <el-table-column label="类型" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="绕胆图">
          <template v-slot="scope">
            <div style="display: flex;align-items: center;justify-content: start;height: 30px">
              <span v-for="(cell,index) in scope.row.around.cells"
                    :key="index+'_around_cell'"
                    :style="{marginRight:index===2||index===7?'16px':'4px'}">
                <span
                    style="display:inline-block;color:white;width: 26px;height: 26px;line-height: 26px;text-align: center;"
                    :style="{backgroundColor:colors[cell.type]}">
                {{ cell.value }}
                </span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="命中结果" width="320px">
          <template v-slot="scope">
            <span>{{ getResult(scope.row.result) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开奖日期" prop="lottoDate" width="140px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       type="danger"
                       @click="delAround(scope.row)">删除
              </el-link>
            </permission>
            <permission permit="super">
              <el-link :underline="false"
                       v-if="!scope.row.result"
                       type="primary"
                       style="margin-left: 12px"
                       @click="calcAroundHit(scope.row)">计算
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
    <el-dialog :visible.sync="showDialog" width="450px" :before-close="closeFetchAround">
      <div slot="title" class="title">批量抓取绕胆信息</div>
      <el-form label-width="90px">
        <el-form-item label="导入期数">
          <el-input-number v-model="size" :min="1" :max="20"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="fetchAround">抓 取</el-button>
        <el-button size="mini" type="plain" @click="closeFetchAround">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {aroundList, calcAroundResult, fetchAround, removeAround} from "../../../api/lotto-service";
import {colors} from "../../../libs/lottery";

export default {
  name: "AroundListView",
  data() {
    return {
      lotto: this.$route.query.type,
      page: 1,
      limit: 12,
      colors: colors,
      size: 20,
      showDialog: false,
      list: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    getResult(result) {
      if (result) {
        let text = '';
        if (result.level1 > 0) {
          text += `一级胆码中${result.level1};`;
        }
        if (result.level2 > 0) {
          text += `二级胆码中${result.level2};`;
        }
        if (result.tuo > 0) {
          text += `拖码中${result.tuo}`;
        }
        if (text.endsWith(';')) {
          text = text.substring(0, text.length - 1);
        }
        return text;
      }
      return '暂无命中结果';
    },
    queryAroundList() {
      aroundList({
        page: this.page,
        limit: this.limit,
        lotto: this.lotto
      }).then(data => this.list = data);
    },
    toCreateAround() {
      let typePath = this.lotto === 'fc3d' ? 'fsd' : 'pls';
      this.$router.push(`/${typePath}/around/add`);
    },
    calcAroundHit(row) {
      this.$confirm(`是否要计算${row.period}期命中？`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        calcAroundResult(this.lotto, row.period).then(res => this.$message.success('计算成功'));
      });
    },
    delAround(row) {
      this.$confirm(`是否要删除${row.period}期绕胆？`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeAround(row.id).then(res => {
          this.$message.success('删除成功');
          this.queryAroundList();
        });
      });
    },
    fetchLatest() {
      this.$confirm(`是否要抓取最新期绕胆信息？`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchAround(0).then(_ => {
          this.$message.success('抓取成功');
          this.queryAroundList();
        });
      });
    },
    fetchAround() {
      fetchAround(this.size).then(_ => {
        this.closeFetchAround();
        this.$message.success('任务提交成功');
      });
    },
    closeFetchAround() {
      this.size       = 20;
      this.showDialog = false;
    }
  },
  mounted() {
    this.queryAroundList();
  },
  watch: {
    page(value) {
      this.queryAroundList();
    }
  }
}
</script>

<style scoped>

</style>