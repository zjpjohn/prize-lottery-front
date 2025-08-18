<template>
  <div style="display: inline">
    <span style="display: inline-block;color: #ffffff;text-align: center;font-weight: 500;margin-right: 8px"
          :style="{width:size+'px',height:size+'px',borderRadius:size/2+'px',lineHeight:size+'px',fontSize: fontSize+'px'}"
          :class="type">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "Ball",
  props: {
    type: {
      type: String,
      default: 'red',
    },
    value: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 30
    },
    fontSize: {
      type: Number,
      default: 16
    },
  },
}
</script>

<style scoped>
.red {
  background-color: #FF3333;
}

.blue {
  background-color: #1890ff;
}

.orange {
  background-color: #ff6347;
}

.yellow {
  background-color: #FFBB66;
}
</style>
