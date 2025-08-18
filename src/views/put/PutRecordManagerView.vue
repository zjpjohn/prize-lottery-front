<template>
  <div style="margin: 32px 32px 0 32px">
    <el-descriptions title="渠道信息" size="medium" :column="5">
      <el-descriptions-item label="渠道编号">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.bizNo }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="所属应用">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.appNo }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="渠道类型">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.type.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="渠道状态">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.state.label }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.gmtCreate }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="三方标识">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.thirdId }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="渠道人数">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.targetCnt }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="获客人数">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.userCnt }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="预期消费">
          <span style="font-weight: bold;color: #333333" v-if="channel">
            {{ channel.expectAmt }}
          </span>
      </el-descriptions-item>
      <el-descriptions-item label="投放次数">
        <div style="display: flex;align-items: center" v-if="channel">
          <span style="font-weight: bold;color: #333333">
            {{ channel.batches }}
          </span>
          <permission permit="super">
            <el-link type="primary"
                     style="margin-left: 12px;padding-bottom: 2px;font-size: 13px"
                     :underline="false"
                     @click="showCreate=true">创建投放
            </el-link>
          </permission>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 24px">
      <div style="margin-bottom:16px;font-size: 16px;font-weight: 700">投放记录</div>
      <div style="margin-bottom: 16px">
        <el-table stripe :data="records" style="width: 100%"
                  :row-style="{height:'50px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
          <el-table-column label="渠道标识" prop="channel" width="200px"></el-table-column>
          <el-table-column label="邀请码" prop="code" width="160px"></el-table-column>
          <el-table-column label="二维码" width="100px">
            <template v-slot="scope">
              <el-link :underline="false"
                       type="primary"
                       v-if="scope.row.state.value===2||scope.row.state.value===3"
                       @click="showPutQrCode(scope)">查看
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="投入金额" width="100px">
            <template v-slot="scope">
              {{ scope.row.expectAmt / 100 }}元
            </template>
          </el-table-column>
          <el-table-column label="获取人数" prop="userCnt" width="100px"></el-table-column>
          <el-table-column label="记录状态" width="100px">
            <template v-slot="scope">
              <el-tag type="info" size="mini" v-if="scope.row.state.value===0">{{ scope.row.state.label }}
              </el-tag>
              <el-tag type="primary" size="mini" v-if="scope.row.state.value===1">{{ scope.row.state.label }}
              </el-tag>
              <el-tag type="success" size="mini" v-if="scope.row.state.value===2">{{ scope.row.state.label }}
              </el-tag>
              <el-tag type="info" size="mini" v-if="scope.row.state.value===3">{{ scope.row.state.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="投放时间" prop="putTime" width="160px"></el-table-column>
          <el-table-column label="创建时间" prop="gmtCreate" width="160px"></el-table-column>
          <el-table-column label="备注说明" prop="remark"></el-table-column>
          <el-table-column label="操作" width="160px">
            <template v-slot="scope">
              <permission permit="super">
                <el-link :underline="false"
                         type="primary"
                         style="margin-right: 8px"
                         v-if="scope.row.state.value===1"
                         @click="showRecordEdit(scope)">编辑
                </el-link>
                <el-link :underline="false"
                         type="success"
                         style="margin-right: 8px"
                         v-if="scope.row.state.value===1"
                         @click="recordSateAction({id:scope.row.id,state:2,message:'是否要投放已创建的当前记录',success:'投放成功'})">
                  使用
                </el-link>
                <el-link :underline="false"
                         type="warning"
                         v-if="scope.row.state.value===1"
                         @click="recordSateAction({id:scope.row.id,state:0,message:'是否要取消已创建的当前记录',success:'取消成功'})">
                  取消
                </el-link>
                <el-link :underline="false"
                         type="danger"
                         v-if="scope.row.state.value===2"
                         @click="recordSateAction({id:scope.row.id,state:3,message:'是否要下线已投放的当前记录',success:'下线成功'})">
                  下线
                </el-link>
              </permission>
            </template>
          </el-table-column>
          <div slot="empty">
            <div class="table-empty">
              <img src="../../assets/images/empty.png" alt="" style="width: 84px">
              <span>暂无投放记录</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
    <el-dialog width="500px"
               :visible.sync="showCreate"
               :close-on-click-modal="false"
               :before-close="cancelCreateClose">
      <div slot="title">创建投放记录</div>
      <el-form ref="createRecordForm"
               label-wdth="80px"
               :rules="rules"
               :model="createDto">
        <el-form-item label="消费金额" prop="expectAmt">
          <el-input v-model="createDto.expectAmt" placeholder="请输入本次投放消费金额，单位-分"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input v-model="createDto.remark"
                    type="textarea"
                    clearable
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    placeholder="请输入本次投放说明信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="submitCreateAction(1)">仅创建</el-button>
          <el-button type="primary" :loading="creating" @click="submitCreateAction(2)">创建并投放</el-button>
          <el-button type="plain" @click="cancelCreateClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="500px"
               :visible.sync="showEdit"
               :before-close="cancelEditClose">
      <div slot="title">编辑投放记录</div>
      <el-form ref="editRecordForm"
               label-wdth="80px"
               :rules="editRules"
               :model="editDto">
        <el-form-item label="消费金额" prop="expectAmt">
          <el-input v-model="editDto.expectAmt" placeholder="请输入本次投放消费金额，单位-分"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input v-model="editDto.remark"
                    type="textarea"
                    clearable
                    :rows="4"
                    :maxlength="100"
                    :show-word-limit="true"
                    placeholder="请输入本次投放说明信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditAction">提 交</el-button>
          <el-button type="plain" @click="cancelEditClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showQr"
               width="300px"
               :close-on-click-modal="false"
               :before-close="closeQrCode">
      <div slot="title" style="text-align: center">邀请二维码</div>
      <div v-if="download">
        <QrCode :text="download.invUri"
                :download-name="download.channel+'_'+download.code"
                :width="200"
                :height="200"
                :logo="appInfo.logo"
                :logo-size="50"
                :margin="3"
                :radius="6"></QrCode>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createPutRecord, editPutRecord, putChannel, putRecords} from "../../api/user-service";
import QrCode from "../../components/qrcode/QRCode.vue";
import {getAppByNo} from "../../api/app-service";

export default {
  name: "PutRecordManagerView",
  components: {QrCode},
  data() {
    return {
      channel: null,
      appInfo: null,
      records: [],
      showCreate: false,
      creating: false,
      createDto: {
        expectAmt: null,
        remark: null,
      },
      showQr: false,
      download: null,
      showEdit: false,
      selected: null,
      editDto: {
        expectAmt: null,
        remark: null,
      },
      rules: {
        expectAmt: [
          {
            required: true,
            message: '投入金额为空',
            trigger: 'blur'
          },
          {
            pattern: /^[1-9]\d*|0$/,
            message: '投入金额大于等于0',
            trigger: 'blur',
          },
        ],
        remark: [
          {
            required: true,
            message: '投放备注说明为空',
          }
        ],
      },
      editRules: {
        expectAmt: [
          {
            pattern: /^[1-9]\d*|0$/,
            message: '投入金额大于等于0',
            trigger: 'blur',
          },
        ],
      }
    };
  },
  methods: {
    queryAppInfo() {
      getAppByNo(this.$route.params.appNo).then(data => this.appInfo = data);
    },
    queryChannel() {
      putChannel(this.$route.params.channel).then(data => this.channel = data);
    },
    queryRecords() {
      putRecords(this.$route.params.channel).then(data => this.records = data || []);
    },
    submitCreateAction(state) {
      this.$refs.createRecordForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.creating = true;
        let params    = Object.assign({
          channel: this.$route.params.channel,
          state: state
        }, this.createDto);
        createPutRecord(params).then(res => {
          this.queryRecords();
          this.$message.success('创建成功');
          this.cancelCreateClose();
        });
      });
    },
    cancelCreateClose() {
      this.creating   = false;
      this.showCreate = false;
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
      this.$refs.createRecordForm.resetFields();
    },
    showRecordEdit(scope) {
      this.selected = scope.row;
      this.showEdit = true;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = this.selected[key]);
    },
    recordSateAction({
                       id,
                       state,
                       message,
                       success
                     }) {
      this.$confirm(message, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editPutRecord({
          id: id,
          state: state
        }).then(res => {
          this.$message.success(success);
          this.queryRecords();
        })
      });
    },
    submitEditAction() {
      this.$refs.editRecordForm.validate(valid => {
        if (!valid) {
          return;
        }
        let params = {};
        Object.keys(this.editDto).filter(key => this.editDto[key] !== this.selected[key])
            .forEach(key => params[key] = this.editDto[key]);
        if (Object.keys(params).length === 0) {
          this.$message.error('没有数据更新');
          return
        }
        editPutRecord(Object.assign({id: this.selected.id}, params)).then(res => {
          this.queryRecords();
          this.cancelEditClose();
        });
      });
    },
    cancelEditClose() {
      this.selected = null;
      this.showEdit = false;
      Object.keys(this.editDto).forEach(key => this.editDto[key] = null);
      this.$refs.editRecordForm.resetFields();
    },
    showPutQrCode(scope) {
      this.download = scope.row;
      this.showQr   = true;
    },
    closeQrCode() {
      this.showQr   = false;
      this.download = null;
    }
  },
  created() {
    this.queryChannel();
    this.queryRecords();
    this.queryAppInfo();
  }
}
</script>

<style scoped>

</style>