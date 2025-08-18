<template>
  <div style="margin: 32px 0 32px 32px">
    <div style="display: flex;align-items: center;margin-top: 24px">
      <permission permit="super">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="showRecommend=true">组合推荐</el-button>
          <el-button type="success" icon="el-icon-refresh">批量计算</el-button>
        </div>
      </permission>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe
                :data="recommend.records"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '50px'}">
        <el-table-column label="推荐期号" width="140px">
          <template v-slot="scope">
            <span>{{ scope.row.period }}期</span>
          </template>
        </el-table-column>
        <el-table-column label="组六推荐" width="400px">
          <template v-slot="scope">
            <div style="display: flex;flex-wrap: wrap;align-items: start;margin-bottom: 10px">
              <el-tag v-for="(item,index) in scope.row.zu6.items"
                      :key="'zu6_'+index"
                      style="margin:10px 10px 0 0;"
                      :type="item.hit===1?'primary':'info'">{{ item.value }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="组三推荐" width="340px">
          <template v-slot="scope">
            <div style="display: flex;flex-wrap: wrap;margin-bottom: 10px">
              <el-tag v-for="(item,index) in scope.row.zu3.items"
                      :key="'zu3_'+index"
                      style="margin:10px 10px 0 0;"
                      :type="item.hit===1?'primary':'info'">{{ item.value }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开奖类型" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.type">
               {{ type[scope.row.type] }}
            </span>
            <span v-else>未开奖</span>
          </template>
        </el-table-column>
        <el-table-column label="是否命中" width="100px">
          <template v-slot="scope">
            <span v-if="scope.row.type">
               {{ scope.row.hit === 1 ? '命中' : '未命中' }}
            </span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="计算时间" width="180px">
          <template v-slot="scope">
            <span v-if="scope.row.type">
               {{ scope.row.calcTime }}
            </span>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" v-if="!scope.row.type" @click="comRecommendHit(scope.row.period)">计算命中
            </el-button>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无数据</span>
          </div>
        </div>
      </el-table>
    </div>
    <div style="text-align: right;margin-top: 16px">
      <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page.sync="page"
          :page-size="limit"
          :total="recommend.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showRecommend" width="650px" :before-close="recDialogClose">
      <div slot="title" class="title">组合号码计算</div>
      <el-form label-width="100px" ref="recommendForm" :model="recommendDto" :rules="rules">
        <el-form-item label="推荐期号" prop="period">
          <el-select size="medium"
                     clearable
                     v-model="recommendDto.period"
                     placeholder="请选择推荐期号"
                     style="width:450px;margin-right: 16px">
            <el-option v-for="(item,index) in periods"
                       :key="index+'_p_s_fsd'"
                       :label="'第 '+item+' 期'"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="必杀号码" prop="kills">
          <el-select
              v-model="recommendDto.kills"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 450px"
              placeholder="请选择定胆号码">
            <el-option
                v-for="item in killOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定胆号码">
          <el-select
              v-model="recommendDto.dans"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 450px"
              placeholder="请选择定胆号码">
            <el-option
                v-for="item in danOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="comRecommendAction">计算</el-button>
        <el-button size="mini" type="danger" @click="recDialogClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {comRecommendAna, comRecommendCalc, comRecommendList} from "../../../../api/fc3d-service";
import {d3_categories, n3_type} from "../../../../libs/lottery";
import {fc3dPeriodMixin} from "../../../../mixins/period_fc3d_mixin";

export default {
  name: "Fc3dComRecomView",
  mixins: [
    fc3dPeriodMixin
  ],
  computed: {
    danOptions() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `胆码${e}`
        };
      });
    },
    killOptions() {
      return d3_categories.map(e => {
        return {
          value: `${e}`,
          label: `必杀${e}`
        };
      });
    },
  },
  data() {
    return {
      type: n3_type,
      showRecommend: false,
      page: 1,
      limit: 10,
      recommend: {
        current: 1,
        total: 0,
        records: [],
      },
      recommendDto: {
        period: null,
        dans: [],
        kills: [],
      },
      rules: {
        period: [
          {
            required: true,
            message: '推荐期号为空',
            trigger: 'blur'
          }
        ],
        kills: [
          {
            required: true,
            message: '杀码集合为空',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    queryRecommendList() {
      comRecommendList({
        page: this.page,
        limit: this.limit
      })
          .then(data => this.recommend = data);
    },
    recDialogClose() {
      this.showRecommend = false;
      this.recommendDto  = {
        period: null,
        dans: [],
        kills: []
      };
      this.$refs.recommendForm.resetFields();
    },
    comRecommendAction() {
      this.$refs.recommendForm.validate(valid => {
        if (!valid) {
          return;
        }
        comRecommendAna(this.recommendDto).then(res => {
          this.$message.success('计算成功');
          this.page         = 1;
          this.recommendDto = {
            period: null,
            dans: [],
            kills: []
          };
          this.queryRecommendList();
          this.showRecommend = false;
        });
      })
    },
    comRecommendHit(period) {
      this.$confirm('是否要计算组合推荐命中？', '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        comRecommendCalc(period).then(res => {
          this.$message.success('计算成功');
          this.queryRecommendList();
        });
      });
    }
  },
  mounted() {
    this.queryRecommendList();

  },
  watch: {
    page(val, old) {
      this.queryRecommendList();
    },
  }
}
</script>

<style scoped>

</style>
