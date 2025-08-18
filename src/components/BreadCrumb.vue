<template>
  <div>
    <el-breadcrumb v-if="breads.length>1">
      <el-breadcrumb-item v-for="(item,index) in breads"
                          :key="index+'_bread'"
                          :to="replaceRoutePath(item,index)">
        <span style="font-size: 16px">{{ item.meta.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      params: null,
      breads: [],
    };
  },
  methods: {
    getBreadcrumb() {
      this.params = this.$route.params;
      this.breads = this.$route.matched.filter(item => item.meta && item.meta.name);
    },
    replaceRoutePath(route, index) {
      //末尾不允许跳转
      if (index >= this.breads.length - 1) {
        return '';
      }
      let path = route.path;
      //没有参数不允许替换
      if (!this.params) {
        return path;
      }
      //正则替换参数
      Object.keys(this.params).forEach(key => {
        path = path.replace(new RegExp(`:${key}`, 'g'), this.params[key]);
      })
      return path;
    }
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
}
</script>

<style scoped>
>>> .el-breadcrumb__inner.is-link {
  font-weight: 400;
}

>>> .el-breadcrumb {
  display: flex;
  align-items: center;
  line-height: normal;
}

>>> .el-breadcrumb__separator {
  font-size: 15px;
  margin: 0 6px;
}
</style>