<template>
  <div style="margin: 48px 32px 0 32px">
    <div style="width: 40%" v-if="comment">
      <el-form ref="editCommentForm" :model="commentDto" label-width="100px">
        <el-form-item label="评论标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ comment.id }}</span>
        </el-form-item>
        <el-form-item label="应用标识">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ comment.appNo }}</span>
        </el-form-item>
        <el-form-item label="用户名称">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ comment.name }}</span>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-image :src="comment.avatar" style="width: 40px;height: 40px" fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="创建时间">
          <span class="el-input el-input--medium el-input--suffix input-info">{{ comment.gmtCreate }}</span>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input v-model="commentDto.comment" type="textarea" :rows="3" placeholder="请输入评论内容"
                    v-if="showEdit"></el-input>
          <div class="el-input el-input--medium el-input--suffix input-info"
               style="word-wrap:break-word;white-space:normal;line-height: 1.5em;margin-top:8px; " v-else>
            {{ comment.comment }}
          </div>
        </el-form-item>
        <el-form-item label-width="0">
          <el-row>
            <el-col :span="12">
              <el-form-item label="应用评分">
                <el-input-number v-model="commentDto.rate" :min="1" :max="5" label="请输入应用评分"
                                 v-if="showEdit"></el-input-number>
                <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ comment.rate }}分</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评论时间">
                <el-date-picker
                    v-model="commentDto.cmtTime"
                    type="datetime"
                    placeholder="请选择评论时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-if="showEdit"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <span class="el-input el-input--medium el-input--suffix input-info" v-else>{{ comment.cmtTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="!showEdit">
          <permission permit="super">
            <el-button type="primary" @click="showEdit=true">编辑</el-button>
          </permission>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item v-if="showEdit&&comment">
          <el-button type="primary" @click="submitEditAction">提 交</el-button>
          <el-button type="plain" @click="cancelEditAction">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {appComment, editComment} from "../../../api/app-service";

export default {
  name: "CommentDetailView",
  data() {
    return {
      showEdit: false,
      comment: null,
      commentDto: {
        rate: null,
        comment: null,
        cmtTime: null,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
    };
  },
  methods: {
    getAppComment() {
      appComment(this.$route.params['id']).then(data => {
        this.comment = data || null;
        if (data) {
          Object.assign(this.commentDto, data);
        }
      });
    },
    submitEditAction() {
      let params = {};
      Object.keys(this.commentDto).filter(key => this.commentDto[key] !== this.comment[key])
          .forEach(key => params[key] = this.commentDto[key]);
      if (Object.keys(params).length === 0) {
        this.$message.success('没有数据更新');
        return;
      }
      let submitDto = Object.assign({id: this.comment.id}, params);
      editComment(submitDto).then(res => {
        this.showEdit = false;
        this.getAppComment();
      });
    },
    cancelEditAction() {
      this.showEdit = false;
      Object.assign(this.commentDto, this.comment);
    },
  },
  mounted() {
    this.getAppComment();
  }
}
</script>


<style scoped>

</style>