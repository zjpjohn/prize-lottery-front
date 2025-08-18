<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="display: flex;align-items: center">
      <div class="page-title">应用评论</div>
      <permission>
        <permission permit="super">
          <el-button size="small" type="primary" icon="el-icon-plus"
                     style="height: 36px;margin-left: 36px"
                     @click="goCreateComment">创建评论
          </el-button>
        </permission>
      </permission>
    </div>
    <div style="margin-top: 32px">
      <el-table :data="comments.records"
                style="width: 100%"
                :row-style="{height:'50px'}"
                :header-cell-style="{background:'#eef1f6',color:'#606266',height: '44px'}">
        <el-table-column label="评论人" prop="name" width="140px"></el-table-column>
        <el-table-column label="头像" width="120px">
          <template v-slot="scope">
            <el-image :src="scope.row.avatar+'?x-oss-process=image/resize,w_28'" style="width: 32px;height: 32px"
                      fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="评分" width="120px">
          <template v-slot="scope">
            <span>{{ scope.row.rate }}分</span>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" prop="comment"></el-table-column>
        <el-table-column label="评论时间" prop="cmtTime" width="180px"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate" width="180px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <el-link type="primary"
                     :underline="false"
                     @click="goCommentDetail(scope.row.id)">
              详情
            </el-link>
          </template>
        </el-table-column>
        <div slot="empty">
          <div class="table-empty">
            <img src="../../../assets/images/empty.png" alt="" style="width: 84px">
            <span>暂无应用评论</span>
          </div>
        </div>
      </el-table>
      <el-pagination background
                     style="margin-top: 16px"
                     layout="total,prev,pager,next"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="comments.total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {commentList} from "../../../api/app-service";

export default {
  name: "CommentListView",
  data() {
    return {
      page: 1,
      limit: 10,
      comments: {
        current: 1,
        total: 0,
        records: [],
      },
    };
  },
  methods: {
    queryCommentList() {
      let condition = {
        page: this.page,
        limit: this.limit,
        appNo: this.$route.params.appNo,
      };
      commentList(condition).then(data => this.comments = data);
    },
    goCreateComment() {
      this.$router.push(`/app/${this.$route.params.appNo}/comment/add`);
    },
    goCommentDetail(id) {
      this.$router.push(`/app/${this.$route.params.appNo}/comment/detail/${id}`);
    }
  },
  mounted() {
    this.queryCommentList();
  },
  watch: {
    page(value) {
      this.queryCommentList();
    },
  },
}
</script>

<style scoped>

</style>