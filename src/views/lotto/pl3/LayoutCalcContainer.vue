<template>
  <div style="margin: 32px 32px 0 32px">
    <div style="margin: 0 24px;width: 810px">
      <el-menu :default-active="active" mode="horizontal" @select="handleRoute">
        <el-menu-item v-for="(item,index) in items"
                      :index="item.path"
                      style="width: 90px;text-align: center"
                      :key="index+'_pls_calc'">{{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>
    <div style="margin: 32px 0 0 24px">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutCalcContainer",
  computed: {
    items() {
      return [
        {
          path: `/pls/calc/recommend`,
          label: '推荐计算'
        },
        {
          path: `/pls/calc/danKill`,
          label: '胆杀计算'
        },
        {
          path: `/pls/calc/com`,
          label: '组合计算'
        },
        {
          path: `/pls/calc/aug`,
          label: '增量计算'
        },
        {
          path: `/pls/calc/rev`,
          label: '反向分析'
        },
        {
          path: `/pls/calc/d3`,
          label: '三胆计算'
        },
        {
          path: `/pls/calc/dan3`,
          label: '组选过滤'
        },
        {
          path: `/pls/calc/lotto/filter`,
          label: '奖号过滤'
        },
        {
          path: `/pls/calc/wens`,
          label: '稳氏过滤'
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
