<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="margin: 0 24px;width: 840px">
      <el-menu :default-active="active" mode="horizontal" @select="handleRoute">
        <el-menu-item v-for="(item,index) in items"
                      :index="item.path"
                      style="width: 120px;text-align: center"
                      :key="index+'_pls_census'">{{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>
    <div style="margin: 32px 0 0 24px">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutCensusContainer",
  computed: {
    items() {
      return [
        {
          path: '/pls/census/all',
          label: '全量统计'
        },
        {
          path: '/pls/census/item',
          label: '分类统计'
        },
        {
          path: '/pls/census/vip',
          label: '付费统计'
        },
        {
          path: '/pls/census/hot',
          label: '热门统计'
        },
        {
          path: '/pls/census/high',
          label: '牛人统计'
        },
        {
          path: '/pls/census/indices',
          label: '选彩指数'
        },
        {
          path: '/pls/census/num3/index',
          label: '分类指数'
        },
      ];
    },
  },
  data() {
    return {
      active: this.$route.path,
    };
  },
  methods: {
    handleRoute(path) {
      this.$router.push(path + '?t=' + Date.now());
    }
  },
  watch: {
    $route(from, to) {
      this.active = this.$route.path;
    }
  },
}
</script>

<style scoped>

</style>
