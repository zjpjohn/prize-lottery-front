<template>
  <div style="margin: 32px 32px 0 32px">
    <div v-if="feedback">
      <div style="">
        <div style="padding: 8px 0;color:#448AFF;font-size: 18px">
          {{ feedback.appName }}-{{ feedback.appVersion }}
        </div>
        <div style="color: #6c6c6c">
          <span style="margin-right: 12px;font-size: 13px">{{ feedback.type }}</span>
          <span>{{ feedback.gmtCreate }}</span>
        </div>
        <div style="color: #6c6c6c;padding: 16px 0">
          {{ feedback.device }}
        </div>
        <div style="font-size: 16px;color: #2c2c2c;min-height: 50px;width: 40%;line-height: 1.5">
          {{ feedback.content }}
        </div>
        <div style="display: flex;align-items: center;margin-top: 16px">
          <el-image :src="image"
                    :preview-src-list="feedback.images"
                    style="width: 135px;height: 240px;margin-right: 20px"
                    fit="cover"
                    v-for="(image,index) in feedback.images"
                    :key="'f_img_'+index">
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {feedbackDetail} from "../../api/feedback-service";

export default {
  name: "FeedbackHandleView",
  data() {
    return {
      feedback: null,
      handleDto: {
        state: null,
        remark: null,
      },
    };
  },
  methods: {
    feedbackDetail() {
      feedbackDetail(this.$route.params.id)
          .then(data => this.feedback = data);
    }
  },
  mounted() {
    this.feedbackDetail();
  }
}
</script>

<style scoped>

</style>
