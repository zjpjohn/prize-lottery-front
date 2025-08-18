<template>
  <div class="icheck-radio-group-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "icheck-radio-group",
  props: {
    value: {
      type: [String, Number, Boolean],
    },
    type: {
      type: String,
      default: 'blue'
    },
  },
  watch: {
    value(newVal) {
      this.$emit('input', newVal);
    }
  }
}
</script>

<style scoped>
.icheck-radio-group-wrap {
  display: inline-block;
}
</style>
