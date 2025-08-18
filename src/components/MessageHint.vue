<template>
  <div>
    <el-badge is-dot>
      <i class="icon icon-message" style="font-size: 20px;color: black" @click="showMessageView"></i>
    </el-badge>
    <slide-view :visible.sync="show" :top="60" :width="500" :no-listener-class="['icon-message']">
      <div style="height: 100%">
        <el-empty description="暂无消息通知"></el-empty>
      </div>
    </slide-view>
  </div>
</template>

<script>
import SlideView from "./SlideView.vue";

export default {
  name: "MessageHint",
  components: {
    SlideView,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showMessageView() {
      this.show = !this.show;
    }
  },
}
</script>

<style scoped>

</style>
