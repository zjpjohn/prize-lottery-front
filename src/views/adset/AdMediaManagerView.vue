<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <el-select style="width: 180px" size="medium" clearable
                 v-model="state" placeholder="选择媒体状态">
        <el-option :value="1" label="正在使用"></el-option>
        <el-option :value="0" label="无效媒体"></el-option>
      </el-select>
      <permission permit="super">
        <el-button style="margin-left: 24px" size="medium" type="primary" plain
                   @click="showAdd=true">创建媒体
        </el-button>
      </permission>
    </div>
    <div style="margin-top: 24px">
      <el-table stripe :data="mediaList.records" :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="媒体名称" prop="name" width="140"></el-table-column>
        <el-table-column label="所属应用" prop="appNo" width="140"></el-table-column>
        <el-table-column label="媒体状态" width="140">
          <template v-slot="scope">
            <el-switch :value="scope.row.state"
                       :width="30"
                       :active-value="1"
                       :inactive-value="0"
                       @change="(value)=>changeMediaState(value,scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="媒体appKey" prop="appKey"></el-table-column>
        <el-table-column label="媒体appSecret" prop="appSecret"></el-table-column>
        <el-table-column label="描述说明" prop="remark"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <permission permit="super">
              <el-link :underline="false"
                       style="margin-right: 12px"
                       type="danger"
                       @click="showEditMedia(scope.row)">编辑
              </el-link>
            </permission>
            <el-link :underline="false"
                     type="primary"
                     @click="toMediaDetail(scope.row.id)">广告位
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无媒体应用</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="mediaList.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showAdd"
               @close="closeAdMedia"
               :modal-append-to-body="false" width="32%">
      <div slot="title" class="title">创建广告媒体</div>
      <div>
        <el-form ref="addMediaForm" :model="addMediaDto" :rules="rules" label-width="100px">
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="addMediaDto.name"
                      placeholder="请输入广告媒体名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="媒体应用" prop="appNo">
            <el-select v-model="addMediaDto.appNo"
                       style="width: 100%"
                       no-data-text="暂无可选绑定应用"
                       placeholder="选择媒体绑定应用">
              <el-option v-for="(item,index) in appList"
                         :key="'media_app_'+index"
                         :label="item.name"
                         :value="item.seqNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="AppKey" prop="appKey">
            <el-input type="textarea"
                      :rows="2"
                      v-model="addMediaDto.appKey"
                      placeholder="请输入广告媒体appKey"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="AppSecret" prop="appSecret">
            <el-input type="textarea"
                      :rows="2"
                      v-model="addMediaDto.appSecret"
                      placeholder="请输入广告媒体appSecret"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="addMediaDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitAddMedia">提交</el-button>
            <el-button type="primary" @click="closeAdMedia">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit"
               @close="closeEditMedia"
               :modal-append-to-body="false" width="32%">
      <div slot="title" class="title">编辑广告媒体</div>
      <div>
        <el-form ref="editMediaForm" :model="editMediaDto" label-width="100px">
          <el-form-item label="媒体名称">
            <el-input v-model="editMediaDto.name"
                      placeholder="请输入广告媒体名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input type="textarea"
                      :rows="2"
                      v-model="editMediaDto.appSecret"
                      placeholder="请输入广告媒体appSecret"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="100"
                      :show-watch-limit="true"
                      v-model="editMediaDto.remark"
                      placeholder="请输入相关说明信息"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitEditMedia">提交</el-button>
            <el-button type="primary" @click="closeEditMedia">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {adMediaList, createAdMedia, editMedia} from "../../api/adset-service";
import {getAppList} from "../../api/app-service";

export default {
  name: "AdMediaManagerView",
  data() {
    return {
      limit: 10,
      page: 0,
      state: null,
      showAdd: false,
      showEdit: false,
      appList: [],
      selected: null,
      mediaList: {
        current: 1,
        total: 0,
        records: [],
      },
      addMediaDto: {
        name: null,
        appNo: null,
        appKey: null,
        appSecret: null,
        remark: null,
      },
      editMediaDto: {
        name: null,
        appSecret: null,
        remark: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '媒体名称为空',
            trigger: 'blur',
          },
        ],
        appNo: [
          {
            required: true,
            message: '媒体应用标识为空',
            trigger: 'blur',
          },
        ],
        appKey: [
          {
            required: true,
            message: '媒体应用appKey为空',
            trigger: 'blur',
          }
        ],
        appSecret: [
          {
            required: true,
            message: '媒体应用appSecret为空',
            trigger: 'blur',
          }
        ]
      },
    };
  },
  methods: {
    getAppList() {
      getAppList().then(data => this.appList = data || []);
    },
    toMediaDetail(mediaId) {
      this.$router.push(`/ads/adset/media/detail/${mediaId}`);
    },
    getMediaList() {
      adMediaList({
        state: this.state,
        page: this.page,
        limit: this.limit
      }).then(data => this.mediaList = data);
    },
    submitAddMedia() {
      this.$refs.addMediaForm.validate(valid => {
        if (!valid) {
          return;
        }
        createAdMedia(this.addMediaDto).then(res => {
          this.getMediaList();
          this.$message.success('创建成功');
          this.closeAdMedia();
        });
      });
    },
    closeAdMedia() {
      this.$refs.addMediaForm.resetFields();
      Object.keys(this.addMediaDto).forEach(key => this.addMediaDto[key] = null);
      this.showAdd = false;
    },
    showEditMedia(value) {
      this.selected = value;
      this.showEdit = true;
      Object.keys(this.editMediaDto).forEach(key => this.editMediaDto[key] = this.selected[key]);
    },
    closeEditMedia() {
      this.$refs.editMediaForm.resetFields();
      Object.keys(this.editMediaDto).forEach(key => this.editMediaDto[key] = null);
      this.showEdit = false;
    },
    submitEditMedia() {
      let params = {};
      Object.keys(this.editMediaDto)
          .filter(key => this.editMediaDto[key] !== this.selected[key])
          .forEach(key => params[key] = this.editMediaDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.error('没有更新数据！');
        return;
      }
      let dto = Object.assign({id: this.selected.id}, params);
      editMedia(dto).then(res => {
        this.getMediaList();
        this.$message.success('编辑成功!');
        this.closeEditMedia();
      })
    },
    changeMediaState(state, adMedia) {
      this.$confirm(`是否要${state === 0 ? '停用' : '启用'}广告媒体？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editMedia({
          id: adMedia.id,
          state: state,
        }).then(res => {
          adMedia.state = state;
          this.$message.success(`${state === 0 ? '停用' : '启用'}成功`);
        })
      })
    }
  },
  mounted() {
    this.getAppList();
  },
  watch: {
    state(value) {
      this.getMediaList();
    },
    page(value) {
      this.getMediaList();
    }
  }
}
</script>

<style scoped>

</style>