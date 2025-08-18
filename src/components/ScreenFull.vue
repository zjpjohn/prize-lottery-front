<template>
  <div>
      <span :style="{'font-size':size+'px','color':color}"
            :class="['icon',fulled ? 'icon-full-exit':'icon-full']"
            @click="handleScreen">
      </span>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "ScreenFull",
  props: {
    size: {
      type: Number,
      default: 18,
    },
    color: {
      type: String,
      default: '#6c6c6c'
    },
  },
  data() {
    return {
      hint: '全屏展示',
      fulled: false,
    };
  },
  methods: {
    handleScreen() {
      if (!screenfull.isEnabled) {
        this.$message.warning('不支持全屏浏览');
        return;
      }
      screenfull.toggle();
    },
    change() {
      this.fulled = screenfull.isFullscreen;
      this.hint   = this.fulled ? '退出全屏' : '全屏展示';
    },
    initialize() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change);
      }
    }
  },
  beforeDestroy() {
    this.destroy();
  },
  mounted() {
    this.initialize();
  }
}
</script>

<style scoped>

</style>
