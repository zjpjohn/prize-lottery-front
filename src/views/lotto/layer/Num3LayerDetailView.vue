<template>
  <div style="margin: 48px 32px 0 32px">
    <div class="page-title" style="margin-bottom: 16px">推荐详情</div>
    <div style="display: flex;align-items: center;justify-content: start;gap: 24px">
      <el-card class="layer-panel">
        <div slot="header">
          <div v-if="result" style="display: flex;align-items: center;justify-content: space-between">
            <span>{{ result.layer1.name }}</span>
            <span style="color: #1890ff">{{ hit(result.layer1.hit) }}</span>
          </div>
        </div>
        <div v-if="result">
          <div style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <span style="margin-right: 6px">过滤条件:</span>
            <span v-for="(item,index) in result.layer1.condition" :key="'l_c_1_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </div>
          <div style="margin-top: 8px">
              <span v-if="result.layer1.zu3.hit!==-1"
                    style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                  <span v-for="(item,index) in result.layer1.zu3.items" :key="'l_zu3_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                <span v-for="(item,index) in result.layer1.zu3.items" :key="'l_zu3_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
              </span>
          </div>
          <div style="margin-top: 8px">
            <span v-if="result.layer1.zu6.hit!==-1"
                  style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                  <span style="margin-right: 6px">组六号码:</span>
                  <span v-for="(item,index) in result.layer1.zu6.items" :key="'l_zu6_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组六号码:</span>
                <span v-for="(item,index) in result.layer1.zu6.items" :key="'l_zu6_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card class="layer-panel">
        <div slot="header">
          <div v-if="result" style="display: flex;align-items: center;justify-content: space-between">
            <span>{{ result.layer2.name }}</span>
            <span style="color: #1890ff">{{ hit(result.layer2.hit) }}</span>
          </div>
        </div>
        <div v-if="result">
          <div style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <span style="margin-right: 6px">过滤条件:</span>
            <span v-for="(item,index) in result.layer2.condition" :key="'l_c_1_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </div>
          <div style="margin-top: 8px">
              <span v-if="result.layer2.zu3.hit!==-1"
                    style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                  <span v-for="(item,index) in result.layer2.zu3.items" :key="'l_zu3_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                <span v-for="(item,index) in result.layer2.zu3.items" :key="'l_zu3_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
              </span>
          </div>
          <div style="margin-top: 8px">
            <span v-if="result.layer2.zu6.hit!==-1"
                  style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                  <span style="margin-right: 6px">组六号码:</span>
                  <span v-for="(item,index) in result.layer2.zu6.items" :key="'l_zu6_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组六号码:</span>
                <span v-for="(item,index) in result.layer2.zu6.items" :key="'l_zu6_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card class="layer-panel">
        <div slot="header">
          <div v-if="result" style="display: flex;align-items: center;justify-content: space-between">
            <span>{{ result.layer3.name }}</span>
            <span style="color: #1890ff">{{ hit(result.layer3.hit) }}</span>
          </div>
        </div>
        <div v-if="result">
          <div style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <span style="margin-right: 6px">过滤条件:</span>
            <span v-for="(item,index) in result.layer3.condition" :key="'l_c_1_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </div>
          <div style="margin-top: 8px">
              <span v-if="result.layer3.zu3.hit!==-1"
                    style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                  <span v-for="(item,index) in result.layer3.zu3.items" :key="'l_zu3_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                <span v-for="(item,index) in result.layer3.zu3.items" :key="'l_zu3_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
              </span>
          </div>
          <div style="margin-top: 8px">
            <span v-if="result.layer3.zu6.hit!==-1"
                  style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                  <span style="margin-right: 6px">组六号码:</span>
                  <span v-for="(item,index) in result.layer3.zu6.items" :key="'l_zu6_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组六号码:</span>
                <span v-for="(item,index) in result.layer3.zu6.items" :key="'l_zu6_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card class="layer-panel" v-if="result&&result.layer4.condition.length>0">
        <div slot="header">
          <div v-if="result" style="display: flex;align-items: center;justify-content: space-between">
            <span>{{ result.layer4.name }}</span>
            <span style="color: #1890ff">{{ hit(result.layer4.hit) }}</span>
          </div>
        </div>
        <div>
          <div style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <span style="margin-right: 6px">过滤条件:</span>
            <span v-for="(item,index) in result.layer4.condition" :key="'l_c_1_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </div>
          <div style="margin-top: 8px">
              <span v-if="result.layer4.zu3.hit!==-1"
                    style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start;">
                <span style="margin-right: 6px">组三号码:</span>
                  <span v-for="(item,index) in result.layer4.zu3.items" :key="'l_zu3_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                <span v-for="(item,index) in result.layer4.zu3.items" :key="'l_zu3_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
              </span>
          </div>
          <div style="margin-top: 8px">
            <span v-if="result.layer4.zu6.hit!==-1"
                  style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                  <span style="margin-right: 6px">组六号码:</span>
                  <span v-for="(item,index) in result.layer4.zu6.items" :key="'l_zu6_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组六号码:</span>
                <span v-for="(item,index) in result.layer4.zu6.items" :key="'l_zu6_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card class="layer-panel" v-if="result&&result.layer5.condition.length>0">
        <div slot="header">
          <div v-if="result" style="display: flex;align-items: center;justify-content: space-between">
            <span>{{ result.layer5.name }}</span>
            <span style="color: #1890ff">{{ hit(result.layer5.hit) }}</span>
          </div>
        </div>
        <div>
          <div style="display: flex;align-items: center;justify-content: start;flex-wrap: wrap">
            <span style="margin-right: 6px">过滤条件:</span>
            <span v-for="(item,index) in result.layer5.condition" :key="'l_c_1_'+index"
                  style="margin-right: 4px">{{ item }}</span>
          </div>
          <div style="margin-top: 8px">
              <span v-if="result.layer5.zu3.hit!==-1"
                    style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                  <span v-for="(item,index) in result.layer5.zu3.items" :key="'l_zu3_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
              </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组三号码:</span>
                <span v-for="(item,index) in result.layer5.zu3.items" :key="'l_zu3_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
              </span>
          </div>
          <div style="margin-top: 8px">
            <span v-if="result.layer5.zu6.hit!==-1"
                  style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                  <span style="margin-right: 6px">组六号码:</span>
                  <span v-for="(item,index) in result.layer5.zu6.items" :key="'l_zu6_'+index"
                        style="margin-right: 6px" v-html="hitReplace(item.hitValue)"></span>
            </span>
            <span v-else style="display: flex;flex-wrap: wrap;align-items: center;justify-content: start">
                <span style="margin-right: 6px">组六号码:</span>
                <span v-for="(item,index) in result.layer5.zu6.items" :key="'l_zu6_'+index"
                      style="margin-right: 6px">{{ hitReplace(item.value) }}</span>
            </span>
          </div>
        </div>
      </el-card>
    </div>
    <div style="margin-top: 24px">
      <div class="page-title" style="margin-bottom:12px;">浏览记录</div>
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'48px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '48px'}">
        <el-table-column label="浏览编号" prop="seqNo"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="预测期号" prop="period"></el-table-column>
        <el-table-column label="彩种类型">
          <template v-slot="scope">
            <span>{{ scope.row.type.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览类型">
          <template v-slot="scope">
            <span>{{ scope.row.source.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览时间时间" prop="gmtCreate"></el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无浏览记录</span>
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
import {hitReplace} from "../../../libs/lottery";
import {browseList, num3Layer} from "../../../api/lotto-service";

const hitMap = {
  0: '未命中',
  1: '组六命中',
  2: '组三命中',
};

export default {
  name: "Num3LayerDetailView",
  data() {
    return {
      id: this.$route.params.id,
      period: this.$route.params.period,
      type: this.$route.query.type,
      result: null,
      page: 1,
      limit: 10,
      list: {
        current: 1,
        total: 1,
        records: [],
      },
    };
  },
  methods: {
    hitReplace,
    hit(value) {
      return hitMap[value] || '未开奖';
    },
    queryLayerDetail() {
      num3Layer(this.id).then(data => this.result = data);
    },
    queryBrowseList() {
      browseList({
        page: this.page,
        limit: this.limit,
        source: 13,
        type: this.type,
        period: this.period,
      }).then(data => this.list = data);
    },
  },
  created() {
    this.queryLayerDetail();
    this.queryBrowseList();
  },
  watch: {
    page(_) {
      this.queryBrowseList();
    }
  },
}
</script>

<style scoped>
.layer-panel {
  flex: 1;
  height: 340px;
}
</style>