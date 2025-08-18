<template>
  <div style="margin: 48px 32px 0 32px">
    <div class="page-header">批量导入</div>
    <div style="width: 40%;margin-left: 28px">
      <div style="display: flex;align-items: center;margin-top: 24px">
        <el-input v-model="jsonPath" placeholder="请上传符合规则的应用评论集合json文件"
                  style="margin-right: 16px" disabled=""></el-input>
        <el-upload :action="uploadAction"
                   :multiple="false"
                   :show-file-list="false"
                   :auto-upload="false"
                   :on-change="jsonFileHandle">
          <el-button size="small" type="primary" style="height: 36px;margin-right: 16px">选择文件</el-button>
        </el-upload>
        <el-button size="small" type="primary" style="height: 36px;margin-right: 4px"
                   :disabled="batchJson==null"
                   @click="submitBatch">确定上传
        </el-button>
        <el-button size="small" type="plain" style="height: 36px"
                   @click="cancelBatch">取消上传
        </el-button>
      </div>
      <div style="margin: 8px 0 32px 0">注:评论中应包含字段（name,avatar,rate,comment,cmtTime）</div>
    </div>
    <div class="page-header">创建评论</div>
    <div style="width: 40%;margin-top: 24px">
      <el-form ref="addCommentForm" :model="createDto" :rules="rules" label-width="100px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="createDto.name" placeholder="请输入评论人名称"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="avatar">
          <el-input v-model="createDto.avatar" placeholder="请输入评论人头像"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="comment">
          <el-input v-model="createDto.comment" type="textarea" :rows="3" placeholder="请输入评论内容"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-row :gutter="16" justify="space-between">
            <el-col :span="12">
              <el-form-item label="应用评分" prop="rate">
                <el-input-number v-model="createDto.rate" :min="1" :max="5" label="请输入应用评分"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-form-item label="评论时间" prop="cmtTime">
                <el-date-picker
                    v-model="createDto.cmtTime"
                    type="datetime"
                    placeholder="请选择评论时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment">提 交</el-button>
          <el-button type="plain" @click="resetComment">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addComment, batchComments} from "../../../api/app-service";

export default {
  name: "CommentCreateView",
  data() {
    return {
      uploadAction: '',
      appNo: this.$route.params.appNo,
      jsonPath: null,
      batchJson: null,
      creating: false,
      createDto: {
        name: null,
        avatar: null,
        rate: 5,
        comment: null,
        cmtTime: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名称为空',
            trigger: 'blur'
          }
        ],
        avatar: [
          {
            required: true,
            message: '用户头像为空',
            trigger: 'blur'
          }
        ],
        rate: [
          {
            required: true,
            message: '应用评分为空',
            trigger: 'blur'
          }
        ],
        comment: [
          {
            required: true,
            message: '应用评论为空',
            trigger: 'blur'
          }
        ],
        cmtTime: [
          {
            required: true,
            message: '评论时间为空',
            trigger: 'blur'
          }
        ],
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
    jsonFileHandle(file) {
      this.jsonPath = file.name;
      if (file.raw.type !== 'application/json') {
        this.$message.error('请上传json文件');
        return;
      }
      let reader = new FileReader();
      reader.readAsText(file.raw, "UTF-8");
      let that      = this;
      reader.onload = (evt) => {
        try {
          that.batchJson = JSON.parse(evt.target.result);
        } catch (e) {
          this.$message.error('json格式错误');
        }
      };
    },
    submitBatch() {
      batchComments({
        appNo: this.appNo,
        comments: JSON.stringify(this.batchJson)
      }).then(res => {
        this.$message.success('上传成功!');
        this.cancelBatch();
      });
    },
    cancelBatch() {
      this.jsonPath  = null;
      this.batchJson = null;
    },
    submitComment() {
      this.$refs.addCommentForm.validate(valid => {
        if (!valid) {
          return;
        }
        let condition = Object.assign({appNo: this.appNo}, this.createDto);
        this.creating = true;
        addComment(condition).then(res => {
          this.resetComment();
          this.$message.success('创建评论成功');
        });
      });
    },
    resetComment() {
      Object.keys(this.createDto).forEach(key => this.createDto[key] = null);
      this.creating = false;
      this.$refs['addCommentForm'].resetFields();
    },
  },
}
</script>

<style scoped>

</style>