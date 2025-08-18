<template>
  <div style="margin:32px 32px 0 32px">
    <div style="padding: 24px 0">
      <el-row :gutter="64">
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="广告收益">
              <template v-slot:formatter>
                {{ mediaMetrics.todayIncome.toFixed(1) }} / {{ mediaMetrics.lastIncome.toFixed(1) }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">昨天</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">前天</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="展现次数">
              <template v-slot:formatter>
                {{ mediaMetrics.todayShow }} / {{ mediaMetrics.lastShow }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">昨天</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">前天</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="点击次数">
              <template v-slot:formatter>
                {{ mediaMetrics.todayClick }} / {{ mediaMetrics.lastClick }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">昨天</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">前天</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="metric-panel">
            <el-statistic title="千次展现收益">
              <template v-slot:formatter>
                {{ mediaMetrics.todayEcpm.toFixed(1) }} / {{ mediaMetrics.lastEcpm.toFixed(1) }}
              </template>
              <template v-slot:prefix>
                <span style="font-size: 13px;color: #999999">昨天</span>
              </template>
              <template v-slot:suffix>
                <span style="font-size: 13px;color: #999999">前天</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 24px">
      <div style="display: flex;align-items: center">
        <div class="page-title" style="font-size: 20px">广告位列表</div>
        <permission permit="super">
          <el-button type="primary" plain style="margin-left: 24px" @click="showAdd = true">添加广告位</el-button>
        </permission>
      </div>
      <el-table stripe :data="unitList"
                style="width:100%;margin-top: 24px"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="广告位名称" prop="unitName" width="140"></el-table-column>
        <el-table-column label="广告位标识" prop="unitId"></el-table-column>
        <el-table-column label="广告位类型" width="140">
          <template v-slot="scope">
            {{ scope.row.unitType.label }}
          </template>
        </el-table-column>
        <el-table-column label="广告位状态" width="140">
          <template v-slot="scope">
            <permission permit="super">
              <el-switch :value="scope.row.state"
                         :width="30"
                         :active-value="1"
                         :inactive-value="0"
                         @change="(value)=>changeUnitState(value,scope.row)"></el-switch>
            </permission>
          </template>
        </el-table-column>
        <el-table-column label="所属应用" prop="appNo" width="140"></el-table-column>
        <el-table-column label="备注描述" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180"></el-table-column>
        <el-table-column label="操作" width="160">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       style="margin-right: 12px"
                       type="danger"
                       @click="showEditUnit(scope.row)">编辑
              </el-link>
            </permission>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无广告位</span>
          </div>
        </div>
      </el-table>
    </div>
    <el-dialog :visible.sync="showAdd"
               @close="closeAddUnit"
               :modal-append-to-body="false" width="32%">
      <div slot="title" class="title">创建广告位</div>
      <div>
        <el-form ref="addUnitForm" :model="addUnitDto" :rules="rules" label-width="110px">
          <el-form-item label="广告位名称" prop="unitName">
            <el-input v-model="addUnitDto.unitName"
                      placeholder="请输入广告位名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="广告位标识" prop="unitId">
            <el-input v-model="addUnitDto.unitId"
                      placeholder="请输入广告位标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="广告位类型" prop="unitType">
            <el-select v-model="addUnitDto.unitType"
                       style="width: 100%"
                       placeholder="请选择广告位类型">
              <el-option v-for="(item,index) in adTypes"
                         :key="'unit_type_'+index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="addUnitDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitAddUnit">提交</el-button>
            <el-button type="primary" @click="closeAddUnit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="closeEditUnit"
               :modal-append-to-body="false" width="32%">
      <div slot="title" class="title">编辑广告位</div>
      <div>
        <el-form ref="editUnitForm" :model="editUnitDto" label-width="110px">
          <el-form-item label="广告位名称">
            <el-input v-model="editUnitDto.unitName"
                      placeholder="请输入广告位名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="广告位标识">
            <el-input v-model="editUnitDto.unitId"
                      placeholder="请输入广告位标识"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="广告位类型">
            <el-select v-model="editUnitDto.unitType"
                       style="width: 100%"
                       placeholder="请选择广告位类型">
              <el-option v-for="(item,index) in adTypes"
                         :key="'unit_type_'+index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="editUnitDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitEditUnit">提交</el-button>
            <el-button type="primary" @click="closeEditUnit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {adMediaInfo, adUnitList, appMediaMetrics, createAdUnit, editAdUnit} from "../../api/adset-service";
import {adset_type} from "../../libs/advert";

export default {
  name: "AdMediaDetailView",
  data() {
    return {
      mediaId: this.$route.params.mediaId,
      unitList: [],
      adMedia: null,
      adTypes: adset_type,
      mediaMetrics: {
        todayShow: 0,
        lastShow: 0,
        todayClick: 0,
        lastClick: 0,
        todayIncome: 0,
        lastIncome: 0,
        todayEcpm: 0,
        lastEcpm: 0,
      },
      showAdd: false,
      showEdit: false,
      selected: null,
      addUnitDto: {
        unitId: null,
        unitName: null,
        unitType: null,
        remark: null,
      },
      editUnitDto: {
        unitId: null,
        unitName: null,
        unitType: null,
        remark: null,
      },
      rules: {
        unitName: [
          {
            required: true,
            message: '广告位名称为空',
            trigger: 'blur',
          },
        ],
        unitId: [
          {
            required: true,
            message: '广告位标识为空',
            trigger: 'blur',
          },
        ],
        unitType: [
          {
            required: true,
            message: '广告位类型为空',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    adMediaDetail() {
      adMediaInfo(this.mediaId).then(data => this.adMedia = data);
    },
    adMediaUnitList() {
      adUnitList(this.mediaId).then(data => this.unitList = data || []);
    },
    adMediaMetrics() {
      appMediaMetrics(this.mediaId).then(data => {
        if (!data) {
          return;
        }
        let {
              todayShow,
              lastShow,
              todayClick,
              lastClick,
              todayIncome,
              lastIncome,
              todayEcpm,
              lastEcpm
            }                         = data;
        this.mediaMetrics.todayShow   = todayShow || 0;
        this.mediaMetrics.lastShow    = lastShow || 0;
        this.mediaMetrics.todayClick  = todayClick || 0;
        this.mediaMetrics.lastClick   = lastClick || 0;
        this.mediaMetrics.todayIncome = todayIncome || 0;
        this.mediaMetrics.lastIncome  = lastIncome || 0;
        this.mediaMetrics.todayEcpm   = todayEcpm || 0;
        this.mediaMetrics.lastEcpm    = lastEcpm || 0;
      })
    },
    showEditUnit(value) {
      this.selected = value;
      Object.keys(this.editUnitDto)
          .filter(key => key !== 'unitType')
          .forEach(key => this.editUnitDto[key] = this.selected[key]);
      this.editUnitDto.unitType = this.selected.unitType.value;
      this.showEdit             = true;
    },
    submitAddUnit() {
      this.$refs.addUnitForm.validate(valid => {
        if (!valid) {
          return;
        }
        let dto = Object.assign({mediaId: this.mediaId}, this.addUnitDto);
        createAdUnit(dto).then(res => {
          this.adMediaUnitList();
          this.$message.success("添加成功");
          this.closeAddUnit();
        });
      });
    },
    closeAddUnit() {
      this.$refs.addUnitForm.resetFields();
      Object.keys(this.addUnitDto).forEach(key => this.addUnitDto[key] = null);
      this.showAdd = false;
    },
    submitEditUnit() {
      let params = {};
      Object.keys(this.editUnitDto)
          .filter(key => this.editUnitDto[key] !== this.selected[key] && key !== 'unitType')
          .forEach(key => params[key] = this.editUnitDto[key]);
      if (this.editUnitDto.unitType !== this.selected.unitType.value) {
        params.unitType = this.editUnitDto.unitType;
      }
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据');
        return;
      }
      let dto = Object.assign({
        id: this.selected.id,
        mediaId: this.selected.mediaId
      }, params);
      editAdUnit(dto)
          .then(res => {
            this.adMediaUnitList();
            this.$message.success('编辑成功');
            this.closeEditUnit();
          })
    },
    closeEditUnit() {
      this.$refs.editUnitForm.resetFields();
      Object.keys(this.editUnitDto).forEach(key => this.editUnitDto[key] = null);
      this.showEdit = false;
      this.selected = null;
    },
    changeUnitState(state, adUnit) {
      if (this.adMedia.state === 0 && state === 1) {
        this.$message.error('广告媒体已停止');
        return;
      }
      this.$confirm(`是否要${state === 0 ? '停用' : '启用'}广告位？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editAdUnit({
          id: adUnit.id,
          mediaId: adUnit.mediaId,
          state: state,
        }).then(res => {
          adUnit.state = state;
          this.$message.success(`${state === 0 ? '停用' : '启用'}成功`);
        })
      })
    }
  },
  mounted() {
    this.adMediaDetail();
    this.adMediaUnitList();
    this.adMediaMetrics();
  },
}
</script>

<style scoped>
.metric-panel {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f7;
}

.metric-panel >>> .prefix {
  padding-top: 1px;
}

.metric-panel >>> .suffix {
  padding-top: 1px;
}
</style>