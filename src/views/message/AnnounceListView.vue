<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <span style="margin-right: 16px">公告渠道</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.channel"
                 placeholder="请选择公告渠道">
        <el-option v-for="(item,index) in channels"
                   :key="index+'_channel'"
                   :label="item.name"
                   :value="item.channel"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">公告类型</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.type"
                 placeholder="请选择公告类型">
        <el-option label="文本公告" :value="1"></el-option>
        <el-option label="链接公告" :value="2"></el-option>
        <el-option label="卡片公告" :value="3"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">创建来源</span>
      <el-select size="medium"
                 style="width: 180px"
                 clearable
                 v-model="query.mode"
                 placeholder="请选择公告创建模式">
        <el-option label="自动创建" :value="1"></el-option>
        <el-option label="手动创建" :value="2"></el-option>
      </el-select>
      <span style="margin: 0 16px 0 24px">创建时间</span>
      <el-select size="medium"
                 style="width: 180px"
                 v-model="query.days"
                 placeholder="请选择公告创建时间">
        <el-option label="一周内" :value="7"></el-option>
        <el-option label="两周内" :value="14"></el-option>
        <el-option label="一个月内" :value="30"></el-option>
        <el-option label="两个月内" :value="60"></el-option>
        <el-option label="三个月内" :value="90"></el-option>
      </el-select>
      <span style="margin-left: 24px"></span>
      <permission permit="super">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="showAdd=true">创建公告</el-button>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table stripe
                :data="list.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="公告编号" prop="id" width="100px"></el-table-column>
        <el-table-column label="公告渠道" prop="channel" width="140px"></el-table-column>
        <el-table-column label="创建模式" width="120px">
          <template v-slot="scope">
            <span v-if="scope.row.mode===1">自动</span>
            <span v-else>手动</span>
          </template>
        </el-table-column>
        <el-table-column label="消息类型" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.type.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公告标题" prop="title" width="300px"></el-table-column>
        <el-table-column label="公告内容">
          <template v-slot="scope">
            <span>{{ scope.row.content.text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="160px"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <el-link :underline="false"
                     type="plain"
                     style="margin-right: 10px"
                     v-if="scope.row.mode===2"
                     @click="showAnnounceEdit(scope.row)">编辑
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无系统公告</span>
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
    <el-dialog :visible.sync="showAdd" width="600px" :before-close="addDialogClose">
      <div slot="title" class="title">创建系统公告</div>
      <el-form ref="addAnnounceForm" :model="createDto" :rules="rules" label-width="90px">
        <el-form-item label="公告渠道" prop="channel">
          <el-select size="large"
                     clearable
                     style="width: 100%"
                     v-model="createDto.channel"
                     placeholder="请选择公告渠道">
            <el-option v-for="(item,index) in channels"
                       :key="index+'_channel'"
                       :label="item.name"
                       :value="item.channel"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型" prop="type">
          <el-select size="large"
                     clearable
                     style="width: 100%"
                     v-model="createDto.type"
                     placeholder="请选择公告消息类型">
            <el-option label="文本消息" :value="1"></el-option>
            <el-option label="链接消息" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="createDto.title" size="large" placeholder="请输入公告标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="text">
          <el-input type="textarea"
                    size="large"
                    :rows="6"
                    maxlength="100"
                    show-word-limit
                    v-model="createDto.text"
                    placeholder="请输入渠道描述说明"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="link" v-if="createDto.type===2">
          <el-input v-model="createDto.link" size="large" placeholder="请输入公告跳转链接" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddAction">确定</el-button>
          <el-button type="danger" @click="addDialogClose" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showEdit" width="600px" :before-close="editDialogClose">
      <div slot="title" class="title">编辑系统公告</div>
      <el-form ref="editAnnounceForm" :model="editDto" label-width="90px">
        <el-form-item label="公告标题">
          <el-input v-model="editDto.title"
                    size="large"
                    clearable
                    placeholder="请输入公告标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea"
                    size="large"
                    :rows="6"
                    maxlength="100"
                    show-word-limit
                    v-model="editDto.text"
                    placeholder="请输入公告内容"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" v-if="announce!==null&&announce.type.value===2">
          <el-input v-model="editDto.link"
                    size="large"
                    placeholder="请输入消息跳转链接"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitEditAction">确定</el-button>
          <el-button type="plain" @click="editDialogClose" style="margin-left: 16px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {announceList, createAnnounce, editAnnounce, typedChannels} from "../../api/message-service";

export default {
  name: "AnnounceListView",
  data() {
    return {
      page: 1,
      limit: 10,
      showAdd: false,
      showEdit: false,
      announce: null,
      createDto: {
        title: null,
        text: null,
        channel: null,
        type: null,
        link: null,
      },
      editDto: {
        title: null,
        text: null,
        link: null,
      },
      query: {
        channel: null,
        type: null,
        mode: null,
        days: 7,
      },
      channels: [],
      list: {
        current: 1,
        total: 0,
        records: [],
      },
      rules: {
        title: [
          {
            required: true,
            message: '公告标题为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '消息类型为空',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: '公告内容为空',
            trigger: 'blur'
          }
        ],
        channel: [
          {
            required: true,
            message: '公告渠道为空',
            trigger: 'blur'
          }
        ],
        link: [
          {
            required: true,
            trigger: blur,
            validator: (rules, value, callback) => {
              let type = this.createDto.type;
              if (type === 2 && !value) {
                return callback(new Error('消息跳转链接为空'));
              }
              return callback();
            }
          }
        ],
      },
    };
  },
  methods: {
    announceChannels() {
      typedChannels(0)
          .then(data => this.channels = data || []);
    },
    queryAnnounces() {
      let condition = Object.assign({
        page: this.page,
        limit: this.limit
      }, this.query);
      announceList(condition).then(data => this.list = data);
    },
    submitAddAction() {
      this.$refs.addAnnounceForm.validate(valid => {
        if (!valid) {
          return;
        }
        createAnnounce(this.createDto).then(res => {
          this.queryAnnounces();
          this.$message.success('创建成功');
          this.addDialogClose();
        });
      });
    },
    addDialogClose() {
      this.showAdd = false;
      Object.keys(this.createDto)
          .forEach(key => this.createDto[key] = null);
      this.$refs.addAnnounceForm.resetFields();
    },
    showAnnounceEdit(announce) {
      this.announce = announce;
      this.editDto  = {
        title: announce.title,
        text: announce.content.text,
        link: announce.content.link || null,
      };
      this.showEdit = true;
    },
    editDialogClose() {
      this.showEdit = false;
      this.announce = null;
      this.editDto  = {
        title: null,
        text: null,
        link: null,
      };
    },
    submitEditAction() {
      let params = {};
      if (this.editDto.title !== this.announce.title) {
        params.title = this.editDto.title;
      }
      if (this.editDto.text !== this.announce.content.text) {
        params.text = this.editDto.text;
      }
      if (Object.keys(params).length === 0) {
        this.$message.error('没有数据更新');
        return;
      }
      editAnnounce(Object.assign({id: this.announce.id}, params))
          .then(res => {
            this.queryAnnounces();
            this.$message.success('编辑成功');
            this.editDialogClose();
          });
    },
  },
  created() {
    this.announceChannels();
    this.queryAnnounces();
  },
  watch: {
    page(value) {
      this.queryAnnounces();
    },
    query: {
      deep: true,
      handler(val, old) {
        this.page = 1;
        this.queryAnnounces();
      }
    },
  },
}
</script>

<style scoped>

</style>
