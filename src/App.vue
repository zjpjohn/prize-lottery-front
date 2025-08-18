<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: -apple-system, Avenir, BlinkMacSystemFont, PingFang SC, Helvetica, Tahoma, Arial, Microsoft YaHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2e2f30;
  height: 100%;
  width: 100%;
  min-width: 1200px;
}
</style>
